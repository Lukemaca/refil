"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Camera,
  Smartphone,
  Shield,
  Clock,
  ArrowRight,
  ArrowLeft,
  X,
  Eye,
} from "lucide-react"
import { useDropzone } from "react-dropzone"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

interface DocumentType {
  id: string
  name: string
  description: string
  category: string
  estimatedTime: string
  required: boolean
  icon: string
  examples: string[]
  tips: string[]
  acceptedFormats: string[]
  maxSize: string
  whyNeeded: string
}

const documentTypes: Record<string, DocumentType> = {
  "bank-statements": {
    id: "bank-statements",
    name: "Bank Statements",
    description: "Last 3 months of bank statements for all accounts",
    category: "Financial",
    estimatedTime: "2 minutes",
    required: true,
    icon: "💳",
    examples: [
      "Transaction account statements",
      "Savings account statements",
      "Offset account statements",
      "Business account statements (if self-employed)",
    ],
    tips: [
      "Include all pages of each statement",
      "Ensure account numbers are visible",
      "Include statements for joint accounts",
      "Don't edit or redact any information",
    ],
    acceptedFormats: ["PDF", "JPG", "PNG"],
    maxSize: "10MB per file",
    whyNeeded:
      "Lenders need to verify your income, spending patterns, and account conduct to assess your ability to service the loan.",
  },
  "pay-slips": {
    id: "pay-slips",
    name: "Recent Pay Slips",
    description: "Last 2 pay slips from your employer",
    category: "Income",
    estimatedTime: "1 minute",
    required: true,
    icon: "💰",
    examples: ["Most recent pay slip", "Previous pay slip", "Year-to-date summary if available"],
    tips: [
      "Ensure employer details are clearly visible",
      "Include gross and net pay amounts",
      "Show tax deductions and super contributions",
      "If paid weekly/fortnightly, provide 4 recent slips",
    ],
    acceptedFormats: ["PDF", "JPG", "PNG"],
    maxSize: "5MB per file",
    whyNeeded: "Pay slips confirm your current employment status, income level, and employment stability.",
  },
  "drivers-license": {
    id: "drivers-license",
    name: "Driver's License",
    description: "Front and back of your current driver's license",
    category: "Identity",
    estimatedTime: "1 minute",
    required: true,
    icon: "🆔",
    examples: ["Front of license (photo and details)", "Back of license (conditions and signature)"],
    tips: [
      "Ensure license is current and not expired",
      "Take clear photos with good lighting",
      "Include both front and back",
      "Make sure all text is readable",
    ],
    acceptedFormats: ["JPG", "PNG", "PDF"],
    maxSize: "5MB per file",
    whyNeeded: "We need to verify your identity and current address as required by Australian lending regulations.",
  },
  "tax-returns": {
    id: "tax-returns",
    name: "Tax Returns",
    description: "Last 2 years of tax returns and notices of assessment",
    category: "Income",
    estimatedTime: "3 minutes",
    required: true,
    icon: "📊",
    examples: [
      "Complete tax return for previous financial year",
      "Complete tax return for year before",
      "Notice of Assessment from ATO",
      "Group certificates or payment summaries",
    ],
    tips: [
      "Include all pages and schedules",
      "Provide both tax returns and assessments",
      "Include business tax returns if self-employed",
      "Ensure ATO stamps/signatures are visible",
    ],
    acceptedFormats: ["PDF", "JPG", "PNG"],
    maxSize: "15MB per file",
    whyNeeded:
      "Tax returns provide a comprehensive view of your income, including employment, investment, and business income.",
  },
  "employment-letter": {
    id: "employment-letter",
    name: "Employment Letter",
    description: "Letter from employer confirming employment details",
    category: "Employment",
    estimatedTime: "2 minutes",
    required: true,
    icon: "📝",
    examples: [
      "Letter on company letterhead",
      "HR confirmation of employment",
      "Contract of employment",
      "Probation completion letter",
    ],
    tips: [
      "Must be on official company letterhead",
      "Include start date and employment type",
      "Show annual salary and any bonuses",
      "Get it signed by HR or manager",
    ],
    acceptedFormats: ["PDF", "JPG", "PNG"],
    maxSize: "5MB per file",
    whyNeeded: "Employment letters verify your job security, income level, and employment conditions.",
  },
  "asset-liability": {
    id: "asset-liability",
    name: "Asset & Liability Statement",
    description: "Complete list of your assets and liabilities",
    category: "Financial",
    estimatedTime: "5 minutes",
    required: true,
    icon: "📋",
    examples: [
      "Bank account balances",
      "Investment portfolios",
      "Superannuation balances",
      "Property values",
      "Vehicle values",
      "Credit card debts",
      "Personal loans",
      "HECS debt",
    ],
    tips: [
      "Be comprehensive and accurate",
      "Include approximate values",
      "List all debts and their balances",
      "Include joint assets and liabilities",
    ],
    acceptedFormats: ["PDF", "JPG", "PNG"],
    maxSize: "5MB per file",
    whyNeeded: "This helps lenders assess your overall financial position and borrowing capacity.",
  },
  "property-documents": {
    id: "property-documents",
    name: "Property Documents",
    description: "Contract of sale, valuation, or property details",
    category: "Property",
    estimatedTime: "3 minutes",
    required: false,
    icon: "🏠",
    examples: [
      "Contract of sale",
      "Property valuation report",
      "Council rates notice",
      "Property settlement statement",
    ],
    tips: [
      "Include all pages of contracts",
      "Provide recent valuations if available",
      "Include building and pest reports",
      "Show deposit and settlement details",
    ],
    acceptedFormats: ["PDF", "JPG", "PNG"],
    maxSize: "20MB per file",
    whyNeeded: "Property documents help verify the purchase price and property details for loan assessment.",
  },
  "rental-income": {
    id: "rental-income",
    name: "Rental Income Evidence",
    description: "Lease agreements and rental income statements",
    category: "Income",
    estimatedTime: "2 minutes",
    required: false,
    icon: "🏘️",
    examples: [
      "Current lease agreements",
      "Rental income statements",
      "Property management statements",
      "Tenant payment records",
    ],
    tips: [
      "Include current lease terms",
      "Show rental payment history",
      "Include property management fees",
      "Provide vacancy rate information",
    ],
    acceptedFormats: ["PDF", "JPG", "PNG"],
    maxSize: "10MB per file",
    whyNeeded: "Rental income can be included in your total income assessment for loan serviceability.",
  },
  "business-financials": {
    id: "business-financials",
    name: "Business Financial Statements",
    description: "Business tax returns, BAS statements, and profit & loss",
    category: "Business",
    estimatedTime: "5 minutes",
    required: false,
    icon: "💼",
    examples: [
      "Business tax returns (last 2 years)",
      "BAS statements (last 4 quarters)",
      "Profit & loss statements",
      "Balance sheets",
      "Accountant-prepared financials",
    ],
    tips: [
      "Include company and trust returns",
      "Provide accountant-prepared statements",
      "Include depreciation schedules",
      "Show business bank statements",
    ],
    acceptedFormats: ["PDF", "JPG", "PNG"],
    maxSize: "20MB per file",
    whyNeeded: "Self-employed applicants need to demonstrate business income and financial stability.",
  },
}

