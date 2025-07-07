"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, AlertCircle, Briefcase, Users, Eye, EyeOff } from "lucide-react"
import { useLoanInfo } from "../LoanInfoContext"

export default function EmploymentInfoPage() {
  const router = useRouter()
  const { formData, updateFormData } = useLoanInfo()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPartnerDetails, setShowPartnerDetails] = useState(formData.hasPartner || false)

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

  const togglePartnerDetails = () => {
    const newShowPartner = !showPartnerDetails
    setShowPartnerDetails(newShowPartner)
    handleInputChange("hasPartner", newShowPartner)

    // Clear partner data when hiding
    if (!newShowPartner) {
      const partnerFields = [
        "partnerEmploymentStatus",
        "partnerEmployerName",
        "partnerJobTitle",
        "partnerYearsInCurrentJob",
        "partnerAnnualIncome",
        "partnerIsSelfEmployed",
        "partnerBusinessType",
        "partnerAbnAcn",
        "partnerBusinessIndustry",
        "partnerAnnualBusinessRevenue",
      ]
      partnerFields.forEach((field) => handleInputChange(field, ""))

      // Clear partner errors
      const newErrors = { ...errors }
      partnerFields.forEach((field) => delete newErrors[field])
      setErrors(newErrors)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Main applicant validation
    if (!formData.employmentStatus) {
      newErrors.employmentStatus = "Employment status is required"
    }
    if (formData.employmentStatus && !["unemployed", "retired"].includes(formData.employmentStatus)) {
      if (!formData.employerName?.trim()) {
        newErrors.employerName = "Employer name is required"
      }
      if (!formData.jobTitle?.trim()) {
        newErrors.jobTitle = "Job title is required"
      }
      if (!formData.yearsInCurrentJob || formData.yearsInCurrentJob <= 0) {
        newErrors.yearsInCurrentJob = "Years in current job is required"
      }
    }
    if (!formData.annualIncome || formData.annualIncome <= 0) {
      newErrors.annualIncome = "Annual income is required"
    }

    // Self-employed validation
    if (formData.isSelfEmployed) {
      if (!formData.businessType?.trim()) {
        newErrors.businessType = "Business type is required"
      }
      if (!formData.abnAcn?.trim()) {
        newErrors.abnAcn = "ABN/ACN is required"
      }
      if (!formData.businessIndustry?.trim()) {
        newErrors.businessIndustry = "Business industry is required"
      }
      if (!formData.annualBusinessRevenue || formData.annualBusinessRevenue <= 0) {
        newErrors.annualBusinessRevenue = "Annual business revenue is required"
      }
    }

    // Partner validation (only if partner details are shown)
    if (showPartnerDetails && formData.hasPartner) {
      if (!formData.partnerEmploymentStatus) {
        newErrors.partnerEmploymentStatus = "Partner's employment status is required"
      }
      if (formData.partnerEmploymentStatus && !["unemployed", "retired"].includes(formData.partnerEmploymentStatus)) {
        if (!formData.partnerEmployerName?.trim()) {
          newErrors.partnerEmployerName = "Partner's employer name is required"
        }
        if (!formData.partnerJobTitle?.trim()) {
          newErrors.partnerJobTitle = "Partner's job title is required"
        }
        if (!formData.partnerYearsInCurrentJob || formData.partnerYearsInCurrentJob <= 0) {
          newErrors.partnerYearsInCurrentJob = "Partner's years in current job is required"
        }
      }
      if (!formData.partnerAnnualIncome || formData.partnerAnnualIncome <= 0) {
        newErrors.partnerAnnualIncome = "Partner's annual income is required"
      }

      // Partner self-employed validation
      if (formData.partnerIsSelfEmployed) {
        if (!formData.partnerBusinessType?.trim()) {
          newErrors.partnerBusinessType = "Partner's business type is required"
        }
        if (!formData.partnerAbnAcn?.trim()) {
          newErrors.partnerAbnAcn = "Partner's ABN/ACN is required"
        }
        if (!formData.partnerBusinessIndustry?.trim()) {
          newErrors.partnerBusinessIndustry = "Partner's business industry is required"
        }
        if (!formData.partnerAnnualBusinessRevenue || formData.partnerAnnualBusinessRevenue <= 0) {
          newErrors.partnerAnnualBusinessRevenue = "Partner's annual business revenue is required"
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      router.push("/loan-info/financial")
    }
  }

  const handleBack = () => {
    router.push("/loan-info/property")
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <span>{getLoanTypeTitle()}</span>
              <span>•</span>
              <span className="font-medium">Employment Information</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Tell us about your employment</h1>
            <p className="text-gray-600">
              Employment information helps us assess your borrowing capacity and find suitable loan options.
            </p>
            <Progress value={60} className="mt-4" />
          </div>

          <div className="space-y-6">
            {/* Main Applicant Employment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Your Employment Details
                </CardTitle>
                <CardDescription>Please provide your current employment and income information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="employmentStatus">
                    Employment Status <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.employmentStatus || ""}
                    onValueChange={(value) => handleInputChange("employmentStatus", value)}
                  >
                    <SelectTrigger className={errors.employmentStatus ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select employment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full_time">Full-Time Employee</SelectItem>
                      <SelectItem value="part_time">Part-Time Employee</SelectItem>
                      <SelectItem value="casual">Casual Employee</SelectItem>
                      <SelectItem value="contract">Contract Worker</SelectItem>
                      <SelectItem value="self_employed">Self-Employed</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="unemployed">Unemployed</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.employmentStatus && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.employmentStatus}
                    </p>
                  )}
                </div>

                {formData.employmentStatus && !["unemployed", "retired"].includes(formData.employmentStatus) && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="employerName">
                          Employer Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="employerName"
                          value={formData.employerName || ""}
                          onChange={(e) => handleInputChange("employerName", e.target.value)}
                          placeholder="Enter employer name"
                          className={errors.employerName ? "border-red-500" : ""}
                        />
                        {errors.employerName && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.employerName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">
                          Job Title <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="jobTitle"
                          value={formData.jobTitle || ""}
                          onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                          placeholder="Enter job title"
                          className={errors.jobTitle ? "border-red-500" : ""}
                        />
                        {errors.jobTitle && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.jobTitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearsInCurrentJob">
                        Years in Current Job <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="yearsInCurrentJob"
                        type="number"
                        step="0.1"
                        value={formData.yearsInCurrentJob || ""}
                        onChange={(e) => handleInputChange("yearsInCurrentJob", Number.parseFloat(e.target.value))}
                        placeholder="e.g. 2.5"
                        className={errors.yearsInCurrentJob ? "border-red-500" : ""}
                      />
                      {errors.yearsInCurrentJob && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.yearsInCurrentJob}
                        </p>
                      )}
                    </div>
                  </>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="annualIncome">
                      Annual Income (AUD) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="annualIncome"
                      type="number"
                      value={formData.annualIncome || ""}
                      onChange={(e) => handleInputChange("annualIncome", Number.parseInt(e.target.value))}
                      placeholder="e.g. 80000"
                      className={errors.annualIncome ? "border-red-500" : ""}
                    />
                    {errors.annualIncome && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.annualIncome}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalIncome">Additional Income (AUD)</Label>
                    <Input
                      id="additionalIncome"
                      type="number"
                      value={formData.additionalIncome || ""}
                      onChange={(e) => handleInputChange("additionalIncome", Number.parseInt(e.target.value))}
                      placeholder="e.g. 10000"
                    />
                    <p className="text-xs text-gray-500">Rental income, dividends, etc.</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isSelfEmployed"
                    checked={formData.isSelfEmployed || false}
                    onCheckedChange={(checked) => handleInputChange("isSelfEmployed", checked)}
                  />
                  <Label htmlFor="isSelfEmployed">I am self-employed or own a business</Label>
                </div>

                {formData.isSelfEmployed && (
                  <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900">Self-Employment Details</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessType">
                          Business Type <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="businessType"
                          value={formData.businessType || ""}
                          onChange={(e) => handleInputChange("businessType", e.target.value)}
                          placeholder="e.g. Sole Trader, Company"
                          className={errors.businessType ? "border-red-500" : ""}
                        />
                        {errors.businessType && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.businessType}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="abnAcn">
                          ABN/ACN <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="abnAcn"
                          value={formData.abnAcn || ""}
                          onChange={(e) => handleInputChange("abnAcn", e.target.value)}
                          placeholder="Enter ABN or ACN"
                          className={errors.abnAcn ? "border-red-500" : ""}
                        />
                        {errors.abnAcn && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.abnAcn}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessIndustry">
                          Business Industry <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="businessIndustry"
                          value={formData.businessIndustry || ""}
                          onChange={(e) => handleInputChange("businessIndustry", e.target.value)}
                          placeholder="e.g. Construction, IT Services"
                          className={errors.businessIndustry ? "border-red-500" : ""}
                        />
                        {errors.businessIndustry && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.businessIndustry}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="annualBusinessRevenue">
                          Annual Business Revenue (AUD) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="annualBusinessRevenue"
                          type="number"
                          value={formData.annualBusinessRevenue || ""}
                          onChange={(e) => handleInputChange("annualBusinessRevenue", Number.parseInt(e.target.value))}
                          placeholder="e.g. 150000"
                          className={errors.annualBusinessRevenue ? "border-red-500" : ""}
                        />
                        {errors.annualBusinessRevenue && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.annualBusinessRevenue}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Partner Employment Toggle */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Partner/Spouse Details
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={togglePartnerDetails}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    {showPartnerDetails ? (
                      <>
                        <EyeOff className="h-4 w-4" />
                        Hide Partner Details
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4" />
                        Add Partner Details
                      </>
                    )}
                  </Button>
                </CardTitle>
                <CardDescription>
                  {showPartnerDetails
                    ? "Including your partner's income can increase your borrowing capacity."
                    : "Add your partner's employment details to potentially increase your borrowing capacity."}
                </CardDescription>
              </CardHeader>

              {showPartnerDetails && (
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="partnerEmploymentStatus">
                      Partner's Employment Status <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.partnerEmploymentStatus || ""}
                      onValueChange={(value) => handleInputChange("partnerEmploymentStatus", value)}
                    >
                      <SelectTrigger className={errors.partnerEmploymentStatus ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select partner's employment status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full_time">Full-Time Employee</SelectItem>
                        <SelectItem value="part_time">Part-Time Employee</SelectItem>
                        <SelectItem value="casual">Casual Employee</SelectItem>
                        <SelectItem value="contract">Contract Worker</SelectItem>
                        <SelectItem value="self_employed">Self-Employed</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                        <SelectItem value="unemployed">Unemployed</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.partnerEmploymentStatus && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.partnerEmploymentStatus}
                      </p>
                    )}
                  </div>

                  {formData.partnerEmploymentStatus &&
                    !["unemployed", "retired"].includes(formData.partnerEmploymentStatus) && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="partnerEmployerName">
                              Partner's Employer Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="partnerEmployerName"
                              value={formData.partnerEmployerName || ""}
                              onChange={(e) => handleInputChange("partnerEmployerName", e.target.value)}
                              placeholder="Enter partner's employer name"
                              className={errors.partnerEmployerName ? "border-red-500" : ""}
                            />
                            {errors.partnerEmployerName && (
                              <p className="text-red-500 text-sm flex items-center gap-1">
                                <AlertCircle className="h-4 w-4" />
                                {errors.partnerEmployerName}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="partnerJobTitle">
                              Partner's Job Title <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="partnerJobTitle"
                              value={formData.partnerJobTitle || ""}
                              onChange={(e) => handleInputChange("partnerJobTitle", e.target.value)}
                              placeholder="Enter partner's job title"
                              className={errors.partnerJobTitle ? "border-red-500" : ""}
                            />
                            {errors.partnerJobTitle && (
                              <p className="text-red-500 text-sm flex items-center gap-1">
                                <AlertCircle className="h-4 w-4" />
                                {errors.partnerJobTitle}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="partnerYearsInCurrentJob">
                            Partner's Years in Current Job <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="partnerYearsInCurrentJob"
                            type="number"
                            step="0.1"
                            value={formData.partnerYearsInCurrentJob || ""}
                            onChange={(e) =>
                              handleInputChange("partnerYearsInCurrentJob", Number.parseFloat(e.target.value))
                            }
                            placeholder="e.g. 3.0"
                            className={errors.partnerYearsInCurrentJob ? "border-red-500" : ""}
                          />
                          {errors.partnerYearsInCurrentJob && (
                            <p className="text-red-500 text-sm flex items-center gap-1">
                              <AlertCircle className="h-4 w-4" />
                              {errors.partnerYearsInCurrentJob}
                            </p>
                          )}
                        </div>
                      </>
                    )}

                  <div className="space-y-2">
                    <Label htmlFor="partnerAnnualIncome">
                      Partner's Annual Income (AUD) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="partnerAnnualIncome"
                      type="number"
                      value={formData.partnerAnnualIncome || ""}
                      onChange={(e) => handleInputChange("partnerAnnualIncome", Number.parseInt(e.target.value))}
                      placeholder="e.g. 65000"
                      className={errors.partnerAnnualIncome ? "border-red-500" : ""}
                    />
                    {errors.partnerAnnualIncome && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.partnerAnnualIncome}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="partnerIsSelfEmployed"
                      checked={formData.partnerIsSelfEmployed || false}
                      onCheckedChange={(checked) => handleInputChange("partnerIsSelfEmployed", checked)}
                    />
                    <Label htmlFor="partnerIsSelfEmployed">Partner is self-employed or owns a business</Label>
                  </div>

                  {formData.partnerIsSelfEmployed && (
                    <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-900">Partner's Self-Employment Details</h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="partnerBusinessType">
                            Partner's Business Type <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="partnerBusinessType"
                            value={formData.partnerBusinessType || ""}
                            onChange={(e) => handleInputChange("partnerBusinessType", e.target.value)}
                            placeholder="e.g. Sole Trader, Company"
                            className={errors.partnerBusinessType ? "border-red-500" : ""}
                          />
                          {errors.partnerBusinessType && (
                            <p className="text-red-500 text-sm flex items-center gap-1">
                              <AlertCircle className="h-4 w-4" />
                              {errors.partnerBusinessType}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="partnerAbnAcn">
                            Partner's ABN/ACN <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="partnerAbnAcn"
                            value={formData.partnerAbnAcn || ""}
                            onChange={(e) => handleInputChange("partnerAbnAcn", e.target.value)}
                            placeholder="Enter ABN or ACN"
                            className={errors.partnerAbnAcn ? "border-red-500" : ""}
                          />
                          {errors.partnerAbnAcn && (
                            <p className="text-red-500 text-sm flex items-center gap-1">
                              <AlertCircle className="h-4 w-4" />
                              {errors.partnerAbnAcn}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="partnerBusinessIndustry">
                            Partner's Business Industry <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="partnerBusinessIndustry"
                            value={formData.partnerBusinessIndustry || ""}
                            onChange={(e) => handleInputChange("partnerBusinessIndustry", e.target.value)}
                            placeholder="e.g. Healthcare, Retail"
                            className={errors.partnerBusinessIndustry ? "border-red-500" : ""}
                          />
                          {errors.partnerBusinessIndustry && (
                            <p className="text-red-500 text-sm flex items-center gap-1">
                              <AlertCircle className="h-4 w-4" />
                              {errors.partnerBusinessIndustry}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="partnerAnnualBusinessRevenue">
                            Partner's Annual Business Revenue (AUD) <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="partnerAnnualBusinessRevenue"
                            type="number"
                            value={formData.partnerAnnualBusinessRevenue || ""}
                            onChange={(e) =>
                              handleInputChange("partnerAnnualBusinessRevenue", Number.parseInt(e.target.value))
                            }
                            placeholder="e.g. 120000"
                            className={errors.partnerAnnualBusinessRevenue ? "border-red-500" : ""}
                          />
                          {errors.partnerAnnualBusinessRevenue && (
                            <p className="text-red-500 text-sm flex items-center gap-1">
                              <AlertCircle className="h-4 w-4" />
                              {errors.partnerAnnualBusinessRevenue}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleNext}>
                Next: Financial Information
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
