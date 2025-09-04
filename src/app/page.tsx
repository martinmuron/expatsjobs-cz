import { JobCard } from '@/components/JobCard';
import { SearchForm } from '@/components/SearchForm';
import { Button } from '@/components/ui/button';
import { mockJobs } from '@/lib/mockJobs';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Dream Job in Czech Republic
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            The premier job board for English-speaking professionals in the Czech Republic. 
            Connect with top employers and advance your career.
          </p>
          <SearchForm />
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest Job Opportunities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover exciting career opportunities with leading companies across the Czech Republic
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockJobs.slice(0, 6).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/jobs">View All Jobs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10k+</div>
              <div className="text-gray-600">Job Seekers</div>
            </div>
          </div>
        </div>
      </section>

      {/* For Employers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">For Employers</h2>
            <p className="text-gray-600 mb-8">
              Reach qualified English-speaking professionals and expats in the Czech Republic
            </p>
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-4">Job Posting Package</h3>
              <div className="text-3xl font-bold text-primary mb-2">2,000 CZK</div>
              <div className="text-gray-600 mb-6">30 days visibility</div>
              <ul className="text-left space-y-2 mb-6 max-w-md mx-auto">
                <li>✓ 30 days job visibility</li>
                <li>✓ Featured in search results</li>
                <li>✓ Company logo display</li>
                <li>✓ Applicant tracking</li>
                <li>✓ Email notifications</li>
              </ul>
              <Button size="lg" asChild>
                <Link href="/post-job">Post Your Job</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
