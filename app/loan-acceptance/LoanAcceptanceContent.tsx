"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Info, Calendar, FileText, Shield } from "lucide-react"
import { LoanStep, saveCurrentStep } from "@/lib/step-tracker"

interface LoanFeature {
  name: string
  description: string
  included: boolean
}

interface LoanOffer {
  id: string
  lender: string
  interestRate: number
  comparisonRate: number
  term: number
  monthlyPayment: number
  totalLoanAmount: number
  brokerFeeEstimate: number
  loanType: string
  features: LoanFeature[]
  fees: {
    applicationFee: number
    ongoingFee: number
    dischargeFee: number
  }
  maxLVR?: number
  recommended: boolean
  specialOffer?: string
  offsetAccount?: boolean
  redrawFacility?: boolean
  extraRepayments?: boolean
}

export default function LoanAcceptanceContent() {
  const router = useRouter()
  const [selectedLoan, setSelectedLoan] = useState<LoanOffer | null>(null)
  const [loading, setLoading] = useState(true)
  const [acceptingLoan, setAcceptingLoan] = useState(false)
  const [applicationId, setApplicationId] = useState<string>("")

  useEffect(() => {
    // Get the selected loan from localStorage
    const loanData = localStorage.getItem("acceptedLoanOffer")
    const appId = localStorage.getItem("applicationId") || `HOL-${Math.floor(100000 + Math.random() * 900000)}`

    if (loanData) {
      try {
        setSelectedLoan(JSON.parse(loanData))
      } catch (error) {
        console.error("Error parsing loan data:", error)
        // Fallback to a default loan if parsing fails
        setSelectedLoan({
          id: "default-loan",
          lender: "Commonwealth Bank",
          interestRate: 5.29,
          comparisonRate: 5.42,
          term: 30,
          monthlyPayment: 2768,
          totalLoanAmount: 500000,
          brokerFeeEstimate: 4500,
          loanType: "Variable Rate",
          recommended: true,
          features: [
            { name: "Offset Account", description: "100% offset account with no monthly fees", included: true },
            { name: "Redraw Facility", description: "Free unlimited redraws", included: true },
            { name: "Extra Repayments", description: "Make additional repayments without penalty", included: true },
          ],
          fees: {
            applicationFee: 600,
            ongoingFee: 8,
            dischargeFee: 350,
          },
        })
      }
    } else {
      // Fallback to a default loan if no loan data is found
      setSelectedLoan({
        id: "default-loan",
        lender: "Commonwealth Bank",
        interestRate: 5.29,
        comparisonRate: 5.42,
        term: 30,
        monthlyPayment: 2768,
        totalLoanAmount: 500000,
        brokerFeeEstimate: 4500,
        loanType: "Variable Rate",
        recommended: true,
        features: [
          { name: "Offset Account", description: "100% offset account with no monthly fees", included: true },
          { name: "Redraw Facility", description: "Free unlimited redraws", included: true },
          { name: "Extra Repayments", description: "Make additional repayments without penalty", included: true },
        ],
        fees: {
          applicationFee: 600,
          ongoingFee: 8,
          dischargeFee: 350,
        },
      })
    }

    setApplicationId(appId)
    localStorage.setItem("applicationId", appId)
    setLoading(false)
  }, [])

  const handleAcceptLoan = () => {
    setAcceptingLoan(true)

    // Save the acceptance date to localStorage
    localStorage.setItem("loanAcceptanceDate", new Date().toISOString())

    // Update the step to loan acceptance confirmation if application data exists
    const appData = localStorage.getItem("homeOnlineApplication")
    if (appData) {
      try {
        const parsedData = JSON.parse(appData)
        if (parsedData?.id) {
          saveCurrentStep(parsedData.id, LoanStep.LOAN_ACCEPTANCE_CONFIRMATION)
        }
      } catch (error) {
        console.error("Error updating application step:", error)
      }
    }

    // Redirect to loan acceptance confirmation page
    setTimeout(() => {
      router.push("/loan-acceptance-confirmation")
    }, 1000)
  }

  if (loading || !selectedLoan) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your loan details...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Image */}
      <div className="relative w-full h-64 md:h-80 mb-8 overflow-hidden rounded-lg">
        <Image
          src="/images/loan-acceptance-celebration.webp"
          alt="Person celebrating loan approval"
          fill
          style={{ objectFit: "cover" }}
          priority
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Loan Offer</h1>
            <p className="text-lg md:text-xl">One step closer to your financial goals</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Review and Accept</h2>
        <p className="text-gray-600">Review and accept your selected loan offer from {selectedLoan.lender}.</p>
      </div>

      <Card className="border-blue-200 shadow-lg mb-8">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{selectedLoan.lender}</CardTitle>
              <CardDescription className="text-base">{selectedLoan.loanType}</CardDescription>
            </div>
            {selectedLoan.recommended && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Recommended</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Interest Rate</h3>
              <p className="text-2xl font-semibold">{selectedLoan.interestRate}%</p>
              <p className="text-xs text-gray-500">Comparison rate: {selectedLoan.comparisonRate}%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Monthly Repayment</h3>
              <p className="text-2xl font-semibold">${selectedLoan.monthlyPayment}</p>
              <p className="text-xs text-gray-500">{selectedLoan.term} year term</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Loan Amount</h3>
              <p className="text-2xl font-semibold">${selectedLoan.totalLoanAmount.toLocaleString()}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-lg mb-3">Loan Features</h3>
            <div className="space-y-3">
              {selectedLoan.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  {feature.included ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <div className="h-5 w-5 border-2 border-red-300 rounded-full mt-0.5"></div>
                  )}
                  <div>
                    <p className="font-medium">{feature.name}</p>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-lg mb-3">Fees</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Application Fee</p>
                <p className="font-medium">${selectedLoan.fees.applicationFee}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Monthly Fee</p>
                <p className="font-medium">${selectedLoan.fees.ongoingFee}/month</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Discharge Fee</p>
                <p className="font-medium">${selectedLoan.fees.dischargeFee}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-lg mb-3">Broker Fee Estimate</h3>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">
                    Estimated broker fee: ${selectedLoan.brokerFeeEstimate.toLocaleString()}
                  </p>
                  <p className="text-sm text-yellow-700">
                    This fee is paid by the lender and does not affect your loan amount or repayments.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {selectedLoan.specialOffer && (
            <div className="mb-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">Special Offer</p>
                    <p className="text-sm text-green-700">{selectedLoan.specialOffer}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Important Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 rounded-full p-3 mt-0.5">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Settlement Timeline</h4>
              <p className="text-gray-600">
                After accepting this loan offer, the settlement process typically takes 2-4 weeks. You'll be guided
                through each step of the process.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 rounded-full p-3 mt-0.5">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Documentation Requirements</h4>
              <p className="text-gray-600">
                You'll need to provide additional documentation and sign formal loan documents before settlement. Our
                team will assist you with this process.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-amber-100 rounded-full p-3 mt-0.5">
              <Info className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Terms and Conditions</h4>
              <p className="text-gray-600">
                By accepting this loan offer, you agree to the lender's terms and conditions. Please review the Product
                Disclosure Statement before proceeding.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Application Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-2">
            Your application ID: <span className="font-bold">{applicationId}</span>
          </p>
          <p className="text-gray-700">
            Please reference this ID in all communications regarding your loan application.
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <Button size="lg" className="gap-2" onClick={handleAcceptLoan} disabled={acceptingLoan}>
          {acceptingLoan ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Processing...
            </>
          ) : (
            <>
              Accept Loan Offer <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>
        <Button variant="outline" size="lg" onClick={() => router.push("/loan-offer")} disabled={acceptingLoan}>
          Return to Loan Offers
        </Button>
      </div>

      <div className="text-center text-gray-500 text-sm mb-8">
        <p>
          Need help? Contact our loan specialists at 1800 123 456 or{" "}
          <a href="mailto:support@homeonline.com.au" className="text-blue-600 hover:underline">
            support@homeonline.com.au
          </a>
        </p>
      </div>
    </div>
  )
}
