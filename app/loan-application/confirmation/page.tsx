import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Upload, FileCheck, ArrowRight, Award } from "lucide-react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

export default function ApplicationConfirmationPage() {
  // Generate a random application reference number
  const applicationRef = `HOL-${Math.floor(100000 + Math.random() * 900000)}`

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="border-green-200 shadow-lg mb-8">
            <div className="h-2 bg-green-500 rounded-t-lg"></div>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 rounded-full p-4">
                  <Award className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold">Congratulations! You're Conditionally Approved</CardTitle>
              <CardDescription className="text-lg mt-2">
                Based on the information you've provided, your mortgage application has been conditionally approved.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                <h3 className="font-semibold text-xl text-green-800 mb-2">What is conditional approval?</h3>
                <p className="text-green-700">
                  Conditional approval means your loan application has been initially approved based on the information
                  you've provided. To receive final approval, we need to verify this information with supporting
                  documents.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100">
                <h3 className="font-semibold text-xl text-yellow-800 mb-2">Your broker fee estimate</h3>
                <p className="text-yellow-700">
                  Based on your loan amount, your estimated broker fee is approximately $3,500 - $5,000. The exact
                  amount will be confirmed after document verification.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Next Steps: Document Upload</CardTitle>
              <CardDescription>
                To finalize your approval, we need to verify your information with the following documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-3 mt-0.5">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Step 1: Identity Verification</h4>
                    <p className="text-gray-600 mb-2">
                      Upload government-issued photo ID (driver's license, passport) and proof of address.
                    </p>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <p className="font-medium">Required documents:</p>
                      <ul className="list-disc list-inside text-gray-600 ml-2">
                        <li>Driver's license or passport</li>
                        <li>Utility bill or bank statement (less than 3 months old)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-3 mt-0.5">
                    <Upload className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Step 2: Income Verification</h4>
                    <p className="text-gray-600 mb-2">
                      Upload documents that verify your income and employment status.
                    </p>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <p className="font-medium">Required documents:</p>
                      <ul className="list-disc list-inside text-gray-600 ml-2">
                        <li>Last 2 pay stubs</li>
                        <li>W-2 forms for the past 2 years</li>
                        <li>Tax returns for the past 2 years (if self-employed)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-3 mt-0.5">
                    <FileCheck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Step 3: Asset Verification</h4>
                    <p className="text-gray-600 mb-2">
                      Upload documents that verify your assets and down payment funds.
                    </p>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <p className="font-medium">Required documents:</p>
                      <ul className="list-disc list-inside text-gray-600 ml-2">
                        <li>Bank statements for the past 2 months</li>
                        <li>Investment account statements</li>
                        <li>Gift letter (if applicable)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-4 pt-2 pb-6">
              <p className="text-sm text-gray-500 mb-2">
                Your application reference number: <span className="font-medium">{applicationRef}</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/document-collection" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full gap-2">
                    Begin Document Upload <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full">
                    Return to Dashboard
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
