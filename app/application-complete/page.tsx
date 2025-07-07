"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, FileText, Upload, ArrowRight, Clock, Shield, Star, Users } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

interface ApplicationData {
  id: string
  type: string
  personalInfo: {
    firstName: string
    lastName: string
    email: string
  }
  status: string
  submittedAt: string
}

const requiredDocuments = [
  {
    id: "bank-statements",
    name: "Bank Statements",
    description: "Last 3 months of bank statements for all accounts",
    category: "Financial",
    estimatedTime: "2 minutes",
    required: true,
    icon: "💳",
  },
  {
    id: "pay-slips",
    name: "Recent Pay Slips",
    description: "Last 2 pay slips from your employer",
    category: "Income",
    estimatedTime: "1 minute",
    required: true,
    icon: "💰",
  },
  {
    id: "drivers-license",
    name: "Driver's License",
    description: "Front and back of your current driver's license",
    category: "Identity",
    estimatedTime: "1 minute",
    required: true,
    icon: "🆔",
  },
  {
    id: "tax-returns",
    name: "Tax Returns",
    description: "Last 2 years of tax returns and notices of assessment",
    category: "Income",
    estimatedTime: "3 minutes",
    required: true,
    icon: "📊",
  },
  {
    id: "employment-letter",
    name: "Employment Letter",
    description: "Letter from employer confirming employment details",
    category: "Employment",
    estimatedTime: "2 minutes",
    required: true,
    icon: "📝",
  },
  {
    id: "asset-liability",
    name: "Asset & Liability Statement",
    description: "Complete list of your assets and liabilities",
    category: "Financial",
    estimatedTime: "5 minutes",
    required: true,
    icon: "📋",
  },
  {
    id: "property-documents",
    name: "Property Documents",
    description: "Contract of sale, valuation, or property details",
    category: "Property",
    estimatedTime: "3 minutes",
    required: false,
    icon: "🏠",
  },
  {
    id: "rental-income",
    name: "Rental Income Evidence",
    description: "Lease agreements and rental income statements (if applicable)",
    category: "Income",
    estimatedTime: "2 minutes",
    required: false,
    icon: "🏘️",
  },
  {
    id: "business-financials",
    name: "Business Financial Statements",
    description: "Business tax returns, BAS statements (if self-employed)",
    category: "Business",
    estimatedTime: "5 minutes",
    required: false,
    icon: "💼",
  },
]

export default function ApplicationCompletePage() {
  const router = useRouter()
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has completed application
    const savedApplication = localStorage.getItem("loanApplication")
    if (savedApplication) {
      try {
        const appData = JSON.parse(savedApplication)
        setApplicationData(appData)
      } catch (error) {
        console.error("Error loading application data:", error)
        router.push("/")
      }
    } else {
      // No application found, redirect to start
      router.push("/")
    }
    setIsLoading(false)
  }, [router])

  const handleStartDocuments = () => {
    // Start with the first required document
    router.push(`/document-upload/${requiredDocuments[0].id}`)
  }

  const handleSkipForNow = () => {
    // Go directly to dashboard
    router.push("/dashboard")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your application...</p>
        </div>
      </div>
    )
  }

  if (!applicationData) {
    return null
  }

  const getLoanTypeTitle = () => {
    switch (applicationData.type) {
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

  const requiredDocs = requiredDocuments.filter((doc) => doc.required)
  const optionalDocs = requiredDocuments.filter((doc) => !doc.required)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-6">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Congratulations, {applicationData.personalInfo.firstName}!
            </h1>
            <p className="text-xl text-gray-600 mb-4">Your {getLoanTypeTitle()} application is complete!</p>
            <Badge className="bg-green-100 text-green-800 text-sm px-4 py-2">Application #{applicationData.id}</Badge>

            <div className="mt-6 flex justify-center space-x-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-2">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600">Application Submitted</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-2">
                  <FileText className="h-6 w-6 text-yellow-600" />
                </div>
                <p className="text-sm text-gray-600">Documents Needed</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-2">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600">Lenders Compete</p>
              </div>
            </div>
          </div>

          {/* Next Steps Card */}
          <Card className="mb-8 border-green-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
              <CardTitle className="flex items-center text-green-800 text-xl">
                <FileText className="h-6 w-6 mr-2" />
                Next Step: Upload Your Documents
              </CardTitle>
              <CardDescription className="text-green-700 text-base">
                To get the best loan offers, we need a few important documents from you. This helps lenders assess your
                application and provide competitive rates.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-1">Your Information is 100% Secure</h3>
                    <p className="text-blue-700 text-sm">
                      All documents are encrypted with bank-level security. We're ASIC regulated and comply with
                      Australian privacy laws to protect your personal information.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4">Required Documents ({requiredDocs.length})</h3>
              <div className="space-y-4 mb-6">
                {requiredDocs.map((doc, index) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 rounded-full p-3 text-xl">{doc.icon}</div>
                      <div>
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        <p className="text-sm text-gray-600">{doc.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {doc.category}
                          </Badge>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {doc.estimatedTime}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Upload className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>

              {optionalDocs.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mb-4">Optional Documents ({optionalDocs.length})</h3>
                  <div className="space-y-4 mb-6">
                    {optionalDocs.map((doc, index) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors opacity-75"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="bg-gray-100 rounded-full p-3 text-xl">{doc.icon}</div>
                          <div>
                            <h4 className="font-medium text-gray-900">{doc.name}</h4>
                            <p className="text-sm text-gray-600">{doc.description}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {doc.category}
                              </Badge>
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                {doc.estimatedTime}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Upload className="h-5 w-5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="bg-yellow-50 p-4 rounded-lg mb-6 border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">Why do we need these documents?</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>
                    • <strong>Bank statements</strong> verify your income and spending patterns
                  </li>
                  <li>
                    • <strong>Pay slips</strong> confirm your employment and salary details
                  </li>
                  <li>
                    • <strong>Tax returns</strong> provide comprehensive income verification
                  </li>
                  <li>
                    • <strong>Employment letter</strong> confirms job security and conditions
                  </li>
                  <li>
                    • <strong>Asset & liability statement</strong> shows your overall financial position
                  </li>
                  <li>
                    • <strong>ID verification</strong> ensures application security and regulatory compliance
                  </li>
                </ul>
                <p className="text-sm text-yellow-700 mt-2 font-medium">
                  The more complete your application, the better loan offers you'll receive!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleStartDocuments} className="flex-1 bg-green-600 hover:bg-green-700 text-lg py-3">
                  <Upload className="h-5 w-5 mr-2" />
                  Start Document Upload (15 mins)
                </Button>
                <Button variant="outline" onClick={handleSkipForNow} className="flex-1 bg-transparent text-lg py-3">
                  Skip for Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* What Happens Next */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Upload Documents</h3>
                  <p className="text-sm text-gray-600">
                    Upload your required documents securely through our platform (takes about 15 minutes)
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-lg">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Lenders Compete</h3>
                  <p className="text-sm text-gray-600">
                    Multiple lenders review your application and compete to offer you the best loan terms
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-green-600 font-bold text-lg">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Choose Your Loan</h3>
                  <p className="text-sm text-gray-600">
                    Compare offers and select the best loan terms for your situation
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
                <p className="text-center text-gray-700">
                  <strong>Timeline:</strong> Most customers receive their first loan offers within 24-48 hours of
                  uploading documents
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
