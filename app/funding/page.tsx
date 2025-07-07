"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, ArrowRight, Home, Calendar, DollarSign } from "lucide-react"
import { LoanStep, saveCurrentStep } from "@/lib/step-tracker"
import Header from "../components/Header"
import Footer from "../components/Footer"

interface FundingStep {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "complete"
  date?: string
}

export default function FundingPage() {
  const router = useRouter()
  const [applicationData, setApplicationData] = useState<any>(null)
  const [selectedOffer, setSelectedOffer] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [fundingSteps, setFundingSteps] = useState<FundingStep[]>([
    {
      id: "processing",
      title: "Loan Processing",
      description: "Final review of all signed documents",
      status: "complete",
      date: new Date().toLocaleDateString(),
    },
    {
      id: "funding",
      title: "Loan Funding",
      description: "Funds are transferred to the settlement agent",
      status: "in-progress",
    },
    {
      id: "closing",
      title: "Closing",
      description: "Final settlement and property transfer",
      status: "pending",
    },
    {
      id: "recording",
      title: "Recording",
      description: "Loan documents are recorded with the county",
      status: "pending",
    },
  ])
  const [overallProgress, setOverallProgress] = useState(25)

  useEffect(() => {
    // Get the current application data
    const appData = localStorage.getItem("homeOnlineApplication")
    const offerId = localStorage.getItem("selectedLoanOffer")

    if (appData) {
      const parsedData = JSON.parse(appData)
      setApplicationData(parsedData)

      // Generate sample loan offers based on application data
      const loanAmount = parsedData.data?.loanAmount || 500000

      const sampleOffers = [
        {
          id: "offer-1",
          lender: "HomeBank",
          interestRate: 4.25,
          term: 30,
          monthlyPayment: Math.round(loanAmount * 0.00492 * 100) / 100,
          totalLoanAmount: loanAmount,
          brokerFeeEstimate: Math.round(loanAmount * 0.01),
          features: ["No application fee", "Free property valuation", "Offset account"],
          recommended: true,
        },
        {
          id: "offer-2",
          lender: "National Mortgage",
          interestRate: 4.15,
          term: 30,
          monthlyPayment: Math.round(loanAmount * 0.00486 * 100) / 100,
          totalLoanAmount: loanAmount,
          brokerFeeEstimate: Math.round(loanAmount * 0.0095),
          features: ["Low interest rate", "Online account management"],
          recommended: false,
        },
        {
          id: "offer-3",
          lender: "City Loans",
          interestRate: 4.35,
          term: 30,
          monthlyPayment: Math.round(loanAmount * 0.00498 * 100) / 100,
          totalLoanAmount: loanAmount,
          brokerFeeEstimate: Math.round(loanAmount * 0.0105),
          features: ["Fast approval", "Flexible repayment options", "No early repayment fees"],
          recommended: false,
        },
      ]

      // Find the selected offer
      if (offerId) {
        const offer = sampleOffers.find((o) => o.id === offerId)
        if (offer) {
          setSelectedOffer(offer)
        }
      }
    }
    setLoading(false)

    // Simulate funding progress
    const interval = setInterval(() => {
      setFundingSteps((prevSteps) => {
        const newSteps = [...prevSteps]

        // Find the first step that's in progress
        const inProgressIndex = newSteps.findIndex((step) => step.status === "in-progress")

        if (inProgressIndex !== -1 && Math.random() > 0.7) {
          // Complete the current step
          newSteps[inProgressIndex] = {
            ...newSteps[inProgressIndex],
            status: "complete",
            date: new Date().toLocaleDateString(),
          }

          // Start the next step if there is one
          if (inProgressIndex < newSteps.length - 1) {
            newSteps[inProgressIndex + 1] = {
              ...newSteps[inProgressIndex + 1],
              status: "in-progress",
            }
          }

          // Update overall progress
          setOverallProgress((prev) => Math.min(100, prev + 25))
        }

        return newSteps
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleContinue = () => {
    if (applicationData?.id) {
      // Update the step to completed
      saveCurrentStep(applicationData.id, LoanStep.COMPLETED)

      // Redirect to completed page
      router.push("/loan-completed")
    }
  }

  const isComplete = fundingSteps.every((step) => step.status === "complete")

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your funding status...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Loan Funding & Closing</h1>
            <p className="text-gray-600">Track the progress of your loan funding and closing process.</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Funding Progress</CardTitle>
              <CardDescription>Your loan is in the final stages of the funding and closing process.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{overallProgress}%</span>
                </div>
                <Progress value={overallProgress} className="h-2" />
              </div>

              <div className="space-y-6">
                {fundingSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-start space-x-3 p-4 rounded-lg border ${
                      step.status === "complete"
                        ? "bg-green-50 border-green-200"
                        : step.status === "in-progress"
                          ? "bg-blue-50 border-blue-200"
                          : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div
                      className={`rounded-full p-2 mt-0.5 ${
                        step.status === "complete"
                          ? "bg-green-100"
                          : step.status === "in-progress"
                            ? "bg-blue-100"
                            : "bg-gray-100"
                      }`}
                    >
                      {step.status === "complete" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : step.status === "in-progress" ? (
                        <Clock className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{step.title}</h4>
                        {step.date && <span className="text-sm text-gray-500">{step.date}</span>}
                      </div>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                      {step.status === "in-progress" && (
                        <div className="mt-2 text-blue-600 text-sm">
                          <Clock className="h-4 w-4 inline mr-1" />
                          <span>In progress</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {isComplete && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-medium text-green-800 mb-2">Funding Complete!</h3>
                  <p className="text-green-700">
                    Congratulations! Your loan has been fully funded and the closing process is complete. You are now
                    the proud owner of your new home.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {selectedOffer && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Loan Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-sm">Loan Amount</span>
                    </div>
                    <div className="text-xl font-bold">${selectedOffer.totalLoanAmount.toLocaleString()}</div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">First Payment Due</span>
                    </div>
                    <div className="text-xl font-bold">
                      {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Home className="h-4 w-4" />
                      <span className="text-sm">Broker Fee Estimate</span>
                    </div>
                    <div className="text-xl font-bold">${selectedOffer.brokerFeeEstimate.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-center">
            <Button onClick={handleContinue} size="lg" className="gap-2" disabled={!isComplete}>
              {isComplete ? "View Loan Summary" : "Please Wait for Completion"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
