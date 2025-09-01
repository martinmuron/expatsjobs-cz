'use client';

import { JobCard } from '@/components/JobCard';
import { SearchForm } from '@/components/SearchForm';
import { Button } from '@/components/ui/button';
import { mockJobs } from '@/lib/mockJobs';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function JobsContent() {
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
    <>
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
    </>
  );
}