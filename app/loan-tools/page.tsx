"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(amount)
}

export default function LoanToolsPage() {
  const router = useRouter()
  const [repaymentLoanAmount, setRepaymentLoanAmount] = useState(300000)
  const [repaymentInterestRate, setRepaymentInterestRate] = useState(5.5)
  const [repaymentLoanTerm, setRepaymentLoanTerm] = useState(30)
  const [rateComparisonLoanAmount, setRateComparisonLoanAmount] = useState(400000)
  const [rateComparisonCurrentRate, setRateComparisonCurrentRate] = useState(6.0)
  const [rateComparisonNewRate, setRateComparisonNewRate] = useState(5.0)
  const [extraRepaymentsLoanAmount, setExtraRepaymentsLoanAmount] = useState(500000)
  const [extraRepaymentsInterestRate, setExtraRepaymentsInterestRate] = useState(5.0)
  const [extraRepaymentsLoanTerm, setExtraRepaymentsLoanTerm] = useState(30)
  const [extraRepaymentsExtraPayment, setExtraRepaymentsExtraPayment] = useState(500)
  const [refinanceSavingsLoanAmount, setRefinanceSavingsLoanAmount] = useState(600000)
  const [refinanceSavingsCurrentRate, setRefinanceSavingsCurrentRate] = useState(6.5)
  const [refinanceSavingsNewRate, setRefinanceSavingsNewRate] = useState(5.5)
  const [brokerFeeEstimatePropertyValue, setBrokerFeeEstimatePropertyValue] = useState(750000)

  // Calculate monthly repayment
  const calculateMonthlyRepayment = (loanAmount, interestRate, loanTerm) => {
    const monthlyInterestRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12
    const monthlyRepayment =
      (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments))
    return isFinite(monthlyRepayment) ? monthlyRepayment : 0
  }

  // Calculate total interest paid
  const calculateTotalInterest = (loanAmount, interestRate, loanTerm) => {
    const monthlyRepayment = calculateMonthlyRepayment(loanAmount, interestRate, loanTerm)
    const numberOfPayments = loanTerm * 12
    return monthlyRepayment * numberOfPayments - loanAmount
  }

  // Calculate savings with extra repayments
  const calculateSavingsWithExtraRepayments = (loanAmount, interestRate, loanTerm, extraPayment) => {
    const monthlyInterestRate = interestRate / 100 / 12
    let remainingBalance = loanAmount
    let totalInterestPaid = 0
    let paymentsMade = 0

    for (let i = 0; i < loanTerm * 12; i++) {
      const interestPayment = remainingBalance * monthlyInterestRate
      let principalPayment = calculateMonthlyRepayment(loanAmount, interestRate, loanTerm) - interestPayment
      if (principalPayment > remainingBalance) {
        principalPayment = remainingBalance
      }

      totalInterestPaid += interestPayment
      remainingBalance -= principalPayment
      paymentsMade++

      if (remainingBalance <= 0) {
        break
      }

      remainingBalance -= extraPayment
      totalInterestPaid += extraPayment * paymentsMade
    }

    const originalTotalInterest = calculateTotalInterest(loanAmount, interestRate, loanTerm)
    const savings = originalTotalInterest - totalInterestPaid
    return { savings, paymentsMade }
  }

  // Calculate refinance savings
  const calculateRefinanceSavings = (loanAmount, currentRate, newRate, loanTerm) => {
    const currentMonthlyRepayment = calculateMonthlyRepayment(loanAmount, currentRate, loanTerm)
    const newMonthlyRepayment = calculateMonthlyRepayment(loanAmount, newRate, loanTerm)
    const monthlySavings = currentMonthlyRepayment - newMonthlyRepayment
    const totalSavings = monthlySavings * loanTerm * 12
    return totalSavings
  }

  // Calculate broker fee estimate
  const calculateBrokerFeeEstimate = (propertyValue) => {
    // Tiered fee structure
    if (propertyValue <= 500000) {
      return 0
    } else if (propertyValue <= 1000000) {
      return 0.01 * propertyValue
    } else {
      return 0.015 * propertyValue
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Home Loan Calculators</h1>
      <p className="text-gray-600 mb-8 text-center">
        Use these tools to estimate your repayments, savings, and potential broker fees.
      </p>

      <Tabs defaultValue="repayment" className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-5">
          <TabsTrigger value="repayment">Repayment</TabsTrigger>
          <TabsTrigger value="rateComparison">Rate Comparison</TabsTrigger>
          <TabsTrigger value="extraRepayments">Extra Repayments</TabsTrigger>
          <TabsTrigger value="refinanceSavings">Refinance Savings</TabsTrigger>
          <TabsTrigger value="brokerFeeEstimate">Broker Fee Estimate</TabsTrigger>
        </TabsList>

        {/* Repayment Calculator */}
        <TabsContent value="repayment" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Repayment Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="repaymentLoanAmount">Loan Amount (AUD)</Label>
                <Input
                  type="number"
                  id="repaymentLoanAmount"
                  value={repaymentLoanAmount}
                  onChange={(e) => setRepaymentLoanAmount(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repaymentInterestRate">Interest Rate (%)</Label>
                <Input
                  type="number"
                  id="repaymentInterestRate"
                  value={repaymentInterestRate}
                  onChange={(e) => setRepaymentInterestRate(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repaymentLoanTerm">Loan Term (Years)</Label>
                <Input
                  type="number"
                  id="repaymentLoanTerm"
                  value={repaymentLoanTerm}
                  onChange={(e) => setRepaymentLoanTerm(Number(e.target.value))}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Estimated Monthly Repayment:</h3>
                <p className="text-2xl font-bold">
                  {formatCurrency(
                    calculateMonthlyRepayment(repaymentLoanAmount, repaymentInterestRate, repaymentLoanTerm),
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rate Comparison Calculator */}
        <TabsContent value="rateComparison" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Rate Comparison Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rateComparisonLoanAmount">Loan Amount (AUD)</Label>
                <Input
                  type="number"
                  id="rateComparisonLoanAmount"
                  value={rateComparisonLoanAmount}
                  onChange={(e) => setRateComparisonLoanAmount(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rateComparisonCurrentRate">Current Interest Rate (%)</Label>
                <Input
                  type="number"
                  id="rateComparisonCurrentRate"
                  value={rateComparisonCurrentRate}
                  onChange={(e) => setRateComparisonCurrentRate(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rateComparisonNewRate">New Interest Rate (%)</Label>
                <Input
                  type="number"
                  id="rateComparisonNewRate"
                  value={rateComparisonNewRate}
                  onChange={(e) => setRateComparisonNewRate(Number(e.target.value))}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Potential Monthly Savings:</h3>
                <p className="text-2xl font-bold">
                  {formatCurrency(
                    calculateMonthlyRepayment(rateComparisonLoanAmount, rateComparisonCurrentRate, 30) -
                      calculateMonthlyRepayment(rateComparisonLoanAmount, rateComparisonNewRate, 30),
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Extra Repayments Calculator */}
        <TabsContent value="extraRepayments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Extra Repayments Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="extraRepaymentsLoanAmount">Loan Amount (AUD)</Label>
                <Input
                  type="number"
                  id="extraRepaymentsLoanAmount"
                  value={extraRepaymentsLoanAmount}
                  onChange={(e) => setExtraRepaymentsLoanAmount(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="extraRepaymentsInterestRate">Interest Rate (%)</Label>
                <Input
                  type="number"
                  id="extraRepaymentsInterestRate"
                  value={extraRepaymentsInterestRate}
                  onChange={(e) => setExtraRepaymentsInterestRate(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="extraRepaymentsLoanTerm">Loan Term (Years)</Label>
                <Input
                  type="number"
                  id="extraRepaymentsLoanTerm"
                  value={extraRepaymentsLoanTerm}
                  onChange={(e) => setExtraRepaymentsLoanTerm(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="extraRepaymentsExtraPayment">Extra Payment (AUD)</Label>
                <Input
                  type="number"
                  id="extraRepaymentsExtraPayment"
                  value={extraRepaymentsExtraPayment}
                  onChange={(e) => setExtraRepaymentsExtraPayment(Number(e.target.value))}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Potential Savings:</h3>
                {(() => {
                  const { savings, paymentsMade } = calculateSavingsWithExtraRepayments(
                    extraRepaymentsLoanAmount,
                    extraRepaymentsInterestRate,
                    extraRepaymentsLoanTerm,
                    extraRepaymentsExtraPayment,
                  )
                  return (
                    <>
                      <p className="text-2xl font-bold">{formatCurrency(savings)}</p>
                      <p className="text-sm text-gray-500">
                        Loan could be paid off {extraRepaymentsLoanTerm * 12 - paymentsMade} months early
                      </p>
                    </>
                  )
                })()}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Refinance Savings Calculator */}
        <TabsContent value="refinanceSavings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Refinance Savings Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="refinanceSavingsLoanAmount">Loan Amount (AUD)</Label>
                <Input
                  type="number"
                  id="refinanceSavingsLoanAmount"
                  value={refinanceSavingsLoanAmount}
                  onChange={(e) => setRefinanceSavingsLoanAmount(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="refinanceSavingsCurrentRate">Current Interest Rate (%)</Label>
                <Input
                  type="number"
                  id="refinanceSavingsCurrentRate"
                  value={refinanceSavingsCurrentRate}
                  onChange={(e) => setRefinanceSavingsCurrentRate(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="refinanceSavingsNewRate">New Interest Rate (%)</Label>
                <Input
                  type="number"
                  id="refinanceSavingsNewRate"
                  value={refinanceSavingsNewRate}
                  onChange={(e) => setRefinanceSavingsNewRate(Number(e.target.value))}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Potential Savings Over Loan Term:</h3>
                <p className="text-2xl font-bold">
                  {formatCurrency(
                    calculateRefinanceSavings(
                      refinanceSavingsLoanAmount,
                      refinanceSavingsCurrentRate,
                      refinanceSavingsNewRate,
                      30,
                    ),
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Broker Fee Estimate Calculator */}
        <TabsContent value="brokerFeeEstimate" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Broker Fee Estimate Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brokerFeeEstimatePropertyValue">Property Value (AUD)</Label>
                <Input
                  type="number"
                  id="brokerFeeEstimatePropertyValue"
                  value={brokerFeeEstimatePropertyValue}
                  onChange={(e) => setBrokerFeeEstimatePropertyValue(Number(e.target.value))}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Estimated Broker Fee:</h3>
                <p className="text-2xl font-bold">
                  {formatCurrency(calculateBrokerFeeEstimate(brokerFeeEstimatePropertyValue))}
                </p>
                <p className="text-sm text-gray-500 mt-1">This is an estimate only. Actual fees may vary.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="text-center mt-8">
        <Button size="lg" onClick={() => router.push("/loan-selection")}>
          Explore Loan Options
        </Button>
      </div>
    </div>
  )
}
