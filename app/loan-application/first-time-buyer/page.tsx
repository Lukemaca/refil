"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { HelpCircle, AlertCircle, Info } from "lucide-react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

export default function FirstTimeBuyerApplicationPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")
  const [progress, setProgress] = useState(16.7)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    maritalStatus: "",
    dependents: "",

    // Financial Information
    employmentStatus: "",
    employerName: "",
    jobTitle: "",
    yearsAtJob: "",
    annualIncome: "",
    partnerIncome: "",
    savings: "",
    otherAssets: "",
    existingDebts: "",
    monthlyExpenses: "",
    creditScore: "",

    // Property Preferences
    maxBudget: 500000,
    preferredLocations: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    mustHaveFeatures: "",
    timeframe: "",

    // First Home Buyer Status
    isFirstHomeBuyer: true,
    eligibleForGrants: "",
    interestedInSchemes: [],

    // Loan Requirements
    desiredLoanAmount: "",
    downPayment: "",
    loanTerm: "30",
    interestRatePreference: "",
    loanFeatures: [],

    // Additional Information
    additionalInfo: "",
    agreeToTerms: false,
    contactPreference: "email",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined

    setFormData({
      ...formData,
      [name]: checked !== undefined ? checked : value,
    })

    setTouched({
      ...touched,
      [name]: true,
    })

    // Clear error when field is modified
    if (errors[name]) {
      const newErrors = { ...errors }
      delete newErrors[name]
      setErrors(newErrors)
    }
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })

    setTouched({
      ...touched,
      [name]: true,
    })

    // Clear error when field is modified
    if (errors[name]) {
      const newErrors = { ...errors }
      delete newErrors[name]
      setErrors(newErrors)
    }
  }

  const handleCheckboxChange = (name: string, value: string) => (checked: boolean) => {
    const currentValues = Array.isArray(formData[name]) ? [...formData[name]] : []

    if (checked) {
      setFormData({
        ...formData,
        [name]: [...currentValues, value],
      })
    } else {
      setFormData({
        ...formData,
        [name]: currentValues.filter((item) => item !== value),
      })
    }

    setTouched({
      ...touched,
      [name]: true,
    })
  }

  const handleSliderChange = (name: string) => (value: number[]) => {
    setFormData({
      ...formData,
      [name]: value[0],
    })

    setTouched({
      ...touched,
      [name]: true,
    })
  }

  const validateTab = (tab: string) => {
    const newErrors: Record<string, string> = {}

    if (tab === "personal") {
      if (!formData.firstName) newErrors.firstName = "First name is required"
      if (!formData.lastName) newErrors.lastName = "Last name is required"
      if (!formData.email) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
      if (!formData.phone) newErrors.phone = "Phone number is required"
      else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) newErrors.phone = "Phone number should be 10 digits"
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    }

    if (tab === "financial") {
      if (!formData.employmentStatus) newErrors.employmentStatus = "Employment status is required"
      if (formData.employmentStatus !== "unemployed" && !formData.employerName)
        newErrors.employerName = "Employer name is required"
      if (!formData.annualIncome) newErrors.annualIncome = "Annual income is required"
      if (!formData.savings) newErrors.savings = "Savings amount is required"
    }

    if (tab === "property") {
      if (!formData.preferredLocations) newErrors.preferredLocations = "At least one preferred location is required"
      if (!formData.propertyType) newErrors.propertyType = "Property type is required"
      if (!formData.timeframe) newErrors.timeframe = "Timeframe is required"
    }

    if (tab === "fhb") {
      if (!formData.eligibleForGrants) newErrors.eligibleForGrants = "Please select an option"
      if (formData.interestedInSchemes.length === 0) newErrors.interestedInSchemes = "Please select at least one option"
    }

    if (tab === "loan") {
      if (!formData.desiredLoanAmount) newErrors.desiredLoanAmount = "Desired loan amount is required"
      if (!formData.downPayment) newErrors.downPayment = "Down payment amount is required"
      if (!formData.loanTerm) newErrors.loanTerm = "Loan term is required"
    }

    if (tab === "review") {
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateTab("review")) {
      return
    }

    console.log("Form submitted:", formData)
    router.push("/loan-application/confirmation")
  }

  const nextTab = (current: string) => {
    if (!validateTab(current)) {
      return
    }

    const tabs = ["personal", "financial", "property", "fhb", "loan", "review"]
    const currentIndex = tabs.indexOf(current)

    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
      setProgress(((currentIndex + 2) / tabs.length) * 100)
      window.scrollTo(0, 0)
    }
  }

  const prevTab = (current: string) => {
    const tabs = ["personal", "financial", "property", "fhb", "loan", "review"]
    const currentIndex = tabs.indexOf(current)

    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
      setProgress((currentIndex / tabs.length) * 100)
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">First Home Buyer Application</h1>
            <p className="text-gray-600">
              Complete this application to get personalized guidance and home loan options for your first home purchase.
            </p>
          </div>

          <div className="mb-8">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-500 mt-2">Application Progress: {Math.round(progress)}%</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>First Home Buyer Application Form</CardTitle>
              <CardDescription>
                Fields marked with <span className="text-red-500">*</span> are required. Your information is secure and
                encrypted.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="financial">Financial</TabsTrigger>
                    <TabsTrigger value="property">Property</TabsTrigger>
                    <TabsTrigger value="fhb">FHB Status</TabsTrigger>
                    <TabsTrigger value="loan">Loan</TabsTrigger>
                    <TabsTrigger value="review">Review</TabsTrigger>
                  </TabsList>

                  {/* Personal Information Tab */}
                  <TabsContent value="personal">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Personal Information</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="flex items-center">
                            First Name <span className="text-red-500 ml-1">*</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-gray-400 ml-1" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Your legal first name as it appears on your ID</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={errors.firstName ? "border-red-500" : ""}
                            required
                          />
                          {errors.firstName && (
                            <p className="text-sm text-red-500 flex items-center mt-1">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {errors.firstName}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="flex items-center">
                            Last Name <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={errors.lastName ? "border-red-500" : ""}
                            required
                          />
                          {errors.lastName && (
                            <p className="text-sm text-red-500 flex items-center mt-1">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center">
                            Email Address <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
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
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
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
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth" className="flex items-center">
                          Date of Birth <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className={errors.dateOfBirth ? "border-red-500" : ""}
                          required
                        />
                        {errors.dateOfBirth && (
                          <p className="text-sm text-red-500 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.dateOfBirth}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="maritalStatus">Marital Status</Label>
                          <Select onValueChange={handleSelectChange("maritalStatus")} value={formData.maritalStatus}>
                            <SelectTrigger id="maritalStatus">
                              <SelectValue placeholder="Select marital status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="single">Single</SelectItem>
                              <SelectItem value="married">Married</SelectItem>
                              <SelectItem value="defacto">De Facto</SelectItem>
                              <SelectItem value="divorced">Divorced</SelectItem>
                              <SelectItem value="widowed">Widowed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dependents">Number of Dependents</Label>
                          <Select onValueChange={handleSelectChange("dependents")} value={formData.dependents}>
                            <SelectTrigger id="dependents">
                              <SelectValue placeholder="Select number of dependents" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0</SelectItem>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="5+">5 or more</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex justify-between mt-6">
                        <div></div>
                        <Button type="button" onClick={() => nextTab("personal")}>
                          Next: Financial Information
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Financial Information Tab */}
                  <TabsContent value="financial">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Financial Information</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        This information helps us determine your borrowing capacity and eligibility for first home buyer
                        schemes.
                      </p>

                      <div className="space-y-2">
                        <Label htmlFor="employmentStatus" className="flex items-center">
                          Employment Status <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Select
                          onValueChange={handleSelectChange("employmentStatus")}
                          value={formData.employmentStatus}
                        >
                          <SelectTrigger
                            id="employmentStatus"
                            className={errors.employmentStatus ? "border-red-500" : ""}
                          >
                            <SelectValue placeholder="Select employment status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fullTime">Full-Time</SelectItem>
                            <SelectItem value="partTime">Part-Time</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="selfEmployed">Self-Employed</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="unemployed">Unemployed</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.employmentStatus && (
                          <p className="text-sm text-red-500 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.employmentStatus}
                          </p>
                        )}
                      </div>

                      {formData.employmentStatus && formData.employmentStatus !== "unemployed" && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="employerName" className="flex items-center">
                                Employer Name <span className="text-red-500 ml-1">*</span>
                              </Label>
                              <Input
                                id="employerName"
                                name="employerName"
                                value={formData.employerName}
                                onChange={handleChange}
                                className={errors.employerName ? "border-red-500" : ""}
                                required
                              />
                              {errors.employerName && (
                                <p className="text-sm text-red-500 flex items-center mt-1">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  {errors.employerName}
                                </p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="jobTitle">Job Title</Label>
                              <Input id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="yearsAtJob">Years at Current Job</Label>
                            <Select onValueChange={handleSelectChange("yearsAtJob")} value={formData.yearsAtJob}>
                              <SelectTrigger id="yearsAtJob">
                                <SelectValue placeholder="Select years at current job" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="lessThan1">Less than 1 year</SelectItem>
                                <SelectItem value="1-2">1-2 years</SelectItem>
                                <SelectItem value="3-5">3-5 years</SelectItem>
                                <SelectItem value="6-10">6-10 years</SelectItem>
                                <SelectItem value="10+">More than 10 years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="annualIncome" className="flex items-center">
                            Annual Income (AUD) <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <Input
                            id="annualIncome"
                            name="annualIncome"
                            type="number"
                            value={formData.annualIncome}
                            onChange={handleChange}
                            className={errors.annualIncome ? "border-red-500" : ""}
                            min="0"
                            required
                          />
                          {errors.annualIncome && (
                            <p className="text-sm text-red-500 flex items-center mt-1">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {errors.annualIncome}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="partnerIncome">Partner's Annual Income (if applicable)</Label>
                          <Input
                            id="partnerIncome"
                            name="partnerIncome"
                            type="number"
                            value={formData.partnerIncome}
                            onChange={handleChange}
                            min="0"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="savings" className="flex items-center">
                            Total Savings (AUD) <span className="text-red-500 ml-1">*</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-gray-400 ml-1" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Include all savings that could be used for a deposit</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </Label>
                          <Input
                            id="savings"
                            name="savings"
                            type="number"
                            value={formData.savings}
                            onChange={handleChange}
                            className={errors.savings ? "border-red-500" : ""}
                            min="0"
                            required
                          />
                          {errors.savings && (
                            <p className="text-sm text-red-500 flex items-center mt-1">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {errors.savings}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="otherAssets">Other Assets Value (AUD)</Label>
                          <Input
                            id="otherAssets"
                            name="otherAssets"
                            type="number"
                            value={formData.otherAssets}
                            onChange={handleChange}
                            min="0"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="existingDebts">Existing Debts (AUD)</Label>
                          <Input
                            id="existingDebts"
                            name="existingDebts"
                            type="number"
                            value={formData.existingDebts}
                            onChange={handleChange}
                            min="0"
                          />
                          <p className="text-xs text-gray-500">Include credit cards, personal loans, etc.</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="monthlyExpenses">Monthly Expenses (AUD)</Label>
                          <Input
                            id="monthlyExpenses"
                            name="monthlyExpenses"
                            type="number"
                            value={formData.monthlyExpenses}
                            onChange={handleChange}
                            min="0"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="creditScore">Credit Score (if known)</Label>
                        <Select onValueChange={handleSelectChange("creditScore")} value={formData.creditScore}>
                          <SelectTrigger id="creditScore">
                            <SelectValue placeholder="Select credit score range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="excellent">Excellent (800+)</SelectItem>
                            <SelectItem value="veryGood">Very Good (740-799)</SelectItem>
                            <SelectItem value="good">Good (670-739)</SelectItem>
                            <SelectItem value="fair">Fair (580-669)</SelectItem>
                            <SelectItem value="poor">Poor (300-579)</SelectItem>
                            <SelectItem value="unknown">I don't know</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-500">Don't worry if you don't know - we can help you check.</p>
                      </div>

                      <div className="flex justify-between mt-6">
                        <Button type="button" variant="outline" onClick={() => prevTab("financial")}>
                          Previous
                        </Button>
                        <Button type="button" onClick={() => nextTab("financial")}>
                          Next: Property Preferences
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Property Preferences Tab */}
                  <TabsContent value="property">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Property Preferences</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Tell us about the type of property you're looking for as a first home buyer.
                      </p>

                      <div className="space-y-2">
                        <Label htmlFor="maxBudget" className="flex items-center">
                          Maximum Budget (AUD)
                        </Label>
                        <div className="space-y-2">
                          <Slider
                            id="maxBudget"
                            min={200000}
                            max={2000000}
                            step={10000}
                            value={[formData.maxBudget]}
                            onValueChange={handleSliderChange("maxBudget")}
                            className="py-4"
                          />
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">$200,000</span>
                            <span className="text-sm font-medium">${formData.maxBudget.toLocaleString()}</span>
                            <span className="text-sm text-gray-500">$2,000,000+</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="preferredLocations" className="flex items-center">
                          Preferred Locations/Suburbs <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Input
                          id="preferredLocations"
                          name="preferredLocations"
                          value={formData.preferredLocations}
                          onChange={handleChange}
                          className={errors.preferredLocations ? "border-red-500" : ""}
                          placeholder="e.g., Richmond, Hawthorn, South Yarra"
                          required
                        />
                        {errors.preferredLocations && (
                          <p className="text-sm text-red-500 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.preferredLocations}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="propertyType" className="flex items-center">
                          Property Type <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Select onValueChange={handleSelectChange("propertyType")} value={formData.propertyType}>
                          <SelectTrigger id="propertyType" className={errors.propertyType ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                            <SelectItem value="duplex">Duplex</SelectItem>
                            <SelectItem value="land">Vacant Land</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.propertyType && (
                          <p className="text-sm text-red-500 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.propertyType}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="bedrooms">Bedrooms</Label>
                          <Select onValueChange={handleSelectChange("bedrooms")} value={formData.bedrooms}>
                            <SelectTrigger id="bedrooms">
                              <SelectValue placeholder="Select number of bedrooms" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="5+">5 or more</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bathrooms">Bathrooms</Label>
                          <Select onValueChange={handleSelectChange("bathrooms")} value={formData.bathrooms}>
                            <SelectTrigger id="bathrooms">
                              <SelectValue placeholder="Select number of bathrooms" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4+">4 or more</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mustHaveFeatures">Must-Have Features</Label>
                        <Input
                          id="mustHaveFeatures"
                          name="mustHaveFeatures"
                          value={formData.mustHaveFeatures}
                          onChange={handleChange}
                          placeholder="e.g., garage, garden, close to public transport"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeframe" className="flex items-center">
                          Purchase Timeframe <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Select onValueChange={handleSelectChange("timeframe")} value={formData.timeframe}>
                          <SelectTrigger id="timeframe" className={errors.timeframe ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select purchase timeframe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-3">0-3 months</SelectItem>
                            <SelectItem value="3-6">3-6 months</SelectItem>
                            <SelectItem value="6-12">6-12 months</SelectItem>
                            <SelectItem value="12+">More than 12 months</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.timeframe && (
                          <p className="text-sm text-red-500 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.timeframe}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-between mt-6">
                        <Button type="button" variant="outline" onClick={() => prevTab("property")}>
                          Previous
                        </Button>
                        <Button type="button" onClick={() => nextTab("property")}>
                          Next: First Home Buyer Status
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  {/* First Home Buyer Status Tab */}
                  <TabsContent value="fhb">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">First Home Buyer Status</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        As a first home buyer, you may be eligible for various government grants and schemes.
                      </p>

                      <Alert className="bg-blue-50 border-blue-200 mb-6">
                        <Info className="h-4 w-4 text-blue-500" />
                        <AlertDescription className="text-blue-700">
                          First home buyers in Australia may be eligible for stamp duty concessions, the First Home
                          Owner Grant, the First Home Loan Deposit Scheme, and other government assistance programs.
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-2">
                        <Label htmlFor="eligibleForGrants" className="flex items-center">
                          Do you believe you're eligible for first home buyer grants?{" "}
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Select
                          onValueChange={handleSelectChange("eligibleForGrants")}
                          value={formData.eligibleForGrants}
                        >
                          <SelectTrigger
                            id="eligibleForGrants"
                            className={errors.eligibleForGrants ? "border-red-500" : ""}
                          >
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes, I believe I'm eligible</SelectItem>
                            <SelectItem value="no">No, I don't think I'm eligible</SelectItem>
                            <SelectItem value="unsure">I'm not sure</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.eligibleForGrants && (
                          <p className="text-sm text-red-500 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.eligibleForGrants}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center">
                          Which first home buyer schemes are you interested in?{" "}
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="fhog"
                              checked={formData.interestedInSchemes.includes("fhog")}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange("interestedInSchemes", "fhog")(!!checked)
                              }
                            />
                            <div>
                              <Label htmlFor="fhog" className="font-medium cursor-pointer">
                                First Home Owner Grant
                              </Label>
                              <p className="text-xs text-gray-500">One-off payment for eligible first home buyers</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="fhlds"
                              checked={formData.interestedInSchemes.includes("fhlds")}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange("interestedInSchemes", "fhlds")(!!checked)
                              }
                            />
                            <div>
                              <Label htmlFor="fhlds" className="font-medium cursor-pointer">
                                First Home Loan Deposit Scheme
                              </Label>
                              <p className="text-xs text-gray-500">Purchase with as little as 5% deposit</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="stampDuty"
                              checked={formData.interestedInSchemes.includes("stampDuty")}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange("interestedInSchemes", "stampDuty")(!!checked)
                              }
                            />
                            <div>
                              <Label htmlFor="stampDuty" className="font-medium cursor-pointer">
                                Stamp Duty Concessions
                              </Label>
                              <p className="text-xs text-gray-500">
                                Reduced or waived stamp duty for first home buyers
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="fhss"
                              checked={formData.interestedInSchemes.includes("fhss")}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange("interestedInSchemes", "fhss")(!!checked)
                              }
                            />
                            <div>
                              <Label htmlFor="fhss" className="font-medium cursor-pointer">
                                First Home Super Saver Scheme
                              </Label>
                              <p className="text-xs text-gray-500">Save for your deposit through your super fund</p>
                            </div>
                          </div>
                        </div>
                        {errors.interestedInSchemes && (
                          <p className="text-sm text-red-500 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.interestedInSchemes}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-between mt-6">
                        <Button type="button" variant="outline" onClick={() => prevTab("fhb")}>
                          Previous
                        </Button>
                        <Button type="button" onClick={() => nextTab("fhb")}>
                          Next: Loan Requirements
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Loan Requirements Tab */}
                  <TabsContent value="loan">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Loan Requirements</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Tell us about your home loan preferences as a first home buyer.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="desiredLoanAmount" className="flex items-center">
                            Desired Loan Amount (AUD) <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <Input
                            id="desiredLoanAmount"
                            name="desiredLoanAmount"
                            type="number"
                            value={formData.desiredLoanAmount}
                            onChange={handleChange}
                            className={errors.desiredLoanAmount ? "border-red-500" : ""}
                            min="0"
                            required
                          />
                          {errors.desiredLoanAmount && (
                            <p className="text-sm text-red-500 flex items-center mt-1">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {errors.desiredLoanAmount}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="downPayment" className="flex items-center">
                            Down Payment (AUD) <span className="text-red-500 ml-1">*</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-gray-400 ml-1" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>How much you can contribute as a deposit</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </Label>
                          <Input
                            id="downPayment"
                            name="downPayment"
                            type="number"
                            value={formData.downPayment}
                            onChange={handleChange}
                            className={errors.downPayment ? "border-red-500" : ""}
                            min="0"
                            required
                          />
                          {errors.downPayment && (
                            <p className="text-sm text-red-500 flex items-center mt-1">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {errors.downPayment}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="loanTerm" className="flex items-center">
                          Loan Term (Years) <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Select onValueChange={handleSelectChange("loanTerm")} value={formData.loanTerm}>
                          <SelectTrigger id="loanTerm" className={errors.loanTerm ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select loan term" />
                          </SelectTrigger>
                          <SelectContent>
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
                        <Label htmlFor="interestRatePreference">Interest Rate Preference</Label>
                        <Select
                          onValueChange={handleSelectChange("interestRatePreference")}
                          value={formData.interestRatePreference}
                        >
                          <SelectTrigger id="interestRatePreference">
                            <SelectValue placeholder="Select interest rate preference" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fixed">Fixed Rate</SelectItem>
                            <SelectItem value="variable">Variable Rate</SelectItem>
                            <SelectItem value="split">Split Rate (Part Fixed, Part Variable)</SelectItem>
                            <SelectItem value="unsure">Not Sure</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center">Desired Loan Features</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="offsetAccount"
                              checked={formData.loanFeatures.includes("offsetAccount")}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange("loanFeatures", "offsetAccount")(!!checked)
                              }
                            />
                            <div>
                              <Label htmlFor="offsetAccount" className="font-medium cursor-pointer">
                                Offset Account
                              </Label>
                              <p className="text-xs text-gray-500">Reduce interest with linked savings account</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="redrawFacility"
                              checked={formData.loanFeatures.includes("redrawFacility")}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange("loanFeatures", "redrawFacility")(!!checked)
                              }
                            />
                            <div>
                              <Label htmlFor="redrawFacility" className="font-medium cursor-pointer">
                                Redraw Facility
                              </Label>
                              <p className="text-xs text-gray-500">Access extra repayments if needed</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="extraRepayments"
                              checked={formData.loanFeatures.includes("extraRepayments")}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange("loanFeatures", "extraRepayments")(!!checked)
                              }
                            />
                            <div>
                              <Label htmlFor="extraRepayments" className="font-medium cursor-pointer">
                                Extra Repayments
                              </Label>
                              <p className="text-xs text-gray-500">Make additional payments without penalties</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="packageDiscount"
                              checked={formData.loanFeatures.includes("packageDiscount")}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange("loanFeatures", "packageDiscount")(!!checked)
                              }
                            />
                            <div>
                              <Label htmlFor="packageDiscount" className="font-medium cursor-pointer">
                                Package Discount
                              </Label>
                              <p className="text-xs text-gray-500">Discounted interest rate with banking package</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="additionalInfo">Additional Information</Label>
                        <textarea
                          id="additionalInfo"
                          name="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={handleChange}
                          className="w-full min-h-[100px] p-2 border border-gray-300 rounded-md"
                          placeholder="Any other information you'd like us to know about your home loan requirements"
                        />
                      </div>

                      <div className="flex justify-between mt-6">
                        <Button type="button" variant="outline" onClick={() => prevTab("loan")}>
                          Previous
                        </Button>
                        <Button type="button" onClick={() => nextTab("loan")}>
                          Next: Review Application
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Review Tab */}
                  <TabsContent value="review">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Review Your Application</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Please review your application details before submitting. Make sure all information is accurate.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Personal Information</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2 pt-0">
                            <p>
                              <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
                            </p>
                            <p>
                              <span className="font-medium">Email:</span> {formData.email}
                            </p>
                            <p>
                              <span className="font-medium">Phone:</span> {formData.phone}
                            </p>
                            <p>
                              <span className="font-medium">Date of Birth:</span> {formData.dateOfBirth}
                            </p>
                            <p>
                              <span className="font-medium">Marital Status:</span>{" "}
                              {formData.maritalStatus || "Not specified"}
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Financial Information</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2 pt-0">
                            <p>
                              <span className="font-medium">Employment:</span>{" "}
                              {formData.employmentStatus || "Not specified"}
                            </p>
                            <p>
                              <span className="font-medium">Annual Income:</span> ${formData.annualIncome || "0"}
                            </p>
                            <p>
                              <span className="font-medium">Savings:</span> ${formData.savings || "0"}
                            </p>
                            <p>
                              <span className="font-medium">Existing Debts:</span> ${formData.existingDebts || "0"}
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Property Preferences</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2 pt-0">
                            <p>
                              <span className="font-medium">Budget:</span> ${formData.maxBudget.toLocaleString()}
                            </p>
                            <p>
                              <span className="font-medium">Locations:</span> {formData.preferredLocations}
                            </p>
                            <p>
                              <span className="font-medium">Property Type:</span>{" "}
                              {formData.propertyType || "Not specified"}
                            </p>
                            <p>
                              <span className="font-medium">Timeframe:</span> {formData.timeframe || "Not specified"}
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Loan Requirements</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2 pt-0">
                            <p>
                              <span className="font-medium">Loan Amount:</span> ${formData.desiredLoanAmount || "0"}
                            </p>
                            <p>
                              <span className="font-medium">Down Payment:</span> ${formData.downPayment || "0"}
                            </p>
                            <p>
                              <span className="font-medium">Loan Term:</span> {formData.loanTerm} years
                            </p>
                            <p>
                              <span className="font-medium">Rate Preference:</span>{" "}
                              {formData.interestRatePreference || "Not specified"}
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="flex items-center space-x-2 mt-6">
                        <Checkbox
                          id="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: !!checked })}
                          className={errors.agreeToTerms ? "border-red-500" : ""}
                        />
                        <Label htmlFor="agreeToTerms" className="text-sm">
                          I agree to the{" "}
                          <Link href="/terms" className="text-blue-600 hover:underline">
                            Terms and Conditions
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-blue-600 hover:underline">
                            Privacy Policy
                          </Link>
                          . I authorize Home Online to check my credit and verify the information provided.
                        </Label>
                      </div>
                      {errors.agreeToTerms && (
                        <p className="text-sm text-red-500 flex items-center mt-1">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.agreeToTerms}
                        </p>
                      )}

                      <div className="space-y-2 mt-4">
                        <Label>How would you prefer to be contacted?</Label>
                        <div className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="contactEmail"
                              name="contactPreference"
                              value="email"
                              checked={formData.contactPreference === "email"}
                              onChange={handleChange}
                              className="h-4 w-4 text-blue-600"
                            />
                            <Label htmlFor="contactEmail">Email</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="contactPhone"
                              name="contactPreference"
                              value="phone"
                              checked={formData.contactPreference === "phone"}
                              onChange={handleChange}
                              className="h-4 w-4 text-blue-600"
                            />
                            <Label htmlFor="contactPhone">Phone</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="contactBoth"
                              name="contactPreference"
                              value="both"
                              checked={formData.contactPreference === "both"}
                              onChange={handleChange}
                              className="h-4 w-4 text-blue-600"
                            />
                            <Label htmlFor="contactBoth">Both</Label>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between mt-6">
                        <Button type="button" variant="outline" onClick={() => prevTab("review")}>
                          Previous
                        </Button>
                        <Button
                          type="submit"
                          className="bg-green-600 hover:bg-green-700"
                          disabled={!formData.agreeToTerms}
                        >
                          Submit Application
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
