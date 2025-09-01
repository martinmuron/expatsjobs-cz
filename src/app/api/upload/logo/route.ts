import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { uploadFile, validateFileSize, validateFileType } from '@/lib/upload';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.userType !== 'employer') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type (Image files)
    const allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    if (!validateFileType(file, allowedTypes)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload JPG, PNG, GIF, WebP, or SVG files.' },
        { status: 400 }
      );
    }

    // Validate file size (max 2MB for logos)
    if (!validateFileSize(file, 2)) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 2MB.' },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob
    const result = await uploadFile(file, 'logos');

    return NextResponse.json({
      success: true,
      url: result.url,
      pathname: result.pathname,
    });

  } catch (error) {
    console.error('Logo upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload logo' },
      { status: 500 }
    );
  }
}