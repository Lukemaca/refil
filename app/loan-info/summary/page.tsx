"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, CheckCircle, Edit, User, Home, Briefcase, DollarSign, FileText } from "lucide-react"
import Link from "next/link"
import { useLoanInfo } from "../LoanInfoContext"

export default function LoanInfoSummaryPage() {
  const router = useRouter()
  const { formData } = useLoanInfo()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Save to localStorage for demo purposes
    localStorage.setItem("loanApplicationData", JSON.stringify(formData))

    // Navigate to next step
    router.push("/loan-comparison")
  }

  const formatCurrency = (amount: number | string) => {
    const num = typeof amount === "string" ? Number.parseFloat(amount) : amount
    return isNaN(num) ? "$0" : `$${num.toLocaleString()}`
  }

  const formatText = (text: string) => {
    if (!text) return "Not specified"
    return text.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  const renderSection = (title: string, icon: React.ReactNode, data: Record<string, any>, editPath: string) => {
    if (!data || Object.keys(data).length === 0) {
      return (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              {icon}
              <CardTitle className="text-lg">{title}</CardTitle>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={editPath}>
                <Edit className="h-4 w-4 mr-2" />
                Add Info
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">No information provided</p>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            {icon}
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href={editPath}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(data).map(([key, value]) => {
              if (!value || value === "") return null

              let displayValue = value
              if (typeof value === "string" && !isNaN(Number(value)) && Number(value) > 1000) {
                displayValue = formatCurrency(value)
              } else if (typeof value === "string") {
                displayValue = formatText(value)
              } else if (typeof value === "boolean") {
                displayValue = value ? "Yes" : "No"
              }

              const displayKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())

              return (
                <div key={key}>
                  <dt className="text-sm font-medium text-gray-500">{displayKey}</dt>
                  <dd className="text-sm text-gray-900 mt-1">{displayValue}</dd>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/loan-info/financial"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Financial Information
            </Link>
            <h1 className="text-3xl font-bold mb-2">Review Your Information</h1>
            <p className="text-gray-600">
              Please review all the information you've provided. You can edit any section if needed.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="space-y-6 mb-8">
            {/* Loan Type */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">Loan Type</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-100 text-blue-800 text-base px-3 py-1">
                    {formatText(formData.loanType || "Not specified")}
                  </Badge>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/loan-info">
                      <Edit className="h-4 w-4 mr-2" />
                      Change
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            {renderSection(
              "Personal Information",
              <User className="h-5 w-5 text-blue-600" />,
              formData.personal || {},
              "/loan-info/personal",
            )}

            {/* Property Information */}
            {renderSection(
              "Property Information",
              <Home className="h-5 w-5 text-blue-600" />,
              formData.property || {},
              "/loan-info/property",
            )}

            {/* Employment Information */}
            {renderSection(
              "Employment Information",
              <Briefcase className="h-5 w-5 text-blue-600" />,
              formData.employment || {},
              "/loan-info/employment",
            )}

            {/* Financial Information */}
            {renderSection(
              "Financial Information",
              <DollarSign className="h-5 w-5 text-blue-600" />,
              formData.financial || {},
              "/loan-info/financial",
            )}
          </div>

          {/* Loan Summary */}
          {formData.property?.purchasePrice && formData.financial?.deposit && (
            <Card className="mb-8 bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">Loan Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-900">
                      {formatCurrency(
                        (Number.parseFloat(formData.property.purchasePrice) || 0) -
                          (Number.parseFloat(formData.financial.deposit) || 0),
                      )}
                    </div>
                    <div className="text-sm text-blue-700">Estimated Loan Amount</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-900">
                      {formData.property.purchasePrice
                        ? Math.round(
                            ((Number.parseFloat(formData.property.purchasePrice) -
                              (Number.parseFloat(formData.financial?.deposit) || 0)) /
                              Number.parseFloat(formData.property.purchasePrice)) *
                              100,
                          )
                        : 0}
                      %
                    </div>
                    <div className="text-sm text-blue-700">Loan to Value Ratio</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-900">
                      {formatCurrency(formData.property.purchasePrice || 0)}
                    </div>
                    <div className="text-sm text-blue-700">Property Value</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                What Happens Next?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Lender Matching</h4>
                    <p className="text-sm text-gray-600">We'll match you with suitable lenders based on your profile</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Competitive Offers</h4>
                    <p className="text-sm text-gray-600">
                      Receive multiple loan offers with competitive rates and terms
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Choose Your Loan</h4>
                    <p className="text-sm text-gray-600">Compare offers and select the best loan for your needs</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Button variant="outline" asChild className="bg-transparent">
              <Link href="/loan-info/financial">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Financial Info
              </Link>
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 px-8"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  Get My Loan Offers
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
