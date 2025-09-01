import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      location,
      title,
      bio,
      experienceLevel,
      skills,
      languages,
      linkedinUrl,
      portfolioUrl,
      workAuthorization,
    } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Parse skills and languages
    const skillsArray = skills.split(',').map((skill: string) => skill.trim());
    const languagesArray = languages.split(',').map((lang: string) => lang.trim());

    // Create user and job seeker profile in a transaction
    const result = await prisma.$transaction(async (tx: typeof prisma) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name: `${firstName} ${lastName}`,
          userType: 'job_seeker',
        },
      });

      // Create job seeker profile
      const jobSeekerProfile = await tx.jobSeekerProfile.create({
        data: {
          userId: user.id,
          firstName,
          lastName,
          phone,
          location,
          title,
          bio,
          experienceLevel,
          skills: skillsArray,
          languages: languagesArray,
          linkedinUrl: linkedinUrl || null,
          portfolioUrl: portfolioUrl || null,
          workAuthorization,
        },
      });

      return { user, jobSeekerProfile };
    });

    return NextResponse.json({ 
      message: 'Job seeker account created successfully',
      userId: result.user.id 
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}