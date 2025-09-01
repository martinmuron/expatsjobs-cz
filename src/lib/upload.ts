import { put } from '@vercel/blob';

export interface UploadResult {
  url: string;
  pathname: string;
}

export async function uploadFile(
  file: File, 
  folder: 'cvs' | 'logos' | 'avatars'
): Promise<UploadResult> {
  try {
    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const filename = `${folder}/${timestamp}-${Math.random().toString(36).substring(7)}.${fileExtension}`;

    const blob = await put(filename, file, {
      access: 'public',
    });

    return {
      url: blob.url,
      pathname: blob.pathname,
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Failed to upload file');
  }
}

export function getFileType(filename: string): 'pdf' | 'image' | 'document' | 'unknown' {
  const extension = filename.split('.').pop()?.toLowerCase();
  
  if (!extension) return 'unknown';
  
  if (['pdf'].includes(extension)) return 'pdf';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) return 'image';
  if (['doc', 'docx', 'txt', 'rtf'].includes(extension)) return 'document';
  
  return 'unknown';
}

export function validateFileSize(file: File, maxSizeMB: number = 5): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

export function validateFileType(file: File, allowedTypes: string[]): boolean {
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  return fileExtension ? allowedTypes.includes(fileExtension) : false;
}