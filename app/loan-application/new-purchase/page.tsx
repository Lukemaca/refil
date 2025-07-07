"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Home, DollarSign, User, Briefcase, FileText } from "lucide-react"
import Link from "next/link"

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  maritalStatus: string
  dependents: string
  residencyStatus: string

  // Property Information
  propertyType: string
  propertyValue: string
  propertyAddress: string
  propertyCity: string
  propertyState: string
  propertyZip: string
  isFirstHome: boolean

  // Employment Information
  employmentStatus: string
  employerName: string
  jobTitle: string
  yearsAtJob: string
  annualIncome: string
  additionalIncome: string

  // Financial Information
  existingLoan: string
  creditCardDebt: string
  otherDebts: string
  monthlyExpenses: string
  assets: string
  creditScore: string
  bankruptcy: string
  foreclosure: string

  // Loan Information
  loanAmount: string
  loanTerm: string
  loanPurpose: string
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  maritalStatus: "",
  dependents: "",
  residencyStatus: "",
  propertyType: "",
  propertyValue: "",
  propertyAddress: "",
  propertyCity: "",
  propertyState: "",
  propertyZip: "",
  isFirstHome: false,
  employmentStatus: "",
  employerName: "",
  jobTitle: "",
  yearsAtJob: "",
  annualIncome: "",
  additionalIncome: "",
  existingLoan: "",
  creditCardDebt: "",
  otherDebts: "",
  monthlyExpenses: "",
  assets: "",
  creditScore: "",
  bankruptcy: "",
  foreclosure: "",
  loanAmount: "",
  loanTerm: "",
  loanPurpose: "purchase",
}

