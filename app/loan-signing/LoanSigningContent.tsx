"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, FileText, Calendar, Info, Clock, MapPin } from "lucide-react"
import { ApplicationTimeline } from "../components/ApplicationTimeline"

interface LoanDetails {
  lender: string
  amount: number
  interestRate: number
  term: number
  monthlyPayment: number
  brokerFeeEstimate: number
}

export default function LoanSigningContent() {
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null)
  const [applicationId, setApplicationId] = useState<string>("")
  const [signingDate, setSigningDate] = useState<string>("")
  const [signingTime, setSigningTime] = useState<string>("")
  const [signingLocation, setSigningLocation] = useState<string>("")
  const [signingMethod, setSigningMethod] = useState<"in_person" | "electronic">("in_person")

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

    // Set mock signing details
    const today = new Date()
    const signingDateObj = new Date(today)
    signingDateObj.setDate(today.getDate() + 5)
    setSigningDate(
      signingDateObj.toLocaleDateString("en-AU", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
    )
    setSigningTime("10:00 AM - 11:30 AM")
    setSigningLocation("Home Online Office, Level 12, 333 George Street, Sydney NSW 2000")

    // Randomly select signing method for demo purposes
    setSigningMethod(Math.random() > 0.5 ? "in_person" : "electronic")
  }, [])

  // Calculate estimated dates for timeline
  const today = new Date()

  const approvalDate = new Date(today)
  approvalDate.setDate(today.getDate() - 5)

  const documentPreparationDate = new Date(today)
  documentPreparationDate.setDate(today.getDate() - 2)

  const signingDateObj = new Date(today)
  signingDateObj.setDate(today.getDate() + 5)

  const settlementDate = new Date(today)
  settlementDate.setDate(today.getDate() + 10)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" })
  }

  const timelineSteps = [
    {
      title: "Application Submitted",
      description: "Your loan application was submitted",
      status: "completed" as const,
      date: formatDate(new Date(today.setDate(today.getDate() - 20))),
    },
    {
      title: "Document Verification",
      description: "Your documents were verified",
      status: "completed" as const,
      date: formatDate(new Date(today.setDate(today.getDate() + 10))),
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
      status: "current" as const,
      date: formatDate(signingDateObj),
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Loan Document Signing</h1>
        <p className="text-gray-600">Your loan documents are ready for signing. Please review the details below.</p>
      </div>

      <Card className="border-blue-200 shadow-lg mb-8">
        <div className="h-2 bg-blue-500 rounded-t-lg"></div>
        <CardHeader>
          <CardTitle className="text-2xl">Signing Appointment Details</CardTitle>
          <CardDescription>
            {signingMethod === "in_person"
              ? "Your in-person signing appointment has been scheduled"
              : "Your electronic signing package is ready"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold">Date & Time</h4>
                </div>
                <p className="text-gray-700 mb-1">{signingDate}</p>
                <p className="text-gray-700">{signingTime}</p>
              </div>

              {signingMethod === "in_person" ? (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold">Location</h4>
                  </div>
                  <p className="text-gray-700">{signingLocation}</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold">Electronic Signing</h4>
                  </div>
                  <p className="text-gray-700">
                    You'll receive an email with instructions to sign your documents electronically.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-yellow-800 mb-1">What to Bring</h4>
                <ul className="text-yellow-700 text-sm space-y-1 list-disc list-inside">
                  {signingMethod === "in_person" ? (
                    <>
                      <li>Government-issued photo ID (driver's license or passport)</li>
                      <li>Proof of address (utility bill or bank statement)</li>
                      <li>Bank account details for direct debit setup</li>
                      <li>Any additional documents requested by {loanDetails.lender}</li>
                    </>
                  ) : (
                    <>
                      <li>You'll need access to your email</li>
                      <li>A device with internet connection (computer, tablet, or smartphone)</li>
                      <li>Your government-issued photo ID for verification</li>
                      <li>Bank account details for direct debit setup</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 pt-2 pb-6">
          {signingMethod === "in_person" ? (
            <>
              <Button className="w-full sm:w-auto" asChild>
                <Link href="/reschedule-appointment">Reschedule Appointment</Link>
              </Button>
              <Button variant="outline" className="w-full sm:w-auto" asChild>
                <Link href="/signing-preparation">Preparation Checklist</Link>
              </Button>
            </>
          ) : (
            <>
              <Button className="w-full sm:w-auto" asChild>
                <a href="mailto:signing@homeonline.com.au">Check Email for Signing Link</a>
              </Button>
              <Button variant="outline" className="w-full sm:w-auto" asChild>
                <Link href="/electronic-signing-guide">Electronic Signing Guide</Link>
              </Button>
            </>
          )}
        </CardFooter>
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
          <CardTitle className="text-xl">What to Expect During Signing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 rounded-full p-3 mt-0.5">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Duration</h4>
              <p className="text-gray-600">
                {signingMethod === "in_person"
                  ? "The signing appointment typically takes 60-90 minutes. During this time, a loan specialist will guide you through each document and answer any questions you may have."
                  : "The electronic signing process typically takes 30-45 minutes to complete. You'll need to review each document carefully before signing."}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 rounded-full p-3 mt-0.5">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Documents You'll Sign</h4>
              <p className="text-gray-600 mb-2">You'll be signing several important documents, including:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Loan Agreement</li>
                <li>Mortgage Documents</li>
                <li>Truth in Lending Disclosure</li>
                <li>Direct Debit Authorization</li>
                <li>Settlement Instructions</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-green-100 rounded-full p-3 mt-0.5">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">After Signing</h4>
              <p className="text-gray-600">
                After all documents are signed, they will be sent to {loanDetails.lender} for final processing.
                Settlement will typically occur within 5-7 business days after signing. You'll receive confirmation once
                settlement is complete.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end pt-2 pb-6">
          <Button asChild>
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
        <h3 className="font-semibold text-xl mb-4">Need Assistance?</h3>
        <p className="text-gray-700 mb-4">
          If you have any questions about your loan signing appointment, our team is here to help.
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
