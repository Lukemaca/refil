"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Bell,
  Plus,
  Mail,
  TrendingUp,
  Users,
  RefreshCw,
  Download,
  MoreHorizontal,
  DollarSign,
  Home,
  User,
  Phone,
  Building,
  X,
  ChevronDown,
  SortAsc,
  SortDesc,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Application {
  id: string
  clientName: string
  email: string
  phone: string
  loanAmount: number
  propertyValue: number
  loanType: "refinance" | "purchase" | "investment"
  status: "pending_review" | "documents_required" | "ready_for_approval" | "approved" | "rejected" | "on_hold"
  priority: "high" | "medium" | "low"
  assignedTo: string | null
  assignedTeam: string | null
  applicationDate: string
  lastActivity: string
  documentsComplete: boolean
  creditScore: number
  riskLevel: "low" | "medium" | "high"
  completionPercentage: number
  unreadMessages: number
  pendingDocuments: number
  lastCommunication: string
  communicationStatus: "active" | "waiting_response" | "no_contact"
  brokerFeeEstimate: number
  lender: string
  interestRate: number
}

interface TeamMember {
  id: string
  name: string
  role: string
  team: string
  avatar?: string
}

interface NotificationItem {
  id: string
  type: "message" | "document" | "approval" | "system"
  title: string
  description: string
  applicationId: string
  clientName: string
  timestamp: string
  read: boolean
  priority: "high" | "medium" | "low"
}

