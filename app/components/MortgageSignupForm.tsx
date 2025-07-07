"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle } from "lucide-react"

const steps = ["Personal Details", "Property Information", "Loan Requirements"]

export default function MortgageSignupForm({ redirect }: { redirect?: string }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    employmentStatus: "",
    annualIncome: "",
    propertyAddress: "",
    propertyType: "",
    propertyValue: "",
    currentLoanBalance: "",
    loanAmount: "",
    loanPurpose: "",
    loanTerm: "",
    creditScore: "",
    loanFeatures: {
      offsetAccount: false,
      redrawFacility: false,
      fixedRate: false,
      variableRate: false,
      splitLoan: false,
      interestOnly: false,
      principalAndInterest: false,
      noEarlyRepaymentFees: false,
    },
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))

    // Clear error when field is modified
    if (errors[name]) {
      const newErrors = { ...errors }
      delete newErrors[name]
      setErrors(newErrors)
    }
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))

    // Clear error when field is modified
    if (errors[name]) {
      const newErrors = { ...errors }
      delete newErrors[name]
      setErrors(newErrors)
    }
  }

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      loanFeatures: {
        ...prevData.loanFeatures,
        [name]: checked,
      },
    }))
  }

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 0) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
      else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) newErrors.phone = "Phone number should be 10 digits"
    }

    if (step === 1) {
      if (!formData.propertyAddress.trim()) newErrors.propertyAddress = "Property address is required"
      if (!formData.propertyType) newErrors.propertyType = "Property type is required"
      if (!formData.propertyValue) newErrors.propertyValue = "Property value is required"
    }

    if (step === 2) {
      if (!formData.loanAmount) newErrors.loanAmount = "Loan amount is required"
      if (!formData.loanPurpose) newErrors.loanPurpose = "Loan purpose is required"
      if (!formData.loanTerm) newErrors.loanTerm = "Loan term is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(currentStep)) {
      return
    }

    console.log("Form submitted:", formData)
    if (redirect) {
      router.push(redirect)
    }
  }

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      return
    }

    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Personal Details</h3>
              <p className="text-gray-600 mb-4">
                Please provide your personal information to help us find the best home loan options for you to compare.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center">
                  Full Name <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={errors.fullName ? "border-red-500" : ""}
                  required
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.fullName}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center">
                  Email <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "border-red-500" : ""}
                  required
                />
                {errors.email && (
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center">
                  Phone Number <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? "border-red-500" : ""}
                  placeholder="0400 123 456"
                  required
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.phone}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Current Address</Label>
                <Input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employmentStatus">Employment Status</Label>
                <Select onValueChange={handleSelectChange("employmentStatus")} value={formData.employmentStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fullTime">Full-Time</SelectItem>
                    <SelectItem value="partTime">Part-Time</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="selfEmployed">Self-Employed</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="annualIncome">Annual Income (AUD)</Label>
                <Input
                  type="number"
                  id="annualIncome"
                  name="annualIncome"
                  value={formData.annualIncome}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
            </div>
          </>
        )
      case 1:
        return (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Property Information</h3>
              <p className="text-gray-600 mb-4">Tell us about the property you're refinancing.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="propertyAddress" className="flex items-center">
                  Property Address <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  type="text"
                  id="propertyAddress"
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleInputChange}
                  className={errors.propertyAddress ? "border-red-500" : ""}
                  required
                />
                {errors.propertyAddress && (
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.propertyAddress}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="propertyType" className="flex items-center">
                  Property Type <span className="text-red-500 ml-1">*</span>
                </Label>
                <Select onValueChange={handleSelectChange("propertyType")} value={formData.propertyType}>
                  <SelectTrigger className={errors.propertyType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment/Unit</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="land">Vacant Land</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.propertyType && (
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.propertyType}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="propertyValue" className="flex items-center">
                  Estimated Property Value (AUD) <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  type="number"
                  id="propertyValue"
                  name="propertyValue"
                  value={formData.propertyValue}
                  onChange={handleInputChange}
                  className={errors.propertyValue ? "border-red-500" : ""}
                  min="0"
                  required
                />
                {errors.propertyValue && (
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.propertyValue}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentLoanBalance">Current Loan Balance (AUD)</Label>
                <Input
                  type="number"
                  id="currentLoanBalance"
                  name="currentLoanBalance"
                  value={formData.currentLoanBalance}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
            </div>
          </>
        )
      case 2:
        return (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Loan Requirements</h3>
              <p className="text-gray-600 mb-4">Tell us about the home loan you're looking for.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loanAmount" className="flex items-center">
                  Desired Loan Amount (AUD) <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  type="number"
                  id="loanAmount"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  className={errors.loanAmount ? "border-red-500" : ""}
                  min="0"
                  required
                />
                {errors.loanAmount && (
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.loanAmount}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="loanPurpose" className="flex items-center">
                  Loan Purpose <span className="text-red-500 ml-1">*</span>
                </Label>
                <Select onValueChange={handleSelectChange("loanPurpose")} value={formData.loanPurpose}>
                  <SelectTrigger className={errors.loanPurpose ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select loan purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="refinance">Refinance Existing Mortgage</SelectItem>
                    <SelectItem value="lowerRate">Lower Interest Rate</SelectItem>
                    <SelectItem value="cashOut">Cash Out / Access Equity</SelectItem>
                    <SelectItem value="consolidate">Debt Consolidation</SelectItem>
                    <SelectItem value="renovation">Home Renovation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.loanPurpose && (
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.loanPurpose}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="loanTerm" className="flex items-center">
                  Preferred Loan Term (Years) <span className="text-red-500 ml-1">*</span>
                </Label>
                <Select onValueChange={handleSelectChange("loanTerm")} value={formData.loanTerm}>
                  <SelectTrigger className={errors.loanTerm ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select loan term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 years</SelectItem>
                    <SelectItem value="15">15 years</SelectItem>
                    <SelectItem value="20">20 years</SelectItem>
                    <SelectItem value="25">25 years</SelectItem>
                    <SelectItem value="30">30 years</SelectItem>
                  </SelectContent>
                </Select>
                {errors.loanTerm && (
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.loanTerm}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="creditScore">Credit Score (if known)</Label>
                <Input
                  type="number"
                  id="creditScore"
                  name="creditScore"
                  value={formData.creditScore}
                  onChange={handleInputChange}
                  min="0"
                  max="1000"
                />
                <p className="text-sm text-gray-500">Leave blank if you're unsure. We can help you check this later.</p>
              </div>
              <div className="space-y-2">
                <Label>Select the home loan features that interest you:</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="offsetAccount"
                      checked={formData.loanFeatures.offsetAccount}
                      onCheckedChange={handleCheckboxChange("offsetAccount")}
                    />
                    <Label htmlFor="offsetAccount">Offset Account</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="redrawFacility"
                      checked={formData.loanFeatures.redrawFacility}
                      onCheckedChange={handleCheckboxChange("redrawFacility")}
                    />
                    <Label htmlFor="redrawFacility">Redraw Facility</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fixedRate"
                      checked={formData.loanFeatures.fixedRate}
                      onCheckedChange={handleCheckboxChange("fixedRate")}
                    />
                    <Label htmlFor="fixedRate">Fixed Interest Rate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="variableRate"
                      checked={formData.loanFeatures.variableRate}
                      onCheckedChange={handleCheckboxChange("variableRate")}
                    />
                    <Label htmlFor="variableRate">Variable Interest Rate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="splitLoan"
                      checked={formData.loanFeatures.splitLoan || false}
                      onCheckedChange={handleCheckboxChange("splitLoan")}
                    />
                    <Label htmlFor="splitLoan">Split Loan (Part Fixed, Part Variable)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="interestOnly"
                      checked={formData.loanFeatures.interestOnly}
                      onCheckedChange={handleCheckboxChange("interestOnly")}
                    />
                    <Label htmlFor="interestOnly">Interest-Only Period</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="principalAndInterest"
                      checked={formData.loanFeatures.principalAndInterest}
                      onCheckedChange={handleCheckboxChange("principalAndInterest")}
                    />
                    <Label htmlFor="principalAndInterest">Principal and Interest</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="noEarlyRepaymentFees"
                      checked={formData.loanFeatures.noEarlyRepaymentFees}
                      onCheckedChange={handleCheckboxChange("noEarlyRepaymentFees")}
                    />
                    <Label htmlFor="noEarlyRepaymentFees">No Early Repayment Fees</Label>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Home Loan Refinance Comparison Tool</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Progress value={((currentStep + 1) / steps.length) * 100} className="w-full" />
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <span key={index} className={`text-sm ${index === currentStep ? "font-bold" : ""}`}>
                {step}
              </span>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="button" onClick={prevStep} disabled={currentStep === 0} variant="outline">
          Previous
        </Button>
        {currentStep === steps.length - 1 ? (
          <Button type="submit" onClick={handleSubmit}>
            Get Home Loan Comparisons
          </Button>
        ) : (
          <Button type="button" onClick={nextStep}>
            Next
          </Button>
        )}
      </CardFooter>
      <div className="px-6 pb-6 text-sm text-gray-500">
        <p>
          <span className="text-red-500">*</span> Indicates required fields
        </p>
      </div>
    </Card>
  )
}
