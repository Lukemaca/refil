"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, Home, Info, DollarSign, FileText, Star } from "lucide-react"

interface LoanDetails {
  lender: string
  amount: number
  interestRate: number
  term: number
  monthlyPayment: number
  brokerFeeEstimate: number
  accountNumber?: string
  bsb?: string
}

export default function LoanCompletedContent() {
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null)
  const [applicationId, setApplicationId] = useState<string>("")
  const [settlementDate, setSettlementDate] = useState<string>("")
  const [firstPaymentDate, setFirstPaymentDate] = useState<string>("")

  useEffect(() => {
    // Get loan details from localStorage
    const loanData = localStorage.getItem("acceptedLoanOffer")
    const appId = localStorage.getItem("applicationId") || `HOL-${Math.floor(100000 + Math.random() * 900000)}`

    if (loanData) {
      const parsedData = JSON.parse(loanData)
      setLoanDetails({
        ...parsedData,
        accountNumber: `${Math.floor(10000000 + Math.random() * 90000000)}`,
        bsb: "062-000",
      })
    } else {
      // Fallback data if no loan details found
      setLoanDetails({
        lender: "Commonwealth Bank",
        amount: 500000,
        interestRate: 5.29,
        term: 30,
        monthlyPayment: 2768,
        brokerFeeEstimate: 4500,
        accountNumber: `${Math.floor(10000000 + Math.random() * 90000000)}`,
        bsb: "062-000",
      })
    }

    setApplicationId(appId)

    // Set mock settlement details
    const today = new Date()
    const settlementDateObj = new Date(today)
    settlementDateObj.setDate(today.getDate() - 1)
    setSettlementDate(settlementDateObj.toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" }))

    // Set first payment date (typically 1 month after settlement)
    const firstPaymentDateObj = new Date(settlementDateObj)
    firstPaymentDateObj.setMonth(firstPaymentDateObj.getMonth() + 1)
    setFirstPaymentDate(
      firstPaymentDateObj.toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" }),
    )
  }, [])

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
          <CardTitle className="text-3xl font-bold">Congratulations! Your Loan is Complete</CardTitle>
          <CardDescription className="text-lg mt-2">
            Your loan has been successfully settled and is now active
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <h3 className="font-semibold text-xl text-green-800 mb-2">Settlement Complete</h3>
            <p className="text-green-700 mb-2">
              Your loan with {loanDetails.lender} has been successfully settled on {settlementDate}.
            </p>
            <p className="text-green-700">
              Application ID: <span className="font-bold">{applicationId}</span>
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-xl text-blue-800 mb-4">Loan Account Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-blue-600 text-sm">Lender</p>
                <p className="font-medium">{loanDetails.lender}</p>
              </div>
              <div>
                <p className="text-blue-600 text-sm">Account Number</p>
                <p className="font-medium">{loanDetails.accountNumber}</p>
              </div>
              <div>
                <p className="text-blue-600 text-sm">BSB</p>
                <p className="font-medium">{loanDetails.bsb}</p>
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
                <p className="text-blue-600 text-sm">Monthly Repayment</p>
                <p className="font-medium">${loanDetails.monthlyPayment.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pt-2 pb-6">
          <Button className="gap-2" asChild>
            <Link href={`https://${loanDetails.lender.toLowerCase().replace(/\s+/g, "")}.com.au`} target="_blank">
              <Home className="h-4 w-4" /> Access Your Online Banking
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 rounded-full p-3 mt-0.5">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">First Repayment</h4>
              <p className="text-gray-600">
                Your first loan repayment is scheduled for <span className="font-medium">{firstPaymentDate}</span>. Make
                sure you have sufficient funds in your nominated account for the direct debit.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 rounded-full p-3 mt-0.5">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Online Account Setup</h4>
              <p className="text-gray-600">
                If you haven't already, set up your online banking account with {loanDetails.lender} to manage your
                loan. You should receive instructions via email within the next 2-3 business days.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-green-100 rounded-full p-3 mt-0.5">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Broker Fee Payment</h4>
              <p className="text-gray-600">
                Your broker fee of ${loanDetails.brokerFeeEstimate.toLocaleString()} will be processed within the next 5
                business days. This will be charged as per the payment method you provided.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Managing Your Loan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 rounded-full p-3 mt-0.5">
              <Home className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Online Banking</h4>
              <p className="text-gray-600">Use your online banking portal to:</p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>View your loan balance and transaction history</li>
                <li>Make additional repayments</li>
                <li>Set up or change direct debits</li>
                <li>Update your contact information</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-yellow-100 rounded-full p-3 mt-0.5">
              <Info className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Annual Review</h4>
              <p className="text-gray-600">
                We recommend reviewing your loan annually to ensure you're still getting the best deal. Home Online will
                contact you in 12 months to offer a complimentary loan health check.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 pt-2 pb-6">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button size="lg" className="w-full">
              Return to Dashboard
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" /> Rate Your Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            We'd love to hear about your experience with Home Online. Your feedback helps us improve our service.
          </p>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                className="bg-gray-100 hover:bg-yellow-100 text-gray-800 font-bold py-2 px-4 rounded transition-colors"
              >
                {rating}
              </button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pt-2 pb-6">
          <Button variant="outline" className="gap-2">
            <Star className="h-4 w-4" /> Submit Feedback
          </Button>
        </CardFooter>
      </Card>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
        <h3 className="font-semibold text-xl mb-4">Need Assistance?</h3>
        <p className="text-gray-700 mb-4">If you have any questions about your new loan, our team is here to help.</p>
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
