import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { mockJobs } from '@/lib/mockJobs';
import { MapPin, Clock, Building2, Briefcase, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const job = mockJobs.find(j => j.id === resolvedParams.id);
  
  if (!job) {
    notFound();
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
          <Button asChild>
            <Link href="/post-job">Post a Job</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/jobs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Building2 className="h-5 w-5 mr-2" />
                      <span className="text-lg">{job.company}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <Badge variant={job.jobType === 'full-time' ? 'default' : 'secondary'} className="text-sm">
                    {job.jobType}
                  </Badge>
                </div>
                {job.salary && (
                  <div className="text-xl font-semibold text-primary">
                    {job.salary}
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                    <p className="text-gray-700 leading-relaxed">{job.description}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Languages Required</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.languages.map((language, index) => (
                        <Badge key={index} variant="outline">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Apply for this Job</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button size="lg" className="w-full">
                  Apply Now
                </Button>
                <p className="text-sm text-gray-600 text-center">
                  You will be redirected to the company&apos;s application page
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-3 text-gray-500" />
                  <div>
                    <div className="font-medium">Job Type</div>
                    <div className="text-sm text-gray-600 capitalize">{job.jobType}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-3 text-gray-500" />
                  <div>
                    <div className="font-medium">Posted</div>
                    <div className="text-sm text-gray-600">
                      {new Date(job.postedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-3 text-gray-500" />
                  <div>
                    <div className="font-medium">Expires</div>
                    <div className="text-sm text-gray-600">
                      {new Date(job.expiryDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Share this Job</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ExpatsJobs.cz</h3>
              <p className="text-gray-400">
                Connecting English-speaking professionals with opportunities in the Czech Republic.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Job Seekers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/jobs" className="hover:text-white">Browse Jobs</Link></li>
                <li><Link href="/companies" className="hover:text-white">Companies</Link></li>
                <li><Link href="/salary-guide" className="hover:text-white">Salary Guide</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Employers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/post-job" className="hover:text-white">Post a Job</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/employer-resources" className="hover:text-white">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ExpatsJobs.cz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}