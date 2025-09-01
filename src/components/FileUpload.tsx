'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, File, X, Check } from 'lucide-react';

interface FileUploadProps {
  endpoint: 'cv' | 'logo';
  acceptedTypes: string;
  maxSize: string;
  onUploadSuccess: (url: string) => void;
  onUploadError?: (error: string) => void;
  currentFile?: string;
  buttonText?: string;
  className?: string;
}

export function FileUpload({
  endpoint,
  acceptedTypes,
  maxSize,
  onUploadSuccess,
  onUploadError,
  currentFile,
  buttonText,
  className = '',
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(currentFile || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`/api/upload/${endpoint}`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadedFile(result.url);
        onUploadSuccess(result.url);
      } else {
        onUploadError?.(result.error || 'Upload failed');
      }
    } catch (error) {
      onUploadError?.('Upload failed. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    onUploadSuccess('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileName = (url: string) => {
    return url.split('/').pop() || 'Uploaded file';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      {!uploadedFile ? (
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full"
        >
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              {buttonText || `Upload ${endpoint === 'cv' ? 'CV' : 'Logo'}`}
            </>
          )}
        </Button>
      ) : (
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center">
            <Check className="h-4 w-4 text-green-600 mr-2" />
            <div className="flex items-center">
              <File className="h-4 w-4 text-gray-600 mr-2" />
              <span className="text-sm text-gray-700 truncate max-w-[200px]">
                {getFileName(uploadedFile)}
              </span>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemoveFile}
            className="text-red-600 hover:text-red-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <p className="text-xs text-gray-500">
        Accepted formats: {acceptedTypes.replace(/\./g, '').toUpperCase()}. Max size: {maxSize}
      </p>
    </div>
  );
}