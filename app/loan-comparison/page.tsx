"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Star, DollarSign, Percent, Clock, ThumbsUp } from "lucide-react"
import { LoanStep, saveCurrentStep } from "@/lib/step-tracker"
import Header from "../components/Header"
import Footer from "../components/Footer"

interface LoanOffer {
  id: string
  lender: string
  interestRate: number
  term: number
  monthlyPayment: number
  totalLoanAmount: number
  brokerFeeEstimate: number
  features: string[]
  recommended: boolean
}

export default function LoanComparisonPage() {
  const router = useRouter()
  const [applicationData, setApplicationData] = useState<any>(null)
  const [selectedOfferIds, setSelectedOfferIds] = useState<string[]>([])
  const [selectedOffers, setSelectedOffers] = useState<LoanOffer[]>([])
  const [finalSelectedOffer, setFinalSelectedOffer] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get the current application data and selected offers
    const appData = localStorage.getItem("homeOnlineApplication")
    const offerIds = localStorage.getItem("selectedLoanOffers")

    if (appData) {
      const parsedData = JSON.parse(appData)
      setApplicationData(parsedData)

      if (offerIds) {
        try {
          const parsedOfferIds = JSON.parse(offerIds)
          setSelectedOfferIds(parsedOfferIds)

          // Generate sample loan offers based on application data
          const loanAmount = parsedData.data?.loanAmount || 500000

          const allOffers: LoanOffer[] = [
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
            {
              id: "offer-4",
              lender: "Metro Finance",
              interestRate: 4.3,
              term: 30,
              monthlyPayment: Math.round(loanAmount * 0.00495 * 100) / 100,
              totalLoanAmount: loanAmount,
              brokerFeeEstimate: Math.round(loanAmount * 0.0098),
              features: ["No ongoing fees", "Split loan option", "Interest offset"],
              recommended: false,
            },
            {
              id: "offer-5",
              lender: "Pacific Lending",
              interestRate: 4.2,
              term: 30,
              monthlyPayment: Math.round(loanAmount * 0.0049 * 100) / 100,
              totalLoanAmount: loanAmount,
              brokerFeeEstimate: Math.round(loanAmount * 0.0102),
              features: ["Cashback offer", "Free refinancing", "Mobile app"],
              recommended: false,
            },
          ]

          // Filter offers to only include selected ones
          const filteredOffers = allOffers.filter((offer) => parsedOfferIds.includes(offer.id))
          setSelectedOffers(filteredOffers)

          // Pre-select the recommended offer if it's in the selected offers
          const recommendedOffer = filteredOffers.find((offer) => offer.recommended)
          if (recommendedOffer) {
            setFinalSelectedOffer(recommendedOffer.id)
          }
        } catch (error) {
          console.error("Error parsing selected offers:", error)
        }
      }
    }
    setLoading(false)
  }, [])

  const handleSelectFinalOffer = (offerId: string) => {
    setFinalSelectedOffer(offerId)
  }

  const handleContinue = () => {
    if (applicationData?.id && finalSelectedOffer) {
      try {
        // Save final selected offer to localStorage
        localStorage.setItem("finalSelectedLoanOffer", finalSelectedOffer)

        // Update the step to loan acceptance
        saveCurrentStep(applicationData.id, LoanStep.LOAN_ACCEPTANCE)

        // Redirect to loan acceptance page
        router.push("/loan-acceptance")
      } catch (error) {
        console.error("Error saving final selected offer:", error)
        // Fallback navigation
        window.location.href = "/loan-acceptance"
      }
    }
  }

  const handleBackToOffers = () => {
    router.push("/loan-offer")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your selected loan offers...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (selectedOffers.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>No Loan Offers Selected</CardTitle>
              <CardDescription>
                You haven't selected any loan offers to compare. Please go back to the loan offers page to select
                offers.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={handleBackToOffers} className="w-full">
                View Loan Offers
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Compare Your Selected Loan Offers</h1>
            <p className="text-gray-600">
              Review the details of your selected loan offers side by side. Choose the one that best meets your needs.
            </p>
          </div>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left font-medium text-gray-600 border-b">Feature</th>
                  {selectedOffers.map((offer) => (
                    <th key={offer.id} className="p-4 text-left font-medium text-gray-600 border-b min-w-[200px]">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-black">{offer.lender}</span>
                        <span className="text-sm font-normal">{offer.term}-Year Fixed Rate</span>
                        {offer.recommended && (
                          <span className="inline-flex items-center text-xs text-blue-600 font-medium">
                            <Star className="h-3 w-3 fill-blue-600 mr-1" /> Recommended
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b font-medium">Interest Rate</td>
                  {selectedOffers.map((offer) => (
                    <td key={offer.id} className="p-4 border-b">
                      <div className="flex items-center">
                        <Percent className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="font-bold">{offer.interestRate}%</span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b font-medium">Monthly Payment</td>
                  {selectedOffers.map((offer) => (
                    <td key={offer.id} className="p-4 border-b">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="font-bold">${offer.monthlyPayment.toLocaleString()}</span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b font-medium">Loan Term</td>
                  {selectedOffers.map((offer) => (
                    <td key={offer.id} className="p-4 border-b">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-blue-600 mr-2" />
                        <span>{offer.term} Years</span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b font-medium">Broker Fee Estimate</td>
                  {selectedOffers.map((offer) => (
                    <td key={offer.id} className="p-4 border-b">
                      <span>${offer.brokerFeeEstimate.toLocaleString()}</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b font-medium">Features</td>
                  {selectedOffers.map((offer) => (
                    <td key={offer.id} className="p-4 border-b">
                      <ul className="space-y-1">
                        {offer.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b font-medium">Total Cost (30 years)</td>
                  {selectedOffers.map((offer) => (
                    <td key={offer.id} className="p-4 border-b">
                      <span className="font-bold">${(offer.monthlyPayment * 12 * offer.term).toLocaleString()}</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4"></td>
                  {selectedOffers.map((offer) => (
                    <td key={offer.id} className="p-4">
                      <Button
                        variant={finalSelectedOffer === offer.id ? "default" : "outline"}
                        className="w-full"
                        onClick={() => handleSelectFinalOffer(offer.id)}
                      >
                        {finalSelectedOffer === offer.id ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" /> Selected
                          </>
                        ) : (
                          "Select This Offer"
                        )}
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center gap-3">
            {finalSelectedOffer && (
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-4 max-w-md text-center">
                <div className="flex justify-center mb-2">
                  <div className="bg-green-100 rounded-full p-2">
                    <ThumbsUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h3 className="font-medium text-green-800 mb-1">Great Choice!</h3>
                <p className="text-green-700 text-sm">
                  You've selected {selectedOffers.find((o) => o.id === finalSelectedOffer)?.lender}. Click continue to
                  proceed with this offer.
                </p>
              </div>
            )}

            <div className="flex gap-4">
              <Button variant="outline" onClick={handleBackToOffers}>
                Back to All Offers
              </Button>
              <Button onClick={handleContinue} size="lg" className="gap-2 px-8" disabled={!finalSelectedOffer}>
                Continue with Selected Offer <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
