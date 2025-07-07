"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, RefreshCw, PiggyBank } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function LoanApplicationPage() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
  }

  const handleContinue = () => {
    if (selectedOption === "new") {
      router.push("/loan-application/gamified?type=new")
    } else if (selectedOption === "refinance") {
      router.push("/loan-application/gamified?type=refinance")
    } else if (selectedOption === "firstTime") {
      router.push("/loan-application/gamified?type=firstTime")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Start Your Home Loan Journey</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the option that best describes your current situation to get personalized guidance and the most
              competitive home loan options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedOption === "firstTime" ? "border-blue-500 ring-2 ring-blue-200" : ""
              }`}
              onClick={() => handleOptionSelect("firstTime")}
            >
              <CardHeader>
                <div className="flex justify-center mb-2">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <PiggyBank className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <CardTitle className="text-center">First Home Buyer</CardTitle>
                <CardDescription className="text-center">I'm buying my first home</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-sm text-gray-500">
                <p>
                  Get guidance on first home buyer grants, schemes, and find the perfect loan for your first property
                  purchase.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center pt-0">
                {selectedOption === "firstTime" && (
                  <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                )}
              </CardFooter>
            </Card>

            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedOption === "new" ? "border-blue-500 ring-2 ring-blue-200" : ""
              }`}
              onClick={() => handleOptionSelect("new")}
            >
              <CardHeader>
                <div className="flex justify-center mb-2">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Home className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <CardTitle className="text-center">New Purchase</CardTitle>
                <CardDescription className="text-center">I'm buying a new property</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-sm text-gray-500">
                <p>
                  Compare competitive home loan options for your next property purchase, whether it's your next home or
                  an investment.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center pt-0">
                {selectedOption === "new" && <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>}
              </CardFooter>
            </Card>

            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedOption === "refinance" ? "border-blue-500 ring-2 ring-blue-200" : ""
              }`}
              onClick={() => handleOptionSelect("refinance")}
            >
              <CardHeader>
                <div className="flex justify-center mb-2">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <RefreshCw className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <CardTitle className="text-center">Refinance</CardTitle>
                <CardDescription className="text-center">I want to refinance my current loan</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-sm text-gray-500">
                <p>
                  Find a better deal on your existing home loan, potentially saving thousands in interest and fees over
                  the life of your loan.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center pt-0">
                {selectedOption === "refinance" && (
                  <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                )}
              </CardFooter>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button onClick={handleContinue} disabled={!selectedOption} size="lg" className="px-8">
              Continue
            </Button>
          </div>

          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Why Apply for Your Home Loan with Refii?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Banks Compete For Your Loan</h3>
                    <p className="text-gray-600">
                      Instead of you shopping around, lenders compete for your home loan, offering better rates and
                      terms.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Save Time & Money</h3>
                    <p className="text-gray-600">
                      Get multiple loan offers without the hassle of applying to each lender individually.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">100% Transparent Process</h3>
                    <p className="text-gray-600">
                      See every step of your home loan journey with no hidden fees or surprises.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
