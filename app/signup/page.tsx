"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, CheckCircle, Mail, Lock, User, Phone, Eye, EyeOff, Info } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function SignUp() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    receiveUpdates: false,
    marketingOptIn: false,
    applyWithPartner: false,
    partnerEmail: "",
  })

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

    // Clear error when user checks keno je deploy hosse na bojhte parcina
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[0-9+\-() ]{8,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter"
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number"
    } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one special character"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
      window.scrollTo(0, 0)
    } else if (step === 2 && validateStep2()) {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    setIsLoading(true)

    // Save user data to localStorage for persistence
    if (typeof window !== "undefined") {
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        marketingOptIn: formData.marketingOptIn,
        applyWithPartner: formData.applyWithPartner,
        partnerEmail: formData.partnerEmail || null,
        createdAt: new Date().toISOString(),
        id: Date.now().toString(),
      }

      localStorage.setItem("userData", JSON.stringify(userData))
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", formData.email)
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to the gamified loan application
      router.push("/loan-application/gamified")
    }, 1500)
  }

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "" }

    let strength = 0

    // Length check
    if (password.length >= 8) strength += 1
    if (password.length >= 12) strength += 1

    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    let label = ""
    let color = ""

    if (strength <= 2) {
      label = "Weak"
      color = "bg-red-500"
    } else if (strength <= 4) {
      label = "Medium"
      color = "bg-yellow-500"
    } else {
      label = "Strong"
      color = "bg-green-500"
    }

    return {
      strength: Math.min(100, (strength / 6) * 100),
      label,
      color,
    }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12 max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mt-6 mb-2">Create Your Account</h1>
          <p className="text-gray-600">Start your home loan journey with Home Online</p>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader className="pb-2">
            <div className="w-full mb-4">
              <Progress value={step === 1 ? 50 : 100} className="h-1" />
            </div>
            <CardTitle className="text-xl">{step === 1 ? "Your Details" : "Create Password"}</CardTitle>
          </CardHeader>

          <CardContent className="pt-4">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <User className="h-5 w-5" />
                      </div>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`pl-10 ${errors.fullName ? "border-red-500" : ""}`}
                        placeholder="John Smith"
                      />
                    </div>
                    {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Mail className="h-5 w-5" />
                      </div>
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
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Phone className="h-5 w-5" />
                      </div>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
                        placeholder="0400 123 456"
                      />
                    </div>
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-gray-100 mt-4">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="applyWithPartner" className="text-sm font-medium">
                        Applying with a partner?
                      </Label>
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, applyWithPartner: !prev.applyWithPartner }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${
                          formData.applyWithPartner ? "bg-blue-600" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`${
                            formData.applyWithPartner ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                      </button>
                    </div>

                    {formData.applyWithPartner && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 space-y-2"
                      >
                        <Label htmlFor="partnerEmail">Partner's Email (Optional)</Label>
                        <div className="relative">
                          <div className="absolute left-3 top-3 text-gray-400">
                            <Mail className="h-5 w-5" />
                          </div>
                          <Input
                            id="partnerEmail"
                            name="partnerEmail"
                            type="email"
                            value={formData.partnerEmail || ""}
                            onChange={handleInputChange}
                            className="pl-10"
                            placeholder="partner.email@example.com"
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          Your partner will receive an invitation to join your application. They can complete their
                          details later.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">
                        Create Password <span className="text-red-500">*</span>
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button type="button" className="inline-flex text-gray-400 hover:text-gray-500">
                              <Info className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Password must be at least 8 characters with uppercase, number, and special character</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Lock className="h-5 w-5" />
                      </div>
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}

                    {formData.password && (
                      <div className="space-y-1 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Password strength:</span>
                          <span className="text-xs font-medium">{passwordStrength.label}</span>
                        </div>
                        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${passwordStrength.color}`}
                            style={{ width: `${passwordStrength.strength}%` }}
                          ></div>
                        </div>
                        <ul className="text-xs text-gray-500 space-y-1 mt-2">
                          <li className={formData.password.length >= 8 ? "text-green-500" : ""}>
                            • At least 8 characters
                          </li>
                          <li className={/[A-Z]/.test(formData.password) ? "text-green-500" : ""}>
                            • At least one uppercase letter
                          </li>
                          <li className={/[0-9]/.test(formData.password) ? "text-green-500" : ""}>
                            • At least one number
                          </li>
                          <li className={/[^A-Za-z0-9]/.test(formData.password) ? "text-green-500" : ""}>
                            • At least one special character
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Lock className="h-5 w-5" />
                      </div>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={handleCheckboxChange("agreeTerms")}
                        className={errors.agreeTerms ? "border-red-500" : ""}
                      />
                      <div>
                        <Label htmlFor="agreeTerms" className="text-sm cursor-pointer">
                          I agree to the{" "}
                          <Link href="#" className="text-blue-600 hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="#" className="text-blue-600 hover:underline">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                    </div>
                    {errors.agreeTerms && <p className="text-sm text-red-500">{errors.agreeTerms}</p>}

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="marketingOptIn"
                        checked={formData.marketingOptIn}
                        onCheckedChange={handleCheckboxChange("marketingOptIn")}
                      />
                      <Label htmlFor="marketingOptIn" className="text-sm cursor-pointer">
                        I'd like to receive updates about special offers, products and services
                      </Label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating your account...
                </div>
              ) : (
                <>
                  {step === 1 ? "Continue" : "Create Account"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            {step === 2 && (
              <Button variant="outline" onClick={() => setStep(1)} disabled={isLoading} className="w-full">
                Back
              </Button>
            )}
          </CardFooter>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>

        <div className="mt-12 text-center">
          <div className="flex justify-center space-x-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 inline-flex items-center justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-xs text-gray-600">
                Bank-level
                <br />
                security
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 inline-flex items-center justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-xs text-gray-600">
                Free to
                <br />
                use
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 inline-flex items-center justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-xs text-gray-600">
                Cancel
                <br />
                anytime
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 inline-flex items-center justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-xs text-gray-600">
                Joint
                <br />
                applications
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
