"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, AlertCircle, DollarSign, CreditCard } from "lucide-react"
import { useLoanInfo } from "../LoanInfoContext"

export default function FinancialInfoPage() {
  const router = useRouter()
  const { formData, updateFormData } = useLoanInfo()
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Redirect if no loan type selected
  useEffect(() => {
    if (!formData.loanType) {
      router.push("/loan-info")
    }
  }, [formData.loanType, router])

  const handleInputChange = (field: string, value: any) => {
    updateFormData(field, value)
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.creditScore) {
      newErrors.creditScore = "Credit score range is required"
    }
    if (!formData.monthlyExpenses || formData.monthlyExpenses <= 0) {
      newErrors.monthlyExpenses = "Monthly expenses is required"
    }
    if (!formData.savingsBalance || formData.savingsBalance < 0) {
      newErrors.savingsBalance = "Savings balance is required"
    }

    // First home buyer specific validation
    if (formData.loanType === "first_home_buyer") {
      if (formData.savingsBalance < 10000) {
        newErrors.savingsBalance = "First home buyers typically need at least $10,000 in savings"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      router.push("/loan-info/loan-requirements")
    }
  }

  const handleBack = () => {
    router.push("/loan-info/employment")
  }

  const getLoanTypeTitle = () => {
    switch (formData.loanType) {
      case "first_home_buyer":
        return "First Home Buyer"
      case "new_purchase":
        return "New Home Purchase"
      case "refinance":
        return "Refinance"
      default:
        return "Home Loan"
    }
  }

  const getFinancialGuidance = () => {
    switch (formData.loanType) {
      case "first_home_buyer":
        return "As a first home buyer, we'll help you understand deposit requirements and available grants."
      case "refinance":
        return "We'll assess your current financial position to find better refinancing options."
      default:
        return "This information helps us determine your borrowing capacity and suitable loan options."
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <span>{getLoanTypeTitle()}</span>
              <span>•</span>
              <span className="font-medium">Financial Information</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Tell us about your finances</h1>
            <p className="text-gray-600">{getFinancialGuidance()}</p>
            <Progress value={80} className="mt-4" />
          </div>

          <div className="space-y-6">
            {/* Credit Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Credit Information
                </CardTitle>
                <CardDescription>
                  Your credit information helps us find the most suitable loan options for you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="creditScore">
                    Credit Score Range <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.creditScore || ""}
                    onValueChange={(value) => handleInputChange("creditScore", value)}
                  >
                    <SelectTrigger className={errors.creditScore ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select your credit score range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent (800+)</SelectItem>
                      <SelectItem value="very_good">Very Good (740-799)</SelectItem>
                      <SelectItem value="good">Good (670-739)</SelectItem>
                      <SelectItem value="fair">Fair (580-669)</SelectItem>
                      <SelectItem value="poor">Poor (300-579)</SelectItem>
                      <SelectItem value="unknown">I don't know</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.creditScore && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.creditScore}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Don't worry if you're unsure - we can help you check your credit score.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankruptcyHistory">Bankruptcy History</Label>
                  <Select
                    value={formData.bankruptcyHistory || ""}
                    onValueChange={(value) => handleInputChange("bankruptcyHistory", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select bankruptcy history" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never declared bankruptcy</SelectItem>
                      <SelectItem value="discharged_7_plus">Discharged 7+ years ago</SelectItem>
                      <SelectItem value="discharged_3_7">Discharged 3-7 years ago</SelectItem>
                      <SelectItem value="discharged_recent">Discharged within 3 years</SelectItem>
                      <SelectItem value="current">Currently in bankruptcy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Financial Position */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Position
                </CardTitle>
                <CardDescription>Help us understand your current financial situation.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyExpenses">
                      Monthly Expenses (AUD) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="monthlyExpenses"
                      type="number"
                      value={formData.monthlyExpenses || ""}
                      onChange={(e) => handleInputChange("monthlyExpenses", Number.parseInt(e.target.value))}
                      placeholder="e.g. 3000"
                      className={errors.monthlyExpenses ? "border-red-500" : ""}
                    />
                    {errors.monthlyExpenses && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.monthlyExpenses}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">Include rent, utilities, food, transport, etc.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="existingDebts">Existing Debts (AUD)</Label>
                    <Input
                      id="existingDebts"
                      type="number"
                      value={formData.existingDebts || ""}
                      onChange={(e) => handleInputChange("existingDebts", Number.parseInt(e.target.value))}
                      placeholder="e.g. 15000"
                    />
                    <p className="text-xs text-gray-500">Credit cards, personal loans, car loans, etc.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="savingsBalance">
                      Savings Balance (AUD) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="savingsBalance"
                      type="number"
                      value={formData.savingsBalance || ""}
                      onChange={(e) => handleInputChange("savingsBalance", Number.parseInt(e.target.value))}
                      placeholder="e.g. 50000"
                      className={errors.savingsBalance ? "border-red-500" : ""}
                    />
                    {errors.savingsBalance && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.savingsBalance}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      {formData.loanType === "first_home_buyer"
                        ? "Available for deposit and costs"
                        : "Total savings available"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="investments">Investments (AUD)</Label>
                    <Input
                      id="investments"
                      type="number"
                      value={formData.investments || ""}
                      onChange={(e) => handleInputChange("investments", Number.parseInt(e.target.value))}
                      placeholder="e.g. 25000"
                    />
                    <p className="text-xs text-gray-500">Shares, managed funds, super (accessible), etc.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherAssets">Other Assets (AUD)</Label>
                  <Input
                    id="otherAssets"
                    type="number"
                    value={formData.otherAssets || ""}
                    onChange={(e) => handleInputChange("otherAssets", Number.parseInt(e.target.value))}
                    placeholder="e.g. 10000"
                  />
                  <p className="text-xs text-gray-500">Vehicles, jewelry, other valuable assets</p>
                </div>
              </CardContent>
            </Card>

            {/* First Home Buyer Specific Information */}
            {formData.loanType === "first_home_buyer" && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-800">First Home Buyer Information</CardTitle>
                  <CardDescription className="text-green-700">
                    Additional information to help us identify grants and schemes you may be eligible for.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">Potential Benefits:</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• First Home Owner Grant (up to $10,000)</li>
                      <li>• Stamp duty concessions or exemptions</li>
                      <li>• First Home Loan Deposit Scheme (5% deposit)</li>
                      <li>• First Home Super Saver Scheme</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Refinance Specific Information */}
            {formData.loanType === "refinance" && (
              <Card className="border-purple-200 bg-purple-50">
                <CardHeader>
                  <CardTitle className="text-purple-800">Refinancing Goals</CardTitle>
                  <CardDescription className="text-purple-700">
                    What are you hoping to achieve by refinancing?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="refinanceGoal">Primary Refinancing Goal</Label>
                    <Select
                      value={formData.refinanceGoal || ""}
                      onValueChange={(value) => handleInputChange("refinanceGoal", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your main goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lower_rate">Get a lower interest rate</SelectItem>
                        <SelectItem value="lower_payments">Reduce monthly payments</SelectItem>
                        <SelectItem value="cash_out">Access equity (cash out)</SelectItem>
                        <SelectItem value="better_features">Get better loan features</SelectItem>
                        <SelectItem value="consolidate_debt">Consolidate other debts</SelectItem>
                        <SelectItem value="switch_lender">Switch to a better lender</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleNext}>
                Next: Loan Requirements
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
