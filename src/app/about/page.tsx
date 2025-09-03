import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Briefcase, Globe, Award, Target, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">About ExpatsJobs.cz</h1>
            <p className="text-xl text-blue-100 mb-8">
              Connecting English-speaking professionals with exciting opportunities in the Czech Republic since 2024.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="secondary" className="bg-blue-500 text-white">500+ Active Jobs</Badge>
              <Badge variant="secondary" className="bg-blue-500 text-white">200+ Companies</Badge>
              <Badge variant="secondary" className="bg-blue-500 text-white">10k+ Job Seekers</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Mission Statement */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              To bridge the gap between talented English-speaking professionals and innovative companies 
              in the Czech Republic, fostering a thriving international business community.
            </p>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We maintain high standards in matching the right talent with the right opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Building a supportive community where expats can thrive professionally in Czech Republic.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Leveraging technology to create seamless connections between talent and opportunity.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Why Czech Republic Section */}
          <div className="bg-white rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Why Czech Republic?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">🏛️ Rich Culture & History</h3>
                <p className="text-gray-600 mb-6">
                  Experience the magic of Prague and explore centuries of European history while building your career.
                </p>

                <h3 className="text-xl font-semibold mb-4">💼 Thriving Business Hub</h3>
                <p className="text-gray-600">
                  Czech Republic is a gateway to Europe with a growing tech scene and established multinational presence.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">🌍 Central Location</h3>
                <p className="text-gray-600 mb-6">
                  Perfect location in the heart of Europe, with easy access to major European cities.
                </p>

                <h3 className="text-xl font-semibold mb-4">💰 Competitive Salaries</h3>
                <p className="text-gray-600">
                  Growing economy with competitive compensation packages and lower cost of living than Western Europe.
                </p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Active Job Listings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-gray-600">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10k+</div>
              <div className="text-gray-600">Registered Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>

          {/* Industries We Serve */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Industries We Serve</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                "Technology",
                "Finance",
                "Healthcare",
                "Education",
                "Marketing",
                "Sales",
                "Engineering",
                "Design",
                "HR",
                "Operations",
                "Consulting",
                "Tourism"
              ].map((industry) => (
                <Badge key={industry} variant="outline" className="justify-center py-2">
                  {industry}
                </Badge>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Our Team</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
                Our international team combines local market knowledge with global perspective. 
                We understand the challenges of working abroad and are here to support both 
                job seekers and employers every step of the way.
              </p>
              <div className="flex justify-center items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Multilingual Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Expert Guidance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Industry Experience</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-gray-600 mb-8">
              Join thousands of professionals who have found their dream job in Czech Republic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <a href="/jobs">Browse Jobs</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/post-job">Post a Job</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}