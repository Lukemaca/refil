"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  CheckCircle,
  Star,
  Info,
  ChevronDown,
  ChevronUp,
  Download,
  Plus,
  Minus,
  Shield,
  Zap,
  Wallet,
} from "lucide-react"
import { LoanStep, saveCurrentStep } from "@/lib/step-tracker"
import Header from "../components/Header"
import Footer from "../components/Footer"

interface LoanFeature {
  name: string
  description: string
  included: boolean
}

interface LoanOffer {
  id: string
  lender: string
  logo?: string
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
  maxLVR: number
  recommended: boolean
  specialOffer?: string
  offsetAccount: boolean
  redrawFacility: boolean
  extraRepayments: boolean
}

export default function LoanOfferPage() {
  const router = useRouter()
  const [applicationData, setApplicationData] = useState<any>(null)
  const [loanOffers, setLoanOffers] = useState<LoanOffer[]>([])
  const [selectedOffers, setSelectedOffers] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedOffers, setExpandedOffers] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [showSelectionModal, setShowSelectionModal] = useState(false)
  const [selectionAction, setSelectionAction] = useState<"apply" | "compare">("apply")

  useEffect(() => {
    // Get application data from localStorage if available
    try {
      const appData = localStorage.getItem("homeOnlineApplication")
      if (appData) {
        setApplicationData(JSON.parse(appData))
      }
    } catch (error) {
      console.error("Error parsing application data:", error)
    }

    // Default loan amount if not found in application data
    const loanAmount = 500000

    // Generate loan offers
    const offers: LoanOffer[] = [
      {
        id: "loan-1",
        lender: "Commonwealth Bank",
        interestRate: 5.29,
        comparisonRate: 5.42,
        term: 30,
        monthlyPayment: 2768,
        totalLoanAmount: loanAmount,
        brokerFeeEstimate: 4500,
        loanType: "Variable Rate",
        maxLVR: 80,
        recommended: true,
        specialOffer: "$2,000 cashback for refinancers",
        offsetAccount: true,
        redrawFacility: true,
        extraRepayments: true,
        features: [
          { name: "Offset Account", description: "100% offset account with no monthly fees", included: true },
          { name: "Redraw Facility", description: "Free unlimited redraws", included: true },
          { name: "Extra Repayments", description: "Make additional repayments without penalty", included: true },
          { name: "Split Loan Option", description: "Split between variable and fixed rates", included: true },
          { name: "Repayment Holiday", description: "Pause repayments during financial hardship", included: true },
        ],
        fees: {
          applicationFee: 600,
          ongoingFee: 8,
          dischargeFee: 350,
        },
      },
      {
        id: "loan-2",
        lender: "Westpac",
        interestRate: 5.34,
        comparisonRate: 5.48,
        term: 30,
        monthlyPayment: 2789,
        totalLoanAmount: loanAmount,
        brokerFeeEstimate: 4200,
        loanType: "Fixed Rate (2 Year)",
        maxLVR: 85,
        recommended: false,
        offsetAccount: true,
        redrawFacility: false,
        extraRepayments: true,
        features: [
          { name: "Offset Account", description: "Partial offset account (40%)", included: true },
          { name: "Redraw Facility", description: "Limited redraws during fixed period", included: false },
          { name: "Extra Repayments", description: "Up to $30,000 during fixed period", included: true },
          { name: "Split Loan Option", description: "Split between variable and fixed rates", included: true },
          { name: "Repayment Holiday", description: "Not available during fixed period", included: false },
        ],
        fees: {
          applicationFee: 700,
          ongoingFee: 10,
          dischargeFee: 300,
        },
      },
      {
        id: "loan-3",
        lender: "ANZ",
        interestRate: 5.19,
        comparisonRate: 5.31,
        term: 30,
        monthlyPayment: 2732,
        totalLoanAmount: loanAmount,
        brokerFeeEstimate: 4800,
        loanType: "Variable Rate",
        maxLVR: 80,
        recommended: false,
        offsetAccount: true,
        redrawFacility: true,
        extraRepayments: true,
        features: [
          { name: "Offset Account", description: "100% offset account with no monthly fees", included: true },
          { name: "Redraw Facility", description: "Free unlimited redraws", included: true },
          { name: "Extra Repayments", description: "Make additional repayments without penalty", included: true },
          { name: "Split Loan Option", description: "Split between variable and fixed rates", included: true },
          { name: "Repayment Holiday", description: "Pause repayments during financial hardship", included: true },
        ],
        fees: {
          applicationFee: 500,
          ongoingFee: 0,
          dischargeFee: 400,
        },
      },
      {
        id: "loan-4",
        lender: "NAB",
        interestRate: 5.24,
        comparisonRate: 5.36,
        term: 30,
        monthlyPayment: 2749,
        totalLoanAmount: loanAmount,
        brokerFeeEstimate: 4300,
        loanType: "Variable Rate",
        maxLVR: 90,
        recommended: false,
        specialOffer: "Fee-free for first home buyers",
        offsetAccount: true,
        redrawFacility: true,
        extraRepayments: true,
        features: [
          { name: "Offset Account", description: "100% offset account with no monthly fees", included: true },
          { name: "Redraw Facility", description: "Free unlimited redraws", included: true },
          { name: "Extra Repayments", description: "Make additional repayments without penalty", included: true },
          { name: "Split Loan Option", description: "Split between variable and fixed rates", included: true },
          { name: "Repayment Holiday", description: "Pause repayments during financial hardship", included: false },
        ],
        fees: {
          applicationFee: 600,
          ongoingFee: 0,
          dischargeFee: 350,
        },
      },
      {
        id: "loan-5",
        lender: "ING",
        interestRate: 5.14,
        comparisonRate: 5.22,
        term: 30,
        monthlyPayment: 2717,
        totalLoanAmount: loanAmount,
        brokerFeeEstimate: 3900,
        loanType: "Variable Rate",
        maxLVR: 80,
        recommended: true,
        offsetAccount: true,
        redrawFacility: true,
        extraRepayments: true,
        features: [
          { name: "Offset Account", description: "100% offset account with no monthly fees", included: true },
          { name: "Redraw Facility", description: "Free unlimited redraws", included: true },
          { name: "Extra Repayments", description: "Make additional repayments without penalty", included: true },
          { name: "Split Loan Option", description: "Split between variable and fixed rates", included: false },
          { name: "Repayment Holiday", description: "Pause repayments during financial hardship", included: false },
        ],
        fees: {
          applicationFee: 0,
          ongoingFee: 0,
          dischargeFee: 300,
        },
      },
      {
        id: "loan-6",
        lender: "Macquarie Bank",
        interestRate: 5.09,
        comparisonRate: 5.18,
        term: 30,
        monthlyPayment: 2702,
        totalLoanAmount: loanAmount,
        brokerFeeEstimate: 5200,
        loanType: "Variable Rate",
        maxLVR: 70,
        recommended: false,
        specialOffer: "Free property reports and valuations",
        offsetAccount: true,
        redrawFacility: true,
        extraRepayments: true,
        features: [
          { name: "Offset Account", description: "Up to 10 offset accounts with no monthly fees", included: true },
          { name: "Redraw Facility", description: "Free unlimited redraws", included: true },
          { name: "Extra Repayments", description: "Make additional repayments without penalty", included: true },
          { name: "Split Loan Option", description: "Split between variable and fixed rates", included: true },
          { name: "Repayment Holiday", description: "Pause repayments during financial hardship", included: true },
        ],
        fees: {
          applicationFee: 0,
          ongoingFee: 0,
          dischargeFee: 250,
        },
      },
      {
        id: "loan-7",
        lender: "St. George",
        interestRate: 5.39,
        comparisonRate: 5.52,
        term: 30,
        monthlyPayment: 2805,
        totalLoanAmount: loanAmount,
        brokerFeeEstimate: 4100,
        loanType: "Fixed Rate (3 Year)",
        maxLVR: 85,
        recommended: false,
        offsetAccount: false,
        redrawFacility: false,
        extraRepayments: true,
        features: [
          { name: "Offset Account", description: "Not available during fixed period", included: false },
          { name: "Redraw Facility", description: "Not available during fixed period", included: false },
          { name: "Extra Repayments", description: "Up to $10,000 per year during fixed period", included: true },
          { name: "Split Loan Option", description: "Split between variable and fixed rates", included: true },
          { name: "Repayment Holiday", description: "Not available during fixed period", included: false },
        ],
        fees: {
          applicationFee: 600,
          ongoingFee: 8,
          dischargeFee: 350,
        },
      },
      {
        id: "loan-8",
        lender: "Bankwest",
        interestRate: 5.22,
        comparisonRate: 5.34,
        term: 30,
        monthlyPayment: 2744,
        totalLoanAmount: loanAmount,
        brokerFeeEstimate: 4000,
        loanType: "Variable Rate",
        maxLVR: 80,
        recommended: false,
        offsetAccount: true,
        redrawFacility: true,
        extraRepayments: true,
        features: [
          { name: "Offset Account", description: "100% offset account with no monthly fees", included: true },
          { name: "Redraw Facility", description: "Free unlimited redraws", included: true },
          { name: "Extra Repayments", description: "Make additional repayments without penalty", included: true },
          { name: "Split Loan Option", description: "Split between variable and fixed rates", included: true },
          { name: "Repayment Holiday", description: "Pause repayments during financial hardship", included: false },
        ],
        fees: {
          applicationFee: 0,
          ongoingFee: 12,
          dischargeFee: 300,
        },
      },
    ]

    setLoanOffers(offers)
    setLoading(false)
  }, [])

  const toggleOfferExpansion = (offerId: string) => {
    setExpandedOffers((prev) => (prev.includes(offerId) ? prev.filter((id) => id !== offerId) : [...prev, offerId]))
  }

  const toggleOfferSelection = (offerId: string) => {
    setSelectedOffers((prev) => (prev.includes(offerId) ? prev.filter((id) => id !== offerId) : [...prev, offerId]))
  }

  const handleApplyNow = (offerId: string) => {
    // Select only this offer
    setSelectedOffers([offerId])
    setSelectionAction("apply")
    setShowSelectionModal(true)
  }

  const handleCompare = (offerId: string) => {
    // Add this offer to selection if not already selected
    if (!selectedOffers.includes(offerId)) {
      setSelectedOffers((prev) => [...prev, offerId])
    }
    setSelectionAction("compare")
    setShowSelectionModal(true)
  }

  const handleConfirmSelection = () => {
    if (selectionAction === "apply" && selectedOffers.length > 0) {
      // Save the selected offer to localStorage
      const selectedOffer = loanOffers.find((offer) => offer.id === selectedOffers[0])
      if (selectedOffer) {
        localStorage.setItem("acceptedLoanOffer", JSON.stringify(selectedOffer))

        // Update application step if application data exists
        if (applicationData?.id) {
          saveCurrentStep(applicationData.id, LoanStep.LOAN_ACCEPTANCE)
        }

        // Navigate to loan acceptance page
        router.push("/loan-acceptance")
      }
    } else if (selectionAction === "compare" && selectedOffers.length > 0) {
      // Save selected offers for comparison
      localStorage.setItem("comparisonOffers", JSON.stringify(selectedOffers))

      // Navigate to comparison page
      router.push("/loan-comparison/compare")
    }

    setShowSelectionModal(false)
  }

  const filteredOffers =
    activeTab === "all"
      ? loanOffers
      : activeTab === "variable"
        ? loanOffers.filter((offer) => offer.loanType.includes("Variable"))
        : loanOffers.filter((offer) => offer.loanType.includes("Fixed"))

  const isOfferExpanded = (offerId: string) => expandedOffers.includes(offerId)
  const isOfferSelected = (offerId: string) => selectedOffers.includes(offerId)

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Finding the best loan offers for you...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Personalised Loan Offers</h1>
            <p className="text-gray-600">
              Based on your information, we've found {loanOffers.length} loan options that match your needs. Compare and
              select the best option for you.
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-8">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-800">Understanding Comparison Rates</h3>
                <p className="text-blue-700 text-sm">
                  The comparison rate includes the interest rate plus most fees and charges. It helps you compare the
                  true cost of loans. Comparison rates are calculated based on a $150,000 loan over 25 years.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <Tabs defaultValue="all" className="w-full max-w-md" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="all">All Loans</TabsTrigger>
                <TabsTrigger value="variable">Variable Rate</TabsTrigger>
                <TabsTrigger value="fixed">Fixed Rate</TabsTrigger>
              </TabsList>
            </Tabs>

            {selectedOffers.length > 0 && (
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setSelectedOffers([])}>
                  Clear Selection ({selectedOffers.length})
                </Button>
                <Button
                  onClick={() => {
                    setSelectionAction("compare")
                    setShowSelectionModal(true)
                  }}
                >
                  Compare Selected
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {filteredOffers.map((offer) => (
              <Card
                key={offer.id}
                className={`border-2 ${isOfferSelected(offer.id) ? "border-blue-500" : offer.recommended ? "border-green-200" : "border-gray-200"}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{offer.lender}</CardTitle>
                      <CardDescription>{offer.loanType}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {offer.recommended && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
                          <Star className="h-3 w-3 fill-green-800" /> Recommended
                        </Badge>
                      )}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`select-${offer.id}`}
                          checked={isOfferSelected(offer.id)}
                          onChange={() => toggleOfferSelection(offer.id)}
                          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`select-${offer.id}`} className="ml-2 text-sm text-gray-700">
                          Select
                        </label>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Interest Rate</p>
                      <p className="text-2xl font-semibold">{offer.interestRate}%</p>
                      <p className="text-xs text-gray-500">Comparison rate: {offer.comparisonRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Monthly Repayment</p>
                      <p className="text-2xl font-semibold">${offer.monthlyPayment}</p>
                      <p className="text-xs text-gray-500">{offer.term} year term</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Broker Fee Estimate</p>
                      <p className="text-2xl font-semibold">${offer.brokerFeeEstimate}</p>
                      <p className="text-xs text-gray-500">Based on loan amount</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Max LVR</p>
                      <p className="text-2xl font-semibold">{offer.maxLVR}%</p>
                      <p className="text-xs text-gray-500">Loan to Value Ratio</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {offer.offsetAccount && (
                      <Badge variant="outline" className="bg-blue-50">
                        <Wallet className="h-3 w-3 mr-1" /> Offset Account
                      </Badge>
                    )}
                    {offer.redrawFacility && (
                      <Badge variant="outline" className="bg-purple-50">
                        <Zap className="h-3 w-3 mr-1" /> Redraw Facility
                      </Badge>
                    )}
                    {offer.extraRepayments && (
                      <Badge variant="outline" className="bg-green-50">
                        <Plus className="h-3 w-3 mr-1" /> Extra Repayments
                      </Badge>
                    )}
                    {offer.specialOffer && (
                      <Badge variant="outline" className="bg-yellow-50">
                        <Shield className="h-3 w-3 mr-1" /> {offer.specialOffer}
                      </Badge>
                    )}
                  </div>

                  {isOfferExpanded(offer.id) && (
                    <div className="mt-6 space-y-6">
                      <div>
                        <h4 className="font-medium text-lg mb-3">Loan Features</h4>
                        <div className="space-y-3">
                          {offer.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-2">
                              {feature.included ? (
                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                              ) : (
                                <Minus className="h-5 w-5 text-red-600 mt-0.5" />
                              )}
                              <div>
                                <p className="font-medium">{feature.name}</p>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-lg mb-3">Fees</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-sm text-gray-500">Application Fee</p>
                            <p className="font-medium">${offer.fees.applicationFee}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-sm text-gray-500">Monthly Fee</p>
                            <p className="font-medium">${offer.fees.ongoingFee}/month</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-sm text-gray-500">Discharge Fee</p>
                            <p className="font-medium">${offer.fees.dischargeFee}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button variant="outline" size="sm" className="gap-1" asChild>
                          <Link href={`/lender-details/${offer.lender.toLowerCase().replace(/\s+/g, "-")}`}>
                            <Info className="h-4 w-4" /> Lender Details
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-4 w-4" /> Product Disclosure Statement
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 border-t pt-4">
                  <Button variant="ghost" onClick={() => toggleOfferExpansion(offer.id)} className="w-full sm:w-auto">
                    {isOfferExpanded(offer.id) ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-2" /> Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-2" /> Show More Details
                      </>
                    )}
                  </Button>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto" onClick={() => handleCompare(offer.id)}>
                      Compare
                    </Button>
                    <Button className="w-full sm:w-auto" onClick={() => handleApplyNow(offer.id)}>
                      Apply Now
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Need Help Choosing?</h3>
            <p className="text-gray-700 mb-4">
              Our loan specialists are available to help you understand your options and choose the best loan for your
              needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" asChild>
                <Link href="/loan-calculator">
                  <Calculator className="h-4 w-4 mr-2" /> Loan Calculator
                </Link>
              </Button>
              <Button asChild>
                <Link href="/contact-specialist">
                  <Phone className="h-4 w-4 mr-2" /> Speak to a Specialist
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={showSelectionModal} onOpenChange={setShowSelectionModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectionAction === "apply" ? "Confirm Loan Application" : "Compare Selected Loans"}
            </DialogTitle>
            <DialogDescription>
              {selectionAction === "apply"
                ? "You're about to proceed with your loan application."
                : `You've selected ${selectedOffers.length} loans to compare.`}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <h4 className="font-medium mb-3">Selected Loans:</h4>
            <div className="space-y-3">
              {selectedOffers.map((offerId) => {
                const offer = loanOffers.find((o) => o.id === offerId)
                return offer ? (
                  <div key={offerId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{offer.lender}</p>
                      <p className="text-sm text-gray-600">{offer.loanType}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{offer.interestRate}%</p>
                      <p className="text-sm text-gray-600">${offer.monthlyPayment}/mo</p>
                    </div>
                  </div>
                ) : null
              })}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSelectionModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmSelection}>
              {selectionAction === "apply" ? "Proceed with Application" : "Compare Loans"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}

function Calculator(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  )
}

function Phone(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
