"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, Check, Info, Star, Percent, Clock, DollarSign, BarChart4 } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function LoanComparisonContent() {
  const router = useRouter()
  const [loanType, setLoanType] = useState<string>("refinance")
  const [loanAmount, setLoanAmount] = useState(500000)
  const [propertyValue, setPropertyValue] = useState(650000)
  const [loanTerm, setLoanTerm] = useState(30)
  const [isLoading, setIsLoading] = useState(false)

  // Retrieve the selected loan type from localStorage on component mount
  useEffect(() => {
    const storedLoanType = localStorage.getItem("selectedLoanType")
    if (storedLoanType) {
      setLoanType(storedLoanType)
    }
  }, [])

  const handleStartApplication = () => {
    setIsLoading(true)

    // Store the loan amount and property value in localStorage
    localStorage.setItem("loanAmount", loanAmount.toString())
    localStorage.setItem("propertyValue", propertyValue.toString())
    localStorage.setItem("loanTerm", loanTerm.toString())

    setTimeout(() => {
      setIsLoading(false)

      // Redirect to the appropriate application form based on loan type
      if (loanType === "new") {
        router.push("/loan-application/gamified")
      } else if (loanType === "refinance") {
        router.push("/loan-application/gamified?type=refinance")
      } else if (loanType === "firstTime") {
        router.push("/loan-application/gamified?type=firstTime")
      }
    }, 800)
  }

  // Mock loan data
  const loans = [
    {
      id: "loan1",
      lender: "Commonwealth Bank",
      rate: 5.19,
      comparison: 5.45,
      monthly: 2734,
      fees: 395,
      features: ["Offset Account", "Redraw Facility", "Extra Repayments"],
      brokerFee: 9500,
      rating: 4.5,
      reviews: 320,
      popular: true,
    },
    {
      id: "loan2",
      lender: "Westpac",
      rate: 5.24,
      comparison: 5.49,
      monthly: 2756,
      fees: 295,
      features: ["Offset Account", "Redraw Facility"],
      brokerFee: 8750,
      rating: 4.3,
      reviews: 285,
    },
    {
      id: "loan3",
      lender: "NAB",
      rate: 5.29,
      comparison: 5.52,
      monthly: 2772,
      fees: 0,
      features: ["No Annual Fee", "Redraw Facility", "Extra Repayments"],
      brokerFee: 9000,
      rating: 4.4,
      reviews: 310,
    },
    {
      id: "loan4",
      lender: "ANZ",
      rate: 5.34,
      comparison: 5.58,
      monthly: 2789,
      fees: 395,
      features: ["Offset Account", "Redraw Facility", "Extra Repayments"],
      brokerFee: 8500,
      rating: 4.2,
      reviews: 275,
    },
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Application Start Banner */}
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl font-bold text-blue-900">
                    {loanType === "refinance"
                      ? "Ready to refinance your home loan?"
                      : loanType === "firstTime"
                        ? "Ready to apply for your first home loan?"
                        : "Ready to apply for your new home loan?"}
                  </h2>
                  <p className="text-blue-700 mt-1">Start your application now and get personalized loan options</p>
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={handleStartApplication}
                    disabled={isLoading}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Loading...
                      </div>
                    ) : (
                      <>
                        Start My Application <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/loan-calculator">Calculate Repayments</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loan Comparison Tool */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-6">Compare Home Loans</h1>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Loan Details</CardTitle>
                <CardDescription>Adjust the details to see personalized loan options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Loan Amount</label>
                    <div className="mb-2">
                      <Slider
                        value={[loanAmount]}
                        min={100000}
                        max={2000000}
                        step={10000}
                        onValueChange={(value) => setLoanAmount(value[0])}
                        className="mb-2"
                      />
                    </div>
                    <div className="text-xl font-semibold">{formatCurrency(loanAmount)}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Property Value</label>
                    <div className="mb-2">
                      <Slider
                        value={[propertyValue]}
                        min={100000}
                        max={3000000}
                        step={10000}
                        onValueChange={(value) => setPropertyValue(value[0])}
                        className="mb-2"
                      />
                    </div>
                    <div className="text-xl font-semibold">{formatCurrency(propertyValue)}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Loan Term (Years)</label>
                    <div className="mb-2">
                      <Slider
                        value={[loanTerm]}
                        min={5}
                        max={30}
                        step={5}
                        onValueChange={(value) => setLoanTerm(value[0])}
                        className="mb-2"
                      />
                    </div>
                    <div className="text-xl font-semibold">{loanTerm} years</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-700">
                        <span className="font-medium">LVR: {Math.round((loanAmount / propertyValue) * 100)}%</span> -
                        Loan to Value Ratio is the amount of your loan compared to the value of your property.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button onClick={handleStartApplication} className="w-full">
                  Compare Personalized Rates
                </Button>
              </CardFooter>
            </Card>

            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="all">All Loans</TabsTrigger>
                <TabsTrigger value="lowest-rate">Lowest Rate</TabsTrigger>
                <TabsTrigger value="lowest-fees">Lowest Fees</TabsTrigger>
                <TabsTrigger value="features">Most Features</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                {loans.map((loan) => (
                  <Card key={loan.id} className="overflow-hidden">
                    {loan.popular && (
                      <div className="bg-blue-600 text-white text-center text-sm py-1">
                        <Star className="h-4 w-4 inline-block mr-1" /> Most Popular Choice
                      </div>
                    )}
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-3 p-6 flex flex-col justify-between border-r border-gray-100">
                          <div>
                            <div className="font-bold text-lg">{loan.lender}</div>
                            <div className="text-sm text-gray-500">Variable Rate Home Loan</div>
                          </div>
                          <div className="mt-4">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="font-medium">{loan.rating}</span>
                              <span className="text-sm text-gray-500 ml-1">({loan.reviews})</span>
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-6 p-6 flex flex-col md:flex-row justify-between gap-6">
                          <div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Percent className="h-4 w-4 mr-1" /> Interest Rate
                            </div>
                            <div className="font-bold text-2xl">{loan.rate}%</div>
                            <div className="text-xs text-gray-500">Comparison rate: {loan.comparison}%</div>
                          </div>

                          <div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Clock className="h-4 w-4 mr-1" /> Monthly Repayment
                            </div>
                            <div className="font-bold text-2xl">${loan.monthly}</div>
                            <div className="text-xs text-gray-500">
                              Based on ${loanAmount.toLocaleString()} over {loanTerm} years
                            </div>
                          </div>

                          <div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" /> Broker Fee Estimate
                            </div>
                            <div className="font-bold text-2xl">${loan.brokerFee}</div>
                            <div className="text-xs text-gray-500">
                              {((loan.brokerFee / loanAmount) * 100).toFixed(2)}% of loan amount
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-3 p-6 bg-gray-50 flex flex-col justify-between">
                          <div>
                            <div className="text-sm font-medium mb-2">Key Features</div>
                            <ul className="space-y-1">
                              {loan.features.map((feature, index) => (
                                <li key={index} className="text-sm flex items-start">
                                  <Check className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-4">
                            <Button className="w-full" onClick={handleStartApplication}>
                              Apply Now
                            </Button>
                            <Button variant="outline" className="w-full mt-2" asChild>
                              <Link href={`/loan-details/${loan.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="lowest-rate" className="space-y-6">
                {/* Content for lowest rate tab */}
                {loans
                  .sort((a, b) => a.rate - b.rate)
                  .slice(0, 3)
                  .map((loan) => (
                    <Card key={loan.id} className="overflow-hidden">
                      {loan.id === "loan1" && (
                        <div className="bg-green-600 text-white text-center text-sm py-1">
                          <Star className="h-4 w-4 inline-block mr-1" /> Lowest Rate Available
                        </div>
                      )}
                      <CardContent className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          <div className="md:col-span-3 p-6 flex flex-col justify-between border-r border-gray-100">
                            <div>
                              <div className="font-bold text-lg">{loan.lender}</div>
                              <div className="text-sm text-gray-500">Variable Rate Home Loan</div>
                            </div>
                            <div className="mt-4">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                <span className="font-medium">{loan.rating}</span>
                                <span className="text-sm text-gray-500 ml-1">({loan.reviews})</span>
                              </div>
                            </div>
                          </div>

                          <div className="md:col-span-6 p-6 flex flex-col md:flex-row justify-between gap-6">
                            <div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Percent className="h-4 w-4 mr-1" /> Interest Rate
                              </div>
                              <div className="font-bold text-2xl">{loan.rate}%</div>
                              <div className="text-xs text-gray-500">Comparison rate: {loan.comparison}%</div>
                            </div>

                            <div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Clock className="h-4 w-4 mr-1" /> Monthly Repayment
                              </div>
                              <div className="font-bold text-2xl">${loan.monthly}</div>
                              <div className="text-xs text-gray-500">
                                Based on ${loanAmount.toLocaleString()} over {loanTerm} years
                              </div>
                            </div>

                            <div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <DollarSign className="h-4 w-4 mr-1" /> Broker Fee Estimate
                              </div>
                              <div className="font-bold text-2xl">${loan.brokerFee}</div>
                              <div className="text-xs text-gray-500">
                                {((loan.brokerFee / loanAmount) * 100).toFixed(2)}% of loan amount
                              </div>
                            </div>
                          </div>

                          <div className="md:col-span-3 p-6 bg-gray-50 flex flex-col justify-between">
                            <div>
                              <div className="text-sm font-medium mb-2">Key Features</div>
                              <ul className="space-y-1">
                                {loan.features.map((feature, index) => (
                                  <li key={index} className="text-sm flex items-start">
                                    <Check className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="mt-4">
                              <Button className="w-full" onClick={handleStartApplication}>
                                Apply Now
                              </Button>
                              <Button variant="outline" className="w-full mt-2" asChild>
                                <Link href={`/loan-details/${loan.id}`}>View Details</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="lowest-fees" className="space-y-6">
                {/* Content for lowest fees tab */}
                {loans
                  .sort((a, b) => a.fees - b.fees)
                  .slice(0, 3)
                  .map((loan) => (
                    <Card key={loan.id} className="overflow-hidden">
                      {loan.fees === 0 && (
                        <div className="bg-green-600 text-white text-center text-sm py-1">
                          <Star className="h-4 w-4 inline-block mr-1" /> No Annual Fees
                        </div>
                      )}
                      <CardContent className="p-0">
                        {/* Same card content structure as above */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          <div className="md:col-span-3 p-6 flex flex-col justify-between border-r border-gray-100">
                            <div>
                              <div className="font-bold text-lg">{loan.lender}</div>
                              <div className="text-sm text-gray-500">Variable Rate Home Loan</div>
                            </div>
                            <div className="mt-4">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                <span className="font-medium">{loan.rating}</span>
                                <span className="text-sm text-gray-500 ml-1">({loan.reviews})</span>
                              </div>
                            </div>
                          </div>

                          <div className="md:col-span-6 p-6 flex flex-col md:flex-row justify-between gap-6">
                            <div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Percent className="h-4 w-4 mr-1" /> Interest Rate
                              </div>
                              <div className="font-bold text-2xl">{loan.rate}%</div>
                              <div className="text-xs text-gray-500">Comparison rate: {loan.comparison}%</div>
                            </div>

                            <div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Clock className="h-4 w-4 mr-1" /> Monthly Repayment
                              </div>
                              <div className="font-bold text-2xl">${loan.monthly}</div>
                              <div className="text-xs text-gray-500">
                                Based on ${loanAmount.toLocaleString()} over {loanTerm} years
                              </div>
                            </div>

                            <div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <DollarSign className="h-4 w-4 mr-1" /> Broker Fee Estimate
                              </div>
                              <div className="font-bold text-2xl">${loan.brokerFee}</div>
                              <div className="text-xs text-gray-500">
                                {((loan.brokerFee / loanAmount) * 100).toFixed(2)}% of loan amount
                              </div>
                            </div>
                          </div>

                          <div className="md:col-span-3 p-6 bg-gray-50 flex flex-col justify-between">
                            <div>
                              <div className="text-sm font-medium mb-2">Key Features</div>
                              <ul className="space-y-1">
                                {loan.features.map((feature, index) => (
                                  <li key={index} className="text-sm flex items-start">
                                    <Check className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="mt-4">
                              <Button className="w-full" onClick={handleStartApplication}>
                                Apply Now
                              </Button>
                              <Button variant="outline" className="w-full mt-2" asChild>
                                <Link href={`/loan-details/${loan.id}`}>View Details</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="features" className="space-y-6">
                {/* Content for features tab */}
                {loans
                  .sort((a, b) => b.features.length - a.features.length)
                  .slice(0, 3)
                  .map((loan) => (
                    <Card key={loan.id} className="overflow-hidden">
                      {loan.features.length === Math.max(...loans.map((l) => l.features.length)) && (
                        <div className="bg-purple-600 text-white text-center text-sm py-1">
                          <Star className="h-4 w-4 inline-block mr-1" /> Most Features
                        </div>
                      )}
                      <CardContent className="p-0">
                        {/* Same card content structure as above */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          <div className="md:col-span-3 p-6 flex flex-col justify-between border-r border-gray-100">
                            <div>
                              <div className="font-bold text-lg">{loan.lender}</div>
                              <div className="text-sm text-gray-500">Variable Rate Home Loan</div>
                            </div>
                            <div className="mt-4">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                <span className="font-medium">{loan.rating}</span>
                                <span className="text-sm text-gray-500 ml-1">({loan.reviews})</span>
                              </div>
                            </div>
                          </div>

                          <div className="md:col-span-6 p-6 flex flex-col md:flex-row justify-between gap-6">
                            <div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Percent className="h-4 w-4 mr-1" /> Interest Rate
                              </div>
                              <div className="font-bold text-2xl">{loan.rate}%</div>
                              <div className="text-xs text-gray-500">Comparison rate: {loan.comparison}%</div>
                            </div>

                            <div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Clock className="h-4 w-4 mr-1" /> Monthly Repayment
                              </div>
                              <div className="font-bold text-2xl">${loan.monthly}</div>
                              <div className="text-xs text-gray-500">
                                Based on ${loanAmount.toLocaleString()} over {loanTerm} years
                              </div>
                            </div>

                            <div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <DollarSign className="h-4 w-4 mr-1" /> Broker Fee Estimate
                              </div>
                              <div className="font-bold text-2xl">${loan.brokerFee}</div>
                              <div className="text-xs text-gray-500">
                                {((loan.brokerFee / loanAmount) * 100).toFixed(2)}% of loan amount
                              </div>
                            </div>
                          </div>

                          <div className="md:col-span-3 p-6 bg-gray-50 flex flex-col justify-between">
                            <div>
                              <div className="text-sm font-medium mb-2">Key Features</div>
                              <ul className="space-y-1">
                                {loan.features.map((feature, index) => (
                                  <li key={index} className="text-sm flex items-start">
                                    <Check className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="mt-4">
                              <Button className="w-full" onClick={handleStartApplication}>
                                Apply Now
                              </Button>
                              <Button variant="outline" className="w-full mt-2" asChild>
                                <Link href={`/loan-details/${loan.id}`}>View Details</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Why Choose Us Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Why Choose Home Online?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <BarChart4 className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle>Compare Rates</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Compare rates from over 30 lenders to find the best deal for your situation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle>Keep the Broker Fee Estimate</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Earn 0.5-2% broker fee estimate that would typically be paid to mortgage brokers as commission.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Check className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle>Simple Process</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our streamlined application process makes it easy to apply for a home loan online, with step-by-step
                    guidance throughout.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How does the broker fee estimate work?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    When you apply for a home loan through Home Online, you'll receive a broker fee estimate of 0.5-2%
                    of your loan amount. This is money that would typically be paid to mortgage brokers as commission,
                    but we pass it back to you.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How long does the application process take?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our streamlined application process typically takes about 15-20 minutes to complete. After
                    submission, you'll receive loan offers within 24-48 hours, and full approval can be obtained within
                    5-7 business days.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What documents will I need to apply?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    You'll need identification documents, proof of income (pay slips, tax returns), details of your
                    assets and liabilities, and property information if you're refinancing or have a property in mind.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
