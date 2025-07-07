"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Edit,
  Mail,
  Phone,
  Shield,
  User,
  Eye,
  EyeOff,
  Search,
  UserPlus,
  Building,
  Crown,
  Star,
  Activity,
  TrendingUp,
  Trash2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TeamMember {
  id: string
  name: string
  email: string
  phone: string
  role: string
  team: string
  permissions: string[]
  status: "active" | "inactive"
  joinDate: string
  lastActive: string
  workload: number
  completedTasks: number
  efficiency: number
}

interface Team {
  id: string
  name: string
  description: string
  members: number
  lead: string
  department: string
  created: string
  status: "active" | "inactive"
  performance: number
  completedApplications: number
  avgProcessingTime: number
  totalMembers: TeamMember[]
}

const AVAILABLE_PERMISSIONS = [
  "view_applications",
  "edit_applications",
  "approve_applications",
  "manage_documents",
  "send_messages",
  "manage_teams",
  "view_analytics",
  "system_settings",
]

const ROLES = ["Admin", "Manager", "Senior Underwriter", "Underwriter", "Documentation Specialist", "Customer Service"]

const DEPARTMENTS = ["Underwriting", "Documentation", "Customer Service", "Management", "IT Support"]

export default function AdminTeamsPage() {
  const { toast } = useToast()
  const [teams, setTeams] = useState<Team[]>([])
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("teams")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTeam, setSelectedTeam] = useState("all")
  const [showCreateTeamDialog, setShowCreateTeamDialog] = useState(false)
  const [showCreateMemberDialog, setShowCreateMemberDialog] = useState(false)
  const [showPasswordField, setShowPasswordField] = useState(false)

  // Form states
  const [newTeam, setNewTeam] = useState({
    name: "",
    description: "",
    department: "",
    lead: "",
  })

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    team: "",
    password: "",
    permissions: [] as string[],
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock members data
      const mockMembers: TeamMember[] = [
        {
          id: "member-1",
          name: "Emma Wilson",
          email: "emma.wilson@homeonline.com",
          phone: "+61 400 111 222",
          role: "Manager",
          team: "Senior Underwriting",
          permissions: ["view_applications", "edit_applications", "approve_applications", "manage_teams"],
          status: "active",
          joinDate: "2023-01-15",
          lastActive: "2024-01-16 16:30",
          workload: 85,
          completedTasks: 234,
          efficiency: 94.5,
        },
        {
          id: "member-2",
          name: "John Smith",
          email: "john.smith@homeonline.com",
          phone: "+61 400 333 444",
          role: "Senior Underwriter",
          team: "Underwriting Team",
          permissions: ["view_applications", "edit_applications", "approve_applications"],
          status: "active",
          joinDate: "2023-01-15",
          lastActive: "2024-01-16 15:45",
          workload: 78,
          completedTasks: 189,
          efficiency: 91.2,
        },
        {
          id: "member-3",
          name: "Sarah Davis",
          email: "sarah.davis@homeonline.com",
          phone: "+61 400 555 666",
          role: "Documentation Specialist",
          team: "Documentation Team",
          permissions: ["view_applications", "manage_documents", "send_messages"],
          status: "active",
          joinDate: "2023-02-01",
          lastActive: "2024-01-16 14:20",
          workload: 92,
          completedTasks: 156,
          efficiency: 96.1,
        },
        {
          id: "member-4",
          name: "Mark Johnson",
          email: "mark.johnson@homeonline.com",
          phone: "+61 400 777 888",
          role: "Senior Underwriter",
          team: "Senior Underwriting",
          permissions: ["view_applications", "edit_applications", "approve_applications"],
          status: "active",
          joinDate: "2023-01-20",
          lastActive: "2024-01-16 13:10",
          workload: 73,
          completedTasks: 167,
          efficiency: 88.7,
        },
        {
          id: "member-5",
          name: "Lisa Brown",
          email: "lisa.brown@homeonline.com",
          phone: "+61 400 999 000",
          role: "Customer Service",
          team: "Customer Service",
          permissions: ["view_applications", "send_messages"],
          status: "active",
          joinDate: "2023-02-15",
          lastActive: "2024-01-16 16:00",
          workload: 65,
          completedTasks: 98,
          efficiency: 87.3,
        },
        {
          id: "member-6",
          name: "David Thompson",
          email: "david.thompson@homeonline.com",
          phone: "+61 400 123 789",
          role: "Underwriter",
          team: "Underwriting Team",
          permissions: ["view_applications", "edit_applications"],
          status: "active",
          joinDate: "2023-03-01",
          lastActive: "2024-01-16 12:30",
          workload: 82,
          completedTasks: 145,
          efficiency: 89.4,
        },
      ]

      // Mock teams data with enhanced information
      const mockTeams: Team[] = [
        {
          id: "team-1",
          name: "Senior Underwriting",
          description: "Handles complex loan applications and final approvals",
          members: 2,
          lead: "Emma Wilson",
          department: "Underwriting",
          created: "2023-01-15",
          status: "active",
          performance: 94.5,
          completedApplications: 345,
          avgProcessingTime: 3.2,
          totalMembers: mockMembers.filter((m) => m.team === "Senior Underwriting"),
        },
        {
          id: "team-2",
          name: "Underwriting Team",
          description: "Primary loan application processing and assessment",
          members: 2,
          lead: "John Smith",
          department: "Underwriting",
          created: "2023-01-15",
          status: "active",
          performance: 89.8,
          completedApplications: 567,
          avgProcessingTime: 4.1,
          totalMembers: mockMembers.filter((m) => m.team === "Underwriting Team"),
        },
        {
          id: "team-3",
          name: "Documentation Team",
          description: "Document collection, verification, and management",
          members: 1,
          lead: "Sarah Davis",
          department: "Documentation",
          created: "2023-02-01",
          status: "active",
          performance: 96.1,
          completedApplications: 234,
          avgProcessingTime: 2.8,
          totalMembers: mockMembers.filter((m) => m.team === "Documentation Team"),
        },
        {
          id: "team-4",
          name: "Customer Service",
          description: "Client communication and support services",
          members: 1,
          lead: "Lisa Brown",
          department: "Customer Service",
          created: "2023-02-15",
          status: "active",
          performance: 87.3,
          completedApplications: 156,
          avgProcessingTime: 1.5,
          totalMembers: mockMembers.filter((m) => m.team === "Customer Service"),
        },
      ]

      setMembers(mockMembers)
      setTeams(mockTeams)
      setLoading(false)
    }

    fetchData()
  }, [])

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTeam = selectedTeam === "all" || member.team === selectedTeam

    return matchesSearch && matchesTeam
  })

  const handleCreateTeam = async () => {
    if (!newTeam.name || !newTeam.department) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 500))

    const team: Team = {
      id: `team-${Date.now()}`,
      name: newTeam.name,
      description: newTeam.description,
      members: 0,
      lead: newTeam.lead || "Unassigned",
      department: newTeam.department,
      created: new Date().toISOString().split("T")[0],
      status: "active",
      performance: 0,
      completedApplications: 0,
      avgProcessingTime: 0,
      totalMembers: [],
    }

    setTeams([...teams, team])
    setNewTeam({ name: "", description: "", department: "", lead: "" })
    setShowCreateTeamDialog(false)

    toast({
      title: "Team Created",
      description: `${team.name} has been successfully created`,
    })
  }

  const handleCreateMember = async () => {
    if (!newMember.name || !newMember.email || !newMember.role || !newMember.team || !newMember.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields including password",
        variant: "destructive",
      })
      return
    }

    if (newMember.password.length < 6) {
      toast({
        title: "Password Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      })
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 500))

    const member: TeamMember = {
      id: `member-${Date.now()}`,
      name: newMember.name,
      email: newMember.email,
      phone: newMember.phone,
      role: newMember.role,
      team: newMember.team,
      permissions: newMember.permissions,
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
      lastActive: "Never",
      workload: 0,
      completedTasks: 0,
      efficiency: 0,
    }

    setMembers([...members, member])

    // Update team member count
    setTeams(teams.map((team) => (team.name === newMember.team ? { ...team, members: team.members + 1 } : team)))

    setNewMember({
      name: "",
      email: "",
      phone: "",
      role: "",
      team: "",
      password: "",
      permissions: [],
    })
    setShowCreateMemberDialog(false)

    toast({
      title: "Team Member Added",
      description: `${member.name} has been successfully added to ${member.team}`,
    })
  }

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setNewMember({ ...newMember, permissions: [...newMember.permissions, permission] })
    } else {
      setNewMember({ ...newMember, permissions: newMember.permissions.filter((p) => p !== permission) })
    }
  }

  const handleDeleteTeam = async (teamId: string) => {
    const team = teams.find((t) => t.id === teamId)
    if (!team) return

    await new Promise((resolve) => setTimeout(resolve, 300))

    setTeams(teams.filter((t) => t.id !== teamId))
    toast({
      title: "Team Deleted",
      description: `${team.name} has been deleted successfully`,
    })
  }

  const handleDeleteMember = async (memberId: string) => {
    const member = members.find((m) => m.id === memberId)
    if (!member) return

    await new Promise((resolve) => setTimeout(resolve, 300))

    setMembers(members.filter((m) => m.id !== memberId))
    // Update team member count
    setTeams(teams.map((team) => (team.name === member.team ? { ...team, members: team.members - 1 } : team)))

    toast({
      title: "Member Removed",
      description: `${member.name} has been removed from the team`,
    })
  }

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>
    )
  }

  const getRoleBadge = (role: string) => {
    const roleColors = {
      Manager: "bg-purple-100 text-purple-800 border-purple-200",
      "Senior Underwriter": "bg-blue-100 text-blue-800 border-blue-200",
      Admin: "bg-red-100 text-red-800 border-red-200",
      Underwriter: "bg-green-100 text-green-800 border-green-200",
      "Documentation Specialist": "bg-orange-100 text-orange-800 border-orange-200",
      "Customer Service": "bg-teal-100 text-teal-800 border-teal-200",
    }

    const colorClass = roleColors[role as keyof typeof roleColors] || "bg-gray-100 text-gray-800 border-gray-200"

    return (
      <Badge className={`${colorClass} border`}>
        {role === "Manager" && <Crown className="h-3 w-3 mr-1" />}
        {role === "Admin" && <Shield className="h-3 w-3 mr-1" />}
        {role === "Senior Underwriter" && <Star className="h-3 w-3 mr-1" />}
        {role}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <h1 className="text-2xl font-semibold text-gray-700">Loading Teams...</h1>
          <p className="text-gray-500">Fetching team and member data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
              <p className="text-gray-600 mt-1">Manage teams, members, and permissions across your organization</p>
            </div>
            <div className="flex items-center space-x-3">
              <Dialog open={showCreateTeamDialog} onOpenChange={setShowCreateTeamDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-white border-gray-300 hover:bg-gray-50">
                    <Building className="h-4 w-4 mr-2" />
                    Create Team
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Team</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="team-name">Team Name *</Label>
                      <Input
                        id="team-name"
                        value={newTeam.name}
                        onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                        placeholder="Enter team name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="team-description">Description</Label>
                      <Textarea
                        id="team-description"
                        value={newTeam.description}
                        onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                        placeholder="Team description and responsibilities"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="team-department">Department *</Label>
                      <Select
                        value={newTeam.department}
                        onValueChange={(value) => setNewTeam({ ...newTeam, department: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {DEPARTMENTS.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="team-lead">Team Lead</Label>
                      <Select value={newTeam.lead} onValueChange={(value) => setNewTeam({ ...newTeam, lead: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select team lead (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="No Lead Assigned">No Lead Assigned</SelectItem>
                          {members.map((member) => (
                            <SelectItem key={member.id} value={member.name}>
                              {member.name} - {member.role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setShowCreateTeamDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateTeam}>Create Team</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showCreateMemberDialog} onOpenChange={setShowCreateMemberDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add Team Member</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="member-name">Full Name *</Label>
                        <Input
                          id="member-name"
                          value={newMember.name}
                          onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                          placeholder="Enter full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="member-email">Email Address *</Label>
                        <Input
                          id="member-email"
                          type="email"
                          value={newMember.email}
                          onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                          placeholder="Enter email address"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="member-phone">Phone Number</Label>
                        <Input
                          id="member-phone"
                          value={newMember.phone}
                          onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                          placeholder="+61 400 000 000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="member-role">Role *</Label>
                        <Select
                          value={newMember.role}
                          onValueChange={(value) => setNewMember({ ...newMember, role: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {ROLES.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="member-team">Team *</Label>
                      <Select
                        value={newMember.team}
                        onValueChange={(value) => setNewMember({ ...newMember, team: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select team" />
                        </SelectTrigger>
                        <SelectContent>
                          {teams.map((team) => (
                            <SelectItem key={team.id} value={team.name}>
                              {team.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="member-password">Password *</Label>
                      <div className="relative">
                        <Input
                          id="member-password"
                          type={showPasswordField ? "text" : "password"}
                          value={newMember.password}
                          onChange={(e) => setNewMember({ ...newMember, password: e.target.value })}
                          placeholder="Enter secure password (min 6 characters)"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPasswordField(!showPasswordField)}
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        >
                          {showPasswordField ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label>Permissions</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {AVAILABLE_PERMISSIONS.map((permission) => (
                          <div key={permission} className="flex items-center space-x-2">
                            <Checkbox
                              id={permission}
                              checked={newMember.permissions.includes(permission)}
                              onCheckedChange={(checked) => handlePermissionChange(permission, checked as boolean)}
                            />
                            <Label htmlFor={permission} className="text-sm">
                              {permission.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setShowCreateMemberDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateMember}>Add Member</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Teams</CardTitle>
              <Building className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{teams.length}</div>
              <p className="text-xs text-gray-500">Active teams</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Members</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{members.length}</div>
              <p className="text-xs text-gray-500">Active members</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Departments</CardTitle>
              <Shield className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{DEPARTMENTS.length}</div>
              <p className="text-xs text-gray-500">Active departments</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Team Size</CardTitle>
              <User className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {teams.length > 0 ? Math.round(members.length / teams.length) : 0}
              </div>
              <p className="text-xs text-gray-500">Members per team</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-1">
            <TabsList className="grid w-full grid-cols-2 bg-gray-50">
              <TabsTrigger value="teams" className="data-[state=active]:bg-white">
                <Building className="h-4 w-4 mr-2" />
                Teams ({teams.length})
              </TabsTrigger>
              <TabsTrigger value="members" className="data-[state=active]:bg-white">
                <Users className="h-4 w-4 mr-2" />
                Members ({members.length})
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Teams Tab */}
          <TabsContent value="teams">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Teams Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teams.map((team) => (
                    <Card key={team.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">{team.name}</h3>
                          {getStatusBadge(team.status)}
                        </div>
                        <p className="text-sm text-gray-600">{team.description}</p>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Department:</span>
                          <Badge className="bg-blue-100 text-blue-800">{team.department}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Team Lead:</span>
                          <span className="text-sm font-medium">{team.lead}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Members:</span>
                          <span className="text-sm font-medium">{team.members}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Performance:</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{team.performance}%</span>
                            <TrendingUp className="h-3 w-3 text-green-600" />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Completed:</span>
                          <span className="text-sm font-medium">{team.completedApplications}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Avg Time:</span>
                          <span className="text-sm font-medium">{team.avgProcessingTime} days</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Created:</span>
                          <span className="text-sm">{new Date(team.created).toLocaleDateString()}</span>
                        </div>
                        <div className="pt-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Performance</span>
                            <span>{team.performance}%</span>
                          </div>
                          <Progress value={team.performance} className="h-2" />
                        </div>
                        <div className="flex justify-between pt-2 space-x-2">
                          <Button variant="outline" size="sm" className="bg-white flex-1" asChild>
                            <Link href={`/admin/teams/${team.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" className="bg-white">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteTeam(team.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <CardTitle className="text-lg font-semibold">Team Members</CardTitle>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search members..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="All Teams" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Teams</SelectItem>
                        {teams.map((team) => (
                          <SelectItem key={team.id} value={team.name}>
                            {team.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{member.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {member.email}
                            </div>
                            {member.phone && (
                              <div className="flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {member.phone}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className="bg-gray-100 text-gray-800 text-xs">
                              <Activity className="h-3 w-3 mr-1" />
                              {member.completedTasks} tasks
                            </Badge>
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              {member.efficiency}% efficiency
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-1">
                            {getRoleBadge(member.role)}
                            <Badge className="bg-blue-100 text-blue-800">{member.team}</Badge>
                            {getStatusBadge(member.status)}
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>Workload: {member.workload}%</span>
                            <div className="w-16 bg-gray-200 rounded-full h-1">
                              <div
                                className="bg-blue-600 h-1 rounded-full"
                                style={{ width: `${Math.min(member.workload, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Last active:{" "}
                            {member.lastActive === "Never" ? "Never" : new Date(member.lastActive).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="bg-white">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="bg-white">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteMember(member.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
