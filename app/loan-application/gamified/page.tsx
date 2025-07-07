"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Home,
  DollarSign,
  User,
  Briefcase,
  FileText,
  Star,
  Trophy,
  Target,
} from "lucide-react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  maritalStatus: string
  dependents: string

  // Property Information
  propertyType: string
  propertyValue: string
  loanAmount: string
  loanPurpose: string
  propertyAddress: string

  // Employment Information
  employmentStatus: string
  employer: string
  jobTitle: string
  employmentLength: string
  annualIncome: string

  // Financial Information
  monthlyExpenses: string
  existingDebts: string
  creditCardLimits: string
  assets: string

  // Loan Preferences
  loanTerm: string
  repaymentFrequency: string
  interestRateType: string

  // Additional Information
  additionalInfo: string

  // Consents
  creditCheck: boolean
  termsAccepted: boolean
  marketingConsent: boolean
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  maritalStatus: "",
  dependents: "",
  propertyType: "",
  propertyValue: "",
  loanAmount: "",
  loanPurpose: "",
  propertyAddress: "",
  employmentStatus: "",
  employer: "",
  jobTitle: "",
  employmentLength: "",
  annualIncome: "",
  monthlyExpenses: "",
  existingDebts: "",
  creditCardLimits: "",
  assets: "",
  loanTerm: "",
  repaymentFrequency: "",
  interestRateType: "",
  additionalInfo: "",
  creditCheck: false,
  termsAccepted: false,
  marketingConsent: false,
}

const steps = [
  {
    id: 1,
    title: "Personal Details",
    description: "Tell us about yourself",
    icon: User,
    color: "bg-blue-500",
    points: 100,
  },
  {
    id: 2,
    title: "Property Information",
    description: "Details about your property",
    icon: Home,
    color: "bg-green-500",
    points: 150,
  },
  {
    id: 3,
    title: "Employment & Income",
    description: "Your work and income details",
    icon: Briefcase,
    color: "bg-purple-500",
    points: 200,
  },
  {
    id: 4,
    title: "Financial Position",
    description: "Your assets and liabilities",
    icon: DollarSign,
    color: "bg-orange-500",
    points: 150,
  },
  {
    id: 5,
    title: "Loan Preferences",
    description: "How you want your loan structured",
    icon: Target,
    color: "bg-pink-500",
    points: 100,
  },
  {
    id: 6,
    title: "Final Details",
    description: "Additional information and consents",
    icon: FileText,
    color: "bg-indigo-500",
    points: 100,
  },
]

export default function GamifiedLoanApplicationPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentStepData = steps.find((step) => step.id === currentStep)
  const progress = (currentStep / steps.length) * 100

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = localStorage.getItem("gamifiedLoanApplication")
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setFormData(parsed.formData || initialFormData)
        setCompletedSteps(parsed.completedSteps || [])
        setTotalPoints(parsed.totalPoints || 0)
        setCurrentStep(parsed.currentStep || 1)
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }
  }, [])

  const saveProgress = () => {
    const dataToSave = {
      formData,
      completedSteps,
      totalPoints,
      currentStep,
    }
    localStorage.setItem("gamifiedLoanApplication", JSON.stringify(dataToSave))
  }

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)
    saveProgress()
  }

  const completeStep = () => {
    if (!completedSteps.includes(currentStep)) {
      const newCompletedSteps = [...completedSteps, currentStep]
      const stepPoints = currentStepData?.points || 0
      const newTotalPoints = totalPoints + stepPoints

      setCompletedSteps(newCompletedSteps)
      setTotalPoints(newTotalPoints)

      // Save progress
      const dataToSave = {
        formData,
        completedSteps: newCompletedSteps,
        totalPoints: newTotalPoints,
        currentStep,
      }
      localStorage.setItem("gamifiedLoanApplication", JSON.stringify(dataToSave))
    }
  }

  const nextStep = () => {
    completeStep()
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone
      case 2:
        return formData.propertyType && formData.propertyValue && formData.loanAmount
      case 3:
        return formData.employmentStatus && formData.annualIncome
      case 4:
        return formData.monthlyExpenses
      case 5:
        return formData.loanTerm && formData.repaymentFrequency
      case 6:
        return formData.creditCheck && formData.termsAccepted
      default:
        return true
    }
  }

  const handleSubmit = async () => {
    if (!isStepValid()) return

    setIsSubmitting(true)
    completeStep()

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create application data
      const applicationData = {
        id: `APP-${Date.now()}`,
        type: formData.loanPurpose,
        personalInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        },
        status: "submitted",
        submittedAt: new Date().toISOString(),
        formData,
        totalPoints,
      }

      // Save to localStorage
      localStorage.setItem("loanApplication", JSON.stringify(applicationData))
      localStorage.removeItem("gamifiedLoanApplication")

      // Redirect to completion page
      router.push("/application-complete")
    } catch (error) {
      console.error("Error submitting application:", error)
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="04XX XXX XXX"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select
                  value={formData.maritalStatus}
                  onValueChange={(value) => updateFormData("maritalStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="defacto">De facto</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="dependents">Number of Dependents</Label>
              <Select value={formData.dependents} onValueChange={(value) => updateFormData("dependents", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4+">4 or more</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="propertyType">Property Type *</Label>
                <Select value={formData.propertyType} onValueChange={(value) => updateFormData("propertyType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="unit">Unit</SelectItem>
                    <SelectItem value="land">Vacant Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="loanPurpose">Loan Purpose</Label>
                <Select value={formData.loanPurpose} onValueChange={(value) => updateFormData("loanPurpose", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purchase">Property Purchase</SelectItem>
                    <SelectItem value="refinance">Refinance</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="investment">Investment Property</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="propertyAddress">Property Address</Label>
              <Input
                id="propertyAddress"
                value={formData.propertyAddress}
                onChange={(e) => updateFormData("propertyAddress", e.target.value)}
                placeholder="Enter property address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="propertyValue">Property Value *</Label>
                <Input
                  id="propertyValue"
                  value={formData.propertyValue}
                  onChange={(e) => updateFormData("propertyValue", e.target.value)}
                  placeholder="$750,000"
                />
              </div>
              <div>
                <Label htmlFor="loanAmount">Loan Amount Required *</Label>
                <Input
                  id="loanAmount"
                  value={formData.loanAmount}
                  onChange={(e) => updateFormData("loanAmount", e.target.value)}
                  placeholder="$600,000"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employmentStatus">Employment Status *</Label>
                <Select
                  value={formData.employmentStatus}
                  onValueChange={(value) => updateFormData("employmentStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fulltime">Full-time Employee</SelectItem>
                    <SelectItem value="parttime">Part-time Employee</SelectItem>
                    <SelectItem value="casual">Casual Employee</SelectItem>
                    <SelectItem value="contract">Contract Worker</SelectItem>
                    <SelectItem value="selfemployed">Self-employed</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="employmentLength">Length of Employment</Label>
                <Select
                  value={formData.employmentLength}
                  onValueChange={(value) => updateFormData("employmentLength", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-6months">0-6 months</SelectItem>
                    <SelectItem value="6-12months">6-12 months</SelectItem>
                    <SelectItem value="1-2years">1-2 years</SelectItem>
                    <SelectItem value="2-5years">2-5 years</SelectItem>
                    <SelectItem value="5+years">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employer">Employer Name</Label>
                <Input
                  id="employer"
                  value={formData.employer}
                  onChange={(e) => updateFormData("employer", e.target.value)}
                  placeholder="Company name"
                />
              </div>
              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => updateFormData("jobTitle", e.target.value)}
                  placeholder="Your job title"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="annualIncome">Annual Income (before tax) *</Label>
              <Input
                id="annualIncome"
                value={formData.annualIncome}
                onChange={(e) => updateFormData("annualIncome", e.target.value)}
                placeholder="$85,000"
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="monthlyExpenses">Monthly Living Expenses *</Label>
              <Input
                id="monthlyExpenses"
                value={formData.monthlyExpenses}
                onChange={(e) => updateFormData("monthlyExpenses", e.target.value)}
                placeholder="$4,500"
              />
              <p className="text-sm text-gray-600 mt-1">
                Include rent/mortgage, utilities, groceries, transport, insurance, etc.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="existingDebts">Existing Debts (monthly payments)</Label>
                <Input
                  id="existingDebts"
                  value={formData.existingDebts}
                  onChange={(e) => updateFormData("existingDebts", e.target.value)}
                  placeholder="$800"
                />
                <p className="text-sm text-gray-600 mt-1">Car loans, personal loans, HECS, etc.</p>
              </div>
              <div>
                <Label htmlFor="creditCardLimits">Total Credit Card Limits</Label>
                <Input
                  id="creditCardLimits"
                  value={formData.creditCardLimits}
                  onChange={(e) => updateFormData("creditCardLimits", e.target.value)}
                  placeholder="$15,000"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="assets">Total Assets Value</Label>
              <Input
                id="assets"
                value={formData.assets}
                onChange={(e) => updateFormData("assets", e.target.value)}
                placeholder="$150,000"
              />
              <p className="text-sm text-gray-600 mt-1">
                Savings, investments, superannuation, property, vehicles, etc.
              </p>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="loanTerm">Loan Term *</Label>
                <Select value={formData.loanTerm} onValueChange={(value) => updateFormData("loanTerm", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 years</SelectItem>
                    <SelectItem value="20">20 years</SelectItem>
                    <SelectItem value="25">25 years</SelectItem>
                    <SelectItem value="30">30 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="repaymentFrequency">Repayment Frequency *</Label>
                <Select
                  value={formData.repaymentFrequency}
                  onValueChange={(value) => updateFormData("repaymentFrequency", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="fortnightly">Fortnightly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="interestRateType">Interest Rate Type</Label>
              <Select
                value={formData.interestRateType}
                onValueChange={(value) => updateFormData("interestRateType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="variable">Variable Rate</SelectItem>
                  <SelectItem value="fixed">Fixed Rate</SelectItem>
                  <SelectItem value="split">Split (Variable + Fixed)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => updateFormData("additionalInfo", e.target.value)}
                placeholder="Any additional information you'd like to share..."
                rows={4}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="creditCheck"
                  checked={formData.creditCheck}
                  onCheckedChange={(checked) => updateFormData("creditCheck", checked as boolean)}
                />
                <div className="text-sm">
                  <Label htmlFor="creditCheck" className="font-medium">
                    I authorise credit checks *
                  </Label>
                  <p className="text-gray-600">
                    I authorise lenders to access my credit information to assess my application.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => updateFormData("termsAccepted", checked as boolean)}
                />
                <div className="text-sm">
                  <Label htmlFor="termsAccepted" className="font-medium">
                    I accept the Terms of Service *
                  </Label>
                  <p className="text-gray-600">
                    I have read and agree to the{" "}
                    <a href="/terms" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="marketingConsent"
                  checked={formData.marketingConsent}
                  onCheckedChange={(checked) => updateFormData("marketingConsent", checked as boolean)}
                />
                <div className="text-sm">
                  <Label htmlFor="marketingConsent" className="font-medium">
                    Marketing communications (optional)
                  </Label>
                  <p className="text-gray-600">
                    I consent to receive marketing communications about loan products and services.
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Loan Application</h1>
                <p className="text-gray-600">Complete your application to get competitive loan offers</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span className="text-lg font-bold text-gray-900">{totalPoints} points</span>
                </div>
                <Badge variant="outline" className="text-sm">
                  Step {currentStep} of {steps.length}
                </Badge>
              </div>
            </div>

            <Progress value={progress} className="h-2 mb-4" />

            {/* Step indicators */}
            <div className="flex justify-between">
              {steps.map((step) => {
                const isCompleted = completedSteps.includes(step.id)
                const isCurrent = step.id === currentStep
                const StepIcon = step.icon

                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isCurrent
                            ? step.color + " text-white"
                            : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isCompleted ? <CheckCircle className="h-6 w-6" /> : <StepIcon className="h-6 w-6" />}
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium text-gray-900">{step.title}</p>
                      {isCompleted && (
                        <div className="flex items-center justify-center mt-1">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          <span className="text-xs text-yellow-600">+{step.points}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Main Form */}
          <Card className="shadow-lg">
            <CardHeader className={`${currentStepData?.color} text-white`}>
              <CardTitle className="flex items-center text-xl">
                {currentStepData && <currentStepData.icon className="h-6 w-6 mr-2" />}
                {currentStepData?.title}
              </CardTitle>
              <CardDescription className="text-white/90">{currentStepData?.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-8">{renderStepContent()}</CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep === steps.length ? (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid() || isSubmitting}
                className="bg-green-600 hover:bg-green-700 flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={nextStep} disabled={!isStepValid()} className="flex items-center">
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
