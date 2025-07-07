"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, Calculator, TrendingDown } from "lucide-react"
import Link from "next/link"

export default function SavingsCalculator() {
  const [loanAmount, setLoanAmount] = useState([500000])
  const [currentRate, setCurrentRate] = useState([6.5])

  const newRate = currentRate[0] - 0.75 // Average savings of 0.75%
  const monthlySavings = (loanAmount[0] * (currentRate[0] - newRate)) / 100 / 12
  const yearlySavings = monthlySavings * 12
  const lifetimeSavings = yearlySavings * 25 // 25 year loan

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Calculate Your Potential Savings</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how much you could save when banks compete for your home loan
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-blue-100">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
              <CardTitle className="flex items-center text-2xl">
                <Calculator className="mr-3 h-6 w-6 text-blue-600" />
                Home Loan Savings Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Amount: ${loanAmount[0].toLocaleString()}
                    </label>
                    <Slider
                      value={loanAmount}
                      onValueChange={setLoanAmount}
                      max={2000000}
                      min={100000}
                      step={25000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>$100k</span>
                      <span>$2M</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Interest Rate: {currentRate[0]}%
                    </label>
                    <Slider
                      value={currentRate}
                      onValueChange={setCurrentRate}
                      max={8}
                      min={4}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>4%</span>
                      <span>8%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <TrendingDown className="mr-2 h-5 w-5 text-green-600" />
                    Your Potential Savings
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">New Rate:</span>
                      <span className="text-xl font-bold text-green-600">{newRate.toFixed(2)}%</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Monthly Savings:</span>
                      <span className="text-xl font-bold text-blue-600">
                        ${monthlySavings.toLocaleString("en-AU", { maximumFractionDigits: 0 })}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Yearly Savings:</span>
                      <span className="text-xl font-bold text-purple-600">
                        ${yearlySavings.toLocaleString("en-AU", { maximumFractionDigits: 0 })}
                      </span>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-900 font-medium">Lifetime Savings:</span>
                        <span className="text-2xl font-bold text-green-600">
                          ${lifetimeSavings.toLocaleString("en-AU", { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg" asChild>
                  <Link href="/loan-selection">
                    Start My Application
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                  * Savings are estimates based on average rate reductions. Actual savings may vary.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
