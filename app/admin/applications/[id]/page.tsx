"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Send,
  Bell,
  CheckCircle,
  Clock,
  Edit,
  Save,
  Plus,
  Users,
  CalendarIcon,
  Building,
  DollarSign,
  Home,
  Briefcase,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  sender: "admin" | "client"
  senderName: string
  content: string
  timestamp: string
  type: "message" | "document_request" | "system"
  attachments?: string[]
  read: boolean
}

interface DocumentRequest {
  id: string
  documentType: string
  description: string
  priority: "high" | "medium" | "low"
  dueDate: string
  status: "pending" | "uploaded" | "approved" | "rejected"
  requestedBy: string
  requestedAt: string
}

interface Meeting {
  id: string
  title: string
  date: Date
  time: string
  duration: number
  type: "phone" | "video" | "in_person"
  status: "scheduled" | "completed" | "cancelled"
  notes?: string
  attendees: string[]
}

interface LoanApplication {
  id: string
  // Personal Information
  applicantName: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  maritalStatus: string
  dependents: string
  residencyStatus: string
  address: string

  // Partner Information (if applicable)
  hasPartner: boolean
  partnerFirstName?: string
  partnerLastName?: string
  partnerEmail?: string
  partnerPhone?: string
  partnerDateOfBirth?: string
  partnerRelationship?: string

  // Property Information
  propertyType: string
  propertyValue: number
  propertyAddress: string
  propertyCity: string
  propertyState: string
  propertyZip: string
  isFirstHome: boolean
  purchasePrice?: number
  deposit?: number

  // Employment Information
  employmentStatus: string
  employerName: string
  jobTitle: string
  yearsAtJob: string
  annualIncome: number
  additionalIncome?: number

  // Partner Employment (if applicable)
  partnerEmploymentStatus?: string
  partnerEmployerName?: string
  partnerJobTitle?: string
  partnerYearsAtJob?: string
  partnerAnnualIncome?: number
  partnerAdditionalIncome?: number

  // Financial Information
  existingLoan?: number
  creditCardDebt?: number
  otherDebts?: string
  monthlyExpenses: number
  assets: string
  creditScore: string
  bankruptcy: string
  foreclosure: string

  // Loan Details
  loanAmount: number
  loanTerm: string
  loanPurpose: string
  repaymentType?: string
  preferredRate?: string

  // Application Status
  lender: string
  interestRate: number
  status: string
  progress: number
  stage: string
  assignedTo: string | null
  dateSubmitted: string
  lastUpdated: string
  priority: "high" | "medium" | "low"
  documentsComplete: boolean
  brokerFeeEstimate: number
  loanToValue: number
}

