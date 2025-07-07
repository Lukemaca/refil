"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-600">Last updated: January 2025</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Personal Information:</strong> Name, address, phone number, email address, date of birth
                </li>
                <li>
                  <strong>Financial Information:</strong> Income, employment details, assets, liabilities, credit
                  history
                </li>
                <li>
                  <strong>Property Information:</strong> Property details, purchase price, loan amount required
                </li>
                <li>
                  <strong>Documents:</strong> Bank statements, pay slips, tax returns, identification documents
                </li>
                <li>
                  <strong>Usage Information:</strong> How you interact with our website and services
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process your loan applications and connect you with suitable lenders</li>
                <li>Verify your identity and assess your creditworthiness</li>
                <li>Provide customer support and respond to your enquiries</li>
                <li>Send you updates about your applications and relevant loan offers</li>
                <li>Improve our services and develop new features</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Prevent fraud and ensure platform security</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>3. Information Sharing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Lenders:</strong> To obtain loan quotes and process applications
                </li>
                <li>
                  <strong>Credit Reporting Bodies:</strong> To assess creditworthiness (with your consent)
                </li>
                <li>
                  <strong>Service Providers:</strong> Third parties who assist us in providing our services
                </li>
                <li>
                  <strong>Legal Authorities:</strong> When required by law or to protect our rights
                </li>
                <li>
                  <strong>Business Partners:</strong> With your explicit consent for specific services
                </li>
              </ul>
              <p>We do not sell your personal information to third parties for marketing purposes.</p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>4. Data Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We implement industry-standard security measures to protect your information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>256-bit SSL encryption for all data transmission</li>
                <li>Secure data storage with regular backups</li>
                <li>Multi-factor authentication for account access</li>
                <li>Regular security audits and penetration testing</li>
                <li>Staff training on data protection and privacy</li>
                <li>Compliance with Australian Privacy Principles</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>5. Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Under Australian privacy law, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate or incomplete information</li>
                <li>Request deletion of your personal information (subject to legal requirements)</li>
                <li>Withdraw consent for certain uses of your information</li>
                <li>Lodge a complaint with the Office of the Australian Information Commissioner</li>
                <li>Request a copy of your information in a portable format</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>6. Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember your preferences and login status</li>
                <li>Analyse website usage and improve user experience</li>
                <li>Provide personalised content and recommendations</li>
                <li>Measure the effectiveness of our marketing campaigns</li>
              </ul>
              <p>You can control cookie settings through your browser preferences.</p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>7. Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We retain your information for as long as necessary to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide our services to you</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Resolve disputes and enforce our agreements</li>
                <li>Maintain business records for operational purposes</li>
              </ul>
              <p>
                Typically, we retain personal information for 7 years after your last interaction with us, unless a
                longer retention period is required by law.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                If you have any questions about this Privacy Policy or wish to exercise your privacy rights, please
                contact our Privacy Officer:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong>Email:</strong> privacy@refii.com.au
                </p>
                <p>
                  <strong>Phone:</strong> 1300 REFII (1300 733 44)
                </p>
                <p>
                  <strong>Address:</strong> Privacy Officer, Level 15, 1 Collins Street, Melbourne VIC 3000
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
