'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const jobSeekerSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  location: z.string().min(1, 'Location is required'),
  title: z.string().min(1, 'Professional title is required'),
  bio: z.string().min(20, 'Bio must be at least 20 characters'),
  experienceLevel: z.string().min(1, 'Experience level is required'),
  skills: z.string().min(1, 'At least one skill is required'),
  languages: z.string().min(1, 'At least one language is required'),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  portfolioUrl: z.string().url().optional().or(z.literal('')),
  workAuthorization: z.string().min(1, 'Work authorization status is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type JobSeekerForm = z.infer<typeof jobSeekerSchema>;

export default function JobSeekerRegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<JobSeekerForm>({
    resolver: zodResolver(jobSeekerSchema),
  });

  const onSubmit = async (data: JobSeekerForm) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/auth/register/job_seeker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (result?.ok) {
          router.push('/profile');
        }
      } else {
        const error = await response.json();
        console.error('Registration error:', error);
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/auth/signup" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to account type selection
          </Link>
          <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create Job Seeker Account</h1>
          <p className="mt-2 text-gray-600">
            Join our platform to find your dream job
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      {...register('password')}
                      className={errors.password ? 'border-red-500' : ''}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...register('confirmPassword')}
                      className={errors.confirmPassword ? 'border-red-500' : ''}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    {...register('firstName')}
                    className={errors.firstName ? 'border-red-500' : ''}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    {...register('lastName')}
                    className={errors.lastName ? 'border-red-500' : ''}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    {...register('phone')}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g. Prague, Czech Republic"
                    {...register('location')}
                    className={errors.location ? 'border-red-500' : ''}
                  />
                  {errors.location && (
                    <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="title">Professional Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g. Senior Software Engineer"
                  {...register('title')}
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="bio">Professional Bio *</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about your experience, achievements, and career goals..."
                  {...register('bio')}
                  className={`min-h-24 ${errors.bio ? 'border-red-500' : ''}`}
                />
                {errors.bio && (
                  <p className="text-sm text-red-500 mt-1">{errors.bio.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="experienceLevel">Experience Level *</Label>
                <Select onValueChange={(value) => setValue('experienceLevel', value)}>
                  <SelectTrigger className={errors.experienceLevel ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                    <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                    <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                    <SelectItem value="lead">Lead/Principal (10+ years)</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
                {errors.experienceLevel && (
                  <p className="text-sm text-red-500 mt-1">{errors.experienceLevel.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="skills">Skills *</Label>
                <Input
                  id="skills"
                  placeholder="e.g. JavaScript, React, Node.js, Python"
                  {...register('skills')}
                  className={errors.skills ? 'border-red-500' : ''}
                />
                {errors.skills && (
                  <p className="text-sm text-red-500 mt-1">{errors.skills.message}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">Separate skills with commas</p>
              </div>

              <div>
                <Label htmlFor="languages">Languages *</Label>
                <Input
                  id="languages"
                  placeholder="e.g. English (Native), Czech (Intermediate)"
                  {...register('languages')}
                  className={errors.languages ? 'border-red-500' : ''}
                />
                {errors.languages && (
                  <p className="text-sm text-red-500 mt-1">{errors.languages.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="workAuthorization">Work Authorization in Czech Republic *</Label>
                <Select onValueChange={(value) => setValue('workAuthorization', value)}>
                  <SelectTrigger className={errors.workAuthorization ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select work authorization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eu-citizen">EU Citizen</SelectItem>
                    <SelectItem value="work-permit">Valid Work Permit</SelectItem>
                    <SelectItem value="student-visa">Student Visa</SelectItem>
                    <SelectItem value="applying">Applying for Work Permit</SelectItem>
                    <SelectItem value="sponsorship-needed">Need Sponsorship</SelectItem>
                  </SelectContent>
                </Select>
                {errors.workAuthorization && (
                  <p className="text-sm text-red-500 mt-1">{errors.workAuthorization.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
                  <Input
                    id="linkedinUrl"
                    placeholder="https://linkedin.com/in/yourprofile"
                    {...register('linkedinUrl')}
                    className={errors.linkedinUrl ? 'border-red-500' : ''}
                  />
                  {errors.linkedinUrl && (
                    <p className="text-sm text-red-500 mt-1">{errors.linkedinUrl.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="portfolioUrl">Portfolio Website</Label>
                  <Input
                    id="portfolioUrl"
                    placeholder="https://yourportfolio.com"
                    {...register('portfolioUrl')}
                    className={errors.portfolioUrl ? 'border-red-500' : ''}
                  />
                  {errors.portfolioUrl && (
                    <p className="text-sm text-red-500 mt-1">{errors.portfolioUrl.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Job Seeker Account'}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}