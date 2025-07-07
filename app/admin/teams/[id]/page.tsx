"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  Users,
  User,
  BarChart3,
  Clock,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  UserPlus,
  Edit,
  Eye,
  Crown,
  Shield,
  Target,
  Award,
  Activity,
  MessageSquare,
  FileText,
  DollarSign,
  Phone,
  Mail,
  MapPin,
  Trash2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ClientAssignment {
  id: string
  clientName: string
  clientEmail: string
  clientPhone: string
  applicationId: string
  loanAmount: number
  propertyAddress: string
  status: "application_review" | "document_collection" | "underwriting" | "approval" | "settlement" | "completed"
  priority: "low" | "medium" | "high" | "urgent"
  assignedDate: string
  lastActivity: string
  progress: number
  brokerFeeEstimate: number
  unreadMessages: number
  documentsRequired: number
  documentsReceived: number
  nextAction: string
  dueDate: string
}

interface TeamMember {
  id: string
  name: string
  email: string
  role: "team_lead" | "senior_admin" | "admin" | "junior_admin"
  status: "active" | "inactive" | "suspended"
  joinDate: string
  workload: number
  completedApplications: number
  averageProcessingTime: number
  performance: number
  specializations: string[]
  clientAssignments: ClientAssignment[]
}

interface AvailableMember {
  id: string
  name: string
  email: string
  role: "super_admin" | "team_lead" | "senior_admin" | "admin" | "junior_admin"
  status: "active" | "inactive" | "suspended"
  workload: number
  team: string
}

interface TeamDetails {
  id: string
  name: string
  description: string
  leadId: string
  leadName: string
  members: TeamMember[]
  totalApplications: number
  completedApplications: number
  averageProcessingTime: number
  performance: number
  specializations: string[]
  status: "active" | "inactive"
  createdDate: string
  totalClients: number
  activeClients: number
  totalBrokerFees: number
  metrics: {
    thisMonth: {
      applications: number
      completed: number
      avgTime: number
      performance: number
      brokerFees: number
    }
    lastMonth: {
      applications: number
      completed: number
      avgTime: number
      performance: number
      brokerFees: number
    }
  }
  workloadDistribution: {
    memberId: string
    memberName: string
    currentLoad: number
    capacity: number
    efficiency: number
    clientCount: number
  }[]
}

