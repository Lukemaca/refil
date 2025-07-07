"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DocumentUploader } from "@/components/DocumentUploader"
import { BankLogos } from "@/app/components/BankLogos"
import {
  CheckCircle,
  FileText,
  ChevronRight,
  Building,
  FileCheck,
  CreditCard,
  Home,
  Briefcase,
  User,
  Shield,
  ArrowLeft,
  AlertCircle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Document {
  id: string
  name: string
  description: string
  required: boolean
  multipleAllowed: boolean
  uploadedFiles: File[]
  category: "identity" | "income" | "property" | "financial" | "business" | "other"
}

export default function DocumentUploadContent() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState<string>("identity")
  const [documents, setDocuments] = useState<Document[]>([])
  const [progress, setProgress] = useState(0)
  const [loading, setIsLoading] = useState(true)
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null)
  const [skipDialogOpen, setSkipDialogOpen] = useState(false)
  const [documentToSkip, setDocumentToSkip] = useState<string | null>(null)

  // Order of categories for navigation
  const categoryOrder = ["identity", "income", "financial", "property", "business"]

  useEffect(() => {
    // Simulate loading documents
    const loadDocuments = async () => {
      setIsLoading(true)

      // Mock documents data
      const mockDocuments: Document[] = [
        {
          id: "id-1",
          name: "Driver's License",
          description: "Front and back of your driver's license",
          required: true,
          multipleAllowed: true,
          uploadedFiles: [],
          category: "identity",
        },
        {
          id: "id-2",
          name: "Passport",
          description: "Current passport photo page",
          required: false,
          multipleAllowed: false,
          uploadedFiles: [],
          category: "identity",
        },
        {
          id: "id-3",
          name: "Medicare Card",
          description: "Your Medicare card",
          required: false,
          multipleAllowed: false,
          uploadedFiles: [],
          category: "identity",
        },
        {
          id: "income-1",
          name: "Pay Slips",
          description: "Last 2 pay slips",
          required: true,
          multipleAllowed: true,
          uploadedFiles: [],
          category: "income",
        },
        {
          id: "income-2",
          name: "Tax Returns",
          description: "Last 2 years of tax returns",
          required: true,
          multipleAllowed: true,
          uploadedFiles: [],
          category: "income",
        },
        {
          id: "income-3",
          name: "Employment Contract",
          description: "Current employment contract",
          required: false,
          multipleAllowed: false,
          uploadedFiles: [],
          category: "income",
        },
        {
          id: "financial-1",
          name: "Bank Statements",
          description: "Last 3 months of statements for all accounts",
          required: true,
          multipleAllowed: true,
          uploadedFiles: [],
          category: "financial",
        },
        {
          id: "financial-2",
          name: "Credit Card Statements",
          description: "Last 3 months of statements for all credit cards",
          required: true,
          multipleAllowed: true,
          uploadedFiles: [],
          category: "financial",
        },
        {
          id: "financial-3",
          name: "Loan Statements",
          description: "Current loan statements for any existing loans",
          required: false,
          multipleAllowed: true,
          uploadedFiles: [],
          category: "financial",
        },
        {
          id: "property-1",
          name: "Property Rates Notice",
          description: "Most recent council rates notice",
          required: true,
          multipleAllowed: false,
          uploadedFiles: [],
          category: "property",
        },
        {
          id: "property-2",
          name: "Property Insurance",
          description: "Current property insurance policy",
          required: false,
          multipleAllowed: false,
          uploadedFiles: [],
          category: "property",
        },
        {
          id: "business-1",
          name: "Business Financial Statements",
          description: "Last 2 years of business financial statements",
          required: false,
          multipleAllowed: true,
          uploadedFiles: [],
          category: "business",
        },
        {
          id: "business-2",
          name: "Business Tax Returns",
          description: "Last 2 years of business tax returns",
          required: false,
          multipleAllowed: true,
          uploadedFiles: [],
          category: "business",
        },
      ]

      setDocuments(mockDocuments)
      setIsLoading(false)
    }

    loadDocuments()
  }, [])

  // Calculate overall progress
  useEffect(() => {
    if (documents.length > 0) {
      const requiredDocs = documents.filter((doc) => doc.required)
      const completedDocs = requiredDocs.filter((doc) => doc.uploadedFiles.length > 0)
      const newProgress = Math.round((completedDocs.length / requiredDocs.length) * 100)
      setProgress(newProgress)
    }
  }, [documents])

  // Function to check if a category is complete
  const isCategoryComplete = useCallback(
    (category: string) => {
      const categoryDocs = documents.filter((doc) => doc.category === category)
      const requiredCategoryDocs = categoryDocs.filter((doc) => doc.required)

      if (requiredCategoryDocs.length === 0) return true

      return requiredCategoryDocs.every((doc) => doc.uploadedFiles.length > 0)
    },
    [documents],
  )

  // Handle file upload and check for category completion
  const handleFileUpload = useCallback(
    (docId: string, file: File) => {
      // Get the document and its category before updating
      const docToUpdate = documents.find((doc) => doc.id === docId)
      if (!docToUpdate) return

      const category = docToUpdate.category
      const wasCompleteBefore = isCategoryComplete(category)

      // Update documents
      setDocuments((prevDocs) =>
        prevDocs.map((doc) => {
          if (doc.id === docId) {
            return {
              ...doc,
              uploadedFiles: [...doc.uploadedFiles, file],
            }
          }
          return doc
        }),
      )

      // Check if this upload completed the category
      const isCompleteNow = isCategoryComplete(category)

      if (!wasCompleteBefore && isCompleteNow && category === activeCategory) {
        // Show success message
        setShowSuccessMessage(category)

        // Find next category
        const currentIndex = categoryOrder.indexOf(category)
        if (currentIndex < categoryOrder.length - 1) {
          const timer = setTimeout(() => {
            setActiveCategory(categoryOrder[currentIndex + 1])
            setShowSuccessMessage(null)
          }, 1500)

          return () => clearTimeout(timer)
        }
      }
    },
    [documents, activeCategory, categoryOrder, isCategoryComplete],
  )

  const handleFileRemove = useCallback((docId: string, fileIndex: number) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) => {
        if (doc.id === docId) {
          const newFiles = [...doc.uploadedFiles]
          newFiles.splice(fileIndex, 1)
          return {
            ...doc,
            uploadedFiles: newFiles,
          }
        }
        return doc
      }),
    )
  }, [])

  const getDocumentsByCategory = useCallback(
    (category: string) => {
      return documents.filter((doc) => doc.category === category)
    },
    [documents],
  )

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "identity":
        return <User className="h-5 w-5" />
      case "income":
        return <Briefcase className="h-5 w-5" />
      case "financial":
        return <CreditCard className="h-5 w-5" />
      case "property":
        return <Home className="h-5 w-5" />
      case "business":
        return <Building className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "identity":
        return "Identity Documents"
      case "income":
        return "Income & Employment"
      case "financial":
        return "Financial Statements"
      case "property":
        return "Property Documents"
      case "business":
        return "Business Documents"
      default:
        return "Other Documents"
    }
  }

  const getCategoryProgress = useCallback(
    (category: string) => {
      const categoryDocs = getDocumentsByCategory(category)
      const requiredDocs = categoryDocs.filter((doc) => doc.required)

      if (requiredDocs.length === 0) return 100

      const completedDocs = requiredDocs.filter((doc) => doc.uploadedFiles.length > 0)
      return Math.round((completedDocs.length / requiredDocs.length) * 100)
    },
    [getDocumentsByCategory],
  )

  const isRequiredDocumentsUploaded = useCallback(() => {
    const requiredDocs = documents.filter((doc) => doc.required)
    return requiredDocs.every((doc) => doc.uploadedFiles.length > 0)
  }, [documents])

  const handleContinue = () => {
    router.push("/pre-approval-status")
  }

  const handleBackToDashboard = () => {
    router.push("/dashboard")
  }

  const handleSkipDocument = (docId: string) => {
    setDocumentToSkip(docId)
    setSkipDialogOpen(true)
  }

  const confirmSkipDocument = () => {
    setSkipDialogOpen(false)
    setDocumentToSkip(null)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Document Upload</h1>
          <p className="text-gray-600">Loading your document requirements...</p>
        </div>
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Skip Document Dialog - Using shadcn Dialog component instead of custom modal */}
      <Dialog open={skipDialogOpen} onOpenChange={setSkipDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Skip Optional Document?</DialogTitle>
            <DialogDescription>
              This document is optional. While not required, providing it may help with your application. Are you sure
              you want to skip it?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSkipDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmSkipDocument}>Skip Document</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Back to Dashboard button - fixed position */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={handleBackToDashboard} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Document Upload</h1>
        <p className="text-gray-600 mb-4">Upload your documents to complete your loan application</p>
        <div className="max-w-xl mx-auto">
          <Progress value={progress} className="h-2 mb-2" />
          <div className="flex justify-between text-sm text-gray-500">
            <span>{progress}% Complete</span>
            <span>
              {isRequiredDocumentsUploaded() ? "All required documents uploaded" : "Required documents pending"}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="text-center mb-2">
          <p className="text-sm text-gray-500">We securely share your documents with these lenders</p>
        </div>
        <BankLogos variant="grid" size="small" className="mb-4" />
      </div>

      {/* Success message - Using a non-modal approach */}
      {showSuccessMessage && (
        <div className="mb-6">
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Section Complete!</AlertTitle>
            <AlertDescription className="text-green-700">
              All required {getCategoryName(showSuccessMessage)} uploaded successfully.
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar with categories */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Document Categories</CardTitle>
              <CardDescription>Select a category to upload</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              {categoryOrder.map((category) => {
                const categoryProgress = getCategoryProgress(category)
                const isComplete = isCategoryComplete(category)

                return (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    className={`w-full justify-start mb-2 relative overflow-hidden ${
                      isComplete ? "border-green-500" : ""
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {/* Progress bar background */}
                    {categoryProgress > 0 && categoryProgress < 100 && (
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-blue-100 z-0"
                        style={{ width: `${categoryProgress}%` }}
                      />
                    )}

                    {/* Complete indicator */}
                    {isComplete && <div className="absolute left-0 top-0 bottom-0 bg-green-100 z-0 w-full" />}

                    <div className="flex items-center w-full relative z-10">
                      <div
                        className={`mr-2 ${
                          activeCategory === category ? "text-white" : isComplete ? "text-green-600" : "text-blue-600"
                        }`}
                      >
                        {getCategoryIcon(category)}
                      </div>
                      <span>{getCategoryName(category)}</span>
                      <div className="ml-auto flex items-center">
                        {isComplete && (
                          <CheckCircle
                            className={`h-4 w-4 ${activeCategory === category ? "text-white" : "text-green-600"}`}
                          />
                        )}
                        {!isComplete && categoryProgress > 0 && (
                          <span className="text-xs font-medium">{categoryProgress}%</span>
                        )}
                      </div>
                    </div>
                  </Button>
                )
              })}
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full" onClick={handleContinue} disabled={!isRequiredDocumentsUploaded()}>
                {isRequiredDocumentsUploaded() ? "Continue" : "Complete Required Documents"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full" onClick={handleBackToDashboard}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-4">
            <Alert className="bg-blue-50 border-blue-100">
              <Shield className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800">Secure Upload</AlertTitle>
              <AlertDescription className="text-blue-700 text-sm">
                Your documents are encrypted and securely stored. We only share them with lenders you approve.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Main content area */}
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{getCategoryName(activeCategory)}</CardTitle>
                  <CardDescription>
                    {activeCategory === "identity" && "Documents that verify your identity"}
                    {activeCategory === "income" && "Documents that verify your income and employment"}
                    {activeCategory === "financial" && "Your financial account statements"}
                    {activeCategory === "property" && "Documents related to your property"}
                    {activeCategory === "business" && "Documents related to your business (if applicable)"}
                  </CardDescription>
                </div>
                <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                  <FileCheck className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium">{getCategoryProgress(activeCategory)}% Complete</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Information about required vs optional documents */}
              <Alert className="mb-6 bg-blue-50 border-blue-100">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">Required vs Optional Documents</AlertTitle>
                <AlertDescription className="text-blue-700">
                  Documents marked as "Required" must be uploaded to proceed. Optional documents can be skipped, but
                  providing them may help with your application.
                </AlertDescription>
              </Alert>

              <div className="space-y-6">
                {getDocumentsByCategory(activeCategory).map((doc) => (
                  <div key={doc.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-lg flex items-center">
                          {doc.name}
                          {doc.required ? (
                            <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                              Required
                            </span>
                          ) : (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                              Optional
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-600 text-sm">{doc.description}</p>
                      </div>
                      {doc.uploadedFiles.length > 0 && (
                        <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          <span className="text-xs font-medium">Uploaded</span>
                        </div>
                      )}
                    </div>

                    <DocumentUploader document={doc} onFileUpload={handleFileUpload} onFileRemove={handleFileRemove} />

                    {/* Skip button for optional documents */}
                    {!doc.required && doc.uploadedFiles.length === 0 && (
                      <div className="mt-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSkipDocument(doc.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Skip this document
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                {getDocumentsByCategory(activeCategory).length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No documents required in this category</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" onClick={handleBackToDashboard}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
              <Button onClick={handleContinue} disabled={!isRequiredDocumentsUploaded()}>
                {isRequiredDocumentsUploaded() ? "Continue to Pre-Approval" : "Complete Required Documents"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
