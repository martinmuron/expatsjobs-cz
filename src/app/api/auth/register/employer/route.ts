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

    // Validate required fields
    if (!email || !password || !companyName || !contactPerson) {
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

    // Create user and employer profile in a transaction
    const result = await prisma.$transaction(async (tx) => {
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
          phone: phone || null,
          companyWebsite: website || null,
          companySize,
          industry,
          companyDescription: description || null,
          address: address || null,
        },
      });

      return { user, employerProfile };
    });

    return NextResponse.json({
      message: 'Employer registration successful',
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