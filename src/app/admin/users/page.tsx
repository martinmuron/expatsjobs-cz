import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Users,
  UserCheck,
  UserX,
  Mail,
  Calendar
} from "lucide-react"

// Mock data for demonstration
const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    role: "job_seeker",
    location: "Prague",
    industry: "Software Engineering",
    status: "active",
    joinedDate: "2024-01-15",
    lastActive: "2024-08-15",
    applications: 5,
    avatar: null
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    role: "employer",
    location: "Brno",
    industry: "Marketing",
    status: "active",
    joinedDate: "2024-02-20",
    lastActive: "2024-08-14",
    applications: 0,
    avatar: null
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@email.com",
    role: "job_seeker",
    location: "Prague",
    industry: "Finance",
    status: "inactive",
    joinedDate: "2024-03-10",
    lastActive: "2024-07-20",
    applications: 12,
    avatar: null
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.wilson@tech.com",
    role: "admin",
    location: "Prague",
    industry: "Technology",
    status: "active",
    joinedDate: "2024-01-05",
    lastActive: "2024-08-15",
    applications: 0,
    avatar: null
  },
  {
    id: 5,
    name: "David Lee",
    email: "david.lee@email.com",
    role: "job_seeker",
    location: "Ostrava",
    industry: "Design",
    status: "pending",
    joinedDate: "2024-08-10",
    lastActive: "2024-08-12",
    applications: 2,
    avatar: null
  }
]

export default function AdminUsersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-2">Manage registered users, employers, and administrators</p>
            </div>
            <Button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add User
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
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">10,247</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">+285 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Job Seekers</p>
                  <p className="text-3xl font-bold text-green-600">8,942</p>
                </div>
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">87% of total users</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Employers</p>
                  <p className="text-3xl font-bold text-purple-600">1,289</p>
                </div>
                <UserX className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">13% of total users</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New This Month</p>
                  <p className="text-3xl font-bold text-orange-600">285</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">+23% growth</p>
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
                    placeholder="Search users by name, email, or location..." 
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline">Export</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Industry</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Applications</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Last Active</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={user.avatar || undefined} />
                            <AvatarFallback>
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">
                              Joined {new Date(user.joinedDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge 
                          variant="outline"
                          className={
                            user.role === 'admin' ? 'bg-red-100 text-red-800' :
                            user.role === 'employer' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }
                        >
                          {user.role.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">{user.location}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">{user.industry}</div>
                      </td>
                      <td className="py-4 px-4">
                        {user.role === 'job_seeker' && (
                          <Badge variant="outline">{user.applications}</Badge>
                        )}
                        {user.role !== 'job_seeker' && (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <Badge 
                          variant={
                            user.status === 'active' ? 'default' :
                            user.status === 'pending' ? 'secondary' : 'outline'
                          }
                          className={
                            user.status === 'active' ? 'bg-green-100 text-green-800' :
                            user.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">
                          {new Date(user.lastActive).toLocaleDateString()}
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
                          <Button size="sm" variant="outline">
                            <Mail className="h-4 w-4" />
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
                Showing 1 to {users.length} of {users.length} users
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