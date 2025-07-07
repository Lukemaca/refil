"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, AlertCircle, Home, RefreshCw } from "lucide-react"
import { useLoanInfo } from "../LoanInfoContext"

export default function PropertyInfoPage() {
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

    if (!formData.propertyType) {
      newErrors.propertyType = "Property type is required"
    }
    if (!formData.propertyValue || formData.propertyValue <= 0) {
      newErrors.propertyValue = "Property value is required"
    }
    if (!formData.propertyAddress?.trim()) {
      newErrors.propertyAddress = "Property address is required"
    }

    // Refinance specific validation
    if (formData.loanType === "refinance") {
      if (!formData.currentMortgage || formData.currentMortgage <= 0) {
        newErrors.currentMortgage = "Current mortgage balance is required"
      }
      if (!formData.currentLender?.trim()) {
        newErrors.currentLender = "Current lender is required"
      }
      if (!formData.currentInterestRate || formData.currentInterestRate <= 0) {
        newErrors.currentInterestRate = "Current interest rate is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      router.push("/loan-info/employment")
    }
  }

  const handleBack = () => {
    router.push("/loan-info/personal")
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

  const getPropertyTitle = () => {
    switch (formData.loanType) {
      case "refinance":
        return "Tell us about your current property"
      default:
        return "Tell us about the property"
    }
  }

  const getPropertyDescription = () => {
    switch (formData.loanType) {
      case "first_home_buyer":
        return "Provide details about the property you're looking to purchase as your first home."
      case "new_purchase":
        return "Provide details about the property you're looking to purchase."
      case "refinance":
        return "Provide details about your current property that you want to refinance."
      default:
        return "Provide details about the property."
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
              <span className="font-medium">Property Information</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{getPropertyTitle()}</h1>
            <p className="text-gray-600">{getPropertyDescription()}</p>
            <Progress value={40} className="mt-4" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {formData.loanType === "refinance" ? <RefreshCw className="h-5 w-5" /> : <Home className="h-5 w-5" />}
                Property Information
              </CardTitle>
              <CardDescription>{getPropertyDescription()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="propertyType">
                  Property Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.propertyType || ""}
                  onValueChange={(value) => handleInputChange("propertyType", value)}
                >
                  <SelectTrigger className={errors.propertyType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="unit">Unit</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="land">Vacant Land</SelectItem>
                  </SelectContent>
                </Select>
                {errors.propertyType && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.propertyType}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyValue">
                  {formData.loanType === "refinance" ? "Current Property Value" : "Property Value"} (AUD){" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="propertyValue"
                  type="number"
                  value={formData.propertyValue || ""}
                  onChange={(e) => handleInputChange("propertyValue", Number.parseInt(e.target.value))}
                  placeholder="e.g. 750000"
                  className={errors.propertyValue ? "border-red-500" : ""}
                />
                {errors.propertyValue && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.propertyValue}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyAddress">
                  Property Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="propertyAddress"
                  value={formData.propertyAddress || ""}
                  onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                  placeholder="Enter the property address"
                  className={errors.propertyAddress ? "border-red-500" : ""}
                />
                {errors.propertyAddress && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.propertyAddress}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyUsage">Property Usage</Label>
                <Select
                  value={formData.propertyUsage || ""}
                  onValueChange={(value) => handleInputChange("propertyUsage", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select property usage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner_occupied">Owner Occupied (Primary Residence)</SelectItem>
                    <SelectItem value="investment">Investment Property</SelectItem>
                    <SelectItem value="holiday_home">Holiday Home</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Select
                    value={formData.bedrooms?.toString() || ""}
                    onValueChange={(value) => handleInputChange("bedrooms", Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Select
                    value={formData.bathrooms?.toString() || ""}
                    onValueChange={(value) => handleInputChange("bathrooms", Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Bathrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyAge">Property Age (Years)</Label>
                  <Input
                    id="propertyAge"
                    type="number"
                    value={formData.propertyAge || ""}
                    onChange={(e) => handleInputChange("propertyAge", Number.parseInt(e.target.value))}
                    placeholder="e.g. 10"
                  />
                </div>
              </div>

              {/* Refinance specific fields */}
              {formData.loanType === "refinance" && (
                <div className="space-y-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium">Current Loan Details</h3>

                  <div className="space-y-2">
                    <Label htmlFor="currentMortgage">
                      Current Mortgage Balance (AUD) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="currentMortgage"
                      type="number"
                      value={formData.currentMortgage || ""}
                      onChange={(e) => handleInputChange("currentMortgage", Number.parseInt(e.target.value))}
                      placeholder="e.g. 450000"
                      className={errors.currentMortgage ? "border-red-500" : ""}
                    />
                    {errors.currentMortgage && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.currentMortgage}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentLender">
                        Current Lender <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="currentLender"
                        value={formData.currentLender || ""}
                        onChange={(e) => handleInputChange("currentLender", e.target.value)}
                        placeholder="e.g. Commonwealth Bank"
                        className={errors.currentLender ? "border-red-500" : ""}
                      />
                      {errors.currentLender && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.currentLender}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentInterestRate">
                        Current Interest Rate (%) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="currentInterestRate"
                        type="number"
                        step="0.01"
                        value={formData.currentInterestRate || ""}
                        onChange={(e) => handleInputChange("currentInterestRate", Number.parseFloat(e.target.value))}
                        placeholder="e.g. 6.89"
                        className={errors.currentInterestRate ? "border-red-500" : ""}
                      />
                      {errors.currentInterestRate && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.currentInterestRate}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNext}>
                  Next: Employment Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
