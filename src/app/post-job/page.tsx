'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { loadStripe } from '@stripe/stripe-js';

const jobPostSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  location: z.string().min(1, 'Location is required'),
  jobType: z.enum(['full-time', 'part-time', 'contract']),
  salary: z.string().optional(),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  requirements: z.string().min(20, 'Requirements must be at least 20 characters'),
  languages: z.string().min(1, 'At least one language is required'),
  companyEmail: z.string().email('Valid email is required'),
  companyWebsite: z.string().url().optional().or(z.literal('')),
});

type JobPostForm = z.infer<typeof jobPostSchema>;

export default function PostJobPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<JobPostForm>({
    resolver: zodResolver(jobPostSchema),
  });

  const onSubmit = async (data: JobPostForm) => {
    setIsSubmitting(true);
    try {
      // Here you would normally submit to your API
      console.log('Job post data:', data);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to Stripe payment (this is a mock implementation)
      // In real implementation, you'd create a Stripe checkout session
      setStep('payment');
    } catch (error) {
      console.error('Error submitting job:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayment = async () => {
    setIsSubmitting(true);
    try {
      // Mock Stripe payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep('success');
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              ExpatsJobs.cz
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-3xl font-bold mb-4">Job Posted Successfully!</h1>
            <p className="text-gray-600 mb-8">
              Your job posting is now live and will be visible for 30 days. You'll receive an email confirmation shortly.
            </p>
            <div className="space-y-4">
              <Button asChild className="w-full">
                <Link href="/jobs">View All Jobs</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              ExpatsJobs.cz
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Complete Your Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">2,000 CZK</div>
                  <div className="text-gray-600">30 days job posting</div>
                </div>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Job posting (30 days)</span>
                    <span>2,000 CZK</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT (21%)</span>
                    <span>420 CZK</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>2,420 CZK</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={handlePayment} 
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Processing...' : 'Pay with Stripe'}
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Secure payment processed by Stripe. Your job will go live immediately after payment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            ExpatsJobs.cz
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/jobs" className="text-gray-600 hover:text-primary">
              Browse Jobs
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Post a Job</h1>
            <p className="text-gray-600">
              Reach qualified English-speaking professionals in the Czech Republic
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    {...register('title')}
                    placeholder="e.g. Senior Software Engineer"
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      {...register('company')}
                      placeholder="e.g. Tech Solutions Prague"
                      className={errors.company ? 'border-red-500' : ''}
                    />
                    {errors.company && (
                      <p className="text-sm text-red-500 mt-1">{errors.company.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      {...register('location')}
                      placeholder="e.g. Prague, Czech Republic"
                      className={errors.location ? 'border-red-500' : ''}
                    />
                    {errors.location && (
                      <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jobType">Job Type *</Label>
                    <Select onValueChange={(value) => setValue('jobType', value as any)}>
                      <SelectTrigger className={errors.jobType ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.jobType && (
                      <p className="text-sm text-red-500 mt-1">{errors.jobType.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="salary">Salary (Optional)</Label>
                    <Input
                      id="salary"
                      {...register('salary')}
                      placeholder="e.g. CZK 80,000 - 120,000"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="Describe the role, responsibilities, and what makes it exciting..."
                    className={`min-h-32 ${errors.description ? 'border-red-500' : ''}`}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="requirements">Requirements *</Label>
                  <Textarea
                    id="requirements"
                    {...register('requirements')}
                    placeholder="List the required skills, experience, and qualifications..."
                    className={`min-h-24 ${errors.requirements ? 'border-red-500' : ''}`}
                  />
                  {errors.requirements && (
                    <p className="text-sm text-red-500 mt-1">{errors.requirements.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="languages">Languages Required *</Label>
                  <Input
                    id="languages"
                    {...register('languages')}
                    placeholder="e.g. English, Czech (optional)"
                    className={errors.languages ? 'border-red-500' : ''}
                  />
                  {errors.languages && (
                    <p className="text-sm text-red-500 mt-1">{errors.languages.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="companyEmail">Contact Email *</Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    {...register('companyEmail')}
                    placeholder="hr@company.com"
                    className={errors.companyEmail ? 'border-red-500' : ''}
                  />
                  {errors.companyEmail && (
                    <p className="text-sm text-red-500 mt-1">{errors.companyEmail.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="companyWebsite">Company Website (Optional)</Label>
                  <Input
                    id="companyWebsite"
                    type="url"
                    {...register('companyWebsite')}
                    placeholder="https://company.com"
                    className={errors.companyWebsite ? 'border-red-500' : ''}
                  />
                  {errors.companyWebsite && (
                    <p className="text-sm text-red-500 mt-1">{errors.companyWebsite.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">30-day job posting</span>
                    <span className="text-2xl font-bold text-primary">2,000 CZK</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Your job will be visible for 30 days and featured in search results
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>✓ 30 days visibility</li>
                    <li>✓ Featured placement</li>
                    <li>✓ Company logo display</li>
                    <li>✓ Applicant tracking</li>
                    <li>✓ Email notifications</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? 'Processing...' : 'Continue to Payment'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}