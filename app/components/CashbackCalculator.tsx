"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { DollarSign, TrendingDown, Calculator } from "lucide-react"
import Link from "next/link"

export function CashbackCalculator() {
  const [loanAmount, setLoanAmount] = useState(500000)
  const [propertyValue, setPropertyValue] = useState(800000)
  const [brokerFeeRate, setBrokerFeeRate] = useState(0.65)

  const estimatedBrokerFee = (loanAmount * brokerFeeRate) / 100
  const homeOnlineSavings = estimatedBrokerFee * 0.8 // Assuming 80% savings
  const homeOnlineFee = estimatedBrokerFee - homeOnlineSavings

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Broker Fee Estimate Calculator</h2>
            <p className="text-xl text-gray-600">See how much you could save on broker fees with Home Online</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-emerald-600" />
                  Calculate Your Savings
                </CardTitle>
                <CardDescription>Adjust the sliders to see your potential broker fee savings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Loan Amount: ${loanAmount.toLocaleString()}</Label>
                  <Slider
                    value={[loanAmount]}
                    onValueChange={(value) => setLoanAmount(value[0])}
                    max={2000000}
                    min={100000}
                    step={25000}
                    className="mt-3"
                  />
                </div>

                <div>
                  <Label className="text-base font-medium">Property Value: ${propertyValue.toLocaleString()}</Label>
                  <Slider
                    value={[propertyValue]}
                    onValueChange={(value) => setPropertyValue(value[0])}
                    max={3000000}
                    min={200000}
                    step={50000}
                    className="mt-3"
                  />
                </div>

                <div>
                  <Label className="text-base font-medium">Typical Broker Fee Rate: {brokerFeeRate}%</Label>
                  <Slider
                    value={[brokerFeeRate]}
                    onValueChange={(value) => setBrokerFeeRate(value[0])}
                    max={1.5}
                    min={0.3}
                    step={0.05}
                    className="mt-3"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Industry standard broker fees range from 0.3% to 1.5% of loan amount
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="h-8 w-8 text-red-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-red-800">Typical Broker Fee</h3>
                      <p className="text-sm text-red-600">What you might pay elsewhere</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-red-700">
                    ${estimatedBrokerFee.toLocaleString("en-AU", { maximumFractionDigits: 0 })}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-200 bg-emerald-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingDown className="h-8 w-8 text-emerald-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-emerald-800">Your Savings with Home Online</h3>
                      <p className="text-sm text-emerald-600">Money back in your pocket</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-emerald-700">
                    ${homeOnlineSavings.toLocaleString("en-AU", { maximumFractionDigits: 0 })}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-800">Home Online Fee</h3>
                      <p className="text-sm text-blue-600">Our transparent pricing</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-700">
                        ${homeOnlineFee.toLocaleString("en-AU", { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-sm text-blue-600">
                        {((homeOnlineFee / estimatedBrokerFee) * 100).toFixed(0)}% of typical fee
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-600 mb-1">You save approximately</div>
                  <div className="text-2xl font-bold text-emerald-600">
                    {((homeOnlineSavings / estimatedBrokerFee) * 100).toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-600">in broker fees</div>
                </div>

                <Link href="/loan-selection">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Start Saving Today</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-white rounded-lg p-8 shadow-sm">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Pay More in Broker Fees?</h3>
              <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
                Traditional brokers charge high fees for loan services. Home Online's innovative platform reduces these
                costs significantly while still providing expert service and access to 40+ lenders.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Lower Fees</h4>
                  <p className="text-sm text-gray-600">
                    Save up to 80% on typical broker fees with our efficient platform
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Transparent Pricing</h4>
                  <p className="text-sm text-gray-600">
                    No hidden fees or surprises - know exactly what you'll pay upfront
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingDown className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Better Value</h4>
                  <p className="text-sm text-gray-600">
                    Get the same great service and loan options for a fraction of the cost
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
