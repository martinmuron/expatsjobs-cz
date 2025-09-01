import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const {
      email,
      password,
      companyName,
      contactPerson,
      phone,
      website,
      companySize,
      industry,
      description,
      address,
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

    // Create user and employer profile in a transaction
    const result = await prisma.$transaction(async (tx: typeof prisma) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name: contactPerson,
          userType: 'employer',
        },
      });

      // Create employer profile
      const employerProfile = await tx.employerProfile.create({
        data: {
          userId: user.id,
          companyName,
          contactPerson,
          phone,
          companyWebsite: website || null,
          companySize,
          industry,
          companyDescription: description,
          address,
        },
      });

      return { user, employerProfile };
    });

    return NextResponse.json({ 
      message: 'Employer account created successfully',
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