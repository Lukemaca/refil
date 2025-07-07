"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, FileText, ArrowRight, Star, Shield, Zap } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function ConditionalApprovalPage() {
  const router = useRouter()
  const [applicationData, setApplicationData] = useState<any>(null)
  const [approvalAmount, setApprovalAmount] = useState(0)
  const [estimatedRateFrom, setEstimatedRateFrom] = useState(0)
  const [estimatedRateTo, setEstimatedRateTo] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load application data from localStorage
    const storedApplication = localStorage.getItem("homeOnlineApplication")
    if (storedApplication) {
      const appData = JSON.parse(storedApplication)
      setApplicationData(appData)

      // Calculate conditional approval amount (simplified calculation)
      const income = Number.parseInt(appData.data.annualIncome) || 0
      const partnerIncome = Number.parseInt(appData.data.partnerIncome) || 0
      const totalIncome = income + partnerIncome
      const estimatedApproval = Math.floor(totalIncome * 6) // 6x income rule

      setApprovalAmount(estimatedApproval)
      setEstimatedRateFrom(5.89) // Lower competitive rate
      setEstimatedRateTo(6.49) // Higher competitive rate
    }

    // Simulate processing time
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [])

  const handleContinueToDocuments = () => {
    router.push("/document-upload/drivers-licence")
  }

  const handleViewLoanOptions = () => {
    router.push("/loan-comparison")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold mb-2">Processing Your Application</h2>
              <p className="text-gray-600 mb-4">
                We're reviewing your information and calculating your conditional approval...
              </p>
              <Progress value={75} className="mb-4" />
              <p className="text-sm text-gray-500">This usually takes 2-3 minutes</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h1>
            <p className="text-xl text-gray-600">You've received conditional approval for your home loan</p>
          </div>

          {/* Prominent Continue Button at Top */}
          <div className="text-center mb-8">
            <Button
              size="lg"
              onClick={handleContinueToDocuments}
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4 h-auto flex items-center shadow-lg"
            >
              <FileText className="h-6 w-6 mr-3" />
              Continue with Documents
              <ArrowRight className="h-6 w-6 ml-3" />
            </Button>
            <p className="text-sm text-gray-600 mt-2">Complete your application in just a few more steps</p>
          </div>

          {/* Approval Details */}
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-2xl text-green-800">Your Conditional Approval</CardTitle>
              <CardDescription className="text-green-700">
                Based on the information provided, here's your preliminary approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Approved Amount</h3>
                  <p className="text-3xl font-bold text-green-600">${approvalAmount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mt-2">Maximum loan amount</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Estimated Rate Range</h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {estimatedRateFrom}% - {estimatedRateTo}%
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Competitive variable rates</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Next Steps
              </CardTitle>
              <CardDescription>To finalise your approval, we need to verify some documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                    1
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-900">Upload Required Documents</h4>
                    <p className="text-sm text-gray-600">
                      We'll guide you through uploading your identification and income documents
                    </p>
                  </div>
                  <Badge className="bg-blue-600">Required</Badge>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                    2
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-900">Document Verification</h4>
                    <p className="text-sm text-gray-600">
                      Our team will verify your documents (usually within 24 hours)
                    </p>
                  </div>
                  <Badge variant="outline">Pending</Badge>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                    3
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-900">Final Approval & Loan Options</h4>
                    <p className="text-sm text-gray-600">
                      Receive your final approval and compare loan offers from multiple lenders
                    </p>
                  </div>
                  <Badge variant="outline">Pending</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Why This Is Great News</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Pre-Approved</h4>
                  <p className="text-sm text-gray-600">You're pre-approved, giving you confidence when house hunting</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Competitive Rates</h4>
                  <p className="text-sm text-gray-600">
                    Access to some of Australia's most competitive home loan rates
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Fast Process</h4>
                  <p className="text-sm text-gray-600">Streamlined approval process with minimal paperwork</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Secondary Action Button */}
          <div className="flex justify-center mb-8">
            <Button variant="outline" size="lg" onClick={handleViewLoanOptions} className="bg-transparent">
              View Loan Options
            </Button>
          </div>

          {/* Important Notice */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">Important Notice</h4>
            <p className="text-sm text-yellow-700">
              This is a conditional approval based on the information provided. Final approval is subject to document
              verification, property valuation, and lender assessment. Terms and conditions apply.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