const allDocuments = Object.values(documentTypes)

export default function DocumentUploadPage() {
  const router = useRouter()
  const params = useParams()
  const documentId = params.documentId as string

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [completedDocuments, setCompletedDocuments] = useState<string[]>([])
  const [currentDocument, setCurrentDocument] = useState<DocumentType | null>(null)
  const [showCamera, setShowCamera] = useState(false)

  useEffect(() => {
    const doc = documentTypes[documentId]
    if (doc) {
      setCurrentDocument(doc)
    } else {
      router.push("/application-complete")
    }

    // Load completed documents from localStorage
    const completed = localStorage.getItem("completedDocuments")
    if (completed) {
      setCompletedDocuments(JSON.parse(completed))
    }
  }, [documentId, router])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prev) => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "application/pdf": [".pdf"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true,
  })

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      // Mark document as completed
      const newCompleted = [...completedDocuments, documentId]
      setCompletedDocuments(newCompleted)
      localStorage.setItem("completedDocuments", JSON.stringify(newCompleted))

      // Save uploaded files info
      const uploadedInfo = {
        documentId,
        files: uploadedFiles.map((f) => ({ name: f.name, size: f.size, type: f.type })),
        uploadedAt: new Date().toISOString(),
      }

      const existingUploads = JSON.parse(localStorage.getItem("uploadedDocuments") || "[]")
      existingUploads.push(uploadedInfo)
      localStorage.setItem("uploadedDocuments", JSON.stringify(existingUploads))

      // Move to next document or dashboard
      const nextDocument = getNextDocument()
      if (nextDocument) {
        router.push(`/document-upload/${nextDocument.id}`)
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Upload error:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const getNextDocument = () => {
    const currentIndex = allDocuments.findIndex((doc) => doc.id === documentId)
    const requiredDocs = allDocuments.filter((doc) => doc.required)
    const nextRequired = requiredDocs.find((doc) => !completedDocuments.includes(doc.id) && doc.id !== documentId)

    if (nextRequired) return nextRequired

    // If all required docs are done, find next optional
    const optionalDocs = allDocuments.filter((doc) => !doc.required)
    return optionalDocs.find((doc) => !completedDocuments.includes(doc.id))
  }

  const getPreviousDocument = () => {
    const currentIndex = allDocuments.findIndex((doc) => doc.id === documentId)
    if (currentIndex > 0) {
      return allDocuments[currentIndex - 1]
    }
    return null
  }

  const getOverallProgress = () => {
    const requiredDocs = allDocuments.filter((doc) => doc.required)
    const completedRequired = requiredDocs.filter((doc) => completedDocuments.includes(doc.id))
    return (completedRequired.length / requiredDocs.length) * 100
  }

  if (!currentDocument) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading document requirements...</p>
        </div>
      </div>
    )
  }

  const isCompleted = completedDocuments.includes(documentId)
  const overallProgress = getOverallProgress()
  const nextDoc = getNextDocument()
  const prevDoc = getPreviousDocument()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Document Upload</h1>
                <p className="text-gray-600">Upload your documents securely to continue your application</p>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="mb-2">
                  {completedDocuments.length} of {allDocuments.filter((d) => d.required).length} required completed
                </Badge>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>

          {/* Document Info Card */}
          <Card className="mb-8 border-blue-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{currentDocument.icon}</div>
                  <div>
                    <CardTitle className="text-xl text-blue-900">
                      {currentDocument.name}
                      {currentDocument.required && <span className="text-red-500 ml-1">*</span>}
                    </CardTitle>
                    <CardDescription className="text-blue-700">{currentDocument.description}</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="mb-2">{currentDocument.category}</Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {currentDocument.estimatedTime}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Why This Document is Needed */}
              <Alert className="mb-6 border-blue-200 bg-blue-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-blue-800">
                  <strong>Why we need this:</strong> {currentDocument.whyNeeded}
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Examples */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-green-600" />
                    What to Include
                  </h3>
                  <ul className="space-y-2">
                    {currentDocument.examples.map((example, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tips */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-blue-600" />
                    Tips for Best Results
                  </h3>
                  <ul className="space-y-2">
                    {currentDocument.tips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* File Requirements */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-2">File Requirements</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Accepted formats:</span>
                    <div className="text-gray-600">{currentDocument.acceptedFormats.join(", ")}</div>
                  </div>
                  <div>
                    <span className="font-medium">Maximum size:</span>
                    <div className="text-gray-600">{currentDocument.maxSize}</div>
                  </div>
                  <div>
                    <span className="font-medium">Security:</span>
                    <div className="text-gray-600">Bank-level encryption</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upload Section */}
          {!isCompleted && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Your Documents
                </CardTitle>
                <CardDescription>
                  Drag and drop files here, or click to browse. You can upload multiple files at once.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Upload Area */}
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  {isDragActive ? (
                    <p className="text-blue-600 font-medium">Drop the files here...</p>
                  ) : (
                    <div>
                      <p className="text-gray-600 mb-2">
                        <strong>Click to upload</strong> or drag and drop
                      </p>
                      <p className="text-sm text-gray-500">
                        {currentDocument.acceptedFormats.join(", ")} up to {currentDocument.maxSize}
                      </p>
                    </div>
                  )}
                </div>

                {/* Mobile Camera Option */}
                <div className="mt-4 text-center">
                  <Button variant="outline" onClick={() => setShowCamera(true)} className="flex items-center space-x-2">
                    <Camera className="h-4 w-4" />
                    <span>Take Photo with Camera</span>
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Uploaded Files ({uploadedFiles.length})</h4>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium text-sm">{file.name}</p>
                              <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                /* Preview functionality */
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Progress */}
                {isUploading && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Uploading...</span>
                      <span className="text-sm text-gray-600">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                {/* Upload Button */}
                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={handleUpload}
                    disabled={uploadedFiles.length === 0 || isUploading}
                    className="bg-green-600 hover:bg-green-700 px-8 py-3"
                  >
                    {isUploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload {uploadedFiles.length} File{uploadedFiles.length !== 1 ? "s" : ""}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Completed State */}
          {isCompleted && (
            <Card className="mb-8 border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-800 mb-2">Document Uploaded Successfully!</h3>
                  <p className="text-green-700 mb-4">
                    Your {currentDocument.name.toLowerCase()} has been securely uploaded and is being processed.
                  </p>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <div>
              {prevDoc ? (
                <Button
                  variant="outline"
                  onClick={() => router.push(`/document-upload/${prevDoc.id}`)}
                  className="flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous: {prevDoc.name}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => router.push("/application-complete")}
                  className="flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Overview
                </Button>
              )}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                {completedDocuments.length} of {allDocuments.filter((d) => d.required).length} required documents
                completed
              </p>
              <Progress value={overallProgress} className="w-48 h-2" />
            </div>

            <div>
              {nextDoc ? (
                <Button onClick={() => router.push(`/document-upload/${nextDoc.id}`)} className="flex items-center">
                  Next: {nextDoc.name}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="bg-green-600 hover:bg-green-700 flex items-center"
                >
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>

          {/* Skip Option for Optional Documents */}
          {!currentDocument.required && !isCompleted && (
            <div className="text-center mt-6">
              <Button
                variant="ghost"
                onClick={() => {
                  if (nextDoc) {
                    router.push(`/document-upload/${nextDoc.id}`)
                  } else {
                    router.push("/dashboard")
                  }
                }}
                className="text-gray-600"
              >
                Skip this document for now
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
