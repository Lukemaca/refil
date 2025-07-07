"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Users,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Download,
  RefreshCw,
  Calendar,
  User,
  ArrowLeft,
  Eye,
  Bell,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Activity {
  id: string
  type: "application" | "approval" | "message" | "document" | "team" | "system" | "payment" | "notification"
  title: string
  description: string
  timestamp: string
  priority: "high" | "medium" | "low"
  clientName?: string
  teamMember?: string
  applicationId?: string
  userId?: string
  details?: string
  status?: "completed" | "pending" | "failed"
}

export default function AdminActivityPage() {
  const { toast } = useToast()
  const [activities, setActivities] = useState<Activity[]>([])
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock activity data
      const mockActivities: Activity[] = [
        {
          id: "act1",
          type: "application",
          title: "New Application Submitted",
          description: "Sarah Johnson submitted a refinance application for $450,000",
          timestamp: "2024-01-16 14:30:00",
          priority: "high",
          clientName: "Sarah Johnson",
          applicationId: "APP-2024-001",
          status: "completed",
          details: "Complete application with all required documents submitted",
        },
        {
          id: "act2",
          type: "approval",
          title: "Application Approved",
          description: "Michael Chen's purchase application has been approved by Commonwealth Bank",
          timestamp: "2024-01-16 13:15:00",
          priority: "medium",
          clientName: "Michael Chen",
          applicationId: "APP-2024-002",
          status: "completed",
          details: "Final approval received with 5.49% interest rate",
        },
        {
          id: "act3",
          type: "team",
          title: "Team Member Added",
          description: "Emma Wilson joined the Documentation Team",
          timestamp: "2024-01-16 12:45:00",
          priority: "low",
          teamMember: "Emma Wilson",
          userId: "user123",
          status: "completed",
          details: "New team member onboarded with full access permissions",
        },
        {
          id: "act4",
          type: "message",
          title: "Urgent Client Message",
          description: "Lisa Thompson requires immediate assistance with document verification",
          timestamp: "2024-01-16 11:20:00",
          priority: "high",
          clientName: "Lisa Thompson",
          applicationId: "APP-2024-003",
          status: "pending",
          details: "Client requesting clarification on income verification requirements",
        },
        {
          id: "act5",
          type: "document",
          title: "Documents Verified",
          description: "David Rodriguez's bank statements and payslips have been verified",
          timestamp: "2024-01-16 10:30:00",
          priority: "medium",
          clientName: "David Rodriguez",
          applicationId: "APP-2024-004",
          status: "completed",
          details: "All required documents verified and approved for processing",
        },
        {
          id: "act6",
          type: "system",
          title: "System Maintenance",
          description: "Scheduled maintenance completed on loan processing system",
          timestamp: "2024-01-16 09:00:00",
          priority: "low",
          status: "completed",
          details: "System updated with latest security patches and performance improvements",
        },
        {
          id: "act7",
          type: "payment",
          title: "Broker Fee Processed",
          description: "Broker fee payment of $3,200 processed for Jennifer Lee's loan",
          timestamp: "2024-01-16 08:45:00",
          priority: "medium",
          clientName: "Jennifer Lee",
          applicationId: "APP-2024-005",
          status: "completed",
          details: "Payment processed successfully to broker account",
        },
        {
          id: "act8",
          type: "notification",
          title: "Compliance Alert",
          description: "New regulatory requirements effective from next month",
          timestamp: "2024-01-16 08:00:00",
          priority: "high",
          status: "pending",
          details: "Review and implement new APRA guidelines for loan assessments",
        },
        {
          id: "act9",
          type: "application",
          title: "Application Rejected",
          description: "Robert Martin's application was rejected due to insufficient income",
          timestamp: "2024-01-15 16:30:00",
          priority: "medium",
          clientName: "Robert Martin",
          applicationId: "APP-2024-006",
          status: "completed",
          details: "Income does not meet lender requirements for requested loan amount",
        },
        {
          id: "act10",
          type: "team",
          title: "Team Assignment",
          description: "5 new applications assigned to Senior Underwriting Team",
          timestamp: "2024-01-15 15:20:00",
          priority: "medium",
          teamMember: "Senior Underwriting Team",
          status: "completed",
          details: "Applications distributed based on team capacity and specialization",
        },
        {
          id: "act11",
          type: "message",
          title: "Client Follow-up",
          description: "Follow-up call scheduled with Maria Garcia regarding loan conditions",
          timestamp: "2024-01-15 14:10:00",
          priority: "low",
          clientName: "Maria Garcia",
          applicationId: "APP-2024-007",
          status: "pending",
          details: "Client requested explanation of loan terms and conditions",
        },
        {
          id: "act12",
          type: "document",
          title: "Document Upload",
          description: "James Wilson uploaded additional income verification documents",
          timestamp: "2024-01-15 13:00:00",
          priority: "medium",
          clientName: "James Wilson",
          applicationId: "APP-2024-008",
          status: "completed",
          details: "Updated payslips and tax returns received for assessment",
        },
      ]

      setActivities(mockActivities)
      setFilteredActivities(mockActivities)
      setLoading(false)
    }

    fetchActivities()
  }, [])

  useEffect(() => {
    // Apply filters
    let result = [...activities]

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (activity) =>
          activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.teamMember?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.applicationId?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Type filter
    if (typeFilter !== "all") {
      result = result.filter((activity) => activity.type === typeFilter)
    }

    // Priority filter
    if (priorityFilter !== "all") {
      result = result.filter((activity) => activity.priority === priorityFilter)
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date()
      const activityDate = new Date()

      if (dateFilter === "today") {
        activityDate.setHours(0, 0, 0, 0)
        result = result.filter((activity) => new Date(activity.timestamp) >= activityDate)
      } else if (dateFilter === "week") {
        activityDate.setDate(now.getDate() - 7)
        result = result.filter((activity) => new Date(activity.timestamp) >= activityDate)
      } else if (dateFilter === "month") {
        activityDate.setMonth(now.getMonth() - 1)
        result = result.filter((activity) => new Date(activity.timestamp) >= activityDate)
      }
    }

    // Tab filter
    if (activeTab === "applications") {
      result = result.filter((activity) => ["application", "approval", "document"].includes(activity.type))
    } else if (activeTab === "team") {
      result = result.filter((activity) => activity.type === "team")
    } else if (activeTab === "messages") {
      result = result.filter((activity) => activity.type === "message")
    } else if (activeTab === "system") {
      result = result.filter((activity) => ["system", "notification", "payment"].includes(activity.type))
    }

    // Sort by timestamp (newest first)
    result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    setFilteredActivities(result)
  }, [activities, searchTerm, typeFilter, priorityFilter, dateFilter, activeTab])

  const handleRefresh = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    toast({
      title: "Activity Refreshed",
      description: "Activity feed has been updated successfully",
    })
  }

  const handleExport = () => {
    // Create CSV data
    const csvData = filteredActivities.map((activity) => ({
      ID: activity.id,
      Type: activity.type,
      Title: activity.title,
      Description: activity.description,
      Priority: activity.priority,
      Client: activity.clientName || "",
      "Team Member": activity.teamMember || "",
      "Application ID": activity.applicationId || "",
      Status: activity.status || "",
      Timestamp: activity.timestamp,
    }))

    // Convert to CSV string
    const headers = Object.keys(csvData[0]).join(",")
    const rows = csvData.map((row) => Object.values(row).join(","))
    const csvContent = [headers, ...rows].join("\n")

    // Download file
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `activity-log-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)

    toast({
      title: "Export Complete",
      description: "Activity log has been exported to CSV",
    })
  }

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
      case "system":
        return <TrendingUp className="h-4 w-4 text-gray-600" />
      case "payment":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "notification":
        return <Bell className="h-4 w-4 text-red-600" />
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

  const getStatusBadge = (status?: string) => {
    if (!status) return null

    const colors = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-amber-100 text-amber-800",
      failed: "bg-red-100 text-red-800",
    }
    return (
      <Badge className={`${colors[status as keyof typeof colors]} text-xs`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      application: "bg-blue-100 text-blue-800",
      approval: "bg-green-100 text-green-800",
      message: "bg-purple-100 text-purple-800",
      document: "bg-orange-100 text-orange-800",
      team: "bg-teal-100 text-teal-800",
      system: "bg-gray-100 text-gray-800",
      payment: "bg-emerald-100 text-emerald-800",
      notification: "bg-red-100 text-red-800",
    }
    return (
      <Badge className={`${colors[type as keyof typeof colors]} text-xs`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    )
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes} minutes ago`
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else {
      return date.toLocaleDateString() + " " + date.toLocaleTimeString()
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <h1 className="text-2xl font-semibold text-gray-700">Loading Activity...</h1>
          <p className="text-gray-500">Fetching the latest activity data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild className="bg-white border-gray-300">
                <Link href="/admin/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Activity Log</h1>
                <p className="text-gray-600 mt-1">Monitor all system activities and user actions</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleRefresh} className="bg-white border-gray-300 hover:bg-gray-50">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" onClick={handleExport} className="bg-white border-gray-300 hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Type: {typeFilter === "all" ? "All" : typeFilter}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="application">Applications</SelectItem>
                <SelectItem value="approval">Approvals</SelectItem>
                <SelectItem value="message">Messages</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="payment">Payments</SelectItem>
                <SelectItem value="notification">Notifications</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  <span>Priority: {priorityFilter === "all" ? "All" : priorityFilter}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Date: {dateFilter === "all" ? "All" : dateFilter}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Activity Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({activities.length})</TabsTrigger>
            <TabsTrigger value="applications">
              Applications ({activities.filter((a) => ["application", "approval", "document"].includes(a.type)).length})
            </TabsTrigger>
            <TabsTrigger value="team">Team ({activities.filter((a) => a.type === "team").length})</TabsTrigger>
            <TabsTrigger value="messages">
              Messages ({activities.filter((a) => a.type === "message").length})
            </TabsTrigger>
            <TabsTrigger value="system">
              System ({activities.filter((a) => ["system", "notification", "payment"].includes(a.type)).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Activity Feed</span>
                  <Badge className="bg-blue-100 text-blue-800">{filteredActivities.length} activities</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredActivities.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
                    <p className="text-gray-500">Try adjusting your filters to see more activities</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-shrink-0 p-2 bg-white rounded-lg border">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                              {getTypeBadge(activity.type)}
                              {getPriorityBadge(activity.priority)}
                              {getStatusBadge(activity.status)}
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {formatTimestamp(activity.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                          {activity.details && <p className="text-xs text-gray-500 mb-2 italic">{activity.details}</p>}
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            {activity.clientName && (
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>Client: {activity.clientName}</span>
                              </div>
                            )}
                            {activity.teamMember && (
                              <div className="flex items-center space-x-1">
                                <Users className="h-3 w-3" />
                                <span>Team: {activity.teamMember}</span>
                              </div>
                            )}
                            {activity.applicationId && (
                              <div className="flex items-center space-x-1">
                                <FileText className="h-3 w-3" />
                                <span>App: {activity.applicationId}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        {activity.applicationId && (
                          <div className="flex-shrink-0">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/admin/applications/${activity.applicationId}`}>
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
