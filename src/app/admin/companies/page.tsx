import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Building2,
  Users,
  Briefcase,
  Calendar
} from "lucide-react"

// Mock data for demonstration
const companies = [
  {
    id: 1,
    name: "Europe Congress",
    email: "hr@europecongress.com",
    location: "Prague",
    employees: "50-100",
    jobs: 3,
    status: "active",
    joinedDate: "2024-01-15",
    industry: "Events"
  },
  {
    id: 2,
    name: "ACCA Global",
    email: "careers@acca.com",
    location: "Prague",
    employees: "100-500",
    jobs: 2,
    status: "active",
    joinedDate: "2024-02-20",
    industry: "Education"
  },
  {
    id: 3,
    name: "Euro-Center Prague",
    email: "jobs@eurocenterpg.com",
    location: "Prague",
    employees: "10-50",
    jobs: 4,
    status: "pending",
    joinedDate: "2024-03-10",
    industry: "Travel"
  },
  {
    id: 4,
    name: "Tech Solutions Prague",
    email: "hr@techsolutions.cz",
    location: "Brno",
    employees: "50-100",
    jobs: 7,
    status: "active",
    joinedDate: "2024-01-05",
    industry: "Technology"
  },
  {
    id: 5,
    name: "Design Studio Prague",
    email: "careers@designstudio.cz",
    location: "Prague",
    employees: "10-50",
    jobs: 1,
    status: "inactive",
    joinedDate: "2023-12-15",
    industry: "Design"
  }
]

export default function AdminCompaniesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Company Management</h1>
              <p className="text-gray-600 mt-2">Manage registered companies and their job postings</p>
            </div>
            <Button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Company
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Companies</p>
                  <p className="text-3xl font-bold text-gray-900">205</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">+12 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Companies</p>
                  <p className="text-3xl font-bold text-green-600">187</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">91% active rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                  <p className="text-3xl font-bold text-orange-600">8</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Needs review</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Jobs Posted</p>
                  <p className="text-3xl font-bold text-blue-600">524</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search companies by name, email, or location..." 
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">Export</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Companies Table */}
        <Card>
          <CardHeader>
            <CardTitle>Companies ({companies.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Company</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Size</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Jobs</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Joined</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((company) => (
                    <tr key={company.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{company.name}</div>
                          <div className="text-sm text-gray-500">{company.industry}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">{company.email}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">{company.location}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">{company.employees}</div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline">{company.jobs} jobs</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge 
                          variant={
                            company.status === 'active' ? 'default' :
                            company.status === 'pending' ? 'secondary' : 'outline'
                          }
                          className={
                            company.status === 'active' ? 'bg-green-100 text-green-800' :
                            company.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }
                        >
                          {company.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">
                          {new Date(company.joinedDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-700">
                Showing 1 to {companies.length} of {companies.length} companies
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="bg-blue-600 text-white">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}