export default function AdminApplicationsPage() {
  const { toast } = useToast()
  const [applications, setApplications] = useState<Application[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [teamFilter, setTeamFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [loanTypeFilter, setLoanTypeFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("applications")
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])
  const [sortField, setSortField] = useState<string>("applicationDate")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock applications data with enhanced information
      const mockApplications: Application[] = [
        {
          id: "app-001",
          clientName: "Sarah Johnson",
          email: "sarah.johnson@email.com",
          phone: "+61 412 345 678",
          loanAmount: 450000,
          propertyValue: 600000,
          loanType: "refinance",
          status: "documents_required",
          priority: "high",
          assignedTo: "John Smith",
          assignedTeam: "Underwriting Team",
          applicationDate: "2024-01-15",
          lastActivity: "2024-01-16",
          documentsComplete: false,
          creditScore: 785,
          riskLevel: "low",
          completionPercentage: 65,
          unreadMessages: 3,
          pendingDocuments: 2,
          lastCommunication: "2024-01-16 14:30",
          communicationStatus: "waiting_response",
          brokerFeeEstimate: 4500,
          lender: "Commonwealth Bank",
          interestRate: 5.49,
        },
        {
          id: "app-002",
          clientName: "Michael Chen",
          email: "michael.chen@email.com",
          phone: "+61 423 456 789",
          loanAmount: 750000,
          propertyValue: 950000,
          loanType: "purchase",
          status: "ready_for_approval",
          priority: "high",
          assignedTo: "Emma Wilson",
          assignedTeam: "Senior Underwriting",
          applicationDate: "2024-01-14",
          lastActivity: "2024-01-16",
          documentsComplete: true,
          creditScore: 820,
          riskLevel: "low",
          completionPercentage: 95,
          unreadMessages: 1,
          pendingDocuments: 0,
          lastCommunication: "2024-01-16 16:45",
          communicationStatus: "active",
          brokerFeeEstimate: 7500,
          lender: "Westpac",
          interestRate: 5.29,
        },
        {
          id: "app-003",
          clientName: "Lisa Thompson",
          email: "lisa.thompson@email.com",
          phone: "+61 434 567 890",
          loanAmount: 320000,
          propertyValue: 420000,
          loanType: "refinance",
          status: "pending_review",
          priority: "medium",
          assignedTo: null,
          assignedTeam: null,
          applicationDate: "2024-01-16",
          lastActivity: "2024-01-16",
          documentsComplete: false,
          creditScore: 720,
          riskLevel: "medium",
          completionPercentage: 25,
          unreadMessages: 0,
          pendingDocuments: 5,
          lastCommunication: "2024-01-16 09:15",
          communicationStatus: "no_contact",
          brokerFeeEstimate: 3200,
          lender: "ANZ",
          interestRate: 5.69,
        },
        {
          id: "app-004",
          clientName: "David Rodriguez",
          email: "david.rodriguez@email.com",
          phone: "+61 445 678 901",
          loanAmount: 580000,
          propertyValue: 720000,
          loanType: "investment",
          status: "on_hold",
          priority: "low",
          assignedTo: "Sarah Davis",
          assignedTeam: "Documentation Team",
          applicationDate: "2024-01-13",
          lastActivity: "2024-01-15",
          documentsComplete: false,
          creditScore: 680,
          riskLevel: "high",
          completionPercentage: 40,
          unreadMessages: 2,
          pendingDocuments: 3,
          lastCommunication: "2024-01-15 11:20",
          communicationStatus: "waiting_response",
          brokerFeeEstimate: 5800,
          lender: "NAB",
          interestRate: 5.89,
        },
        {
          id: "app-005",
          clientName: "Jennifer Lee",
          email: "jennifer.lee@email.com",
          phone: "+61 456 789 012",
          loanAmount: 680000,
          propertyValue: 850000,
          loanType: "purchase",
          status: "approved",
          priority: "medium",
          assignedTo: "Mark Johnson",
          assignedTeam: "Senior Underwriting",
          applicationDate: "2024-01-12",
          lastActivity: "2024-01-16",
          documentsComplete: true,
          creditScore: 795,
          riskLevel: "low",
          completionPercentage: 100,
          unreadMessages: 0,
          pendingDocuments: 0,
          lastCommunication: "2024-01-16 13:10",
          communicationStatus: "active",
          brokerFeeEstimate: 6800,
          lender: "Macquarie Bank",
          interestRate: 5.19,
        },
      ]

      // Mock team members
      const mockTeamMembers: TeamMember[] = [
        { id: "tm1", name: "John Smith", role: "Senior Underwriter", team: "Underwriting Team" },
        { id: "tm2", name: "Emma Wilson", role: "Lead Underwriter", team: "Senior Underwriting" },
        { id: "tm3", name: "Sarah Davis", role: "Documentation Specialist", team: "Documentation Team" },
        { id: "tm4", name: "Mark Johnson", role: "Senior Underwriter", team: "Senior Underwriting" },
        { id: "tm5", name: "Lisa Brown", role: "Customer Service Lead", team: "Customer Service" },
      ]

      // Mock notifications
      const mockNotifications: NotificationItem[] = [
        {
          id: "notif-001",
          type: "message",
          title: "New message from Sarah Johnson",
          description: "Client has questions about document requirements",
          applicationId: "app-001",
          clientName: "Sarah Johnson",
          timestamp: "2024-01-16 14:30",
          read: false,
          priority: "high",
        },
        {
          id: "notif-002",
          type: "document",
          title: "Documents uploaded by Michael Chen",
          description: "Bank statements and payslips uploaded for review",
          applicationId: "app-002",
          clientName: "Michael Chen",
          timestamp: "2024-01-16 16:45",
          read: false,
          priority: "medium",
        },
        {
          id: "notif-003",
          type: "approval",
          title: "Application ready for approval",
          description: "Michael Chen's application is ready for final approval",
          applicationId: "app-002",
          clientName: "Michael Chen",
          timestamp: "2024-01-16 15:20",
          read: true,
          priority: "high",
        },
        {
          id: "notif-004",
          type: "system",
          title: "Document request sent",
          description: "Additional documents requested from David Rodriguez",
          applicationId: "app-004",
          clientName: "David Rodriguez",
          timestamp: "2024-01-16 11:15",
          read: true,
          priority: "medium",
        },
      ]

      setApplications(mockApplications)
      setTeamMembers(mockTeamMembers)
      setNotifications(mockNotifications)
      setLoading(false)
    }

    fetchData()
  }, [])

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.lender.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    const matchesTeam = teamFilter === "all" || app.assignedTeam === teamFilter
    const matchesPriority = priorityFilter === "all" || app.priority === priorityFilter
    const matchesLoanType = loanTypeFilter === "all" || app.loanType === loanTypeFilter

    return matchesSearch && matchesStatus && matchesTeam && matchesPriority && matchesLoanType
  })

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    let aValue: any = a[sortField as keyof Application]
    let bValue: any = b[sortField as keyof Application]

    if (sortField === "applicationDate" || sortField === "lastActivity") {
      aValue = new Date(aValue).getTime()
      bValue = new Date(bValue).getTime()
    }

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const unreadNotifications = notifications.filter((n) => !n.read).length
  const totalUnreadMessages = applications.reduce((sum, app) => sum + app.unreadMessages, 0)
  const pendingDocumentRequests = applications.reduce((sum, app) => sum + app.pendingDocuments, 0)
  const highPriorityApps = applications.filter((app) => app.priority === "high").length

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending_review: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Clock, text: "Pending Review" },
      documents_required: {
        color: "bg-amber-100 text-amber-800 border-amber-200",
        icon: FileText,
        text: "Documents Required",
      },
      ready_for_approval: {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle,
        text: "Ready for Approval",
      },
      approved: { color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: CheckCircle, text: "Approved" },
      rejected: { color: "bg-red-100 text-red-800 border-red-200", icon: AlertTriangle, text: "Rejected" },
      on_hold: { color: "bg-gray-100 text-gray-800 border-gray-200", icon: AlertTriangle, text: "On Hold" },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon

    return (
      <Badge className={`${config.color} border font-medium`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.text}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-amber-100 text-amber-800 border-amber-200",
      low: "bg-blue-100 text-blue-800 border-blue-200",
    }

    return (
      <Badge className={`${priorityConfig[priority as keyof typeof priorityConfig]} border text-xs font-medium`}>
        {priority.toUpperCase()}
      </Badge>
    )
  }

  const getCommunicationStatusBadge = (status: string) => {
    const statusConfig = {
      active: "bg-green-100 text-green-800 border-green-200",
      waiting_response: "bg-amber-100 text-amber-800 border-amber-200",
      no_contact: "bg-gray-100 text-gray-800 border-gray-200",
    }

    return (
      <Badge className={`${statusConfig[status as keyof typeof statusConfig]} border text-xs`}>
        {status.replace("_", " ")}
      </Badge>
    )
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleBulkAssign = async (teamMemberId: string) => {
    if (selectedApplications.length === 0) return

    await new Promise((resolve) => setTimeout(resolve, 500))

    const teamMember = teamMembers.find((tm) => tm.id === teamMemberId)
    if (!teamMember) return

    setApplications((prev) =>
      prev.map((app) =>
        selectedApplications.includes(app.id)
          ? { ...app, assignedTo: teamMember.name, assignedTeam: teamMember.team }
          : app,
      ),
    )

    setSelectedApplications([])
    toast({
      title: "Applications Assigned",
      description: `${selectedApplications.length} applications assigned to ${teamMember.name}`,
    })
  }

  const handleSendBulkMessage = async () => {
    if (selectedApplications.length === 0) return

    await new Promise((resolve) => setTimeout(resolve, 500))

    toast({
      title: "Messages Sent",
      description: `Bulk message sent to ${selectedApplications.length} clients`,
    })

    setSelectedApplications([])
  }

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setTeamFilter("all")
    setPriorityFilter("all")
    setLoanTypeFilter("all")
  }

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
  }

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <h1 className="text-2xl font-semibold text-gray-700">Loading Applications...</h1>
          <p className="text-gray-500">Please wait while we fetch the latest data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Application Management</h1>
              <p className="text-gray-600 mt-1">Manage client applications, communications, and team assignments</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="bg-white border-gray-300 hover:bg-gray-50">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" className="bg-white border-gray-300 hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Application
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Applications</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{applications.length}</div>
              <p className="text-xs text-green-600 font-medium">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">High Priority</CardTitle>
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{highPriorityApps}</div>
              <p className="text-xs text-red-600 font-medium">Requires immediate attention</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Unread Messages</CardTitle>
              <div className="p-2 bg-amber-100 rounded-lg">
                <MessageSquare className="h-4 w-4 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalUnreadMessages}</div>
              <p className="text-xs text-amber-600 font-medium">Awaiting response</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Documents</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{pendingDocumentRequests}</div>
              <p className="text-xs text-purple-600 font-medium">Client action required</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="applications" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-1">
            <TabsList className="grid w-full grid-cols-3 bg-gray-50">
              <TabsTrigger value="applications" className="relative data-[state=active]:bg-white">
                Applications
                {totalUnreadMessages > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs items-center justify-center">
                      {totalUnreadMessages}
                    </span>
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="notifications" className="relative data-[state=active]:bg-white">
                Notifications
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-blue-500 text-white text-xs items-center justify-center">
                      {unreadNotifications}
                    </span>
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-white">
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            {/* Enhanced Filters */}
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Search & Filters</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-white border-gray-300"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {showFilters ? "Hide Filters" : "Show Filters"}
                    <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name, email, ID, or lender..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-gray-300"
                  />
                </div>

                {showFilters && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="bg-white border-gray-300">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending_review">Pending Review</SelectItem>
                        <SelectItem value="documents_required">Documents Required</SelectItem>
                        <SelectItem value="ready_for_approval">Ready for Approval</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="on_hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={loanTypeFilter} onValueChange={setLoanTypeFilter}>
                      <SelectTrigger className="bg-white border-gray-300">
                        <SelectValue placeholder="All Loan Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Loan Types</SelectItem>
                        <SelectItem value="refinance">Refinance</SelectItem>
                        <SelectItem value="purchase">Purchase</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                      <SelectTrigger className="bg-white border-gray-300">
                        <SelectValue placeholder="All Priorities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="high">High Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="low">Low Priority</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={teamFilter} onValueChange={setTeamFilter}>
                      <SelectTrigger className="bg-white border-gray-300">
                        <SelectValue placeholder="All Teams" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Teams</SelectItem>
                        <SelectItem value="Underwriting Team">Underwriting Team</SelectItem>
                        <SelectItem value="Senior Underwriting">Senior Underwriting</SelectItem>
                        <SelectItem value="Documentation Team">Documentation Team</SelectItem>
                        <SelectItem value="Customer Service">Customer Service</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" onClick={clearFilters} className="bg-white border-gray-300">
                      <X className="h-4 w-4 mr-2" />
                      Clear All
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Bulk Actions */}
            {selectedApplications.length > 0 && (
              <Alert className="bg-blue-50 border-blue-200">
                <Users className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800 font-semibold">
                  {selectedApplications.length} application(s) selected
                </AlertTitle>
                <AlertDescription className="text-blue-700">
                  <div className="flex flex-wrap gap-3 mt-3">
                    <Select onValueChange={handleBulkAssign}>
                      <SelectTrigger className="w-48 bg-white border-blue-300">
                        <SelectValue placeholder="Assign to team member" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamMembers.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name} - {member.team}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={handleSendBulkMessage} variant="outline" className="bg-white border-blue-300">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button
                      onClick={() => setSelectedApplications([])}
                      variant="outline"
                      className="bg-white border-blue-300"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear Selection
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Applications Table */}
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Applications ({sortedApplications.length})</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewMode(viewMode === "table" ? "cards" : "table")}
                      className="bg-white border-gray-300"
                    >
                      {viewMode === "table" ? "Card View" : "Table View"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {viewMode === "table" ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="w-12">
                            <Checkbox
                              checked={
                                selectedApplications.length === sortedApplications.length &&
                                sortedApplications.length > 0
                              }
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedApplications(sortedApplications.map((app) => app.id))
                                } else {
                                  setSelectedApplications([])
                                }
                              }}
                            />
                          </TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => handleSort("clientName")}
                              className="h-auto p-0 font-semibold hover:bg-transparent"
                            >
                              Client
                              {sortField === "clientName" &&
                                (sortDirection === "asc" ? (
                                  <SortAsc className="ml-1 h-3 w-3" />
                                ) : (
                                  <SortDesc className="ml-1 h-3 w-3" />
                                ))}
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => handleSort("loanAmount")}
                              className="h-auto p-0 font-semibold hover:bg-transparent"
                            >
                              Loan Details
                              {sortField === "loanAmount" &&
                                (sortDirection === "asc" ? (
                                  <SortAsc className="ml-1 h-3 w-3" />
                                ) : (
                                  <SortDesc className="ml-1 h-3 w-3" />
                                ))}
                            </Button>
                          </TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Communication</TableHead>
                          <TableHead>Assignment</TableHead>
                          <TableHead>Progress</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedApplications.map((app) => (
                          <TableRow key={app.id} className="hover:bg-gray-50">
                            <TableCell>
                              <Checkbox
                                checked={selectedApplications.includes(app.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedApplications([...selectedApplications, app.id])
                                  } else {
                                    setSelectedApplications(selectedApplications.filter((id) => id !== app.id))
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <p className="font-medium text-gray-900">{app.clientName}</p>
                                  {getPriorityBadge(app.priority)}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Mail className="h-3 w-3 mr-1" />
                                  {app.email}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Phone className="h-3 w-3 mr-1" />
                                  {app.phone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center text-sm font-medium">
                                  <DollarSign className="h-3 w-3 mr-1 text-green-600" />$
                                  {app.loanAmount.toLocaleString()}
                                </div>
                                <div className="flex items-center text-xs text-gray-500">
                                  <Home className="h-3 w-3 mr-1" />
                                  Property: ${app.propertyValue.toLocaleString()}
                                </div>
                                <div className="flex items-center text-xs text-gray-500">
                                  <Building className="h-3 w-3 mr-1" />
                                  {app.lender} • {app.interestRate}%
                                </div>
                                <Badge className="bg-gray-100 text-gray-800 text-xs">{app.loanType}</Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-2">
                                {getStatusBadge(app.status)}
                                <div className="text-xs text-gray-500">
                                  Applied: {new Date(app.applicationDate).toLocaleDateString()}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-2">
                                {getCommunicationStatusBadge(app.communicationStatus)}
                                {app.unreadMessages > 0 && (
                                  <div className="flex items-center text-amber-600">
                                    <MessageSquare className="h-3 w-3 mr-1" />
                                    <span className="text-xs font-medium">{app.unreadMessages} unread</span>
                                  </div>
                                )}
                                {app.pendingDocuments > 0 && (
                                  <div className="flex items-center text-red-600">
                                    <FileText className="h-3 w-3 mr-1" />
                                    <span className="text-xs font-medium">{app.pendingDocuments} pending</span>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                {app.assignedTo ? (
                                  <div className="space-y-1">
                                    <div className="flex items-center text-sm font-medium">
                                      <User className="h-3 w-3 mr-1 text-blue-600" />
                                      {app.assignedTo}
                                    </div>
                                    <div className="text-xs text-gray-500">{app.assignedTeam}</div>
                                  </div>
                                ) : (
                                  <Badge className="bg-gray-100 text-gray-800 border border-gray-300">Unassigned</Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="font-medium">{app.completionPercentage}%</span>
                                  <span className="text-gray-500">Complete</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                      app.completionPercentage >= 80
                                        ? "bg-green-500"
                                        : app.completionPercentage >= 50
                                          ? "bg-blue-500"
                                          : "bg-amber-500"
                                    }`}
                                    style={{ width: `${app.completionPercentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-1">
                                <Button variant="outline" size="sm" asChild className="bg-white border-gray-300">
                                  <Link href={`/admin/applications/${app.id}`}>
                                    <Eye className="h-4 w-4" />
                                  </Link>
                                </Button>
                                <Button variant="outline" size="sm" className="bg-white border-gray-300">
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="bg-white border-gray-300">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                    {sortedApplications.map((app) => (
                      <Card key={app.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={selectedApplications.includes(app.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedApplications([...selectedApplications, app.id])
                                  } else {
                                    setSelectedApplications(selectedApplications.filter((id) => id !== app.id))
                                  }
                                }}
                              />
                              <h3 className="font-semibold text-gray-900">{app.clientName}</h3>
                            </div>
                            {getPriorityBadge(app.priority)}
                          </div>
                          <div className="text-sm text-gray-500">ID: {app.id}</div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Loan Amount:</span>
                            <span className="font-semibold">${app.loanAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Lender:</span>
                            <span className="text-sm">{app.lender}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Status:</span>
                            {getStatusBadge(app.status)}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Progress:</span>
                            <span className="text-sm font-medium">{app.completionPercentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                app.completionPercentage >= 80
                                  ? "bg-green-500"
                                  : app.completionPercentage >= 50
                                    ? "bg-blue-500"
                                    : "bg-amber-500"
                              }`}
                              style={{ width: `${app.completionPercentage}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between pt-2">
                            <Button variant="outline" size="sm" asChild className="bg-white">
                              <Link href={`/admin/applications/${app.id}`}>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" className="bg-white">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">Notifications ({notifications.length})</CardTitle>
                <Button onClick={markAllNotificationsAsRead} variant="outline" className="bg-white border-gray-300">
                  Mark All as Read
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                          !notification.read ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
                        }`}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 p-2 rounded-lg bg-white">
                              {notification.type === "message" && <MessageSquare className="h-4 w-4 text-blue-600" />}
                              {notification.type === "document" && <FileText className="h-4 w-4 text-green-600" />}
                              {notification.type === "approval" && <CheckCircle className="h-4 w-4 text-purple-600" />}
                              {notification.type === "system" && <Bell className="h-4 w-4 text-gray-600" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-medium text-gray-900">{notification.title}</h3>
                                {!notification.read && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                                {getPriorityBadge(notification.priority)}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{notification.description}</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span>Client: {notification.clientName}</span>
                                <span>App ID: {notification.applicationId}</span>
                                <span>{new Date(notification.timestamp).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild className="bg-white border-gray-300">
                            <Link href={`/admin/applications/${notification.applicationId}`}>View</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg font-semibold">
                    <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                    Application Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">This Week</span>
                      <span className="font-bold text-lg">23 applications</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Last Week</span>
                      <span className="font-bold text-lg">18 applications</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Growth</span>
                      <span className="font-bold text-lg text-green-600">+27.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg font-semibold">
                    <Users className="mr-2 h-5 w-5 text-blue-600" />
                    Team Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Underwriting Team</span>
                      <span className="font-bold text-lg">85% efficiency</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Documentation Team</span>
                      <span className="font-bold text-lg">92% efficiency</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Customer Service</span>
                      <span className="font-bold text-lg">88% efficiency</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Communication Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Average Response Time</span>
                      <span className="font-bold text-lg">2.3 hours</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Messages Sent Today</span>
                      <span className="font-bold text-lg">47 messages</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Document Requests</span>
                      <span className="font-bold text-lg">12 requests</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Pending Review</span>
                      <span className="font-bold text-lg">1 application</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Documents Required</span>
                      <span className="font-bold text-lg">1 application</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Ready for Approval</span>
                      <span className="font-bold text-lg">1 application</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Approved</span>
                      <span className="font-bold text-lg">1 application</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
