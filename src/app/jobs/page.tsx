import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
import JobsContent from '@/components/JobsContent';

export default function JobsPage() {
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
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/post-job">Post a Job</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading jobs...</div>}>
          <JobsContent />
        </Suspense>
      </main>

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