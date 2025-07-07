"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, TrendingDown, DollarSign, Clock } from "lucide-react"
import Link from "next/link"

export default function LoanCalculatorContent() {
  const [loanAmount, setLoanAmount] = useState([500000])
  const [interestRate, setInterestRate] = useState([6.5])
  const [loanTerm, setLoanTerm] = useState([30])
  const [repaymentFrequency, setRepaymentFrequency] = useState("monthly")

  const calculateRepayment = () => {
    const principal = loanAmount[0]
    const rate = interestRate[0] / 100
    const years = loanTerm[0]

    let periodsPerYear = 12
    if (repaymentFrequency === "weekly") periodsPerYear = 52
    if (repaymentFrequency === "fortnightly") periodsPerYear = 26

    const totalPeriods = years * periodsPerYear
    const periodRate = rate / periodsPerYear

    const repayment =
      (principal * periodRate * Math.pow(1 + periodRate, totalPeriods)) / (Math.pow(1 + periodRate, totalPeriods) - 1)

    return {
      repayment: repayment,
      totalAmount: repayment * totalPeriods,
      totalInterest: repayment * totalPeriods - principal,
    }
  }

  const results = calculateRepayment()

  // More realistic savings calculation - 0.5% rate reduction
  const betterRate = Math.max(3.0, interestRate[0] - 0.5)
  const betterRateResults = (() => {
    const principal = loanAmount[0]
    const rate = betterRate / 100
    const years = loanTerm[0]
    let periodsPerYear = 12
    if (repaymentFrequency === "weekly") periodsPerYear = 52
    if (repaymentFrequency === "fortnightly") periodsPerYear = 26
    const totalPeriods = years * periodsPerYear
    const periodRate = rate / periodsPerYear
    const repayment =
      (principal * periodRate * Math.pow(1 + periodRate, totalPeriods)) / (Math.pow(1 + periodRate, totalPeriods) - 1)
    return { repayment }
  })()

  const monthlySavings = results.repayment - betterRateResults.repayment

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Home Loan Calculator</h1>
          <p className="text-xl text-gray-600">
            Calculate your home loan repayments and discover how much you could save with a better rate.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Inputs */}
          <Card className="p-6">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                Loan Details
              </CardTitle>
              <CardDescription>Adjust the sliders to match your loan requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Loan Amount */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">Loan Amount</label>
                  <span className="text-lg font-semibold text-blue-600">${loanAmount[0].toLocaleString()}</span>
                </div>
                <Slider
                  value={loanAmount}
                  onValueChange={setLoanAmount}
                  max={2000000}
                  min={100000}
                  step={10000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>$100k</span>
                  <span>$2M</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">Interest Rate</label>
                  <span className="text-lg font-semibold text-green-600">{interestRate[0].toFixed(2)}%</span>
                </div>
                <Slider
                  value={interestRate}
                  onValueChange={setInterestRate}
                  max={10}
                  min={3}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>3.0%</span>
                  <span>10.0%</span>
                </div>
              </div>

              {/* Loan Term */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">Loan Term</label>
                  <span className="text-lg font-semibold text-purple-600">{loanTerm[0]} years</span>
                </div>
                <Slider value={loanTerm} onValueChange={setLoanTerm} max={40} min={5} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>5 years</span>
                  <span>40 years</span>
                </div>
              </div>

              {/* Repayment Frequency */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Repayment Frequency</label>
                <Select value={repaymentFrequency} onValueChange={setRepaymentFrequency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="fortnightly">Fortnightly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {/* Main Result */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-blue-900">Your Repayments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    $
                    {results.repayment.toLocaleString("en-AU", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </div>
                  <div className="text-lg text-blue-700 capitalize">per {repaymentFrequency.replace("ly", "")}</div>
                </div>
              </CardContent>
            </Card>

            {/* Breakdown */}
            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Principal</span>
                  <span className="font-semibold">${loanAmount[0].toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Total Interest</span>
                  <span className="font-semibold text-orange-600">
                    $
                    {results.totalInterest.toLocaleString("en-AU", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-semibold text-gray-900">
                    $
                    {results.totalAmount.toLocaleString("en-AU", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Realistic Savings Potential */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <TrendingDown className="h-5 w-5" />
                  Potential Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    $
                    {monthlySavings.toLocaleString("en-AU", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </div>
                  <div className="text-sm text-green-700">
                    Monthly savings with a 0.5% better rate ({betterRate.toFixed(2)}%)
                  </div>
                </div>
                <div className="text-xs text-green-600 text-center mb-4">
                  Over {loanTerm[0]} years, you could save $
                  {(monthlySavings * 12 * loanTerm[0]).toLocaleString("en-AU", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}{" "}
                  in total
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button asChild size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                <Link href="/loan-application/gamified?type=refinance">Apply Now - Compare Rates</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full bg-transparent">
                <Link href="/loan-application/gamified?type=new">New Home Loan Application</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <Card className="mt-12 p-6 bg-gray-50">
          <CardHeader>
            <CardTitle className="text-xl">💡 Money-Saving Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Compare Rates</h4>
                  <p className="text-sm text-gray-600">
                    Even a 0.25% difference can save thousands over your loan term.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Review Regularly</h4>
                  <p className="text-sm text-gray-600">
                    Check your rate annually - you might be eligible for better offers.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingDown className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Extra Repayments</h4>
                  <p className="text-sm text-gray-600">Small extra payments can significantly reduce your loan term.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