export default function ApplicationDetail() {
  const params = useParams()
  const applicationId = params.id as string
  const { toast } = useToast()

  const [application, setApplication] = useState<LoanApplication | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [documentRequests, setDocumentRequests] = useState<DocumentRequest[]>([])
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [loading, setLoading] = useState(true)
  const [newMessage, setNewMessage] = useState("")
  const [newDocumentRequest, setNewDocumentRequest] = useState({
    documentType: "",
    description: "",
    priority: "medium" as const,
    dueDate: "",
  })
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [showMeetingDialog, setShowMeetingDialog] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    date: new Date(),
    time: "",
    duration: 30,
    type: "phone" as const,
    notes: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock comprehensive application data
      const mockApplication: LoanApplication = {
        id: applicationId,
        // Personal Information
        applicantName: "John Smith",
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@email.com",
        phone: "+61 400 123 456",
        dateOfBirth: "1985-03-15",
        maritalStatus: "married",
        dependents: "2",
        residencyStatus: "citizen",
        address: "123 Collins Street, Melbourne VIC 3000",

        // Partner Information
        hasPartner: true,
        partnerFirstName: "Sarah",
        partnerLastName: "Smith",
        partnerEmail: "sarah.smith@email.com",
        partnerPhone: "+61 400 123 457",
        partnerDateOfBirth: "1987-07-22",
        partnerRelationship: "spouse",

        // Property Information
        propertyType: "house",
        propertyValue: 650000,
        propertyAddress: "456 Main Street",
        propertyCity: "Melbourne",
        propertyState: "VIC",
        propertyZip: "3000",
        isFirstHome: false,
        purchasePrice: 650000,
        deposit: 130000,

        // Employment Information
        employmentStatus: "full_time",
        employerName: "Tech Solutions Pty Ltd",
        jobTitle: "Senior Software Engineer",
        yearsAtJob: "3.5",
        annualIncome: 95000,
        additionalIncome: 5000,

        // Partner Employment
        partnerEmploymentStatus: "full_time",
        partnerEmployerName: "Marketing Agency Ltd",
        partnerJobTitle: "Marketing Manager",
        partnerYearsAtJob: "2.0",
        partnerAnnualIncome: 75000,

        // Financial Information
        existingLoan: 0,
        creditCardDebt: 8000,
        otherDebts: "Car loan: $15,000",
        monthlyExpenses: 4500,
        assets: "Savings: $150,000, Superannuation: $85,000, Shares: $25,000",
        creditScore: "excellent",
        bankruptcy: "no",
        foreclosure: "no",

        // Loan Details
        loanAmount: 520000,
        loanTerm: "30",
        loanPurpose: "purchase",
        repaymentType: "principal-interest",
        preferredRate: "variable",

        // Application Status
        lender: "Commonwealth Bank",
        interestRate: 5.49,
        status: "document_verification",
        progress: 35,
        stage: "Document Verification",
        assignedTo: "admin1",
        dateSubmitted: "2023-11-28",
        lastUpdated: "2023-11-28",
        priority: "medium",
        documentsComplete: false,
        brokerFeeEstimate: 2500,
        loanToValue: 80,
      }

      // Mock messages
      const mockMessages: Message[] = [
        {
          id: "msg1",
          sender: "client",
          senderName: "John Smith",
          content: "Hi, I've uploaded my payslips as requested. Please let me know if you need anything else.",
          timestamp: "2023-11-28 14:30",
          type: "message",
          read: false,
        },
        {
          id: "msg2",
          sender: "admin",
          senderName: "Sarah (Home Online)",
          content:
            "Thank you for uploading your payslips. I've reviewed them and they look good. We'll now proceed with the bank statements verification.",
          timestamp: "2023-11-28 15:45",
          type: "message",
          read: true,
        },
      ]

      // Mock document requests
      const mockDocumentRequests: DocumentRequest[] = [
        {
          id: "doc1",
          documentType: "Bank Statements",
          description: "Last 3 months of bank statements from your primary account",
          priority: "high",
          dueDate: "2023-12-05",
          status: "pending",
          requestedBy: "Sarah (Home Online)",
          requestedAt: "2023-11-28 15:46",
        },
      ]

      // Mock meetings
      const mockMeetings: Meeting[] = [
        {
          id: "meet1",
          title: "Initial Consultation",
          date: new Date("2023-11-30"),
          time: "10:00",
          duration: 60,
          type: "video",
          status: "scheduled",
          notes: "Discuss loan options and requirements",
          attendees: ["John Smith", "Sarah Smith", "Sarah (Home Online)"],
        },
      ]

      setApplication(mockApplication)
      setMessages(mockMessages)
      setDocumentRequests(mockDocumentRequests)
      setMeetings(mockMeetings)
      setLoading(false)
    }

    fetchData()
  }, [applicationId])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: `msg${Date.now()}`,
      sender: "admin",
      senderName: "You (Home Online)",
      content: newMessage,
      timestamp: new Date().toLocaleString(),
      type: "message",
      read: true,
    }

    setMessages([...messages, message])
    setNewMessage("")

    toast({
      title: "Message Sent",
      description: "Your message has been sent to the client.",
    })
  }

  const sendDocumentRequest = () => {
    if (!newDocumentRequest.documentType || !newDocumentRequest.description) return

    const request: DocumentRequest = {
      id: `doc${Date.now()}`,
      documentType: newDocumentRequest.documentType,
      description: newDocumentRequest.description,
      priority: newDocumentRequest.priority,
      dueDate: newDocumentRequest.dueDate,
      status: "pending",
      requestedBy: "You (Home Online)",
      requestedAt: new Date().toLocaleString(),
    }

    const message: Message = {
      id: `msg${Date.now()}`,
      sender: "admin",
      senderName: "You (Home Online)",
      content: `Document request: ${newDocumentRequest.documentType} - ${newDocumentRequest.description}`,
      timestamp: new Date().toLocaleString(),
      type: "document_request",
      read: true,
    }

    setDocumentRequests([...documentRequests, request])
    setMessages([...messages, message])
    setNewDocumentRequest({
      documentType: "",
      description: "",
      priority: "medium",
      dueDate: "",
    })

    toast({
      title: "Document Request Sent",
      description: "Document request has been sent to the client.",
    })
  }

  const scheduleMeeting = () => {
    if (!newMeeting.title || !newMeeting.time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const meeting: Meeting = {
      id: `meet${Date.now()}`,
      title: newMeeting.title,
      date: selectedDate || new Date(),
      time: newMeeting.time,
      duration: newMeeting.duration,
      type: newMeeting.type,
      status: "scheduled",
      notes: newMeeting.notes,
      attendees: [application?.applicantName || "", "You (Home Online)"],
    }

    setMeetings([...meetings, meeting])
    setShowMeetingDialog(false)
    setNewMeeting({
      title: "",
      date: new Date(),
      time: "",
      duration: 30,
      type: "phone",
      notes: "",
    })

    toast({
      title: "Meeting Scheduled",
      description: `Meeting "${meeting.title}" has been scheduled for ${meeting.date.toLocaleDateString()} at ${meeting.time}.`,
    })
  }

  const sendNotification = (type: "email" | "sms" | "push", message: string) => {
    toast({
      title: "Notification Sent",
      description: `${type.toUpperCase()} notification sent: ${message}`,
    })
  }

  const handleApprove = () => {
    toast({
      title: "Application Approved",
      description: "The application has been approved and sent to lenders.",
    })
  }

  const handleAssignTeamMember = () => {
    toast({
      title: "Team Member Assigned",
      description: "Application has been assigned to a team member.",
    })
  }

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Application report has been generated and downloaded.",
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-center">Application not found</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="outline" asChild className="mr-4 bg-transparent">
          <Link href="/admin/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Application #{application.id}</h1>
          <p className="text-gray-500">
            {application.applicantName} - {application.lender}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="messages">
                Messages
                {messages.filter((m) => !m.read && m.sender === "client").length > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white">
                    {messages.filter((m) => !m.read && m.sender === "client").length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="meetings">Meetings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Application Summary
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Loan Amount</label>
                        <p className="text-lg font-semibold">${application.loanAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Interest Rate</label>
                        <p className="text-lg font-semibold">{application.interestRate}%</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Broker Fee Estimate</label>
                        <p className="text-lg font-semibold text-green-600">
                          ${application.brokerFeeEstimate.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Loan to Value</label>
                        <p className="text-lg font-semibold">{application.loanToValue}%</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Combined Annual Income</label>
                        <p className="text-lg font-semibold">
                          ${(application.annualIncome + (application.partnerAnnualIncome || 0)).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Property Value</label>
                        <p className="text-lg font-semibold">${application.propertyValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Credit Score</label>
                        <p className="text-lg font-semibold">{application.creditScore}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Monthly Expenses</label>
                        <p className="text-lg font-semibold">${application.monthlyExpenses.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Application Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-gray-500">{application.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${application.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">Current Stage: {application.stage}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="details">
              <div className="space-y-6">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Full Name</label>
                        <p className="font-medium">
                          {application.firstName} {application.lastName}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                        <p className="font-medium">{application.dateOfBirth}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Marital Status</label>
                        <p className="font-medium">{application.maritalStatus}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Dependents</label>
                        <p className="font-medium">{application.dependents}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Residency Status</label>
                        <p className="font-medium">{application.residencyStatus}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Partner Information */}
                {application.hasPartner && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        Partner Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Partner Name</label>
                          <p className="font-medium">
                            {application.partnerFirstName} {application.partnerLastName}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Relationship</label>
                          <p className="font-medium">{application.partnerRelationship}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Email</label>
                          <p className="font-medium">{application.partnerEmail}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Phone</label>
                          <p className="font-medium">{application.partnerPhone}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                          <p className="font-medium">{application.partnerDateOfBirth}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Property Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Home className="h-5 w-5 mr-2" />
                      Property Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Property Type</label>
                        <p className="font-medium">{application.propertyType}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Property Value</label>
                        <p className="font-medium">${application.propertyValue.toLocaleString()}</p>
                      </div>
                      <div className="col-span-2">
                        <label className="text-sm font-medium text-gray-500">Address</label>
                        <p className="font-medium">
                          {application.propertyAddress}, {application.propertyCity}, {application.propertyState}{" "}
                          {application.propertyZip}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">First Home</label>
                        <p className="font-medium">{application.isFirstHome ? "Yes" : "No"}</p>
                      </div>
                      {application.purchasePrice && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Purchase Price</label>
                          <p className="font-medium">${application.purchasePrice.toLocaleString()}</p>
                        </div>
                      )}
                      {application.deposit && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Deposit</label>
                          <p className="font-medium">${application.deposit.toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Employment Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2" />
                      Employment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Employment Status</label>
                        <p className="font-medium">{application.employmentStatus.replace("_", " ")}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Employer</label>
                        <p className="font-medium">{application.employerName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Job Title</label>
                        <p className="font-medium">{application.jobTitle}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Years at Job</label>
                        <p className="font-medium">{application.yearsAtJob}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Annual Income</label>
                        <p className="font-medium">${application.annualIncome.toLocaleString()}</p>
                      </div>
                      {application.additionalIncome && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Additional Income</label>
                          <p className="font-medium">${application.additionalIncome.toLocaleString()}</p>
                        </div>
                      )}
                    </div>

                    {application.hasPartner && (
                      <>
                        <Separator />
                        <h4 className="font-medium">Partner Employment</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">Employment Status</label>
                            <p className="font-medium">{application.partnerEmploymentStatus?.replace("_", " ")}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Employer</label>
                            <p className="font-medium">{application.partnerEmployerName}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Job Title</label>
                            <p className="font-medium">{application.partnerJobTitle}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Years at Job</label>
                            <p className="font-medium">{application.partnerYearsAtJob}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Annual Income</label>
                            <p className="font-medium">${application.partnerAnnualIncome?.toLocaleString()}</p>
                          </div>
                          {application.partnerAdditionalIncome && (
                            <div>
                              <label className="text-sm font-medium text-gray-500">Additional Income</label>
                              <p className="font-medium">${application.partnerAdditionalIncome.toLocaleString()}</p>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Financial Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" />
                      Financial Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Monthly Expenses</label>
                        <p className="font-medium">${application.monthlyExpenses.toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Credit Score</label>
                        <p className="font-medium">{application.creditScore}</p>
                      </div>
                      {application.existingLoan && application.existingLoan > 0 && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Existing Loan</label>
                          <p className="font-medium">${application.existingLoan.toLocaleString()}</p>
                        </div>
                      )}
                      {application.creditCardDebt && application.creditCardDebt > 0 && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Credit Card Debt</label>
                          <p className="font-medium">${application.creditCardDebt.toLocaleString()}</p>
                        </div>
                      )}
                    </div>

                    {application.otherDebts && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Other Debts</label>
                        <p className="font-medium">{application.otherDebts}</p>
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium text-gray-500">Assets</label>
                      <p className="font-medium">{application.assets}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Loan Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="h-5 w-5 mr-2" />
                      Loan Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Loan Amount</label>
                        <p className="font-medium">${application.loanAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Loan Term</label>
                        <p className="font-medium">{application.loanTerm} years</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Loan Purpose</label>
                        <p className="font-medium">{application.loanPurpose}</p>
                      </div>
                      {application.repaymentType && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Repayment Type</label>
                          <p className="font-medium">{application.repaymentType.replace("-", " & ")}</p>
                        </div>
                      )}
                      {application.preferredRate && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Preferred Rate</label>
                          <p className="font-medium">{application.preferredRate}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Client Communication</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96 mb-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.sender === "admin" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium">{message.senderName}</span>
                              {message.type === "document_request" && <FileText className="h-3 w-3" />}
                            </div>
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-75 mt-1">{message.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <Button onClick={sendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Request Documents</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Document type (e.g., Bank Statements)"
                        value={newDocumentRequest.documentType}
                        onChange={(e) =>
                          setNewDocumentRequest({
                            ...newDocumentRequest,
                            documentType: e.target.value,
                          })
                        }
                      />
                      <Select
                        value={newDocumentRequest.priority}
                        onValueChange={(value: "high" | "medium" | "low") =>
                          setNewDocumentRequest({
                            ...newDocumentRequest,
                            priority: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High Priority</SelectItem>
                          <SelectItem value="medium">Medium Priority</SelectItem>
                          <SelectItem value="low">Low Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Textarea
                      placeholder="Description and requirements..."
                      value={newDocumentRequest.description}
                      onChange={(e) =>
                        setNewDocumentRequest({
                          ...newDocumentRequest,
                          description: e.target.value,
                        })
                      }
                    />

                    <div className="flex gap-4">
                      <Input
                        type="date"
                        value={newDocumentRequest.dueDate}
                        onChange={(e) =>
                          setNewDocumentRequest({
                            ...newDocumentRequest,
                            dueDate: e.target.value,
                          })
                        }
                      />
                      <Button onClick={sendDocumentRequest} className="flex-shrink-0">
                        <Plus className="h-4 w-4 mr-2" />
                        Request Document
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Document Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {documentRequests.map((request) => (
                        <div key={request.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{request.documentType}</h4>
                            <Badge
                              className={
                                request.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : request.status === "uploaded"
                                    ? "bg-blue-100 text-blue-800"
                                    : request.status === "approved"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                              }
                            >
                              {request.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Due: {request.dueDate}</span>
                            <span>Requested by: {request.requestedBy}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="meetings">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <CalendarIcon className="h-5 w-5 mr-2" />
                        Scheduled Meetings
                      </span>
                      <Dialog open={showMeetingDialog} onOpenChange={setShowMeetingDialog}>
                        <DialogTrigger asChild>
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Schedule Meeting
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Schedule New Meeting</DialogTitle>
                            <DialogDescription>Schedule a meeting with {application.applicantName}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="meeting-title">Meeting Title</Label>
                              <Input
                                id="meeting-title"
                                value={newMeeting.title}
                                onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                                placeholder="e.g., Loan Review Meeting"
                              />
                            </div>

                            <div>
                              <Label>Select Date</Label>
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                className="rounded-md border"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="meeting-time">Time</Label>
                                <Input
                                  id="meeting-time"
                                  type="time"
                                  value={newMeeting.time}
                                  onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label htmlFor="meeting-duration">Duration (minutes)</Label>
                                <Select
                                  value={newMeeting.duration.toString()}
                                  onValueChange={(value) =>
                                    setNewMeeting({ ...newMeeting, duration: Number.parseInt(value) })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="15">15 minutes</SelectItem>
                                    <SelectItem value="30">30 minutes</SelectItem>
                                    <SelectItem value="60">1 hour</SelectItem>
                                    <SelectItem value="90">1.5 hours</SelectItem>
                                    <SelectItem value="120">2 hours</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="meeting-type">Meeting Type</Label>
                              <Select
                                value={newMeeting.type}
                                onValueChange={(value: "phone" | "video" | "in_person") =>
                                  setNewMeeting({ ...newMeeting, type: value })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="phone">Phone Call</SelectItem>
                                  <SelectItem value="video">Video Call</SelectItem>
                                  <SelectItem value="in_person">In Person</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label htmlFor="meeting-notes">Notes (Optional)</Label>
                              <Textarea
                                id="meeting-notes"
                                value={newMeeting.notes}
                                onChange={(e) => setNewMeeting({ ...newMeeting, notes: e.target.value })}
                                placeholder="Meeting agenda or notes..."
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setShowMeetingDialog(false)}>
                              Cancel
                            </Button>
                            <Button onClick={scheduleMeeting}>Schedule Meeting</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {meetings.map((meeting) => (
                        <div key={meeting.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{meeting.title}</h4>
                            <Badge
                              className={
                                meeting.status === "scheduled"
                                  ? "bg-blue-100 text-blue-800"
                                  : meeting.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {meeting.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>
                              <CalendarIcon className="h-4 w-4 inline mr-1" />
                              {meeting.date.toLocaleDateString()} at {meeting.time}
                            </p>
                            <p>
                              <Clock className="h-4 w-4 inline mr-1" />
                              {meeting.duration} minutes • {meeting.type.replace("_", " ")}
                            </p>
                            <p>
                              <Users className="h-4 w-4 inline mr-1" />
                              {meeting.attendees.join(", ")}
                            </p>
                            {meeting.notes && <p className="mt-2 text-gray-700">{meeting.notes}</p>}
                          </div>
                        </div>
                      ))}

                      {meetings.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No meetings scheduled yet</p>
                          <p className="text-sm">Click "Schedule Meeting" to add a new meeting</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="font-medium">{application.applicantName}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm">{application.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm">{application.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm">{application.address}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Status:</span>
                  <Badge>{application.status.replace("_", " ")}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Priority:</span>
                  <Badge
                    className={
                      application.priority === "high"
                        ? "bg-red-100 text-red-800"
                        : application.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }
                  >
                    {application.priority}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Submitted:</span>
                  <span className="text-sm">{application.dateSubmitted}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" onClick={handleApprove}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Application
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Details
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleGenerateReport}>
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={handleAssignTeamMember}
              >
                <Users className="h-4 w-4 mr-2" />
                Assign to Team Member
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Send Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => sendNotification("email", "Application update notification")}
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => sendNotification("sms", "SMS notification")}
              >
                <Phone className="h-4 w-4 mr-2" />
                Send SMS
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => sendNotification("push", "Push notification")}
              >
                <Bell className="h-4 w-4 mr-2" />
                Push Notification
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
