"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle, CheckCircle } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function ResponsibleLendingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 rounded-full p-4">
                <Shield className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Responsible Lending</h1>
            <p className="text-xl text-gray-600">
              We're committed to responsible lending practices that protect borrowers and ensure sustainable lending
            </p>
          </div>

          <Alert className="mb-8 border-blue-200 bg-blue-50">
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-blue-800">
              <strong>Our Commitment:</strong> We work with lenders who follow responsible lending obligations under the
              National Consumer Credit Protection Act 2009 (NCCP) and ASIC guidelines.
            </AlertDescription>
          </Alert>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What is Responsible Lending?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Responsible lending means that lenders must take reasonable steps to assess whether a loan is suitable
                for you before approving it. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Verifying your income and employment</li>
                <li>Understanding your existing debts and commitments</li>
                <li>Assessing your living expenses and spending patterns</li>
                <li>Ensuring you can meet loan repayments without substantial hardship</li>
                <li>Considering your objectives, financial situation, and needs</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Our Assessment Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Income Verification
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Recent pay slips and employment letters</li>
                    <li>• Tax returns for comprehensive income picture</li>
                    <li>• Bank statements showing regular income</li>
                    <li>• Additional income sources (rental, investments)</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Expense Analysis
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Living expenses and household costs</li>
                    <li>• Existing loan and credit commitments</li>
                    <li>• Credit card limits and usage patterns</li>
                    <li>• Discretionary spending analysis</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Credit Assessment
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Credit history and repayment behaviour</li>
                    <li>• Current credit enquiries and applications</li>
                    <li>• Defaults, judgments, or bankruptcies</li>
                    <li>• Overall credit risk profile</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Suitability Check
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Loan purpose and objectives</li>
                    <li>• Repayment capacity under stress scenarios</li>
                    <li>• Long-term financial sustainability</li>
                    <li>• Alternative product suitability</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Rights as a Borrower</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Before You Apply</h3>
                  <ul className="text-sm space-y-2">
                    <li>• Receive clear information about loan terms and costs</li>
                    <li>• Understand all fees, charges, and interest rates</li>
                    <li>• Get explanations of loan features and risks</li>
                    <li>• Access to product disclosure statements</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">During Assessment</h3>
                  <ul className="text-sm space-y-2">
                    <li>• Fair and non-discriminatory assessment</li>
                    <li>• Reasonable time to provide required documents</li>
                    <li>• Clear communication about assessment progress</li>
                    <li>• Explanation if your application is declined</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">After Approval</h3>
                  <ul className="text-sm space-y-2">
                    <li>• Clear loan contract terms and conditions</li>
                    <li>• Cooling-off period for certain loans</li>
                    <li>• Regular statements and account information</li>
                    <li>• Access to hardship assistance if needed</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">If Things Go Wrong</h3>
                  <ul className="text-sm space-y-2">
                    <li>• Internal dispute resolution processes</li>
                    <li>• Access to external dispute resolution</li>
                    <li>• Hardship variation options</li>
                    <li>• Consumer protection under Australian law</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Red Flags We Watch For</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="border-orange-200 bg-orange-50 mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-orange-800">
                  We work with lenders to identify and prevent potentially unsuitable lending practices.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-red-700">Income and Employment Issues</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Unstable or declining income</li>
                    <li>• Casual or contract employment without history</li>
                    <li>• Income that cannot be verified</li>
                    <li>• Over-reliance on overtime or bonuses</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-red-700">Financial Stress Indicators</h3>
                  <ul className="text-sm space-y-1">
                    <li>• High debt-to-income ratios</li>
                    <li>• Multiple recent credit applications</li>
                    <li>• Irregular banking patterns</li>
                    <li>• Minimal savings or deposit funds</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Getting Help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                If you're experiencing financial difficulty or have concerns about responsible lending, help is
                available:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Financial Counselling</h3>
                  <p className="text-sm mb-2">Free, confidential financial counselling services:</p>
                  <ul className="text-sm space-y-1">
                    <li>• National Debt Helpline: 1800 007 007</li>
                    <li>• Financial Counselling Australia</li>
                    <li>• Local community financial counsellors</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Dispute Resolution</h3>
                  <p className="text-sm mb-2">If you have a complaint about lending practices:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Australian Financial Complaints Authority</li>
                    <li>• ASIC's MoneySmart website</li>
                    <li>• Consumer protection agencies</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Our Responsible Lending Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                If you have questions about responsible lending or need assistance with your application:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong>Email:</strong> responsible.lending@refii.com.au
                </p>
                <p>
                  <strong>Phone:</strong> 1300 REFII (1300 733 44)
                </p>
                <p>
                  <strong>Hours:</strong> Monday to Friday, 8:30 AM to 6:00 PM AEST
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
