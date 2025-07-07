"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-600">Last updated: January 2025</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>1. Service Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Refii operates as a loan comparison and application platform that connects borrowers with multiple
                lenders to facilitate competitive home loan offers. We are not a lender ourselves but act as an
                intermediary service.
              </p>
              <p>Our services include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Loan comparison and matching services</li>
                <li>Application processing and document collection</li>
                <li>Communication facilitation between borrowers and lenders</li>
                <li>Educational resources and calculators</li>
                <li>Ongoing loan management support</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>2. User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>By using our service, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information in all applications and communications</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Notify us immediately of any unauthorised use of your account</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not use our service for any fraudulent or illegal purposes</li>
                <li>Keep your contact information current and accurate</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>3. Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We are committed to protecting your privacy and personal information. Our collection, use, and
                disclosure of personal information is governed by our Privacy Policy and the Privacy Act 1988 (Cth).
              </p>
              <p>
                By using our service, you consent to the collection, use, and disclosure of your personal information as
                described in our Privacy Policy, including sharing your information with potential lenders for the
                purpose of obtaining loan quotes.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>4. Disclaimers and Limitations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <strong>No Guarantee of Loan Approval:</strong> We do not guarantee that any lender will approve your
                loan application. Loan approval is subject to each lender's individual criteria and policies.
              </p>
              <p>
                <strong>Rate and Term Accuracy:</strong> While we strive to provide accurate and up-to-date information
                about loan rates and terms, these may change without notice. Final loan terms are determined by the
                lender.
              </p>
              <p>
                <strong>Independent Financial Advice:</strong> Our service does not constitute financial advice. You
                should consider seeking independent financial advice before making any loan decisions.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>5. Fees and Charges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our service to borrowers is provided at no cost. We may receive commissions from lenders when loans are
                successfully settled. These arrangements do not affect the loan terms offered to you.
              </p>
              <p>
                Any fees charged by lenders (such as application fees, valuation fees, or ongoing fees) are separate
                from our service and will be clearly disclosed by the lender.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>6. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                All content, trademarks, and intellectual property on our platform remain our property or that of our
                licensors. You may not reproduce, distribute, or create derivative works without our express written
                permission.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>7. Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We may terminate or suspend your access to our service at any time, with or without cause, with or
                without notice. You may also terminate your account at any time by contacting us.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>8. Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                These terms are governed by the laws of Australia. Any disputes will be subject to the exclusive
                jurisdiction of the Australian courts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>If you have any questions about these Terms of Service, please contact us at:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong>Email:</strong> legal@refii.com.au
                </p>
                <p>
                  <strong>Phone:</strong> 1300 REFII (1300 733 44)
                </p>
                <p>
                  <strong>Address:</strong> Level 15, 1 Collins Street, Melbourne VIC 3000
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
