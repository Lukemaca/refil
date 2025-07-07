"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, RefreshCw, PiggyBank, ArrowRight } from "lucide-react"
import { useLoanInfo } from "./LoanInfoContext"

export default function LoanInfoPage() {
  const router = useRouter()
  const { formData, updateFormData } = useLoanInfo()
  const [selectedType, setSelectedType] = useState(formData.loanType || "")

  const handleTypeSelect = (type: string) => {
    setSelectedType(type)
    updateFormData("loanType", type)
  }

  const handleContinue = () => {
    if (!selectedType) return

    // Update the loan type in context
    updateFormData("loanType", selectedType)

    // Navigate to personal info page
    router.push("/loan-info/personal")
  }

  const loanTypes = [
    {
      id: "first_home_buyer",
      title: "First Home Buyer",
      description: "I'm buying my first home",
      icon: PiggyBank,
      color: "bg-green-100 text-green-600",
      details: "Access first home buyer grants, schemes, and specialized loan products designed for first-time buyers.",
    },
    {
      id: "new_purchase",
      title: "New Home Purchase",
      description: "I'm buying a new property",
      icon: Home,
      color: "bg-blue-100 text-blue-600",
      details: "Find competitive rates for your next home purchase, whether it's upgrading or investing.",
    },
    {
      id: "refinance",
      title: "Refinance",
      description: "I want to refinance my current loan",
      icon: RefreshCw,
      color: "bg-purple-100 text-purple-600",
      details: "Switch to a better rate and potentially save thousands on your existing home loan.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">What type of home loan are you looking for?</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the option that best describes your situation so we can provide you with the most relevant loan
              options and guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {loanTypes.map((type) => {
              const Icon = type.icon
              return (
                <Card
                  key={type.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedType === type.id ? "border-blue-500 ring-2 ring-blue-200 shadow-md" : "hover:shadow-md"
                  }`}
                  onClick={() => handleTypeSelect(type.id)}
                >
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className={`p-4 rounded-full ${type.color}`}>
                        <Icon className="h-8 w-8" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                    <CardDescription className="text-base">{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-gray-600 mb-4">{type.details}</p>
                    {selectedType === type.id && (
                      <div className="flex justify-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center">
            <Button onClick={handleContinue} disabled={!selectedType} size="lg" className="px-8">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {selectedType && (
            <div className="mt-12">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedType === "first_home_buyer" && "First Home Buyer Benefits"}
                    {selectedType === "new_purchase" && "New Purchase Advantages"}
                    {selectedType === "refinance" && "Refinancing Benefits"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {selectedType === "first_home_buyer" && (
                      <>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Government Grants</h3>
                          <p className="text-gray-600">
                            Access First Home Owner Grant, stamp duty concessions, and other government assistance
                            programs.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Lower Deposit Options</h3>
                          <p className="text-gray-600">
                            Purchase with as little as 5% deposit through the First Home Loan Deposit Scheme.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Specialized Support</h3>
                          <p className="text-gray-600">
                            Get expert guidance through your first home buying journey with dedicated support.
                          </p>
                        </div>
                      </>
                    )}
                    {selectedType === "new_purchase" && (
                      <>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Competitive Rates</h3>
                          <p className="text-gray-600">
                            Access the most competitive rates from multiple lenders competing for your business.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Flexible Options</h3>
                          <p className="text-gray-600">
                            Choose from a wide range of loan features and repayment options to suit your needs.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Fast Approval</h3>
                          <p className="text-gray-600">
                            Get pre-approved quickly so you can bid with confidence at auctions and negotiations.
                          </p>
                        </div>
                      </>
                    )}
                    {selectedType === "refinance" && (
                      <>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Lower Interest Rates</h3>
                          <p className="text-gray-600">
                            Switch to a lower rate and potentially save thousands per year on your repayments.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Better Features</h3>
                          <p className="text-gray-600">
                            Access better loan features like offset accounts, redraw facilities, and fee waivers.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Cash Out Options</h3>
                          <p className="text-gray-600">
                            Access your home equity for renovations, investments, or debt consolidation.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
