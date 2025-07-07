"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Phone, Lock, CheckCircle, AlertCircle } from "lucide-react"

export default function SignUpForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "email":
        if (!value) return "Email is required"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address"
        return ""
      case "phone":
        if (!value) return "Phone number is required"
        if (!/^(\+61|0)[2-9]\d{8}$/.test(value.replace(/\s/g, "")))
          return "Please enter a valid Australian phone number"
        return ""
      case "password":
        if (!value) return "Password is required"
        if (value.length < 8) return "Password must be at least 8 characters"
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
          return "Password must contain uppercase, lowercase, and number"
        return ""
      default:
        return ""
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Real-time validation
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const isFormValid = () => {
    return (
      Object.values(errors).every((error) => !error) && Object.values(formData).every((value) => value.trim() !== "")
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Mark all fields as touched
    setTouched({ email: true, phone: true, password: true })

    // Validate all fields
    const newErrors: Record<string, string> = {}
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value)
      if (error) newErrors[key] = error
    })

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Save user session
      localStorage.setItem("userEmail", formData.email)
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem(
        "userData",
        JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          fullName: formData.email.split("@")[0],
        }),
      )

      // Redirect to loan selection
      router.push("/loan-selection")
    } catch (error) {
      console.error("Signup error:", error)
      setErrors({ submit: "Something went wrong. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const getFieldStatus = (fieldName: string) => {
    if (!touched[fieldName]) return "default"
    if (errors[fieldName]) return "error"
    if (formData[fieldName as keyof typeof formData]) return "success"
    return "default"
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Create Your Account
          </CardTitle>
          <p className="text-gray-600 mt-2">Join thousands finding better home loan deals</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {errors.submit && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{errors.submit}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail
                  className={`absolute left-3 top-3 h-5 w-5 transition-colors ${
                    getFieldStatus("email") === "error"
                      ? "text-red-400"
                      : getFieldStatus("email") === "success"
                        ? "text-green-400"
                        : "text-gray-400"
                  }`}
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email address"
                  className={`pl-10 pr-10 h-12 transition-all duration-200 ${
                    getFieldStatus("email") === "error"
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : getFieldStatus("email") === "success"
                        ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  }`}
                  disabled={isLoading}
                />
                {getFieldStatus("email") === "success" && (
                  <CheckCircle className="absolute right-3 top-3 h-5 w-5 text-green-500" />
                )}
              </div>
              {touched.email && errors.email && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <div className="relative">
                <Phone
                  className={`absolute left-3 top-3 h-5 w-5 transition-colors ${
                    getFieldStatus("phone") === "error"
                      ? "text-red-400"
                      : getFieldStatus("phone") === "success"
                        ? "text-green-400"
                        : "text-gray-400"
                  }`}
                />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="04XX XXX XXX"
                  className={`pl-10 pr-10 h-12 transition-all duration-200 ${
                    getFieldStatus("phone") === "error"
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : getFieldStatus("phone") === "success"
                        ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  }`}
                  disabled={isLoading}
                />
                {getFieldStatus("phone") === "success" && (
                  <CheckCircle className="absolute right-3 top-3 h-5 w-5 text-green-500" />
                )}
              </div>
              {touched.phone && errors.phone && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock
                  className={`absolute left-3 top-3 h-5 w-5 transition-colors ${
                    getFieldStatus("password") === "error"
                      ? "text-red-400"
                      : getFieldStatus("password") === "success"
                        ? "text-green-400"
                        : "text-gray-400"
                  }`}
                />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Create a secure password"
                  className={`pl-10 pr-10 h-12 transition-all duration-200 ${
                    getFieldStatus("password") === "error"
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : getFieldStatus("password") === "success"
                        ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.password}
                </p>
              )}
              {!errors.password && formData.password && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    <div
                      className={`h-1 w-full rounded ${formData.password.length >= 8 ? "bg-green-400" : "bg-gray-200"}`}
                    />
                    <div
                      className={`h-1 w-full rounded ${/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? "bg-green-400" : "bg-gray-200"}`}
                    />
                    <div
                      className={`h-1 w-full rounded ${/(?=.*\d)/.test(formData.password) ? "bg-green-400" : "bg-gray-200"}`}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Password strength:{" "}
                    {formData.password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)
                      ? "Strong"
                      : formData.password.length >= 6
                        ? "Medium"
                        : "Weak"}
                  </p>
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={!isFormValid() || isLoading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </div>
              ) : (
                "Create Account & Continue"
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Trust Indicators */}
      <div className="mt-6 text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Lock className="h-4 w-4" />
          <span>Your information is secure and encrypted</span>
        </div>
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
          <span>✓ No spam</span>
          <span>✓ Free to use</span>
          <span>✓ Takes 2 minutes</span>
        </div>
      </div>
    </div>
  )
}
