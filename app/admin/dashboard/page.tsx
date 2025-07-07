"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Bell,
  ArrowUp,
  Eye,
  Plus,
  RefreshCw,
  BarChart3,
  Settings,
  Shield,
  Calendar,
  Download,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface DashboardStats {
  totalApplications: number
  pendingReview: number
  approved: number
  rejected: number
  totalLoanValue: number
  averageProcessingTime: number
  teamMembers: number
  unreadMessages: number
  monthlyGrowth: number
  approvalRate: number
  totalBrokerFees: number
  activeTeams: number
}

interface RecentActivity {
  id: string
  type: "application" | "approval" | "message" | "document" | "team"
  title: string
  description: string
  timestamp: string
  priority: "high" | "medium" | "low"
  clientName?: string
  teamMember?: string
}

interface QuickAction {
  title: string
  description: string
  icon: any
  href: string
  color: string
  badge?: number
}

export default function AdminDashboardPage() {
  const { toast } = useToast()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock dashboard stats
      const mockStats: DashboardStats = {
        totalApplications: 156,
        pendingReview: 23,
        approved: 98,
        rejected: 12,
        totalLoanValue: 45600000,
        averageProcessingTime: 4.2,
        teamMembers: 12,
        unreadMessages: 8,
        monthlyGrowth: 12.5,
        approvalRate: 89.1,
        totalBrokerFees: 456000,
        activeTeams: 4,
      }

      // Mock recent activity
      const mockActivity: RecentActivity[] = [
        {
          id: "1",
          type: "application",
          title: "New Application Submitted",
          description: "Sarah Johnson submitted a refinance application for $450,000",
          timestamp: "2024-01-16 14:30",
          priority: "high",
          clientName: "Sarah Johnson",
        },
        {
          id: "2",
          type: "approval",
          title: "Application Approved",
          description: "Michael Chen's purchase application has been approved",
          timestamp: "2024-01-16 13:15",
          priority: "medium",
          clientName: "Michael Chen",
        },
        {
          id: "3",
          type: "team",
          title: "Team Member Added",
          description: "Emma Wilson joined the Documentation Team",
          timestamp: "2024-01-16 12:45",
          priority: "low",
          teamMember: "Emma Wilson",
        },
        {
          id: "4",
          type: "message",
          title: "Urgent Client Message",
          description: "Lisa Thompson requires immediate assistance with documents",
          timestamp: "2024-01-16 11:20",
          priority: "high",
          clientName: "Lisa Thompson",
        },
        {
          id: "5",
          type: "document",
          title: "Documents Verified",
          description: "David Rodriguez's documents have been verified and approved",
          timestamp: "2024-01-16 10:30",
          priority: "medium",
          clientName: "David Rodriguez",
        },
      ]

      setStats(mockStats)
      setRecentActivity(mockActivity)
      setLoading(false)
    }

    fetchDashboardData()
  }, [])

  const handleRefresh = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    toast({
      title: "Data Refreshed",
      description: "Dashboard data has been updated successfully",
    })
  }

  const quickActions: QuickAction[] = [
    {
      title: "Applications",
      description: "View and manage loan applications",
      icon: FileText,
      href: "/admin/applications",
      color: "bg-blue-500",
      badge: stats?.pendingReview,
    },
    {
      title: "Teams",
      description: "Manage team members and assignments",
      icon: Users,
      href: "/admin/teams",
      color: "bg-green-500",
    },
    {
      title: "Analytics",
      description: "View performance metrics and reports",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "bg-purple-500",
    },
    {
      title: "Messages",
      description: "Client communications and notifications",
      icon: MessageSquare,
      href: "/admin/messages",
      color: "bg-orange-500",
      badge: stats?.unreadMessages,
    },
    {
      title: "Settings",
      description: "System configuration and preferences",
      icon: Settings,
      href: "/admin/settings",
      color: "bg-gray-500",
    },
    {
      title: "Security",
      description: "Access control and security settings",
      icon: Shield,
      href: "/admin/security",
      color: "bg-red-500",
    },
    {
      title: "Reports",
      description: "Generate and download reports",
      icon: Download,
      href: "/admin/reports",
      color: "bg-indigo-500",
    },
    {
      title: "Calendar",
      description: "Schedule and manage appointments",
      icon: Calendar,
      href: "/admin/calendar",
      color: "bg-teal-500",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "application":
        return <FileText className="h-4 w-4 text-blue-600" />
      case "approval":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "message":
        return <MessageSquare className="h-4 w-4 text-purple-600" />
      case "document":
        return <FileText className="h-4 w-4 text-orange-600" />
      case "team":
        return <Users className="h-4 w-4 text-teal-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-amber-100 text-amber-800 border-amber-200",
      low: "bg-blue-100 text-blue-800 border-blue-200",
    }
    return (
      <Badge className={`${colors[priority as keyof typeof colors]} border text-xs`}>{priority.toUpperCase()}</Badge>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <h1 className="text-2xl font-semibold text-gray-700">Loading Dashboard...</h1>
          <p className="text-gray-500">Fetching the latest data</p>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Error loading dashboard</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with Home Online today.</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleRefresh} className="bg-white border-gray-300 hover:bg-gray-50">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Application
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Applications</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.totalApplications}</div>
              <div className="flex items-center text-xs text-green-600 font-medium">
                <ArrowUp className="h-3 w-3 mr-1" />+{stats.monthlyGrowth}% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Review</CardTitle>
              <div className="p-2 bg-amber-100 rounded-lg">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.pendingReview}</div>
              <div className="flex items-center text-xs text-amber-600 font-medium">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Requires attention
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Loan Value</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${(stats.totalLoanValue / 1000000).toFixed(1)}M</div>
              <div className="flex items-center text-xs text-green-600 font-medium">
                <ArrowUp className="h-3 w-3 mr-1" />
                +8% this quarter
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Approval Rate</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.approvalRate}%</div>
              <div className="flex items-center text-xs text-green-600 font-medium">
                <ArrowUp className="h-3 w-3 mr-1" />
                +2.1% improved
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
            <p className="text-gray-600">Navigate to different sections of the admin panel</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Card
                  key={index}
                  className="bg-white border-0 shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <CardContent className="p-6">
                    <Link href={action.href} className="block">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg ${action.color}`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        {action.badge && action.badge > 0 && (
                          <Badge className="bg-red-500 text-white">{action.badge}</Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                      <p className="text-gray-600 text-sm">{action.description}</p>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                <Button variant="outline" size="sm" asChild className="bg-white border-gray-300">
                  <Link href="/admin/activity">
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-shrink-0 p-2 bg-white rounded-lg border">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          {getPriorityBadge(activity.priority)}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          {activity.clientName && (
                            <>
                              <span>Client: {activity.clientName}</span>
                              <span className="mx-2">•</span>
                            </>
                          )}
                          {activity.teamMember && (
                            <>
                              <span>Team: {activity.teamMember}</span>
                              <span className="mx-2">•</span>
                            </>
                          )}
                          <span>{new Date(activity.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Overview */}
          <div className="space-y-6">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">System Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Applications Processed</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{stats.approved + stats.rejected}</span>
                    <Badge className="bg-blue-100 text-blue-800">
                      {Math.round(((stats.approved + stats.rejected) / stats.totalApplications) * 100)}%
                    </Badge>
                  </div>
                </div>
                <Progress value={((stats.approved + stats.rejected) / stats.totalApplications) * 100} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Team Capacity</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{stats.teamMembers}</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>
                <Progress value={75} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Broker Fee Revenue</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">${(stats.totalBrokerFees / 1000).toFixed(0)}K</span>
                    <Badge className="bg-green-100 text-green-800">+15%</Badge>
                  </div>
                </div>
                <Progress value={85} className="h-2" />
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stats.activeTeams}</div>
                    <div className="text-xs text-blue-600">Active Teams</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{stats.averageProcessingTime}d</div>
                    <div className="text-xs text-green-600">Avg Processing</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{stats.unreadMessages}</div>
                    <div className="text-xs text-purple-600">Unread Messages</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">24/7</div>
                    <div className="text-xs text-orange-600">System Uptime</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Database</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">API Services</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Email Service</span>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Slow</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">File Storage</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Optimal</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
