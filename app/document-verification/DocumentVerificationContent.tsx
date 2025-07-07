"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, FileText, AlertTriangle, ArrowRight } from "lucide-react"

interface Document {
  id: string
  name: string
  status: "verified" | "pending" | "rejected" | "not_submitted"
  message?: string
  dateSubmitted?: string
  dateVerified?: string
}

interface DocumentCategory {
  id: string
  name: string
  documents: Document[]
  progress: number
}

export default function DocumentVerificationContent() {
  const [documentCategories, setDocumentCategories] = useState<DocumentCategory[]>([])
  const [overallProgress, setOverallProgress] = useState(0)
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState("")
  const [applicationId, setApplicationId] = useState("")

  useEffect(() => {
    // Get application ID from localStorage or generate one
    const appId = localStorage.getItem("applicationId") || `HOL-${Math.floor(100000 + Math.random() * 900000)}`
    setApplicationId(appId)

    // Set estimated completion date (3 business days from now)
    const today = new Date()
    const completionDate = new Date(today)
    completionDate.setDate(today.getDate() + 3)
    setEstimatedCompletionDate(
      completionDate.toLocaleDateString("en-AU", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
    )

    // Mock document data - in a real app, this would come from an API
    const mockDocumentCategories: DocumentCategory[] = [
      {
        id: "identity",
        name: "Identity Verification",
        progress: 100,
        documents: [
          {
            id: "drivers_license",
            name: "Driver's License",
            status: "verified",
            dateSubmitted: "10 May 2023",
            dateVerified: "11 May 2023",
          },
          {
            id: "passport",
            name: "Passport",
            status: "verified",
            dateSubmitted: "10 May 2023",
            dateVerified: "11 May 2023",
          },
        ],
      },
      {
        id: "income",
        name: "Income Verification",
        progress: 50,
        documents: [
          {
            id: "payslips",
            name: "Recent Payslips (2)",
            status: "verified",
            dateSubmitted: "10 May 2023",
            dateVerified: "11 May 2023",
          },
          {
            id: "tax_returns",
            name: "Tax Returns (2 years)",
            status: "pending",
            dateSubmitted: "10 May 2023",
          },
          {
            id: "employment_letter",
            name: "Employment Verification Letter",
            status: "rejected",
            dateSubmitted: "10 May 2023",
            message: "The letter is missing your current salary information. Please submit an updated letter.",
          },
        ],
      },
      {
        id: "assets",
        name: "Asset Verification",
        progress: 33,
        documents: [
          {
            id: "bank_statements",
            name: "Bank Statements (3 months)",
            status: "pending",
            dateSubmitted: "10 May 2023",
          },
          {
            id: "investment_statements",
            name: "Investment Account Statements",
            status: "not_submitted",
          },
          {
            id: "property_valuation",
            name: "Property Valuation Report",
            status: "verified",
            dateSubmitted: "10 May 2023",
            dateVerified: "11 May 2023",
          },
        ],
      },
    ]

    setDocumentCategories(mockDocumentCategories)

    // Calculate overall progress
    const totalDocuments = mockDocumentCategories.reduce((total, category) => total + category.documents.length, 0)

    const verifiedDocuments = mockDocumentCategories.reduce(
      (total, category) => total + category.documents.filter((doc) => doc.status === "verified").length,
      0,
    )

    setOverallProgress(Math.round((verifiedDocuments / totalDocuments) * 100))
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" /> Verified
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertTriangle className="h-3 w-3 mr-1" /> Action Required
          </Badge>
        )
      case "not_submitted":
        return <Badge className="bg-gray-100 text-gray-800">Not Submitted</Badge>
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Document Verification Status</h1>
        <p className="text-gray-600">
          Track the verification status of your submitted documents for application{" "}
          <span className="font-medium">{applicationId}</span>
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Verification Progress</CardTitle>
          <CardDescription>Overall progress of your document verification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-medium">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-5 w-5 text-blue-600" />
                <div className="font-medium">Estimated Completion</div>
              </div>
              <p className="text-sm text-blue-700">
                We expect to complete verification of all your documents by{" "}
                <span className="font-medium">{estimatedCompletionDate}</span>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {documentCategories.map((category) => (
        <Card key={category.id} className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>{category.name}</CardTitle>
              <div className="text-sm font-medium">{category.progress}% Complete</div>
            </div>
            <Progress value={category.progress} className="h-2 mt-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {category.documents.map((document) => (
                <div key={document.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{document.name}</div>
                    {document.dateSubmitted && (
                      <div className="text-sm text-gray-500">Submitted: {document.dateSubmitted}</div>
                    )}
                    {document.message && <div className="text-sm text-red-600 mt-1">{document.message}</div>}
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(document.status)}

                    {document.status === "rejected" && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/document-upload">Resubmit</Link>
                      </Button>
                    )}

                    {document.status === "not_submitted" && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/document-upload">Upload</Link>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          {category.progress < 100 && (
            <CardFooter className="border-t pt-4">
              <Button variant="outline" asChild>
                <Link href="/document-upload">
                  Upload Missing Documents <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>What Happens After Verification?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 rounded-full p-3 mt-0.5">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Final Approval</h4>
                <p className="text-gray-600">
                  Once all your documents are verified, your application will move to final approval with the lender.
                  This typically takes 3-5 business days.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 rounded-full p-3 mt-0.5">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Loan Documents</h4>
                <p className="text-gray-600">
                  After final approval, you'll receive your loan documents for signing. We'll guide you through this
                  process to ensure everything is completed correctly.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button asChild>
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
