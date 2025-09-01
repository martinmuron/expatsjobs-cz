'use client';

import { JobCard } from '@/components/JobCard';
import { SearchForm } from '@/components/SearchForm';
import { Button } from '@/components/ui/button';
import { mockJobs } from '@/lib/mockJobs';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function JobsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';
  const type = searchParams.get('type') || '';

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const matchesQuery = !query || 
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase());
      
      const matchesLocation = !location || 
        job.location.toLowerCase().includes(location.toLowerCase());
      
      const matchesType = !type || job.jobType === type;

      return matchesQuery && matchesLocation && matchesType;
    });
  }, [query, location, type]);

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

      {/* Search Section */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Find Your Perfect Job</h1>
          <SearchForm />
        </div>
      </section>

      {/* Jobs Listing */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
              </h2>
              {(query || location || type) && (
                <p className="text-gray-600">
                  {query && `Searching for "${query}"`}
                  {location && ` in ${location}`}
                  {type && ` • ${type} positions`}
                </p>
              )}
            </div>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
              <Button variant="outline" asChild>
                <Link href="/jobs">View All Jobs</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

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