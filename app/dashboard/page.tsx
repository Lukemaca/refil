"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DocumentUploader } from "@/components/DocumentUploader"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ListIcon as ListBullet,
  MessageSquare,
  Settings,
  UserPlus,
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Star,
  Shield,
  Eye,
  Bell,
  Camera,
  ChevronDown,
  ChevronUp,
  X,
  Phone,
  Download,
} from "lucide-react"
import { HomeOnlineLogo } from "@/app/components/HomeOnlineLogo"
import { useToast } from "@/hooks/use-toast"

interface LoanOffer {
  id: string
  lender: string
  interestRate: number
  comparisonRate: number
  monthlyRepayment: number
  loanAmount: number
  features: string[]
  estimatedSavings: number
  status: "pending" | "approved" | "conditional"
  expiryDate: string
  loanTerm: number
  establishmentFee: number
  ongoingFees: number
}

interface ApplicationStatus {
  stage: "application" | "documents" | "admin_review" | "lender_bidding" | "offers_received" | "loan_accepted"
  documentsComplete: boolean
  adminApproved: boolean
  offersReceived: number
}

interface MissingDocument {
  id: string
  name: string
  description: string
  required: boolean
  category: string
  reason: string
  uploadedFiles: any[]
}

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loanType, setLoanType] = useState("new")
  const [progress, setProgress] = useState(25)
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null)
  const [expandedDocuments, setExpandedDocuments] = useState<Set<string>>(new Set())
  const [showAddCoApplicantDialog, setShowAddCoApplicantDialog] = useState(false)
  const [showContactDialog, setShowContactDialog] = useState(false)
  const [showLoanDetailsDialog, setShowLoanDetailsDialog] = useState(false)
  const [coApplicantName, setCoApplicantName] = useState("")
  const [coApplicantEmail, setCoApplicantEmail] = useState("")
  const [contactMessage, setContactMessage] = useState("")
  const [contactSubject, setContactSubject] = useState("")

  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus>({
    stage: "documents",
    documentsComplete: false,
    adminApproved: false,
    offersReceived: 0,
  })
  const [loanOffers, setLoanOffers] = useState<LoanOffer[]>([])
  const [missingDocuments, setMissingDocuments] = useState<MissingDocument[]>([
    {
      id: "bank-statements",
      name: "Bank Statements",
      description: "Last 3 months of bank statements for all accounts",
      required: true,
      category: "financial",
      reason: "Required for income verification",
      uploadedFiles: [],
    },
    {
      id: "pay-slips",
      name: "Recent Pay Slips",
      description: "Last 2 pay slips from your employer",
      required: true,
      category: "income",
      reason: "Required for employment verification",
      uploadedFiles: [],
    },
    {
      id: "drivers-license",
      name: "Driver's License",
      description: "Front and back of your current driver's license",
      required: true,
      category: "identity",
      reason: "Required for identity verification",
      uploadedFiles: [],
    },
    {
      id: "property-valuation",
      name: "Property Valuation",
      description: "Professional property valuation report",
      required: false,
      category: "property",
      reason: "May help with better loan terms",
      uploadedFiles: [],
    },
    {
      id: "employment-letter",
      name: "Employment Letter",
      description: "Letter from employer confirming employment",
      required: false,
      category: "income",
      reason: "Strengthens employment verification",
      uploadedFiles: [],
    },
  ])
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "warning",
      title: "Missing Required Documents",
      message: "3 required documents are still needed to process your loan application.",
      action: "Upload Now",
      actionUrl: "#documents",
    },
    {
      id: 2,
      type: "info",
      title: "Optional Documents Available",
      message: "Adding optional documents may help secure better loan terms.",
      action: "Learn More",
      actionUrl: "#documents",
    },
  ])
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, description: "Application submitted successfully", date: "2023-11-15", type: "form" },
    { id: 2, description: "Document upload required", date: "2023-11-15", type: "document" },
    { id: 3, description: "Secure account created", date: "2023-11-15", type: "account" },
  ])

  useEffect(() => {
    // Load application data and determine status
    const savedApplication = localStorage.getItem("homeOnlineApplication")
    const savedAccount = localStorage.getItem("homeOnlineAccount")

    if (savedApplication) {
      const appData = JSON.parse(savedApplication)
      setLoanType(appData.type || "new")
    }

    // Calculate progress based on uploaded documents
    updateProgress()
  }, [missingDocuments])

  const updateProgress = () => {
    const requiredDocs = missingDocuments.filter((doc) => doc.required)
    const completedRequiredDocs = requiredDocs.filter((doc) => doc.uploadedFiles.length > 0)
    const allDocs = missingDocuments
    const completedAllDocs = allDocs.filter((doc) => doc.uploadedFiles.length > 0)

    let newProgress = 25 // Base progress for application submission
    let newStage: ApplicationStatus["stage"] = "documents"

    if (completedRequiredDocs.length === requiredDocs.length) {
      // All required documents uploaded
      newProgress = 60
      newStage = "admin_review"

      // Update notifications
      setNotifications((prev) => prev.filter((n) => n.type !== "warning"))

      // Add to recent activity
      if (!recentActivity.some((a) => a.description.includes("required documents"))) {
        setRecentActivity((prev) => [
          {
            id: Date.now(),
            description: "All required documents uploaded successfully",
            date: new Date().toISOString().split("T")[0],
            type: "document",
          },
          ...prev,
        ])
      }
    }

    if (completedAllDocs.length === allDocs.length) {
      // All documents uploaded
      newProgress = 75
      newStage = "lender_bidding"
    }

    setProgress(newProgress)
    setApplicationStatus((prev) => ({ ...prev, stage: newStage, documentsComplete: newProgress >= 60 }))
  }

  const handleFileUpload = (docId: string, file: File) => {
    setMissingDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          const newFile = {
            id: Date.now().toString(),
            name: file.name,
            size: file.size,
            type: file.type,
            uploadDate: new Date().toISOString(),
          }
          return {
            ...doc,
            uploadedFiles: [...doc.uploadedFiles, newFile],
          }
        }
        return doc
      }),
    )

    // Add to recent activity
    setRecentActivity((prev) => [
      {
        id: Date.now(),
        description: `Uploaded ${missingDocuments.find((d) => d.id === docId)?.name}`,
        date: new Date().toISOString().split("T")[0],
        type: "document",
      },
      ...prev,
    ])

    toast({
      title: "Document uploaded successfully",
      description: `${missingDocuments.find((d) => d.id === docId)?.name} has been uploaded.`,
    })
  }

  const handleFileRemove = (docId: string, fileIndex: number) => {
    setMissingDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          const newFiles = [...doc.uploadedFiles]
          const removedFile = newFiles.splice(fileIndex, 1)[0]

          // Add to recent activity
          setRecentActivity((prevActivity) => [
            {
              id: Date.now(),
              description: `Removed ${removedFile.name} from ${doc.name}`,
              date: new Date().toISOString().split("T")[0],
              type: "document",
            },
            ...prevActivity,
          ])

          return {
            ...doc,
            uploadedFiles: newFiles,
          }
        }
        return doc
      }),
    )

    toast({
      title: "Document removed",
      description: "The document has been removed from your application.",
      variant: "destructive",
    })
  }

  const toggleDocumentExpansion = (docId: string) => {
    setExpandedDocuments((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(docId)) {
        newSet.delete(docId)
      } else {
        newSet.add(docId)
      }
      return newSet
    })
  }

  const scrollToDocuments = () => {
    const documentsSection = document.getElementById("documents")
    if (documentsSection) {
      documentsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleViewLoanDetails = () => {
    setShowLoanDetailsDialog(true)
  }

  const handleContactSupport = () => {
    setShowContactDialog(true)
  }

  const handleAccountSettings = () => {
    router.push("/settings")
  }

  const handleAddCoApplicant = () => {
    setShowAddCoApplicantDialog(true)
  }

  const handleSubmitCoApplicant = () => {
    if (coApplicantName && coApplicantEmail) {
      // Add to recent activity
      setRecentActivity((prev) => [
        {
          id: Date.now(),
          description: `Co-applicant ${coApplicantName} invited to application`,
          date: new Date().toISOString().split("T")[0],
          type: "account",
        },
        ...prev,
      ])

      toast({
        title: "Co-applicant invited",
        description: `An invitation has been sent to ${coApplicantEmail}`,
      })

      setShowAddCoApplicantDialog(false)
      setCoApplicantName("")
      setCoApplicantEmail("")
    }
  }

  const handleSubmitContactMessage = () => {
    if (contactMessage && contactSubject) {
      // Add to recent activity
      setRecentActivity((prev) => [
        {
          id: Date.now(),
          description: `Support message sent: ${contactSubject}`,
          date: new Date().toISOString().split("T")[0],
          type: "form",
        },
        ...prev,
      ])

      toast({
        title: "Message sent",
        description: "Your message has been sent to our support team. We'll get back to you within 24 hours.",
      })

      setShowContactDialog(false)
      setContactMessage("")
      setContactSubject("")
    }
  }

  const handleDownloadOffers = () => {
    // Simulate PDF download
    toast({
      title: "Download started",
      description: "Your loan offers are being prepared for download.",
    })

    // Add to recent activity
    setRecentActivity((prev) => [
      {
        id: Date.now(),
        description: "Downloaded loan offers comparison PDF",
        date: new Date().toISOString().split("T")[0],
        type: "document",
      },
      ...prev,
    ])
  }

  const handleAcceptOffer = (offerId: string) => {
    const offer = loanOffers.find((o) => o.id === offerId)
    if (offer) {
      toast({
        title: "Offer accepted",
        description: `You've accepted the ${offer.lender} loan offer. Proceeding to next steps.`,
      })

      // Add to recent activity
      setRecentActivity((prev) => [
        {
          id: Date.now(),
          description: `Accepted loan offer from ${offer.lender}`,
          date: new Date().toISOString().split("T")[0],
          type: "offer",
        },
        ...prev,
      ])

      router.push(`/loan-acceptance?offerId=${offerId}`)
    }
  }

  const getLoanTypeTitle = () => {
    switch (loanType) {
      case "firstTime":
        return "First Home Buyer"
      case "new":
        return "New Home Purchase"
      case "refinance":
        return "Refinance"
      default:
        return "Home Loan"
    }
  }

  const getStageDescription = () => {
    switch (applicationStatus.stage) {
      case "application":
        return "Your application has been submitted and is being processed."
      case "documents":
        return "Please upload your required documents to continue."
      case "admin_review":
        return "Home Online is reviewing your documents before submitting to lenders."
      case "lender_bidding":
        return "Your application has been sent to lenders. They are preparing their offers."
      case "offers_received":
        return "Lenders have submitted offers for your loan. Review and select your preferred option."
      case "loan_accepted":
        return "Congratulations! Your loan has been accepted and is being processed."
      default:
        return "Processing your application..."
    }
  }

  const dismissNotification = (notificationId: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
  }

  const requiredMissingDocs = missingDocuments.filter((doc) => doc.required && doc.uploadedFiles.length === 0)
  const optionalMissingDocs = missingDocuments.filter((doc) => !doc.required && doc.uploadedFiles.length === 0)
  const completedDocs = missingDocuments.filter((doc) => doc.uploadedFiles.length > 0)

  // Simulate admin actions for demo purposes
  const simulateAdminApproval = () => {
    setApplicationStatus((prev) => ({ ...prev, adminApproved: true, stage: "lender_bidding" }))
    setProgress(75)
    setRecentActivity((prev) => [
      {
        id: Date.now(),
        description: "Documents approved - sent to lenders for bidding",
        date: new Date().toISOString().split("T")[0],
        type: "admin",
      },
      ...prev,
    ])

    toast({
      title: "Documents approved",
      description: "Your documents have been approved and sent to lenders for bidding.",
    })
  }

  const simulateOffersReceived = () => {
    setLoanOffers([
      {
        id: "1",
        lender: "Commonwealth Bank",
        interestRate: 5.89,
        comparisonRate: 6.12,
        monthlyRepayment: 2847,
        loanAmount: 450000,
        features: ["Offset Account", "Redraw Facility", "No Monthly Fees"],
        estimatedSavings: 12500,
        status: "approved",
        expiryDate: "2024-02-15",
        loanTerm: 30,
        establishmentFee: 600,
        ongoingFees: 0,
      },
      {
        id: "2",
        lender: "Westpac",
        interestRate: 5.94,
        comparisonRate: 6.18,
        monthlyRepayment: 2869,
        loanAmount: 450000,
        features: ["Offset Account", "Extra Repayments", "Rate Lock"],
        estimatedSavings: 11800,
        status: "conditional",
        expiryDate: "2024-02-20",
        loanTerm: 30,
        establishmentFee: 750,
        ongoingFees: 10,
      },
    ])
    setApplicationStatus((prev) => ({ ...prev, offersReceived: 2, stage: "offers_received" }))
    setProgress(90)
    setNotifications([])
    setRecentActivity((prev) => [
      {
        id: Date.now(),
        description: "Received 2 loan offers from lenders",
        date: new Date().toISOString().split("T")[0],
        type: "offer",
      },
      ...prev,
    ])

    toast({
      title: "Loan offers received",
      description: "You've received 2 loan offers from lenders. Review them now!",
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <HomeOnlineLogo className="h-6 w-auto" />
                <span className="font-semibold">Home Online</span>
              </div>
              <p className="text-sm text-gray-500">Welcome back, John!</p>
              <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleViewLoanDetails}>
                <ListBullet className="h-4 w-4 mr-2" />
                View Loan Details
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleContactSupport}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleAccountSettings}>
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </Button>
            </CardContent>
          </Card>

          {/* Demo Controls */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Demo Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                size="sm"
                variant="outline"
                onClick={simulateAdminApproval}
                className="w-full text-xs bg-transparent"
                disabled={!applicationStatus.documentsComplete}
              >
                ✓ Admin Approval
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={simulateOffersReceived}
                className="w-full text-xs bg-transparent"
                disabled={!applicationStatus.adminApproved}
              >
                ✓ Receive Offers
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <h1 className="text-3xl font-bold mb-4">{getLoanTypeTitle()} Application</h1>
          <p className="text-gray-600 mb-8">{getStageDescription()}</p>

          {/* Notifications */}
          {notifications.length > 0 && (
            <div className="space-y-4 mb-8">
              {notifications.map((notification) => (
                <Alert
                  key={notification.id}
                  className={`${
                    notification.type === "warning" ? "border-amber-200 bg-amber-50" : "border-blue-200 bg-blue-50"
                  }`}
                >
                  <Bell className={`h-4 w-4 ${notification.type === "warning" ? "text-amber-600" : "text-blue-600"}`} />
                  <AlertTitle className={`${notification.type === "warning" ? "text-amber-800" : "text-blue-800"}`}>
                    {notification.title}
                  </AlertTitle>
                  <AlertDescription
                    className={`${notification.type === "warning" ? "text-amber-700" : "text-blue-700"}`}
                  >
                    {notification.message}
                    <div className="mt-2 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={scrollToDocuments}
                        className={`${
                          notification.type === "warning"
                            ? "border-amber-300 text-amber-700 hover:bg-amber-100"
                            : "border-blue-300 text-blue-700 hover:bg-blue-100"
                        }`}
                      >
                        {notification.action}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => dismissNotification(notification.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          )}

          {/* Progress Tracker */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Application Progress</CardTitle>
              <CardDescription>See where you are in the application process.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={progress} />
              <div className="flex justify-between text-sm text-gray-500">
                <span className={progress >= 25 ? "font-semibold text-blue-600" : ""}>Application</span>
                <span className={progress >= 60 ? "font-semibold text-blue-600" : ""}>Documents</span>
                <span className={progress >= 75 ? "font-semibold text-blue-600" : ""}>Admin Review</span>
                <span className={progress >= 90 ? "font-semibold text-blue-600" : ""}>Offers</span>
                <span className={progress >= 100 ? "font-semibold text-blue-600" : ""}>Accepted</span>
              </div>
            </CardContent>
          </Card>

          {/* Document Upload Section */}
          <div id="documents">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Document Upload Center
                </CardTitle>
                <CardDescription>
                  Upload your documents to continue with your loan application. Required documents must be uploaded to
                  proceed.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Document Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{completedDocs.length}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{requiredMissingDocs.length}</div>
                    <div className="text-sm text-gray-600">Required Remaining</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{optionalMissingDocs.length}</div>
                    <div className="text-sm text-gray-600">Optional Available</div>
                  </div>
                </div>

                {/* Required Documents */}
                {requiredMissingDocs.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      Required Documents ({requiredMissingDocs.length})
                    </h3>
                    <div className="space-y-4">
                      {requiredMissingDocs.map((doc) => (
                        <Card key={doc.id} className="border-red-200">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <CardTitle className="text-base text-red-800">{doc.name}</CardTitle>
                                <CardDescription className="text-red-600">{doc.description}</CardDescription>
                                <p className="text-xs text-red-500 mt-1">{doc.reason}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleDocumentExpansion(doc.id)}
                                className="text-red-600"
                              >
                                {expandedDocuments.has(doc.id) ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </CardHeader>
                          {expandedDocuments.has(doc.id) && (
                            <CardContent className="pt-0">
                              <DocumentUploader
                                document={doc}
                                onFileUpload={handleFileUpload}
                                onFileRemove={handleFileRemove}
                              />
                            </CardContent>
                          )}
                          {!expandedDocuments.has(doc.id) && (
                            <CardContent className="pt-0">
                              <Button
                                onClick={() => toggleDocumentExpansion(doc.id)}
                                className="w-full bg-red-600 hover:bg-red-700"
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Upload {doc.name}
                              </Button>
                            </CardContent>
                          )}
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Completed Documents */}
                {completedDocs.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Completed Documents ({completedDocs.length})
                    </h3>
                    <div className="space-y-4">
                      {completedDocs.map((doc) => (
                        <Card key={doc.id} className="border-green-200 bg-green-50">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <CardTitle className="text-base text-green-800 flex items-center">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  {doc.name}
                                </CardTitle>
                                <CardDescription className="text-green-600">
                                  {doc.uploadedFiles.length} file(s) uploaded
                                </CardDescription>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleDocumentExpansion(doc.id)}
                                className="text-green-600"
                              >
                                {expandedDocuments.has(doc.id) ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </CardHeader>
                          {expandedDocuments.has(doc.id) && (
                            <CardContent className="pt-0">
                              <DocumentUploader
                                document={doc}
                                onFileUpload={handleFileUpload}
                                onFileRemove={handleFileRemove}
                              />
                            </CardContent>
                          )}
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Optional Documents */}
                {optionalMissingDocs.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Optional Documents ({optionalMissingDocs.length})
                    </h3>
                    <div className="space-y-4">
                      {optionalMissingDocs.map((doc) => (
                        <Card key={doc.id} className="border-blue-200">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <CardTitle className="text-base text-blue-800">{doc.name}</CardTitle>
                                <CardDescription className="text-blue-600">{doc.description}</CardDescription>
                                <p className="text-xs text-blue-500 mt-1">{doc.reason}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleDocumentExpansion(doc.id)}
                                className="text-blue-600"
                              >
                                {expandedDocuments.has(doc.id) ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </CardHeader>
                          {expandedDocuments.has(doc.id) && (
                            <CardContent className="pt-0">
                              <DocumentUploader
                                document={doc}
                                onFileUpload={handleFileUpload}
                                onFileRemove={handleFileRemove}
                              />
                            </CardContent>
                          )}
                          {!expandedDocuments.has(doc.id) && (
                            <CardContent className="pt-0">
                              <Button
                                variant="outline"
                                onClick={() => toggleDocumentExpansion(doc.id)}
                                className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Upload {doc.name}
                              </Button>
                            </CardContent>
                          )}
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Instructions */}
                <Alert className="border-blue-200 bg-blue-50">
                  <Camera className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-800">Upload Instructions</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Use the "Choose Files" button to select documents from your device</li>
                      <li>• Use "Take Photo" to capture documents with your camera</li>
                      <li>• Accepted formats: PDF, JPG, PNG (max 10MB per file)</li>
                      <li>• Ensure photos are clear, well-lit, and show the entire document</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          {/* Loan Offers Section - Only show when offers are received */}
          {applicationStatus.stage === "offers_received" && loanOffers.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-500" />
                  Loan Offers from Lenders
                </CardTitle>
                <CardDescription>
                  Lenders have submitted {loanOffers.length} loan offers for your application. Compare and select the
                  best option.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loanOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className={`border rounded-lg p-4 transition-all cursor-pointer ${
                      selectedOffer === offer.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedOffer(offer.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="font-semibold text-lg">{offer.lender}</div>
                        <Badge className={offer.status === "approved" ? "bg-green-100 text-green-800" : ""}>
                          {offer.status === "approved" ? "Approved" : "Conditional"}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{offer.interestRate}%</div>
                        <div className="text-sm text-gray-500">Interest Rate</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-gray-500">Monthly Repayment</div>
                        <div className="font-semibold">${offer.monthlyRepayment.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Comparison Rate</div>
                        <div className="font-semibold">{offer.comparisonRate}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Estimated Savings</div>
                        <div className="font-semibold text-green-600">${offer.estimatedSavings.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Expires</div>
                        <div className="font-semibold">{new Date(offer.expiryDate).toLocaleDateString()}</div>
                      </div>
                    </div>

                    {selectedOffer === offer.id && (
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleViewLoanDetails}>
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" onClick={() => handleAcceptOffer(offer.id)}>
                          Accept Offer
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                <div className="mt-4 flex justify-center">
                  <Button variant="outline" onClick={handleDownloadOffers}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Offers Comparison
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get to common tasks quickly.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" onClick={handleAddCoApplicant}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Co-Applicant
              </Button>
              <Button variant="outline" onClick={handleViewLoanDetails}>
                <FileText className="h-4 w-4 mr-2" />
                Review Loan Details
              </Button>
              <Button variant="outline" onClick={handleContactSupport}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Loan Specialist
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Stay up-to-date on your application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentActivity.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    {activity.type === "offer" && <Star className="h-4 w-4 text-yellow-500" />}
                    {activity.type === "document" && <Upload className="h-4 w-4 text-blue-500" />}
                    {activity.type === "form" && <FileText className="h-4 w-4 text-green-500" />}
                    {activity.type === "account" && <Shield className="h-4 w-4 text-purple-500" />}
                    {activity.type === "admin" && <CheckCircle className="h-4 w-4 text-orange-500" />}
                    <p className="text-gray-700">{activity.description}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.date}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Co-Applicant Dialog */}
      <Dialog open={showAddCoApplicantDialog} onOpenChange={setShowAddCoApplicantDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Co-Applicant</DialogTitle>
            <DialogDescription>
              Invite a partner or spouse to join your loan application. They'll receive an email invitation to complete
              their part of the application.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="coApplicantName">Full Name</Label>
              <Input
                id="coApplicantName"
                value={coApplicantName}
                onChange={(e) => setCoApplicantName(e.target.value)}
                placeholder="Enter co-applicant's full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coApplicantEmail">Email Address</Label>
              <Input
                id="coApplicantEmail"
                type="email"
                value={coApplicantEmail}
                onChange={(e) => setCoApplicantEmail(e.target.value)}
                placeholder="Enter co-applicant's email"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddCoApplicantDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitCoApplicant} disabled={!coApplicantName || !coApplicantEmail}>
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Support Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Support</DialogTitle>
            <DialogDescription>
              Send a message to our support team. We'll get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contactSubject">Subject</Label>
              <Input
                id="contactSubject"
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                placeholder="What can we help you with?"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactMessage">Message</Label>
              <Textarea
                id="contactMessage"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Please describe your question or issue..."
                rows={4}
              />
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-start space-x-2">
                <Phone className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800">Need immediate help?</p>
                  <p className="text-blue-600">Call us at 1300 123 456</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowContactDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitContactMessage} disabled={!contactMessage || !contactSubject}>
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Loan Details Dialog */}
      <Dialog open={showLoanDetailsDialog} onOpenChange={setShowLoanDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Current Loan Application Details</DialogTitle>
            <DialogDescription>Summary of your loan application information</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Application Type</Label>
                <p className="text-lg font-semibold">{getLoanTypeTitle()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Application Status</Label>
                <p className="text-lg font-semibold capitalize">{applicationStatus.stage.replace("_", " ")}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Progress</Label>
                <p className="text-lg font-semibold">{progress}% Complete</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Documents</Label>
                <p className="text-lg font-semibold">
                  {completedDocs.length} of {missingDocuments.length} uploaded
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <Label className="text-sm font-medium text-gray-500">Next Steps</Label>
              <div className="mt-2 space-y-2">
                {requiredMissingDocs.length > 0 && (
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>Upload {requiredMissingDocs.length} required documents</span>
                  </div>
                )}
                {applicationStatus.documentsComplete && !applicationStatus.adminApproved && (
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Shield className="h-4 w-4" />
                    <span>Waiting for admin review</span>
                  </div>
                )}
                {applicationStatus.adminApproved && applicationStatus.offersReceived === 0 && (
                  <div className="flex items-center space-x-2 text-purple-600">
                    <Star className="h-4 w-4" />
                    <span>Lenders are preparing offers</span>
                  </div>
                )}
                {applicationStatus.offersReceived > 0 && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Review and select from {applicationStatus.offersReceived} loan offers</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowLoanDetailsDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
