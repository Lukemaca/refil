"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Calendar, CheckCircle, Clock, Download, FileText, Home, MessageSquare, Upload } from "lucide-react"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"

export default function NextStepsPage({ params }) {
  const router = useRouter()
  const { id } = params
  const [isLoading, setIsLoading] = useState(true)
  const [application, setApplication] = useState(null)

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    // Simulate loading application data
    const loadApplicationData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock application data
      setApplication({
        id,
        type: "Refinance",
        status: "conditionally_approved",
        progress: 65,
        lender: "Commonwealth Bank",
        amount: 450000,
        rate: 5.29,
        term: 30,
        monthlyPayment: 2495.71,
        lastUpdated: "2023-05-10",
        propertyAddress: "123 Main St, Sydney NSW 2000",
        nextSteps: [
          {
            id: "step-1",
            title: "Upload Required Documents",
            description: "We need additional documentation to verify your information.",
            status: "pending",
            deadline: "2023-05-20",
          },
          {
            id: "step-2",
            title: "Schedule Property Appraisal",
            description: "An appraisal is required to determine your property's current value.",
            status: "pending",
            deadline: "2023-05-25",
          },
          {
            id: "step-3",
            title: "Review Loan Estimate",
            description: "Review the detailed terms and costs of your mortgage offer.",
            status: "pending",
            deadline: "2023-05-15",
          },
          {
            id: "step-4",
            title: "Complete Income Verification",
            description: "Additional income verification is required for final approval.",
            status: "pending",
            deadline: "2023-05-22",
          },
        ],
        requiredDocuments: [
          {
            id: "doc-1",
            name: "Last 2 Pay Stubs",
            description: "Recent pay stubs showing your income",
            status: "pending",
          },
          {
            id: "doc-2",
            name: "Bank Statements",
            description: "Last 3 months of bank statements",
            status: "pending",
          },
          {
            id: "doc-3",
            name: "Tax Returns",
            description: "Last 2 years of tax returns",
            status: "pending",
          },
          {
            id: "doc-4",
            name: "Property Insurance",
            description: "Proof of property insurance coverage",
            status: "pending",
          },
        ],
      })

      setIsLoading(false)
    }

    loadApplicationData()
  }, [id, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your application details...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/dashboard" className="text-blue-600 hover:underline flex items-center mb-4">
              ← Back to Dashboard
            </Link>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold mb-1">Next Steps for Your Mortgage</h1>
                <p className="text-gray-600">Complete these steps to finalize your conditionally approved mortgage</p>
              </div>
              <div className="mt-4 md:mt-0 bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">
                Conditionally Approved
              </div>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader className="pb-2">
              <CardTitle>Application Summary</CardTitle>
              <CardDescription>
                Application ID: {application.id} | Last updated:{" "}
                {new Date(application.lastUpdated).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Mortgage Type</p>
                  <p className="font-medium">{application.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Lender</p>
                  <p className="font-medium">{application.lender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Property</p>
                  <p className="font-medium">{application.propertyAddress}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Loan Amount</p>
                  <p className="font-medium">${application.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Interest Rate</p>
                  <p className="font-medium">{application.rate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Term</p>
                  <p className="font-medium">{application.term} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Monthly Payment</p>
                  <p className="font-medium">${application.monthlyPayment.toFixed(2)}</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Application Progress</span>
                  <span className="text-sm font-medium">{application.progress}%</span>
                </div>
                <Progress value={application.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-8">
            <h3 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
              Conditional Approval Received
            </h3>
            <p className="text-blue-700 mb-4">
              Congratulations! Your mortgage has been conditionally approved. This means the lender has reviewed your
              initial application and is prepared to offer you a mortgage subject to verification of certain information
              and documentation.
            </p>
            <p className="text-blue-700 mb-4">
              To move forward to final approval, please complete the steps below. Our team is here to help you through
              each step of the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="#required-documents">
                  <Upload className="mr-2 h-4 w-4" /> Upload Documents
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact-specialist">
                  <MessageSquare className="mr-2 h-4 w-4" /> Speak with a Mortgage Specialist
                </Link>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="next-steps" className="mb-8">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="next-steps">Next Steps</TabsTrigger>
              <TabsTrigger value="required-documents">Required Documents</TabsTrigger>
              <TabsTrigger value="loan-details">Loan Details</TabsTrigger>
            </TabsList>

            <TabsContent value="next-steps">
              <div className="space-y-6">
                {application.nextSteps.map((step, index) => (
                  <Card key={step.id} id={step.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="flex items-center">
                          <span className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm">
                            {index + 1}
                          </span>
                          {step.title}
                        </CardTitle>
                        <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                          {step.status === "pending" ? "Pending" : "Completed"}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Deadline: {new Date(step.deadline).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      {step.id === "step-1" && (
                        <Button asChild>
                          <Link href="#required-documents">
                            <Upload className="mr-2 h-4 w-4" /> Upload Documents
                          </Link>
                        </Button>
                      )}
                      {step.id === "step-2" && (
                        <Button asChild>
                          <Link href="/schedule-appraisal">
                            <Calendar className="mr-2 h-4 w-4" /> Schedule Appraisal
                          </Link>
                        </Button>
                      )}
                      {step.id === "step-3" && (
                        <Button asChild>
                          <Link href="/loan-estimate">
                            <FileText className="mr-2 h-4 w-4" /> Review Estimate
                          </Link>
                        </Button>
                      )}
                      {step.id === "step-4" && (
                        <Button asChild>
                          <Link href="/income-verification">
                            <CheckCircle className="mr-2 h-4 w-4" /> Complete Verification
                          </Link>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="required-documents" id="required-documents">
              <div className="space-y-6">
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 mb-4">
                  <h3 className="font-medium text-amber-800 mb-2 flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-amber-600" />
                    Document Requirements
                  </h3>
                  <p className="text-sm text-amber-700">
                    Please upload clear, complete copies of all required documents. Acceptable formats include PDF, JPG,
                    and PNG. Each file should be less than 10MB.
                  </p>
                </div>

                {application.requiredDocuments.map((doc) => (
                  <Card key={doc.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{doc.name}</CardTitle>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            doc.status === "pending" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                          }`}
                        >
                          {doc.status === "pending" ? "Pending" : "Uploaded"}
                        </div>
                      </div>
                      <CardDescription>{doc.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button asChild>
                        <Link href={`/document-upload?docId=${doc.id}`}>
                          <Upload className="mr-2 h-4 w-4" /> Upload Document
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="loan-details">
              <Card>
                <CardHeader>
                  <CardTitle>Mortgage Offer Details</CardTitle>
                  <CardDescription>Review the details of your conditionally approved mortgage offer</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-3">Loan Information</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Loan Type:</span>
                            <span className="font-medium">30-Year Fixed Rate</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Loan Amount:</span>
                            <span className="font-medium">${application.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Interest Rate:</span>
                            <span className="font-medium">{application.rate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">APR:</span>
                            <span className="font-medium">{(application.rate + 0.15).toFixed(2)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Loan Term:</span>
                            <span className="font-medium">{application.term} years</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Monthly Payment:</span>
                            <span className="font-medium">${application.monthlyPayment.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-3">Fees & Closing Costs</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Origination Fee:</span>
                            <span className="font-medium">$1,125.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Appraisal Fee:</span>
                            <span className="font-medium">$550.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Credit Report Fee:</span>
                            <span className="font-medium">$45.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Title Services:</span>
                            <span className="font-medium">$1,200.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Recording Fees:</span>
                            <span className="font-medium">$125.00</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span>Total Closing Costs:</span>
                            <span>$3,045.00</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Loan Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span>No prepayment penalties</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span>Offset account available</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span>Redraw facility</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span>Online account management</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href="/loan-estimate">
                      <Download className="mr-2 h-4 w-4" /> Download Loan Estimate
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/contact-specialist">
                      <MessageSquare className="mr-2 h-4 w-4" /> Discuss This Offer
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-8">
            <Button variant="outline" asChild>
              <Link href="/dashboard">
                <Home className="mr-2 h-4 w-4" /> Back to Dashboard
              </Link>
            </Button>
            <Button asChild>
              <Link href="/applications/track">
                Track Application Progress <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
