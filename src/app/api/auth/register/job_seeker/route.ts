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

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user and job seeker profile in a transaction
    const result = await prisma.$transaction(async (tx) => {
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
          phone: phone || null,
          location: location || null,
          title: title || null,
          bio: bio || null,
          experienceLevel: experienceLevel || null,
          skills: skills || [],
          languages: languages || [],
          linkedinUrl: linkedinUrl || null,
          portfolioUrl: portfolioUrl || null,
          workAuthorization: workAuthorization || null,
        },
      });

      return { user, jobSeekerProfile };
    });

    return NextResponse.json({
      message: 'Job seeker registration successful',
      userId: result.user.id,
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}