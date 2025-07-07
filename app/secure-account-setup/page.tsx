"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Lock, Shield, Eye, EyeOff, Mail, AlertCircle, ArrowRight, Key, Smartphone } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function SecureAccountSetup() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [applicationData, setApplicationData] = useState<any>(null)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneVerification: "",
    agreeToTerms: false,
    enableNotifications: true,
    twoFactorAuth: false,
  })

  useEffect(() => {
    // Load application data from localStorage
    const savedApplication = localStorage.getItem("homeOnlineApplication")
    if (savedApplication) {
      const appData = JSON.parse(savedApplication)
      setApplicationData(appData)
      // Pre-fill email if available
      if (appData.data?.email) {
        setFormData((prev) => ({ ...prev, email: appData.data.email }))
      }
    } else {
      // Redirect to application if no data found
      router.push("/loan-selection")
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter"
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.phoneVerification) {
      newErrors.phoneVerification = "Verification code is required"
    } else if (formData.phoneVerification.length !== 6) {
      newErrors.phoneVerification = "Please enter the 6-digit code"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
      // Simulate sending verification code
      setTimeout(() => {
        // In real app, this would send SMS/email verification
      }, 1000)
    } else if (step === 2 && validateStep2()) {
      handleAccountCreation()
    }
  }

  const handleAccountCreation = () => {
    setIsLoading(true)

    // Create secure account
    const accountData = {
      id: Date.now().toString(),
      email: formData.email,
      createdAt: new Date().toISOString(),
      applicationId: applicationData?.id,
      verified: true,
      twoFactorEnabled: formData.twoFactorAuth,
      notificationsEnabled: formData.enableNotifications,
    }

    // Save account data
    localStorage.setItem("homeOnlineAccount", JSON.stringify(accountData))
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userEmail", formData.email)

    // Simulate account creation process
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to secure dashboard
      router.push("/dashboard")
    }, 2000)
  }

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" }

    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25

    let label = ""
    let color = ""

    if (strength <= 25) {
      label = "Weak"
      color = "bg-red-500"
    } else if (strength <= 50) {
      label = "Fair"
      color = "bg-yellow-500"
    } else if (strength <= 75) {
      label = "Good"
      color = "bg-blue-500"
    } else {
      label = "Strong"
      color = "bg-green-500"
    }

    return { strength, label, color }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Secure Account Setup</h1>
              <Badge variant="outline">Step {step} of 2</Badge>
            </div>
            <Progress value={step === 1 ? 50 : 100} className="h-2" />
          </div>

          {/* Security Notice */}
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">Secure Account Required</AlertTitle>
            <AlertDescription className="text-blue-700">
              To protect your loan application and track your progress, we need to create a secure account for you.
            </AlertDescription>
          </Alert>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-blue-600" />
                {step === 1 ? "Create Your Account" : "Verify Your Identity"}
              </CardTitle>
              <CardDescription>
                {step === 1 ? "Set up your secure login credentials" : "Enter the verification code sent to your phone"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {step === 1 ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center">
                      Email Address <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center">
                      Create Password <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.password}
                      </p>
                    )}

                    {formData.password && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Password strength:</span>
                          <span className="text-xs font-medium">{passwordStrength.label}</span>
                        </div>
                        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${passwordStrength.color} transition-all duration-300`}
                            style={{ width: `${passwordStrength.strength}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="flex items-center">
                      Confirm Password <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="twoFactorAuth"
                        checked={formData.twoFactorAuth}
                        onCheckedChange={handleCheckboxChange("twoFactorAuth")}
                      />
                      <div>
                        <Label htmlFor="twoFactorAuth" className="text-sm cursor-pointer font-medium">
                          Enable Two-Factor Authentication
                        </Label>
                        <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="enableNotifications"
                        checked={formData.enableNotifications}
                        onCheckedChange={handleCheckboxChange("enableNotifications")}
                      />
                      <div>
                        <Label htmlFor="enableNotifications" className="text-sm cursor-pointer font-medium">
                          Enable Loan Progress Notifications
                        </Label>
                        <p className="text-xs text-gray-500">Get updates about your loan application status</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={handleCheckboxChange("agreeToTerms")}
                        className={errors.agreeToTerms ? "border-red-500" : ""}
                      />
                      <div>
                        <Label htmlFor="agreeToTerms" className="text-sm cursor-pointer">
                          I agree to the{" "}
                          <a href="#" className="text-blue-600 hover:underline">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-blue-600 hover:underline">
                            Privacy Policy
                          </a>
                        </Label>
                        {errors.agreeToTerms && (
                          <p className="text-xs text-red-500 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.agreeToTerms}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600">
                      We've sent a 6-digit verification code to your phone number ending in{" "}
                      <span className="font-medium">***{applicationData?.data?.phone?.slice(-3) || "456"}</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneVerification" className="flex items-center">
                      Verification Code <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="phoneVerification"
                      name="phoneVerification"
                      value={formData.phoneVerification}
                      onChange={handleInputChange}
                      className={`text-center text-lg tracking-widest ${errors.phoneVerification ? "border-red-500" : ""}`}
                      placeholder="000000"
                      maxLength={6}
                    />
                    {errors.phoneVerification && (
                      <p className="text-sm text-red-500 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.phoneVerification}
                      </p>
                    )}
                  </div>

                  <div className="text-center">
                    <button className="text-sm text-blue-600 hover:underline">Didn't receive the code? Resend</button>
                  </div>
                </>
              )}
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button onClick={handleNextStep} disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700">
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {step === 1 ? "Creating Account..." : "Verifying..."}
                  </div>
                ) : (
                  <>
                    {step === 1 ? "Create Secure Account" : "Verify & Complete"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              {step === 2 && (
                <Button variant="outline" onClick={() => setStep(1)} disabled={isLoading} className="w-full">
                  Back to Account Setup
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Security Features */}
          <div className="mt-8 grid grid-cols-2 gap-4 text-center">
            <div className="bg-white p-4 rounded-lg border">
              <Shield className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-xs font-medium">Bank-Level Security</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <Lock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-xs font-medium">Encrypted Data</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
