"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, FileText, Clock, ArrowRight, Bell } from "lucide-react"
import { ApplicationTimeline } from "../components/ApplicationTimeline"

interface LoanDetails {
  lender: string
  amount: number
  interestRate: number
  term: number
  monthlyPayment: number
  brokerFeeEstimate: number
}

export default function LoanAcceptanceConfirmationContent() {
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null)
  const [acceptanceDate, setAcceptanceDate] = useState<string>("")
  const [applicationId, setApplicationId] = useState<string>("")

  useEffect(() => {
    // Get loan details from localStorage
    const loanData = localStorage.getItem("acceptedLoanOffer")
    const acceptDate = localStorage.getItem("loanAcceptanceDate")
    const appId = localStorage.getItem("applicationId") || `HOL-${Math.floor(100000 + Math.random() * 900000)}`

    if (loanData) {
      setLoanDetails(JSON.parse(loanData))
    } else {
      // Fallback data if no loan details found
      setLoanDetails({
        lender: "Commonwealth Bank",
        amount: 500000,
        interestRate: 5.29,
        term: 30,
        monthlyPayment: 2768,
        brokerFeeEstimate: 4500,
      })
    }

    if (acceptDate) {
      const date = new Date(acceptDate)
      setAcceptanceDate(date.toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" }))
    } else {
      setAcceptanceDate(new Date().toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" }))
    }

    setApplicationId(appId)
    localStorage.setItem("applicationId", appId)
  }, [])

  // Calculate estimated dates
  const today = new Date()
  const documentVerificationDate = new Date(today)
  documentVerificationDate.setDate(today.getDate() + 3)

  const finalApprovalDate = new Date(today)
  finalApprovalDate.setDate(today.getDate() + 7)

  const loanSigningDate = new Date(today)
  loanSigningDate.setDate(today.getDate() + 14)

  const settlementDate = new Date(today)
  settlementDate.setDate(today.getDate() + 21)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" })
  }

  const timelineSteps = [
    {
      title: "Loan Acceptance",
      description: "You've accepted your loan offer",
      status: "completed" as const,
      date: acceptanceDate,
    },
    {
      title: "Document Verification",
      description: "We're verifying your documents",
      status: "current" as const,
      date: formatDate(documentVerificationDate),
    },
    {
      title: "Final Approval",
      description: "Final approval from the lender",
      status: "upcoming" as const,
      date: formatDate(finalApprovalDate),
    },
    {
      title: "Loan Signing",
      description: "Sign your loan documents",
      status: "upcoming" as const,
      date: formatDate(loanSigningDate),
    },
    {
      title: "Settlement",
      description: "Loan settlement and completion",
      status: "upcoming" as const,
      date: formatDate(settlementDate),
    },
  ]

  if (!loanDetails) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your loan details...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-green-200 shadow-lg mb-8">
        <div className="h-2 bg-green-500 rounded-t-lg"></div>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">Loan Acceptance Confirmed!</CardTitle>
          <CardDescription className="text-lg mt-2">
            Your loan acceptance has been received and is being processed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <h3 className="font-semibold text-xl text-green-800 mb-2">Application Reference</h3>
            <p className="text-green-700 mb-2">
              Your application ID: <span className="font-bold">{applicationId}</span>
            </p>
            <p className="text-green-700">
              Acceptance date: <span className="font-medium">{acceptanceDate}</span>
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-xl text-blue-800 mb-4">Loan Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-blue-600 text-sm">Lender</p>
                <p className="font-medium">{loanDetails.lender}</p>
              </div>
              <div>
                <p className="text-blue-600 text-sm">Loan Amount</p>
                <p className="font-medium">${loanDetails.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-blue-600 text-sm">Interest Rate</p>
                <p className="font-medium">{loanDetails.interestRate}%</p>
              </div>
              <div>
                <p className="text-blue-600 text-sm">Term</p>
                <p className="font-medium">{loanDetails.term} years</p>
              </div>
              <div>
                <p className="text-blue-600 text-sm">Monthly Repayment</p>
                <p className="font-medium">${loanDetails.monthlyPayment.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-blue-600 text-sm">Broker Fee Estimate</p>
                <p className="font-medium">${loanDetails.brokerFeeEstimate.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Next Steps in Your Loan Journey</CardTitle>
          <CardDescription>
            Here's what to expect in the coming days as your loan application progresses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ApplicationTimeline
            steps={timelineSteps.map((step) => ({
              ...step,
              // Ensure date is always a string
              date: typeof step.date === "string" ? step.date : formatDate(new Date()),
            }))}
          />
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">What Happens Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 rounded-full p-3 mt-0.5">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Document Verification</h4>
              <p className="text-gray-600">
                Our team is now verifying all your submitted documents. This typically takes 2-3 business days. If any
                additional documents are needed, we'll contact you promptly.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 rounded-full p-3 mt-0.5">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Lender Processing</h4>
              <p className="text-gray-600">
                Your application is being processed by {loanDetails.lender}. They will review your application and
                documents to prepare for final approval. This typically takes 5-7 business days.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-amber-100 rounded-full p-3 mt-0.5">
              <Calendar className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Preparing for Settlement</h4>
              <p className="text-gray-600">
                Once your loan is approved, we'll coordinate with all parties to prepare for settlement. This includes
                scheduling the signing of loan documents and finalizing the settlement date.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-green-100 rounded-full p-3 mt-0.5">
              <Bell className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Stay Updated</h4>
              <p className="text-gray-600">
                You'll receive regular updates via email and SMS as your application progresses. You can also check your
                dashboard anytime for the latest status.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 pt-2 pb-6">
          <Link href="/document-verification" className="w-full sm:w-auto">
            <Button size="lg" className="w-full gap-2">
              Track Document Verification <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full">
              Return to Dashboard
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
        <h3 className="font-semibold text-xl mb-4">Need Assistance?</h3>
        <p className="text-gray-700 mb-4">
          If you have any questions about your loan application or the next steps, our team is here to help.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Support</p>
              <p className="font-medium">1800 123 456</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Support</p>
              <p className="font-medium">support@homeonline.com.au</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
