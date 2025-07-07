"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle, Mail, ArrowLeft } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function PartnerInvite() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Get partner email from localStorage if available
  const partnerEmail = typeof window !== "undefined" ? localStorage.getItem("partnerEmail") || "" : ""

  // Use partner email from localStorage if available
  useState(() => {
    if (partnerEmail) {
      setEmail(partnerEmail)
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Button variant="ghost" className="mb-6" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          {!isSubmitted ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Invite Your Partner</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Send an invitation to your partner to complete their part of the joint loan application.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Partner's Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="partner@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h3 className="font-medium text-blue-800 mb-2">What happens next?</h3>
                      <p className="text-sm text-blue-700">
                        Your partner will receive an email with instructions to create an account and complete their
                        part of the application.
                      </p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Invitation"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="bg-green-100 p-3 rounded-full inline-flex mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Invitation Sent!</h2>
                <p className="text-gray-600 mb-6">
                  We've sent an invitation to <strong>{email}</strong>. Your partner will receive instructions to
                  complete their part of the application.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-left mb-6">
                  <h3 className="font-medium text-blue-800 mb-2">What happens next?</h3>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                      <span>Your partner will receive an email with a link to join</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                      <span>They'll create an account or sign in</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                      <span>They'll complete their part of the application</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                      <span>You'll be notified when they're done</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href="/dashboard">Return to Dashboard</Link>
                  </Button>
                  <Button className="flex-1" asChild>
                    <Link href="#" onClick={() => setIsSubmitted(false)}>
                      <Mail className="mr-2 h-4 w-4" />
                      Resend Invitation
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