export default function TeamDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [team, setTeam] = useState<TeamDetails | null>(null)
  const [availableMembers, setAvailableMembers] = useState<AvailableMember[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedClient, setSelectedClient] = useState<ClientAssignment | null>(null)
  const [isEditTeamOpen, setIsEditTeamOpen] = useState(false)
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [editTeamData, setEditTeamData] = useState({
    name: "",
    description: "",
    specializations: [] as string[],
    leadId: "",
  })
  const [selectedMembersToAdd, setSelectedMembersToAdd] = useState<string[]>([])

  useEffect(() => {
    const fetchTeamDetails = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock client assignments
      const mockClientAssignments: ClientAssignment[] = [
        {
          id: "client1",
          clientName: "Sarah Johnson",
          clientEmail: "sarah.johnson@email.com",
          clientPhone: "+61 412 345 678",
          applicationId: "APP-2024-001",
          loanAmount: 650000,
          propertyAddress: "123 Collins Street, Melbourne VIC 3000",
          status: "underwriting",
          priority: "high",
          assignedDate: "2024-01-10",
          lastActivity: "2024-01-16T14:30:00Z",
          progress: 75,
          brokerFeeEstimate: 3250,
          unreadMessages: 2,
          documentsRequired: 8,
          documentsReceived: 6,
          nextAction: "Credit assessment review",
          dueDate: "2024-01-20",
        },
        {
          id: "client2",
          clientName: "Michael Chen",
          clientEmail: "michael.chen@email.com",
          clientPhone: "+61 423 456 789",
          applicationId: "APP-2024-002",
          loanAmount: 480000,
          propertyAddress: "456 George Street, Sydney NSW 2000",
          status: "document_collection",
          priority: "medium",
          assignedDate: "2024-01-12",
          lastActivity: "2024-01-16T10:15:00Z",
          progress: 45,
          brokerFeeEstimate: 2400,
          unreadMessages: 0,
          documentsRequired: 6,
          documentsReceived: 3,
          nextAction: "Awaiting payslips",
          dueDate: "2024-01-18",
        },
        {
          id: "client3",
          clientName: "Emma Wilson",
          clientEmail: "emma.wilson@email.com",
          clientPhone: "+61 434 567 890",
          applicationId: "APP-2024-003",
          loanAmount: 720000,
          propertyAddress: "789 Queen Street, Brisbane QLD 4000",
          status: "approval",
          priority: "urgent",
          assignedDate: "2024-01-08",
          lastActivity: "2024-01-16T16:45:00Z",
          progress: 90,
          brokerFeeEstimate: 3600,
          unreadMessages: 1,
          documentsRequired: 10,
          documentsReceived: 10,
          nextAction: "Final approval pending",
          dueDate: "2024-01-17",
        },
        {
          id: "client4",
          clientName: "David Brown",
          clientEmail: "david.brown@email.com",
          clientPhone: "+61 445 678 901",
          applicationId: "APP-2024-004",
          loanAmount: 550000,
          propertyAddress: "321 King Street, Perth WA 6000",
          status: "application_review",
          priority: "medium",
          assignedDate: "2024-01-14",
          lastActivity: "2024-01-16T09:20:00Z",
          progress: 25,
          brokerFeeEstimate: 2750,
          unreadMessages: 0,
          documentsRequired: 5,
          documentsReceived: 2,
          nextAction: "Initial assessment",
          dueDate: "2024-01-22",
        },
      ]

      // Mock available members (users not in any team)
      const mockAvailableMembers: AvailableMember[] = [
        {
          id: "admin7",
          name: "Robert Kim",
          email: "robert.kim@homeonline.com",
          role: "admin",
          status: "active",
          workload: 20,
          team: "",
        },
        {
          id: "admin8",
          name: "Sophie Taylor",
          email: "sophie.taylor@homeonline.com",
          role: "junior_admin",
          status: "active",
          workload: 12,
          team: "",
        },
        {
          id: "admin9",
          name: "Alex Johnson",
          email: "alex.johnson@homeonline.com",
          role: "admin",
          status: "active",
          workload: 18,
          team: "",
        },
        {
          id: "admin10",
          name: "Maria Garcia",
          email: "maria.garcia@homeonline.com",
          role: "senior_admin",
          status: "active",
          workload: 25,
          team: "",
        },
      ]

      // Mock team details data
      const mockTeamDetails: TeamDetails = {
        id: params.id as string,
        name: "Underwriting Team",
        description: "Loan assessment and approval specialists",
        leadId: "admin2",
        leadName: "Michael Chen",
        members: [
          {
            id: "admin2",
            name: "Michael Chen",
            email: "michael.chen@homeonline.com",
            role: "team_lead",
            status: "active",
            joinDate: "2023-03-20",
            workload: 22,
            completedApplications: 189,
            averageProcessingTime: 3.2,
            performance: 94.5,
            specializations: ["Credit Assessment", "Risk Analysis", "Team Management"],
            clientAssignments: [mockClientAssignments[0], mockClientAssignments[2]],
          },
          {
            id: "admin3",
            name: "Emma Wilson",
            email: "emma.wilson@homeonline.com",
            role: "senior_admin",
            status: "active",
            joinDate: "2023-05-10",
            workload: 28,
            completedApplications: 156,
            averageProcessingTime: 3.8,
            performance: 91.2,
            specializations: ["Credit Assessment", "Complex Applications", "Mentoring"],
            clientAssignments: [mockClientAssignments[1]],
          },
          {
            id: "admin11",
            name: "Robert Kim",
            email: "robert.kim@homeonline.com",
            role: "admin",
            status: "active",
            joinDate: "2023-09-15",
            workload: 25,
            completedApplications: 98,
            averageProcessingTime: 4.1,
            performance: 88.7,
            specializations: ["Standard Applications", "Document Review"],
            clientAssignments: [mockClientAssignments[3]],
          },
          {
            id: "admin12",
            name: "Sophie Taylor",
            email: "sophie.taylor@homeonline.com",
            role: "junior_admin",
            status: "active",
            joinDate: "2024-01-08",
            workload: 15,
            completedApplications: 23,
            averageProcessingTime: 5.2,
            performance: 85.3,
            specializations: ["Basic Applications", "Learning"],
            clientAssignments: [],
          },
        ],
        totalApplications: 890,
        completedApplications: 825,
        averageProcessingTime: 3.5,
        performance: 92.7,
        specializations: ["Credit Assessment", "Risk Analysis", "Loan Approval"],
        status: "active",
        createdDate: "2023-01-15",
        totalClients: 4,
        activeClients: 4,
        totalBrokerFees: 12000,
        metrics: {
          thisMonth: {
            applications: 145,
            completed: 138,
            avgTime: 3.2,
            performance: 95.2,
            brokerFees: 12000,
          },
          lastMonth: {
            applications: 132,
            completed: 125,
            avgTime: 3.8,
            performance: 94.7,
            brokerFees: 11500,
          },
        },
        workloadDistribution: [
          {
            memberId: "admin2",
            memberName: "Michael Chen",
            currentLoad: 22,
            capacity: 30,
            efficiency: 94.5,
            clientCount: 2,
          },
          {
            memberId: "admin3",
            memberName: "Emma Wilson",
            currentLoad: 28,
            capacity: 30,
            efficiency: 91.2,
            clientCount: 1,
          },
          {
            memberId: "admin11",
            memberName: "Robert Kim",
            currentLoad: 25,
            capacity: 30,
            efficiency: 88.7,
            clientCount: 1,
          },
          {
            memberId: "admin12",
            memberName: "Sophie Taylor",
            currentLoad: 15,
            capacity: 25,
            efficiency: 85.3,
            clientCount: 0,
          },
        ],
      }

      setTeam(mockTeamDetails)
      setAvailableMembers(mockAvailableMembers)
      setEditTeamData({
        name: mockTeamDetails.name,
        description: mockTeamDetails.description,
        specializations: mockTeamDetails.specializations,
        leadId: mockTeamDetails.leadId || "unassigned",
      })
      setLoading(false)
    }

    fetchTeamDetails()
  }, [params.id])

  const handleEditTeam = async () => {
    if (!team || !editTeamData.name.trim()) {
      toast({
        title: "Error",
        description: "Team name is required",
        variant: "destructive",
      })
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 500))

    const leadMember = team.members.find((m) => m.id === editTeamData.leadId)

    setTeam({
      ...team,
      name: editTeamData.name,
      description: editTeamData.description,
      specializations: editTeamData.specializations,
      leadId: editTeamData.leadId === "unassigned" ? "" : editTeamData.leadId,
      leadName: editTeamData.leadId === "unassigned" ? "Unassigned" : leadMember?.name || "Unassigned",
    })

    setIsEditTeamOpen(false)
    toast({
      title: "Team Updated",
      description: "Team details have been updated successfully",
    })
  }

  const handleAddMembers = async () => {
    if (!team || selectedMembersToAdd.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one member to add",
        variant: "destructive",
      })
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 500))

    // Convert available members to team members
    const newMembers = selectedMembersToAdd
      .map((memberId) => {
        const availableMember = availableMembers.find((m) => m.id === memberId)
        if (!availableMember) return null

        return {
          id: availableMember.id,
          name: availableMember.name,
          email: availableMember.email,
          role: availableMember.role as TeamMember["role"],
          status: availableMember.status as TeamMember["status"],
          joinDate: new Date().toISOString().split("T")[0],
          workload: availableMember.workload,
          completedApplications: 0,
          averageProcessingTime: 0,
          performance: 0,
          specializations: [],
          clientAssignments: [],
        }
      })
      .filter(Boolean) as TeamMember[]

    // Update team with new members
    const updatedTeam = {
      ...team,
      members: [...team.members, ...newMembers],
    }

    // Remove added members from available list
    const updatedAvailableMembers = availableMembers.filter((member) => !selectedMembersToAdd.includes(member.id))

    setTeam(updatedTeam)
    setAvailableMembers(updatedAvailableMembers)
    setSelectedMembersToAdd([])
    setIsAddMemberOpen(false)

    toast({
      title: "Members Added",
      description: `${newMembers.length} member(s) added to ${team.name}`,
    })
  }

  const handleRemoveMember = async (memberId: string) => {
    if (!team) return

    await new Promise((resolve) => setTimeout(resolve, 300))

    const memberToRemove = team.members.find((m) => m.id === memberId)
    if (!memberToRemove) return

    // Remove member from team
    const updatedMembers = team.members.filter((m) => m.id !== memberId)

    // Add member back to available list
    const availableMember: AvailableMember = {
      id: memberToRemove.id,
      name: memberToRemove.name,
      email: memberToRemove.email,
      role: memberToRemove.role as AvailableMember["role"],
      status: memberToRemove.status as AvailableMember["status"],
      workload: memberToRemove.workload,
      team: "",
    }

    setTeam({ ...team, members: updatedMembers })
    setAvailableMembers([...availableMembers, availableMember])

    toast({
      title: "Member Removed",
      description: `${memberToRemove.name} has been removed from the team`,
    })
  }

  const getRoleBadge = (role: TeamMember["role"] | AvailableMember["role"]) => {
    switch (role) {
      case "team_lead":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Crown className="h-3 w-3 mr-1" />
            Team Lead
          </Badge>
        )
      case "senior_admin":
        return (
          <Badge className="bg-green-100 text-green-800">
            <Shield className="h-3 w-3 mr-1" />
            Senior Admin
          </Badge>
        )
      case "admin":
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <User className="h-3 w-3 mr-1" />
            Admin
          </Badge>
        )
      case "junior_admin":
        return (
          <Badge className="bg-amber-100 text-amber-800">
            <User className="h-3 w-3 mr-1" />
            Junior Admin
          </Badge>
        )
      case "super_admin":
        return (
          <Badge className="bg-purple-100 text-purple-800">
            <Crown className="h-3 w-3 mr-1" />
            Super Admin
          </Badge>
        )
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <Clock className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        )
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
    }
  }

  const getApplicationStatusBadge = (status: string) => {
    switch (status) {
      case "application_review":
        return <Badge className="bg-blue-100 text-blue-800">Application Review</Badge>
      case "document_collection":
        return <Badge className="bg-amber-100 text-amber-800">Document Collection</Badge>
      case "underwriting":
        return <Badge className="bg-purple-100 text-purple-800">Underwriting</Badge>
      case "approval":
        return <Badge className="bg-green-100 text-green-800">Approval</Badge>
      case "settlement":
        return <Badge className="bg-teal-100 text-teal-800">Settlement</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>
    }
  }

  const getPerformanceIcon = (current: number, previous: number) => {
    if (current > previous) {
      return <TrendingUp className="h-4 w-4 text-green-600" />
    } else if (current < previous) {
      return <TrendingDown className="h-4 w-4 text-red-600" />
    }
    return <Activity className="h-4 w-4 text-gray-600" />
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Loading Team Details...</h1>
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  if (!team) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Team Not Found</h1>
        <div className="text-center">
          <Button asChild>
            <Link href="/admin/teams">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Teams
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button variant="outline" size="sm" asChild className="mr-4 bg-transparent">
            <Link href="/admin/teams">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Teams
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{team.name}</h1>
            <p className="text-gray-500">{team.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {getStatusBadge(team.status)}
          <Dialog open={isEditTeamOpen} onOpenChange={setIsEditTeamOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Team
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Team Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-team-name">Team Name</Label>
                  <Input
                    id="edit-team-name"
                    value={editTeamData.name}
                    onChange={(e) => setEditTeamData({ ...editTeamData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-team-description">Description</Label>
                  <Textarea
                    id="edit-team-description"
                    value={editTeamData.description}
                    onChange={(e) => setEditTeamData({ ...editTeamData, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-team-lead">Team Lead</Label>
                  <Select
                    value={editTeamData.leadId}
                    onValueChange={(value) => setEditTeamData({ ...editTeamData, leadId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select team lead" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">No Lead Assigned</SelectItem>
                      {team.members
                        .filter((member) => member.role === "team_lead" || member.role === "senior_admin")
                        .map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name} ({member.role.replace("_", " ")})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Specializations</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {editTeamData.specializations.map((spec, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {spec}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => {
                            const newSpecs = editTeamData.specializations.filter((_, i) => i !== index)
                            setEditTeamData({ ...editTeamData, specializations: newSpecs })
                          }}
                        >
                          ×
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <Input
                    placeholder="Add specialization and press Enter"
                    className="mt-2"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        const value = e.currentTarget.value.trim()
                        if (value && !editTeamData.specializations.includes(value)) {
                          setEditTeamData({
                            ...editTeamData,
                            specializations: [...editTeamData.specializations, value],
                          })
                          e.currentTarget.value = ""
                        }
                      }
                    }}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditTeamOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleEditTeam}>Save Changes</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Members to {team.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Available Members ({availableMembers.length})</Label>
                  <p className="text-sm text-gray-500 mb-3">Select members to add to this team</p>
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {availableMembers.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">No available members to add</p>
                    ) : (
                      availableMembers.map((member) => (
                        <div key={member.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <Checkbox
                            id={`member-${member.id}`}
                            checked={selectedMembersToAdd.includes(member.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedMembersToAdd([...selectedMembersToAdd, member.id])
                              } else {
                                setSelectedMembersToAdd(selectedMembersToAdd.filter((id) => id !== member.id))
                              }
                            }}
                          />
                          <div className="bg-gray-100 rounded-full p-2">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              {getRoleBadge(member.role)}
                              <Badge variant="outline" className="text-xs">
                                Workload: {member.workload}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                {selectedMembersToAdd.length > 0 && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">
                      Selected: {selectedMembersToAdd.length} member(s)
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedMembersToAdd.map((memberId) => {
                        const member = availableMembers.find((m) => m.id === memberId)
                        return (
                          <Badge key={memberId} variant="outline" className="text-xs">
                            {member?.name}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                )}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddMembers} disabled={selectedMembersToAdd.length === 0}>
                    Add {selectedMembersToAdd.length} Member(s)
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Team Members</p>
                <p className="text-3xl font-bold">{team.members.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Clients</p>
                <div className="flex items-center">
                  <p className="text-3xl font-bold mr-2">{team.activeClients}</p>
                  {getPerformanceIcon(team.activeClients, team.totalClients - team.activeClients)}
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <User className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Broker Fees</p>
                <div className="flex items-center">
                  <p className="text-3xl font-bold mr-2">${team.totalBrokerFees.toLocaleString()}</p>
                  {getPerformanceIcon(team.metrics.thisMonth.brokerFees, team.metrics.lastMonth.brokerFees)}
                </div>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Performance</p>
                <div className="flex items-center">
                  <p className="text-3xl font-bold mr-2">{team.performance}%</p>
                  {getPerformanceIcon(team.metrics.thisMonth.performance, team.metrics.lastMonth.performance)}
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="clients">Client Assignments</TabsTrigger>
          <TabsTrigger value="workload">Workload</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
                    Monthly Performance Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">This Month</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Applications</span>
                          <span className="font-medium">{team.metrics.thisMonth.applications}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Completed</span>
                          <span className="font-medium">{team.metrics.thisMonth.completed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Avg Time</span>
                          <span className="font-medium">{team.metrics.thisMonth.avgTime} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Performance</span>
                          <span className="font-medium">{team.metrics.thisMonth.performance}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Broker Fees</span>
                          <span className="font-medium">${team.metrics.thisMonth.brokerFees.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Last Month</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Applications</span>
                          <span className="font-medium">{team.metrics.lastMonth.applications}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Completed</span>
                          <span className="font-medium">{team.metrics.lastMonth.completed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Avg Time</span>
                          <span className="font-medium">{team.metrics.lastMonth.avgTime} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Performance</span>
                          <span className="font-medium">{team.metrics.lastMonth.performance}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Broker Fees</span>
                          <span className="font-medium">${team.metrics.lastMonth.brokerFees.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Specializations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {team.specializations.map((spec, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Lead</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 rounded-full p-3 mr-3">
                      <Crown className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{team.leadName}</p>
                      <p className="text-sm text-gray-500">Team Lead</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent" size="sm" asChild>
                    <Link href={`/admin/users/${team.leadId}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total Applications</span>
                    <span className="font-medium">{team.totalApplications}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Completed</span>
                    <span className="font-medium">{team.completedApplications}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Success Rate</span>
                    <span className="font-medium">
                      {Math.round((team.completedApplications / team.totalApplications) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Created</span>
                    <span className="font-medium">{new Date(team.createdDate).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-blue-600" />
                  Team Members ({team.members.length})
                </span>
                <Button size="sm" onClick={() => setIsAddMemberOpen(true)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Clients</TableHead>
                    <TableHead>Workload</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {team.members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="bg-gray-100 rounded-full p-2 mr-3">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(member.role)}</TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">{member.clientAssignments.length}</span>
                          {member.clientAssignments.some((c) => c.unreadMessages > 0) && (
                            <Badge className="bg-red-100 text-red-800 text-xs">
                              {member.clientAssignments.reduce((acc, c) => acc + c.unreadMessages, 0)} unread
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${Math.min(member.workload * 2, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{member.workload}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">{member.performance}%</span>
                          {member.performance >= 90 ? (
                            <Award className="h-4 w-4 text-green-600" />
                          ) : member.performance >= 80 ? (
                            <TrendingUp className="h-4 w-4 text-amber-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/users/${member.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleRemoveMember(member.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Client Assignments Tab */}
        <TabsContent value="clients">
          <div className="space-y-6">
            {team.members
              .filter((member) => member.clientAssignments.length > 0)
              .map((member) => (
                <Card key={member.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <User className="mr-2 h-5 w-5 text-blue-600" />
                        {member.name} - {member.clientAssignments.length} Clients
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        {getRoleBadge(member.role)}
                        {member.clientAssignments.some((c) => c.unreadMessages > 0) && (
                          <Badge className="bg-red-100 text-red-800">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            {member.clientAssignments.reduce((acc, c) => acc + c.unreadMessages, 0)} unread
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {member.clientAssignments.map((client) => (
                        <div key={client.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="bg-blue-100 rounded-full p-2">
                                <User className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">{client.clientName}</h4>
                                <p className="text-sm text-gray-500">{client.applicationId}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getPriorityBadge(client.priority)}
                              {getApplicationStatusBadge(client.status)}
                              {client.unreadMessages > 0 && (
                                <Badge className="bg-red-100 text-red-800">
                                  <MessageSquare className="h-3 w-3 mr-1" />
                                  {client.unreadMessages}
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-500">Loan Amount</p>
                              <p className="font-medium">${client.loanAmount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Broker Fee Estimate</p>
                              <p className="font-medium">${client.brokerFeeEstimate.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Due Date</p>
                              <p className="font-medium">{new Date(client.dueDate).toLocaleDateString()}</p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm text-gray-500">Progress</p>
                              <p className="text-sm font-medium">{client.progress}%</p>
                            </div>
                            <Progress value={client.progress} className="h-2" />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-500">Documents</p>
                              <p className="font-medium">
                                {client.documentsReceived}/{client.documentsRequired} received
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Next Action</p>
                              <p className="font-medium">{client.nextAction}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {client.propertyAddress}
                              </div>
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-1" />
                                {client.clientPhone}
                              </div>
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-1" />
                                {client.clientEmail}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/admin/applications/${client.applicationId}`}>
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                              <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4 mr-1" />
                                Documents
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* Workload Tab */}
        <TabsContent value="workload">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
                  Workload Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {team.workloadDistribution.map((member) => (
                    <div key={member.memberId} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{member.memberName}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">
                            {member.currentLoad}/{member.capacity}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {member.clientCount} clients
                          </Badge>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            member.currentLoad / member.capacity > 0.9
                              ? "bg-red-500"
                              : member.currentLoad / member.capacity > 0.7
                                ? "bg-amber-500"
                                : "bg-green-500"
                          }`}
                          style={{ width: `${(member.currentLoad / member.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Efficiency: {member.efficiency}%</span>
                        <span>
                          {member.currentLoad / member.capacity > 0.9
                            ? "Overloaded"
                            : member.currentLoad / member.capacity > 0.7
                              ? "High Load"
                              : "Normal"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workload Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Team Capacity</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Total Capacity:</span>
                      <span className="font-medium ml-2">
                        {team.workloadDistribution.reduce((acc, member) => acc + member.capacity, 0)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Current Load:</span>
                      <span className="font-medium ml-2">
                        {team.workloadDistribution.reduce((acc, member) => acc + member.currentLoad, 0)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Utilization:</span>
                      <span className="font-medium ml-2">
                        {Math.round(
                          (team.workloadDistribution.reduce((acc, member) => acc + member.currentLoad, 0) /
                            team.workloadDistribution.reduce((acc, member) => acc + member.capacity, 0)) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Total Clients:</span>
                      <span className="font-medium ml-2">
                        {team.workloadDistribution.reduce((acc, member) => acc + member.clientCount, 0)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Recommendations</h4>
                  <div className="space-y-2 text-sm">
                    {team.workloadDistribution.some((member) => member.currentLoad / member.capacity > 0.9) && (
                      <div className="flex items-center p-2 bg-red-50 rounded">
                        <Target className="h-4 w-4 text-red-600 mr-2" />
                        <span className="text-red-800">Some members are overloaded. Consider redistributing work.</span>
                      </div>
                    )}
                    {team.workloadDistribution.some((member) => member.currentLoad / member.capacity < 0.5) && (
                      <div className="flex items-center p-2 bg-green-50 rounded">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-green-800">Some members have capacity for additional work.</span>
                      </div>
                    )}
                    {team.workloadDistribution.every(
                      (member) =>
                        member.currentLoad / member.capacity >= 0.5 && member.currentLoad / member.capacity <= 0.9,
                    ) && (
                      <div className="flex items-center p-2 bg-blue-50 rounded">
                        <Award className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-blue-800">Team workload is well balanced.</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-green-600" />
                  Individual Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {team.members
                    .sort((a, b) => b.performance - a.performance)
                    .map((member, index) => (
                      <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 mr-3">
                            <span className="text-sm font-medium">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.role.replace("_", " ")}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <span className="font-bold text-lg mr-2">{member.performance}%</span>
                            {member.performance >= 95 ? (
                              <Award className="h-5 w-5 text-yellow-500" />
                            ) : member.performance >= 90 ? (
                              <Award className="h-5 w-5 text-green-500" />
                            ) : member.performance >= 80 ? (
                              <TrendingUp className="h-5 w-5 text-blue-500" />
                            ) : (
                              <TrendingDown className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{member.completedApplications} completed</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-green-800">Top Performer</h4>
                  <div className="text-sm">
                    <p className="font-medium">
                      {
                        team.members.reduce((prev, current) =>
                          prev.performance > current.performance ? prev : current,
                        ).name
                      }
                    </p>
                    <p className="text-green-700">
                      {Math.max(...team.members.map((m) => m.performance))}% performance rating
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-800">Team Average</h4>
                  <div className="text-sm">
                    <p className="font-medium">
                      {Math.round(
                        team.members.reduce((acc, member) => acc + member.performance, 0) / team.members.length,
                      )}
                      %
                    </p>
                    <p className="text-blue-700">Overall team performance</p>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-amber-800">Processing Time</h4>
                  <div className="text-sm">
                    <p className="font-medium">{team.averageProcessingTime} days</p>
                    <p className="text-amber-700">Average application processing time</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Performance Distribution</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Excellent (90%+):</span>
                      <span className="font-medium">
                        {team.members.filter((m) => m.performance >= 90).length} members
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Good (80-89%):</span>
                      <span className="font-medium">
                        {team.members.filter((m) => m.performance >= 80 && m.performance < 90).length} members
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Needs Improvement (&lt;80%):</span>
                      <span className="font-medium">
                        {team.members.filter((m) => m.performance < 80).length} members
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Client Details Modal */}
      <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Client Details</DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Client Name</Label>
                  <p className="font-medium">{selectedClient.clientName}</p>
                </div>
                <div>
                  <Label>Application ID</Label>
                  <p className="font-medium">{selectedClient.applicationId}</p>
                </div>
                <div>
                  <Label>Loan Amount</Label>
                  <p className="font-medium">${selectedClient.loanAmount.toLocaleString()}</p>
                </div>
                <div>
                  <Label>Broker Fee Estimate</Label>
                  <p className="font-medium">${selectedClient.brokerFeeEstimate.toLocaleString()}</p>
                </div>
              </div>
              <div>
                <Label>Property Address</Label>
                <p className="font-medium">{selectedClient.propertyAddress}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Status</Label>
                  <div className="mt-1">{getApplicationStatusBadge(selectedClient.status)}</div>
                </div>
                <div>
                  <Label>Priority</Label>
                  <div className="mt-1">{getPriorityBadge(selectedClient.priority)}</div>
                </div>
              </div>
              <div>
                <Label>Progress</Label>
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{selectedClient.progress}% complete</span>
                    <span className="text-sm text-gray-500">
                      {selectedClient.documentsReceived}/{selectedClient.documentsRequired} documents
                    </span>
                  </div>
                  <Progress value={selectedClient.progress} className="h-2" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" asChild>
                  <Link href={`/admin/applications/${selectedClient.applicationId}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Application
                  </Link>
                </Button>
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Client
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
