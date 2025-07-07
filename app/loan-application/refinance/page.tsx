"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

export default function RefinanceApplicationPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",

    // Current Loan Details
    currentLoanBalance: "",
    currentInterestRate: "",
    currentLender: "",
    monthlyPayment: "",
    remainingTerm: "",

    // Property Information
    propertyType: "single_family",
    propertyValue: "",
    propertyAddress: "",
    propertyCity: "",
    propertyState: "",
    propertyZip: "",

    // Refinance Goals
    refinanceGoal: "lower_rate",
    desiredTerm: "30",
    cashOutAmount: "",

    // Employment & Income
    employmentStatus: "full_time",
    employerName: "",
    jobTitle: "",
    yearsAtJob: "",
    annualIncome: "",
    additionalIncome: "",

    // Credit Information
    creditScore: "excellent",
    bankruptcy: "no",
    foreclosure: "no",

    // Additional Information
    agreeToTerms: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Check required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "currentLoanBalance",
      "currentInterestRate",
      "currentLender",
      "propertyValue",
      "propertyAddress",
      "propertyCity",
      "propertyState",
      "propertyZip",
      "refinanceGoal",
      "annualIncome",
    ]

    const missingFields = requiredFields.filter((field) => !formData[field])

    if (missingFields.length > 0) {
      alert(`Please complete all required fields before submitting.`)
      return
    }

    console.log("Form submitted:", formData)
    // In a real application, you would send this data to your backend
    router.push("/loan-application/confirmation")
  }

  const nextTab = (current) => {
    const tabs = ["personal", "current_loan", "property", "goals", "employment", "credit", "review"]
    const currentIndex = tabs.indexOf(current)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
  }

  const prevTab = (current) => {
    const tabs = ["personal", "current_loan", "property", "goals", "employment", "credit", "review"]
    const currentIndex = tabs.indexOf(current)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Home Loan Refinance Application</h1>
            <p className="text-gray-600">
              Complete the form below to apply for refinancing your current home loan. All information is secure and
              encrypted.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Home Loan Refinance Application Form</CardTitle>
              <CardDescription>
                Please fill out all required fields marked with <span className="text-red-500">*</span>. You can save
                your progress and return later.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-7 mb-8">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="current_loan">Current Loan</TabsTrigger>
                    <TabsTrigger value="property">Property</TabsTrigger>
                    <TabsTrigger value="goals">Goals</TabsTrigger>
                    <TabsTrigger value="employment">Employment</TabsTrigger>
                    <TabsTrigger value="credit">Credit</TabsTrigger>
                    <TabsTrigger value="review">Review</TabsTrigger>
                  </TabsList>

                  {/* Personal Information Tab */}
                  <TabsContent value="personal">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Personal Information</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">
                            First Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName">
                            Last Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email Address <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">
                            Phone Number <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="flex justify-end mt-6">
                        <Button type="button" onClick={() => nextTab("personal")}>
                          Next: Current Loan Details
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Current Loan Details Tab */}
                  <TabsContent value="current_loan">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Current Loan Details</h3>

                      <div className="space-y-2">
                        <Label htmlFor="currentLoanBalance">
                          Current Loan Balance ($) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="currentLoanBalance"
                          name="currentLoanBalance"
                          type="number"
                          value={formData.currentLoanBalance}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currentInterestRate">
                          Current Interest Rate (%) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="currentInterestRate"
                          name="currentInterestRate"
                          type="number"
                          step="0.01"
                          value={formData.currentInterestRate}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currentLender">
                          Current Lender <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="currentLender"
                          name="currentLender"
                          value={formData.currentLender}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="monthlyPayment">Current Monthly Payment ($)</Label>
                          <Input
                            id="monthlyPayment"
                            name="monthlyPayment"
                            type="number"
                            value={formData.monthlyPayment}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="remainingTerm">Remaining Term (Years)</Label>
                          <Input
                            id="remainingTerm"
                            name="remainingTerm"
                            type="number"
                            value={formData.remainingTerm}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="flex justify-between mt-6">
                        <Button type="button" variant="outline" onClick={() => prevTab("current_loan")}>
                          Previous
                        </Button>
                        <Button type="button" onClick={() => nextTab("current_loan")}>
                          Next: Property Information
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Property Information Tab */}
                  <TabsContent value="property">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Property Information</h3>

                      <div className="space-y-2">
                        <Label htmlFor="propertyType">Property Type</Label>
                        <Select
                          value={formData.propertyType}
                          onValueChange={(value) => handleSelectChange("propertyType", value)}
                        >
                          <SelectTrigger id="propertyType">
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single_family">Single Family Home</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                            <SelectItem value="condo">Condominium</SelectItem>
                            <SelectItem value="duplex">Duplex</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="propertyValue">
                          Estimated Property Value ($) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="propertyValue"
                          name="propertyValue"
                          type="number"
                          value={formData.propertyValue}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="propertyAddress">
                          Property Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="propertyAddress"
                          name="propertyAddress"
                          value={formData.propertyAddress}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="propertyCity">
                            City <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="propertyCity"
                            name="propertyCity"
                            value={formData.propertyCity}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="propertyState">
                            State <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="propertyState"
                            name="propertyState"
                            value={formData.propertyState}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="propertyZip">
                            Postal Code <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="propertyZip"
                            name="propertyZip"
                            value={formData.propertyZip}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="flex justify-between mt-6">
                        <Button type="button" variant="outline" onClick={() => prevTab("property")}>
                          Previous
                        </Button>
                        <Button type="button" onClick={() => nextTab("property")}>
                          Next: Refinance Goals
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Refinance Goals Tab */}
                  <TabsContent value="goals">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Refinance Goals</h3>

                      <div className="space-y-2">
                        <Label htmlFor="refinanceGoal">
                          Primary Refinance Goal <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.refinanceGoal}
                          onValueChange={(value) => handleSelectChange("refinanceGoal", value)}
                        >
                          <SelectTrigger id="refinanceGoal">
                            <SelectValue placeholder="Select your primary goal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lower_rate">Lower Interest Rate</SelectItem>
                            <SelectItem value="lower_payment">Lower Monthly Payment</SelectItem>
                            <SelectItem value="cash_out">Cash Out Home Equity</SelectItem>
                            <SelectItem value="shorten_term">Shorten Loan Term</SelectItem>
                            <SelectItem value="remove_pmi">Remove Mortgage Insurance (PMI)</SelectItem>
                            <SelectItem value="switch_loan_type">Switch Loan Type (e.g., ARM to Fixed)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="desiredTerm">Desired Loan Term (Years)</Label>
                        <Select
                          value={formData.desiredTerm}
                          onValueChange={(value) => handleSelectChange("desiredTerm", value)}
                        >
                          <SelectTrigger id="desiredTerm">
                            <SelectValue placeholder="Select desired term" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 years</SelectItem>
                            <SelectItem value="20">20 years</SelectItem>
                            <SelectItem value="25">25 years</SelectItem>
                            <SelectItem value="30">30 years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.refinanceGoal === "cash_out" && (
                        <div className="space-y-2">
                          <Label htmlFor="cashOutAmount">Cash Out Amount ($)</Label>
                          <Input
                            id="cashOutAmount"
                            name="cashOutAmount"
                            type="number"
                            value={formData.cashOutAmount}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      )}

                      <div className="flex justify-between mt-6">
                        <Button type="button" variant="outline" onClick={() => prevTab("goals")}>
                          Previous
                        </Button>
                        <Button type="button" onClick={() => nextTab("goals")}>
                          Next: Employment & Income
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Employment & Income Tab */}
                  <TabsContent value="employment">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Employment & Income Information</h3>

                      <div className="space-y-2">
                        <Label htmlFor="employmentStatus">Employment Status</Label>
                        <Select
                          value={formData.employmentStatus}
                          onValueChange={(value) => handleSelectChange("employmentStatus", value)}
                        >
                          <SelectTrigger id="employmentStatus">
                            <SelectValue placeholder="Select employment status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full_time">Full-Time Employed</SelectItem>
                            <SelectItem value="part_time">Part-Time Employed</SelectItem>
                            <SelectItem value="self_employed">Self-Employed</SelectItem>
                            <SelectItem value="retired">Retired</SelectItem>
                            <SelectItem value="unemployed">Unemployed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.employmentStatus !== "unemployed" && formData.employmentStatus !== "retired" && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="employerName">
                              {formData.employmentStatus === "self_employed" ? "Business Name" : "Employer Name"}
                            </Label>
                            <Input
                              id="employerName"
                              name="employerName"
                              value={formData.employerName}
                              onChange={handleChange}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="jobTitle">
                              {formData.employmentStatus === "self_employed" ? "Business Role" : "Job Title"}
                            </Label>
                            <Input
                              id="jobTitle"
                              name="jobTitle"
                              value={formData.jobTitle}
                              onChange={handleChange}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="yearsAtJob">
                              {formData.employmentStatus === "self_employed"
                                ? "Years in Business"
                                : "Years at Current Job"}
                            </Label>
                            <Input
                              id="yearsAtJob"
                              name="yearsAtJob"
                              type="number"
                              value={formData.yearsAtJob}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="annualIncome">
                          Annual Income ($) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="annualIncome"
                          name="annualIncome"
                          type="number"
                          value={formData.annualIncome}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="additionalIncome">Additional Income ($) (Optional)</Label>
                        <Input
                          id="additionalIncome"
                          name="additionalIncome"
                          type="number"
                          value={formData.additionalIncome}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="flex justify-between mt-6">
                        <Button type="button" variant="outline" onClick={() => prevTab("employment")}>
                          Previous
                        </Button>
                        <Button type="button" onClick={() => nextTab("employment")}>
                          Next: Credit Information
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Credit Information Tab */}
                  <TabsContent value="credit">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Credit Information</h3>

                      <div className="space-y-2">
                        <Label htmlFor="creditScore">Estimated Credit Score</Label>
                        <Select
                          value={formData.creditScore}
                          onValueChange={(value) => handleSelectChange("creditScore", value)}
                        >
                          <SelectTrigger id="creditScore">
                            <SelectValue placeholder="Select credit score range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="excellent">Excellent (720+)</SelectItem>
                            <SelectItem value="good">Good (680-719)</SelectItem>
                            <SelectItem value="fair">Fair (620-679)</SelectItem>
                            <SelectItem value="poor">Poor (580-619)</SelectItem>
                            <SelectItem value="bad">Bad (Below 580)</SelectItem>
                            <SelectItem value="unknown">I don't know</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bankruptcy">Have you declared bankruptcy in the last 7 years?</Label>
                        <Select
                          value={formData.bankruptcy}
                          onValueChange={(value) => handleSelectChange("bankruptcy", value)}
                        >
                          <SelectTrigger id="bankruptcy">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no">No</SelectItem>
                            <SelectItem value="yes_discharged">Yes, discharged</SelectItem>
                            <SelectItem value="yes_not_discharged">Yes, not discharged</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="foreclosure">Have you had a foreclosure in the last 7 years?</Label>
                        <Select
                          value={formData.foreclosure}
                          onValueChange={(value) => handleSelectChange("foreclosure", value)}
                        >
                          <SelectTrigger id="foreclosure">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no">No</SelectItem>
                            <SelectItem value="yes_over_3_years">Yes, over 3 years ago</SelectItem>
                            <SelectItem value="yes_under_3_years">Yes, within the last 3 years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-between mt-6">
                        <Button type="button" variant="outline" onClick={() => prevTab("credit")}>
                          Previous
                        </Button>
                        <Button type="button" onClick={() => nextTab("credit")}>
                          Next: Review Application
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Review Tab */}
                  <TabsContent value="review">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Review Your Application</h3>
                      <p className="text-gray-600">
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
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Current Loan Details</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2 pt-0">
                            <p>
                              <span className="font-medium">Current Balance:</span> ${formData.currentLoanBalance}
                            </p>
                            <p>
                              <span className="font-medium">Interest Rate:</span> {formData.currentInterestRate}%
                            </p>
                            <p>
                              <span className="font-medium">Current Lender:</span> {formData.currentLender}
                            </p>
                            <p>
                              <span className="font-medium">Monthly Payment:</span> ${formData.monthlyPayment}
                            </p>
                            <p>
                              <span className="font-medium">Remaining Term:</span> {formData.remainingTerm} years
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Property Information</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2 pt-0">
                            <p>
                              <span className="font-medium">Property Type:</span>{" "}
                              {formData.propertyType.replace("_", " ")}
                            </p>
                            <p>
                              <span className="font-medium">Property Value:</span> ${formData.propertyValue}
                            </p>
                            <p>
                              <span className="font-medium">Address:</span> {formData.propertyAddress}
                            </p>
                            <p>
                              <span className="font-medium">Location:</span> {formData.propertyCity},{" "}
                              {formData.propertyState} {formData.propertyZip}
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Refinance Goals</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2 pt-0">
                            <p>
                              <span className="font-medium">Primary Goal:</span>{" "}
                              {formData.refinanceGoal.replace("_", " ")}
                            </p>
                            <p>
                              <span className="font-medium">Desired Term:</span> {formData.desiredTerm} years
                            </p>
                            {formData.refinanceGoal === "cash_out" && (
                              <p>
                                <span className="font-medium">Cash Out Amount:</span> ${formData.cashOutAmount}
                              </p>
                            )}
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Employment & Income</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2 pt-0">
                            <p>
                              <span className="font-medium">Employment Status:</span>{" "}
                              {formData.employmentStatus.replace("_", " ")}
                            </p>
                            {formData.employmentStatus !== "unemployed" && formData.employmentStatus !== "retired" && (
                              <>
                                <p>
                                  <span className="font-medium">
                                    {formData.employmentStatus === "self_employed" ? "Business Name" : "Employer"}:
                                  </span>{" "}
                                  {formData.employerName}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    {formData.employmentStatus === "self_employed" ? "Business Role" : "Job Title"}:
                                  </span>{" "}
                                  {formData.jobTitle}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    {formData.employmentStatus === "self_employed"
                                      ? "Years in Business"
                                      : "Years at Job"}
                                    :
                                  </span>{" "}
                                  {formData.yearsAtJob}
                                </p>
                              </>
                            )}
                            <p>
                              <span className="font-medium">Annual Income:</span> ${formData.annualIncome}
                            </p>
                            {formData.additionalIncome && (
                              <p>
                                <span className="font-medium">Additional Income:</span> ${formData.additionalIncome}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </div>

                      <div className="flex items-center space-x-2 mt-6">
                        <Checkbox
                          id="agreeToTerms"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked })}
                          required
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

                      <div className="flex justify-between mt-6">
                        <Button type="button" variant="outline" onClick={() => prevTab("review")}>
                          Previous
                        </Button>
                        <Button
                          type="submit"
                          className="bg-emerald-600 hover:bg-emerald-700"
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
