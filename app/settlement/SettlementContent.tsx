"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, Home, ArrowRight, Info, DollarSign, FileText } from "lucide-react"
import { ApplicationTimeline } from "../components/ApplicationTimeline"

interface LoanDetails {
  lender: string
  amount: number
  interestRate: number
  term: number
  monthlyPayment: number
  brokerFeeEstimate: number
}

export default function SettlementContent() {
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null)
  const [applicationId, setApplicationId] = useState<string>("")
  const [settlementDate, setSettlementDate] = useState<string>("")
  const [settlementTime, setSettlementTime] = useState<string>("")
  const [firstPaymentDate, setFirstPaymentDate] = useState<string>("")

  useEffect(() => {
    // Get loan details from localStorage
    const loanData = localStorage.getItem("acceptedLoanOffer")
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

    setApplicationId(appId)

    // Set mock settlement details
    const today = new Date()
    const settlementDateObj = new Date(today)
    settlementDateObj.setDate(today.getDate() + 3)
    setSettlementDate(
      settlementDateObj.toLocaleDateString("en-AU", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    )
    setSettlementTime("2:00 PM AEST")

    // Set first payment date (typically 1 month after settlement)
    const firstPaymentDateObj = new Date(settlementDateObj)
    firstPaymentDateObj.setMonth(firstPaymentDateObj.getMonth() + 1)
    setFirstPaymentDate(
      firstPaymentDateObj.toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" }),
    )
  }, [])

  // Calculate estimated dates for timeline
  const today = new Date()

  const approvalDate = new Date(today)
  approvalDate.setDate(today.getDate() - 10)

  const documentPreparationDate = new Date(today)
  documentPreparationDate.setDate(today.getDate() - 7)

  const signingDate = new Date(today)
  signingDate.setDate(today.getDate() - 3)

  const settlementDateObj = new Date(today)
  settlementDateObj.setDate(today.getDate() + 3)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" })
  }

  const timelineSteps = [
    {
      title: "Application Submitted",
      description: "Your loan application was submitted",
      status: "completed" as const,
      date: formatDate(new Date(today.setDate(today.getDate() - 25))),
    },
    {
      title: "Document Verification",
      description: "Your documents were verified",
      status: "completed" as const,
      date: formatDate(new Date(today.setDate(today.getDate() + 15))),
    },
    {
      title: "Final Approval",
      description: "Your loan has been approved",
      status: "completed" as const,
      date: formatDate(approvalDate),
    },
    {
      title: "Document Preparation",
      description: "Preparing loan documents for signing",
      status: "completed" as const,
      date: formatDate(documentPreparationDate),
    },
    {
      title: "Loan Signing",
      description: "Sign your loan documents",
      status: "completed" as const,
      date: formatDate(signingDate),
    },
    {
      title: "Settlement",
      description: "Loan settlement and completion",
      status: "current" as const,
      date: formatDate(settlementDateObj),
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settlement Information</h1>
        <p className="text-gray-600">Your loan is scheduled for settlement. Here are the important details.</p>
      </div>

      <Card className="border-blue-200 shadow-lg mb-8">
        <div className="h-2 bg-blue-500 rounded-t-lg"></div>
        <CardHeader>
          <CardTitle className="text-2xl">Settlement Details</CardTitle>
          <CardDescription>Your loan settlement has been scheduled</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold">Settlement Date & Time</h4>
                </div>
                <p className="text-gray-700 mb-1">{settlementDate}</p>
                <p className="text-gray-700">{settlementTime}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Home className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold">Loan Details</h4>
                </div>
                <p className="text-gray-700 mb-1">Lender: {loanDetails.lender}</p>
                <p className="text-gray-700">Amount: ${loanDetails.amount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-yellow-800 mb-1">Important Information</h4>
                <p className="text-yellow-700 text-sm mb-2">
                  Settlement is the final step in your loan process. On the settlement date, your loan will be
                  officially activated and funds will be disbursed.
                </p>
                <p className="text-yellow-700 text-sm">Your first loan payment will be due on {firstPaymentDate}.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Your Loan Journey</CardTitle>
          <CardDescription>Track your progress through the loan process</CardDescription>
        </CardHeader>
        <CardContent>
          <ApplicationTimeline steps={timelineSteps} />
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">What Happens at Settlement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 rounded-full p-3 mt-0.5">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Document Processing</h4>
              <p className="text-gray-600">
                On settlement day, your lender and their legal representatives will process all final documentation.
                This typically happens electronically through the PEXA system.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 rounded-full p-3 mt-0.5">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Fund Disbursement</h4>
              <p className="text-gray-600">
                Once all documentation is processed, your loan funds will be disbursed. If you're refinancing, your new
                lender will pay out your existing loan. If you're purchasing a property, funds will be transferred to
                the seller.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-green-100 rounded-full p-3 mt-0.5">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Completion</h4>
              <p className="text-gray-600">
                After settlement is complete, you'll receive confirmation from your lender. Your loan account will be
                activated, and you'll receive access to your online banking portal to manage your loan.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 pt-2 pb-6">
          <Link href="/loan-completed" className="w-full sm:w-auto">
            <Button size="lg" className="w-full gap-2">
              After Settlement Guide <ArrowRight className="h-4 w-4" />
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
        <p className="text-gray-700 mb-4">If you have any questions about your settlement, our team is here to help.</p>
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
