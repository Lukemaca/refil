"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CheckCircle, Clock, FileText, User, Building, CreditCard, Save, Send, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Application {
  id: string
  applicantName: string
  email: string
  phone: string
  lender: string
  amount: number
  interestRate: number
  status: string
  progress: number
  stage: string
  priority: string
  documentsComplete: boolean
  brokerFeeEstimate: number
  employmentType: string
  income: number
  propertyValue: number
  creditScore: number
}

interface ProcessingStep {
  id: string
  name: string
  description: string
  completed: boolean
  required: boolean
  notes: string
}

export default function ProcessApplication() {
  const params = useParams()
  const router = useRouter()
  const applicationId = params.id as string
  const { toast } = useToast()

  const [application, setApplication] = useState<Application | null>(null)
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([])
  const [loading, setLoading] = useState(true)
  const [processingNotes, setProcessingNotes] = useState("")
  const [newStatus, setNewStatus] = useState("")
  const [assignedTo, setAssignedTo] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock application data
      const mockApplication: Application = {
        id: applicationId,
        applicantName: "John Smith",
        email: "john.smith@email.com",
        phone: "+61 400 123 456",
        lender: "Commonwealth Bank",
        amount: 250000,
        interestRate: 5.49,
        status: "pending_review",
        progress: 15,
        stage: "Initial Review",
        priority: "medium",
        documentsComplete: false,
        brokerFeeEstimate: 2500,
        employmentType: "Full-time",
        income: 85000,
        propertyValue: 320000,
        creditScore: 720,
      }

      // Mock processing steps
      const mockProcessingSteps: ProcessingStep[] = [
        {
          id: "step1",
          name: "Initial Application Review",
          description: "Review application completeness and basic eligibility",
          completed: false,
          required: true,
          notes: "",
        },
        {
          id: "step2",
          name: "Document Collection",
          description: "Collect and verify required documents",
          completed: false,
          required: true,
          notes: "",
        },
        {
          id: "step3",
          name: "Credit Assessment",
          description: "Perform credit check and risk assessment",
          completed: false,
          required: true,
          notes: "",
        },
        {
          id: "step4",
          name: "Income Verification",
          description: "Verify employment and income details",
          completed: false,
          required: true,
          notes: "",
        },
        {
          id: "step5",
          name: "Property Valuation",
          description: "Arrange and review property valuation",
          completed: false,
          required: true,
          notes: "",
        },
        {
          id: "step6",
          name: "Lender Submission",
          description: "Submit application to preferred lender",
          completed: false,
          required: true,
          notes: "",
        },
      ]

      setApplication(mockApplication)
      setProcessingSteps(mockProcessingSteps)
      setNewStatus(mockApplication.status)
      setLoading(false)
    }

    fetchData()
  }, [applicationId])

  const handleStepToggle = (stepId: string, completed: boolean) => {
    setProcessingSteps((prev) => prev.map((step) => (step.id === stepId ? { ...step, completed } : step)))
  }

  const handleStepNotes = (stepId: string, notes: string) => {
    setProcessingSteps((prev) => prev.map((step) => (step.id === stepId ? { ...step, notes } : step)))
  }

  const handleSaveProgress = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const completedSteps = processingSteps.filter((step) => step.completed).length
    const totalSteps = processingSteps.length
    const newProgress = Math.round((completedSteps / totalSteps) * 100)

    if (application) {
      setApplication({
        ...application,
        progress: newProgress,
        status: newStatus,
      })
    }

    toast({
      title: "Progress Saved",
      description: "Application progress has been updated successfully",
    })
  }

  const handleSubmitForApproval = async () => {
    const requiredSteps = processingSteps.filter((step) => step.required)
    const completedRequiredSteps = requiredSteps.filter((step) => step.completed)

    if (completedRequiredSteps.length < requiredSteps.length) {
      toast({
        title: "Cannot Submit",
        description: "Please complete all required steps before submitting for approval",
        variant: "destructive",
      })
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 500))

    if (application) {
      setApplication({
        ...application,
        status: "ready_for_approval",
        progress: 95,
      })
    }

    toast({
      title: "Submitted for Approval",
      description: "Application has been submitted for final approval",
    })

    router.push(`/admin/applications/${applicationId}`)
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

  const completedSteps = processingSteps.filter((step) => step.completed).length
  const totalSteps = processingSteps.length
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="outline" asChild className="mr-4 bg-transparent">
          <Link href={`/admin/applications/${applicationId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Application
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Process Application #{application.id}</h1>
          <p className="text-gray-500">
            {application.applicantName} - {application.lender}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Processing Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-gray-500">{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
                <p className="text-sm text-gray-600">
                  {completedSteps} of {totalSteps} steps completed
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Processing Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {processingSteps.map((step, index) => (
                  <div key={step.id} className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center space-x-2 flex-1">
                        <Checkbox
                          checked={step.completed}
                          onCheckedChange={(checked) => handleStepToggle(step.id, checked as boolean)}
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{step.name}</h4>
                            {step.required && (
                              <Badge variant="outline" className="text-xs">
                                Required
                              </Badge>
                            )}
                            {step.completed && <CheckCircle className="h-4 w-4 text-green-600" />}
                          </div>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </div>
                    <Textarea
                      placeholder="Add notes for this step..."
                      value={step.notes}
                      onChange={(e) => handleStepNotes(step.id, e.target.value)}
                      rows={2}
                      className="ml-6"
                    />
                    {index < processingSteps.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Processing Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add general processing notes..."
                value={processingNotes}
                onChange={(e) => setProcessingNotes(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Application Status</label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending_review">Pending Review</SelectItem>
                      <SelectItem value="document_verification">Document Verification</SelectItem>
                      <SelectItem value="lender_submission">Lender Submission</SelectItem>
                      <SelectItem value="lender_assessment">Lender Assessment</SelectItem>
                      <SelectItem value="needs_attention">Needs Attention</SelectItem>
                      <SelectItem value="ready_for_approval">Ready for Approval</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Assign To</label>
                  <Select value={assignedTo} onValueChange={setAssignedTo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin1">Sarah Mitchell</SelectItem>
                      <SelectItem value="admin2">Michael Chen</SelectItem>
                      <SelectItem value="admin3">Emma Wilson</SelectItem>
                      <SelectItem value="admin4">David Thompson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleSaveProgress}>
              <Save className="mr-2 h-4 w-4" />
              Save Progress
            </Button>
            <Button onClick={handleSubmitForApproval}>
              <Send className="mr-2 h-4 w-4" />
              Submit for Approval
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Application Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Applicant:</span>
                  <span className="text-sm font-medium">{application.applicantName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Loan Amount:</span>
                  <span className="text-sm font-medium">${application.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Property Value:</span>
                  <span className="text-sm font-medium">${application.propertyValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">LVR:</span>
                  <span className="text-sm font-medium">
                    {Math.round((application.amount / application.propertyValue) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Credit Score:</span>
                  <span className="text-sm font-medium">{application.creditScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Annual Income:</span>
                  <span className="text-sm font-medium">${application.income.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Broker Fee:</span>
                  <span className="text-sm font-medium text-green-600">
                    ${application.brokerFeeEstimate.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                <Link href={`/admin/applications/${applicationId}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Full Application
                </Link>
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                <Link href={`/admin/applications/${applicationId}/messages`}>
                  <Send className="h-4 w-4 mr-2" />
                  Message Client
                </Link>
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Request Documents
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                Run Credit Check
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Building className="h-4 w-4 mr-2" />
                Order Valuation
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Processing Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Application received</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <span className="text-sm">Initial review in progress</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Document collection pending</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Lender submission pending</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
