import { JobCard } from '@/components/JobCard';
import { SearchForm } from '@/components/SearchForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockJobs } from '@/lib/mockJobs';
import { getLatestBlogPosts } from '@/lib/mockBlogs';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function Home() {
  const latestBlogPosts = getLatestBlogPosts(3);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
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

      {/* Latest Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest Career Insights</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay informed with expert advice, market trends, and tips for advancing your career in Czech Republic
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {latestBlogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <div className="h-32 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <div className="text-blue-600 text-center">
                    <div className="text-sm font-semibold">Career Insights</div>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.categories.slice(0, 1).map((category) => (
                      <Badge key={category} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-semibold hover:text-primary transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                  </Link>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(post.publishedAt)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readingTime} min
                      </div>
                    </div>
                  </div>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                  >
                    Read More
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/blog">View All Articles</Link>
            </Button>
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