export default function NewPurchaseLoanApplication() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const totalSteps = 5

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {}

    switch (step) {
      case 1: // Personal Information
        if (!formData.firstName?.trim()) newErrors.firstName = "First name is required"
        if (!formData.lastName?.trim()) newErrors.lastName = "Last name is required"
        if (!formData.email?.trim()) newErrors.email = "Email is required"
        if (!formData.phone?.trim()) newErrors.phone = "Phone is required"
        if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
        if (!formData.maritalStatus) newErrors.maritalStatus = "Marital status is required"
        if (!formData.residencyStatus) newErrors.residencyStatus = "Residency status is required"
        break

      case 2: // Property Information
        if (!formData.propertyType) newErrors.propertyType = "Property type is required"
        if (!formData.propertyValue?.trim()) newErrors.propertyValue = "Property value is required"
        if (!formData.propertyAddress?.trim()) newErrors.propertyAddress = "Property address is required"
        if (!formData.propertyCity?.trim()) newErrors.propertyCity = "City is required"
        if (!formData.propertyState) newErrors.propertyState = "State is required"
        if (!formData.propertyZip?.trim()) newErrors.propertyZip = "Postcode is required"
        break

      case 3: // Employment Information
        if (!formData.employmentStatus) newErrors.employmentStatus = "Employment status is required"
        if (!formData.employerName?.trim()) newErrors.employerName = "Employer name is required"
        if (!formData.jobTitle?.trim()) newErrors.jobTitle = "Job title is required"
        if (!formData.yearsAtJob) newErrors.yearsAtJob = "Years at job is required"
        if (!formData.annualIncome?.trim()) newErrors.annualIncome = "Annual income is required"
        break

      case 4: // Financial Information
        if (!formData.monthlyExpenses?.trim()) newErrors.monthlyExpenses = "Monthly expenses is required"
        if (!formData.creditScore) newErrors.creditScore = "Credit score is required"
        if (!formData.bankruptcy) newErrors.bankruptcy = "Bankruptcy status is required"
        if (!formData.foreclosure) newErrors.foreclosure = "Foreclosure status is required"
        break

      case 5: // Loan Information
        if (!formData.loanAmount?.trim()) newErrors.loanAmount = "Loan amount is required"
        if (!formData.loanTerm) newErrors.loanTerm = "Loan term is required"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // Save to localStorage or send to API
      localStorage.setItem("loanApplication", JSON.stringify(formData))
      router.push("/loan-application/confirmation")
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <User className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                  className={errors.dateOfBirth ? "border-red-500" : ""}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>

              <div>
                <Label htmlFor="maritalStatus">Marital Status *</Label>
                <Select
                  value={formData.maritalStatus}
                  onValueChange={(value) => updateFormData("maritalStatus", value)}
                >
                  <SelectTrigger className={errors.maritalStatus ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                    <SelectItem value="separated">Separated</SelectItem>
                  </SelectContent>
                </Select>
                {errors.maritalStatus && <p className="text-red-500 text-sm mt-1">{errors.maritalStatus}</p>}
              </div>

              <div>
                <Label htmlFor="dependents">Number of Dependents</Label>
                <Select value={formData.dependents} onValueChange={(value) => updateFormData("dependents", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of dependents" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5+">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="residencyStatus">Residency Status *</Label>
                <Select
                  value={formData.residencyStatus}
                  onValueChange={(value) => updateFormData("residencyStatus", value)}
                >
                  <SelectTrigger className={errors.residencyStatus ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select residency status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="citizen">Australian Citizen</SelectItem>
                    <SelectItem value="permanent_resident">Permanent Resident</SelectItem>
                    <SelectItem value="temporary_resident">Temporary Resident</SelectItem>
                    <SelectItem value="visa_holder">Visa Holder</SelectItem>
                  </SelectContent>
                </Select>
                {errors.residencyStatus && <p className="text-red-500 text-sm mt-1">{errors.residencyStatus}</p>}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Home className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold">Property Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="propertyType">Property Type *</Label>
                <Select value={formData.propertyType} onValueChange={(value) => updateFormData("propertyType", value)}>
                  <SelectTrigger className={errors.propertyType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="unit">Unit</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
                </Select>
                {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>}
              </div>

              <div>
                <Label htmlFor="propertyValue">Property Value *</Label>
                <Input
                  id="propertyValue"
                  type="number"
                  placeholder="e.g., 650000"
                  value={formData.propertyValue}
                  onChange={(e) => updateFormData("propertyValue", e.target.value)}
                  className={errors.propertyValue ? "border-red-500" : ""}
                />
                {errors.propertyValue && <p className="text-red-500 text-sm mt-1">{errors.propertyValue}</p>}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="propertyAddress">Property Address *</Label>
                <Input
                  id="propertyAddress"
                  placeholder="e.g., 123 Main Street"
                  value={formData.propertyAddress}
                  onChange={(e) => updateFormData("propertyAddress", e.target.value)}
                  className={errors.propertyAddress ? "border-red-500" : ""}
                />
                {errors.propertyAddress && <p className="text-red-500 text-sm mt-1">{errors.propertyAddress}</p>}
              </div>

              <div>
                <Label htmlFor="propertyCity">City *</Label>
                <Input
                  id="propertyCity"
                  placeholder="e.g., Melbourne"
                  value={formData.propertyCity}
                  onChange={(e) => updateFormData("propertyCity", e.target.value)}
                  className={errors.propertyCity ? "border-red-500" : ""}
                />
                {errors.propertyCity && <p className="text-red-500 text-sm mt-1">{errors.propertyCity}</p>}
              </div>

              <div>
                <Label htmlFor="propertyState">State *</Label>
                <Select
                  value={formData.propertyState}
                  onValueChange={(value) => updateFormData("propertyState", value)}
                >
                  <SelectTrigger className={errors.propertyState ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NSW">New South Wales</SelectItem>
                    <SelectItem value="VIC">Victoria</SelectItem>
                    <SelectItem value="QLD">Queensland</SelectItem>
                    <SelectItem value="WA">Western Australia</SelectItem>
                    <SelectItem value="SA">South Australia</SelectItem>
                    <SelectItem value="TAS">Tasmania</SelectItem>
                    <SelectItem value="ACT">Australian Capital Territory</SelectItem>
                    <SelectItem value="NT">Northern Territory</SelectItem>
                  </SelectContent>
                </Select>
                {errors.propertyState && <p className="text-red-500 text-sm mt-1">{errors.propertyState}</p>}
              </div>

              <div>
                <Label htmlFor="propertyZip">Postcode *</Label>
                <Input
                  id="propertyZip"
                  placeholder="e.g., 3000"
                  value={formData.propertyZip}
                  onChange={(e) => updateFormData("propertyZip", e.target.value)}
                  className={errors.propertyZip ? "border-red-500" : ""}
                />
                {errors.propertyZip && <p className="text-red-500 text-sm mt-1">{errors.propertyZip}</p>}
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isFirstHome"
                    checked={formData.isFirstHome}
                    onCheckedChange={(checked) => updateFormData("isFirstHome", checked as boolean)}
                  />
                  <Label htmlFor="isFirstHome">This is my first home purchase</Label>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Briefcase className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold">Employment Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employmentStatus">Employment Status *</Label>
                <Select
                  value={formData.employmentStatus}
                  onValueChange={(value) => updateFormData("employmentStatus", value)}
                >
                  <SelectTrigger className={errors.employmentStatus ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select employment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full_time">Full-time Employee</SelectItem>
                    <SelectItem value="part_time">Part-time Employee</SelectItem>
                    <SelectItem value="casual">Casual Employee</SelectItem>
                    <SelectItem value="contract">Contract Worker</SelectItem>
                    <SelectItem value="self_employed">Self-employed</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
                {errors.employmentStatus && <p className="text-red-500 text-sm mt-1">{errors.employmentStatus}</p>}
              </div>

              <div>
                <Label htmlFor="employerName">Employer Name *</Label>
                <Input
                  id="employerName"
                  placeholder="e.g., ABC Company Pty Ltd"
                  value={formData.employerName}
                  onChange={(e) => updateFormData("employerName", e.target.value)}
                  className={errors.employerName ? "border-red-500" : ""}
                />
                {errors.employerName && <p className="text-red-500 text-sm mt-1">{errors.employerName}</p>}
              </div>

              <div>
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g., Software Engineer"
                  value={formData.jobTitle}
                  onChange={(e) => updateFormData("jobTitle", e.target.value)}
                  className={errors.jobTitle ? "border-red-500" : ""}
                />
                {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>}
              </div>

              <div>
                <Label htmlFor="yearsAtJob">Years at Current Job *</Label>
                <Select value={formData.yearsAtJob} onValueChange={(value) => updateFormData("yearsAtJob", value)}>
                  <SelectTrigger className={errors.yearsAtJob ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less_than_1">Less than 1 year</SelectItem>
                    <SelectItem value="1_2">1-2 years</SelectItem>
                    <SelectItem value="2_5">2-5 years</SelectItem>
                    <SelectItem value="5_10">5-10 years</SelectItem>
                    <SelectItem value="more_than_10">More than 10 years</SelectItem>
                  </SelectContent>
                </Select>
                {errors.yearsAtJob && <p className="text-red-500 text-sm mt-1">{errors.yearsAtJob}</p>}
              </div>

              <div>
                <Label htmlFor="annualIncome">Annual Income (before tax) *</Label>
                <Input
                  id="annualIncome"
                  type="number"
                  placeholder="e.g., 75000"
                  value={formData.annualIncome}
                  onChange={(e) => updateFormData("annualIncome", e.target.value)}
                  className={errors.annualIncome ? "border-red-500" : ""}
                />
                {errors.annualIncome && <p className="text-red-500 text-sm mt-1">{errors.annualIncome}</p>}
              </div>

              <div>
                <Label htmlFor="additionalIncome">Additional Income (optional)</Label>
                <Input
                  id="additionalIncome"
                  type="number"
                  placeholder="e.g., 5000"
                  value={formData.additionalIncome}
                  onChange={(e) => updateFormData("additionalIncome", e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <DollarSign className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold">Financial Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="existingLoan">Existing Home Loan Balance</Label>
                <Input
                  id="existingLoan"
                  type="number"
                  placeholder="e.g., 200000"
                  value={formData.existingLoan}
                  onChange={(e) => updateFormData("existingLoan", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="creditCardDebt">Credit Card Debt</Label>
                <Input
                  id="creditCardDebt"
                  type="number"
                  placeholder="e.g., 5000"
                  value={formData.creditCardDebt}
                  onChange={(e) => updateFormData("creditCardDebt", e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="otherDebts">Other Debts (car loans, personal loans, etc.)</Label>
                <Textarea
                  id="otherDebts"
                  placeholder="Describe any other debts..."
                  value={formData.otherDebts}
                  onChange={(e) => updateFormData("otherDebts", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="monthlyExpenses">Monthly Living Expenses *</Label>
                <Input
                  id="monthlyExpenses"
                  type="number"
                  placeholder="e.g., 3000"
                  value={formData.monthlyExpenses}
                  onChange={(e) => updateFormData("monthlyExpenses", e.target.value)}
                  className={errors.monthlyExpenses ? "border-red-500" : ""}
                />
                {errors.monthlyExpenses && <p className="text-red-500 text-sm mt-1">{errors.monthlyExpenses}</p>}
              </div>

              <div>
                <Label htmlFor="creditScore">Credit Score *</Label>
                <Select value={formData.creditScore} onValueChange={(value) => updateFormData("creditScore", value)}>
                  <SelectTrigger className={errors.creditScore ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select credit score range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent (800+)</SelectItem>
                    <SelectItem value="very_good">Very Good (740-799)</SelectItem>
                    <SelectItem value="good">Good (670-739)</SelectItem>
                    <SelectItem value="fair">Fair (580-669)</SelectItem>
                    <SelectItem value="poor">Poor (Below 580)</SelectItem>
                    <SelectItem value="unknown">I don't know</SelectItem>
                  </SelectContent>
                </Select>
                {errors.creditScore && <p className="text-red-500 text-sm mt-1">{errors.creditScore}</p>}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="assets">Assets (savings, investments, superannuation, etc.)</Label>
                <Textarea
                  id="assets"
                  placeholder="Describe your assets..."
                  value={formData.assets}
                  onChange={(e) => updateFormData("assets", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="bankruptcy">Have you ever declared bankruptcy? *</Label>
                <Select value={formData.bankruptcy} onValueChange={(value) => updateFormData("bankruptcy", value)}>
                  <SelectTrigger className={errors.bankruptcy ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                  </SelectContent>
                </Select>
                {errors.bankruptcy && <p className="text-red-500 text-sm mt-1">{errors.bankruptcy}</p>}
              </div>

              <div>
                <Label htmlFor="foreclosure">Have you ever had a property foreclosed? *</Label>
                <Select value={formData.foreclosure} onValueChange={(value) => updateFormData("foreclosure", value)}>
                  <SelectTrigger className={errors.foreclosure ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                  </SelectContent>
                </Select>
                {errors.foreclosure && <p className="text-red-500 text-sm mt-1">{errors.foreclosure}</p>}
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <FileText className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold">Loan Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="loanAmount">Loan Amount *</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  placeholder="e.g., 500000"
                  value={formData.loanAmount}
                  onChange={(e) => updateFormData("loanAmount", e.target.value)}
                  className={errors.loanAmount ? "border-red-500" : ""}
                />
                {errors.loanAmount && <p className="text-red-500 text-sm mt-1">{errors.loanAmount}</p>}
              </div>

              <div>
                <Label htmlFor="loanTerm">Loan Term *</Label>
                <Select value={formData.loanTerm} onValueChange={(value) => updateFormData("loanTerm", value)}>
                  <SelectTrigger className={errors.loanTerm ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select loan term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 years</SelectItem>
                    <SelectItem value="20">20 years</SelectItem>
                    <SelectItem value="25">25 years</SelectItem>
                    <SelectItem value="30">30 years</SelectItem>
                  </SelectContent>
                </Select>
                {errors.loanTerm && <p className="text-red-500 text-sm mt-1">{errors.loanTerm}</p>}
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Application Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p>
                    <strong>Name:</strong> {formData.firstName} {formData.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Property Type:</strong> {formData.propertyType?.replace("_", " ") || "Not specified"}
                  </p>
                  <p>
                    <strong>Property Value:</strong> $
                    {formData.propertyValue ? Number(formData.propertyValue).toLocaleString() : "Not specified"}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Employment:</strong> {formData.employmentStatus?.replace("_", " ") || "Not specified"}
                  </p>
                  <p>
                    <strong>Annual Income:</strong> $
                    {formData.annualIncome ? Number(formData.annualIncome).toLocaleString() : "Not specified"}
                  </p>
                  <p>
                    <strong>Loan Amount:</strong> $
                    {formData.loanAmount ? Number(formData.loanAmount).toLocaleString() : "Not specified"}
                  </p>
                  <p>
                    <strong>Loan Term:</strong> {formData.loanTerm} years
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">New Purchase Loan Application</h1>
          <p className="text-gray-600 mt-2">
            Complete your application to get competitive loan offers from multiple lenders
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card>
          <CardContent className="p-8">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep === totalSteps ? (
                <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                  Submit Application
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
