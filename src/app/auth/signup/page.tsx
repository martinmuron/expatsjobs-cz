'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [selectedType, setSelectedType] = useState<'employer' | 'job_seeker' | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedType) {
      router.push(`/auth/register/${selectedType}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-primary">
            ExpatsJobs.cz
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Join our community</h1>
          <p className="mt-2 text-gray-600">
            Choose your account type to get started
          </p>
        </div>

        <div className="space-y-4">
          <Card 
            className={`cursor-pointer transition-all border-2 ${
              selectedType === 'employer' 
                ? 'border-primary bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedType('employer')}
          >
            <CardHeader className="text-center pb-3">
              <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-3">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">I&apos;m an Employer</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-center">
              <p className="text-gray-600 text-sm">
                Post job openings and find qualified candidates for your company
              </p>
              <ul className="text-sm text-gray-500 mt-3 space-y-1">
                <li>• Post unlimited jobs</li>
                <li>• Access candidate profiles</li>
                <li>• Manage applications</li>
                <li>• Company branding</li>
              </ul>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all border-2 ${
              selectedType === 'job_seeker' 
                ? 'border-primary bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedType('job_seeker')}
          >
            <CardHeader className="text-center pb-3">
              <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-3">
                <User className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">I&apos;m Looking for a Job</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-center">
              <p className="text-gray-600 text-sm">
                Find your dream job with leading companies in the Czech Republic
              </p>
              <ul className="text-sm text-gray-500 mt-3 space-y-1">
                <li>• Browse job opportunities</li>
                <li>• Save favorite jobs</li>
                <li>• Apply with one click</li>
                <li>• Profile visibility</li>
              </ul>
            </CardContent>
          </Card>

          <Button 
            onClick={handleContinue}
            disabled={!selectedType}
            className="w-full mt-6"
            size="lg"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}