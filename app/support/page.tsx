"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowLeft,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  HelpCircle,
  FileText,
  Users,
  CreditCard,
  Home,
  Search,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Header from "../components/Header"

interface SupportTicket {
  id: string
  subject: string
  status: "open" | "in-progress" | "resolved"
  priority: "low" | "medium" | "high"
  createdAt: string
  lastUpdate: string
  category: string
}

export default function SupportPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("contact")
  const [contactForm, setContactForm] = useState({
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "0412 345 678",
    category: "",
    subject: "",
    message: "",
    priority: "medium",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [tickets] = useState<SupportTicket[]>([
    {
      id: "TK-001",
      subject: "Question about document upload",
      status: "resolved",
      priority: "low",
      createdAt: "2023-11-10",
      lastUpdate: "2023-11-12",
      category: "Documents",
    },
    {
      id: "TK-002",
      subject: "Loan offer comparison help",
      status: "in-progress",
      priority: "medium",
      createdAt: "2023-11-14",
      lastUpdate: "2023-11-15",
      category: "Loans",
    },
  ])

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I start my loan application?",
          answer:
            "You can start your loan application by clicking 'Get Started' on our homepage. You'll be guided through a simple questionnaire to determine the best loan options for your situation.",
        },
        {
          question: "What documents do I need to prepare?",
          answer:
            "Typically you'll need: ID (driver's license or passport), recent pay slips, bank statements (last 3 months), tax returns (last 2 years), and property documents if applicable. Our system will tell you exactly what's needed for your specific situation.",
        },
        {
          question: "How long does the application process take?",
          answer:
            "The initial application takes about 10-15 minutes. Document upload and verification typically takes 2-3 business days. Once submitted to lenders, you can expect responses within 5-7 business days.",
        },
      ],
    },
    {
      category: "Loan Process",
      questions: [
        {
          question: "How does the bidding process work?",
          answer:
            "Instead of you shopping around, we submit your application to multiple lenders who then compete for your business by offering their best rates and terms. This often results in better offers than you'd get applying directly.",
        },
        {
          question: "What is a broker fee estimate?",
          answer:
            "The broker fee estimate is a percentage (typically 0.5-2%) of your loan amount that you receive when your loan settles. This is money that would normally be paid to mortgage brokers as commission, but with Home Online, you keep it.",
        },
        {
          question: "Can I compare multiple loan offers?",
          answer:
            "Yes! Once lenders submit their offers, you'll see them all in your dashboard with detailed comparisons of rates, fees, features, and potential savings. You can take your time to review and choose the best option.",
        },
      ],
    },
    {
      category: "Documents & Verification",
      questions: [
        {
          question: "Why do I need to upload so many documents?",
          answer:
            "Lenders are required by law to verify your identity, income, and financial situation before approving a loan. The documents ensure you can afford the loan and help lenders offer you their best rates.",
        },
        {
          question: "Is it safe to upload my documents online?",
          answer:
            "Yes, absolutely. All documents are encrypted during upload and stored securely. We use bank-level security and only share your documents with lenders you've approved. You can delete your documents at any time.",
        },
        {
          question: "What if I'm missing a required document?",
          answer:
            "Don't worry! You can upload documents as you get them. Our system will remind you of any missing items. For urgent applications, contact our support team who can advise on alternatives.",
        },
      ],
    },
    {
      category: "Fees & Costs",
      questions: [
        {
          question: "What does Home Online cost?",
          answer:
            "Home Online is free to use. There are no upfront fees, application fees, or ongoing charges. You only benefit from the broker fee estimate when your loan settles.",
        },
        {
          question: "Are there any hidden fees?",
          answer:
            "No hidden fees whatsoever. All potential costs (like lender fees) are clearly displayed in your loan comparisons. What you see is what you get.",
        },
        {
          question: "When do I receive the broker fee estimate?",
          answer:
            "The broker fee estimate is paid to you at loan settlement, typically 4-6 weeks after you accept a loan offer. The exact amount depends on your loan size and the lender's commission structure.",
        },
      ],
    },
  ]

  const handleSubmitTicket = async () => {
    if (!contactForm.category || !contactForm.subject || !contactForm.message) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Support ticket created",
      description: "Your support request has been submitted. We'll get back to you within 24 hours.",
    })

    // Reset form
    setContactForm((prev) => ({
      ...prev,
      category: "",
      subject: "",
      message: "",
      priority: "medium",
    }))

    setIsSubmitting(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          searchQuery === "" ||
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  const tabs = [
    { id: "contact", label: "Contact Support", icon: MessageSquare },
    { id: "tickets", label: "My Tickets", icon: FileText },
    { id: "faq", label: "FAQ", icon: HelpCircle },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push("/dashboard")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Support Center</h1>
                <p className="text-gray-600">Get help with your loan application and account</p>
              </div>
            </div>
          </div>

          {/* Quick Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="flex items-center p-4">
                <Phone className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="font-semibold">Phone Support</p>
                  <p className="text-sm text-gray-600">1300 123 456</p>
                  <p className="text-xs text-gray-500">Mon-Fri 9AM-6PM AEST</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-4">
                <Mail className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="font-semibold">Email Support</p>
                  <p className="text-sm text-gray-600">help@homeonline.com.au</p>
                  <p className="text-xs text-gray-500">Response within 24 hours</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-4">
                <Clock className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="font-semibold">Average Response</p>
                  <p className="text-sm text-gray-600">2-4 hours</p>
                  <p className="text-xs text-gray-500">During business hours</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    {tabs.map((tab) => {
                      const Icon = tab.icon
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                            activeTab === tab.id
                              ? "bg-blue-50 border-r-2 border-blue-500 text-blue-700"
                              : "text-gray-700"
                          }`}
                        >
                          <Icon className="h-4 w-4 mr-3" />
                          {tab.label}
                        </button>
                      )
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              {/* Contact Support Tab */}
              {activeTab === "contact" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                    <CardDescription>Send us a message and we'll get back to you as soon as possible</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input
                          id="phone"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={contactForm.category}
                          onValueChange={(value) => setContactForm((prev) => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="application">Loan Application</SelectItem>
                            <SelectItem value="documents">Document Upload</SelectItem>
                            <SelectItem value="offers">Loan Offers</SelectItem>
                            <SelectItem value="account">Account Issues</SelectItem>
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="billing">Billing & Fees</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                          value={contactForm.priority}
                          onValueChange={(value) => setContactForm((prev) => ({ ...prev, priority: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low - General inquiry</SelectItem>
                            <SelectItem value="medium">Medium - Need assistance</SelectItem>
                            <SelectItem value="high">High - Urgent issue</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, subject: e.target.value }))}
                        placeholder="Brief description of your issue"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                        placeholder="Please provide as much detail as possible about your question or issue..."
                        rows={6}
                      />
                    </div>

                    <Alert>
                      <HelpCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Tip:</strong> Include your application ID or any error messages you're seeing to help us
                        assist you faster.
                      </AlertDescription>
                    </Alert>

                    <div className="flex justify-end">
                      <Button onClick={handleSubmitTicket} disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Support Request"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* My Tickets Tab */}
              {activeTab === "tickets" && (
                <Card>
                  <CardHeader>
                    <CardTitle>My Support Tickets</CardTitle>
                    <CardDescription>Track the status of your support requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {tickets.length > 0 ? (
                      <div className="space-y-4">
                        {tickets.map((ticket) => (
                          <div key={ticket.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h3 className="font-semibold">{ticket.subject}</h3>
                                <p className="text-sm text-gray-600">Ticket ID: {ticket.id}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getStatusColor(ticket.status)}>
                                  {ticket.status === "in-progress"
                                    ? "In Progress"
                                    : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                                </Badge>
                                <Badge className={getPriorityColor(ticket.priority)}>
                                  {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>Category: {ticket.category}</span>
                              <div className="flex items-center space-x-4">
                                <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                                <span>Updated: {new Date(ticket.lastUpdate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">No support tickets yet</h3>
                        <p className="text-gray-500 mb-4">When you contact support, your tickets will appear here</p>
                        <Button onClick={() => setActiveTab("contact")}>Create Support Ticket</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* FAQ Tab */}
              {activeTab === "faq" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Find quick answers to common questions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search FAQs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    {/* FAQ Categories */}
                    {filteredFaqs.map((category, categoryIndex) => (
                      <div key={categoryIndex}>
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          {category.category === "Getting Started" && <Users className="h-5 w-5 mr-2 text-blue-600" />}
                          {category.category === "Loan Process" && (
                            <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                          )}
                          {category.category === "Documents & Verification" && (
                            <FileText className="h-5 w-5 mr-2 text-purple-600" />
                          )}
                          {category.category === "Fees & Costs" && <Home className="h-5 w-5 mr-2 text-orange-600" />}
                          {category.category}
                        </h3>
                        <Accordion type="single" collapsible className="w-full">
                          {category.questions.map((faq, faqIndex) => (
                            <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                              <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    ))}

                    {filteredFaqs.length === 0 && searchQuery && (
                      <div className="text-center py-8">
                        <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">No results found</h3>
                        <p className="text-gray-500 mb-4">Try different keywords or contact support for help</p>
                        <Button onClick={() => setActiveTab("contact")}>Contact Support</Button>
                      </div>
                    )}

                    {/* Still need help */}
                    <div className="border-t pt-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Still need help?</h4>
                        <p className="text-blue-700 text-sm mb-3">
                          Can't find what you're looking for? Our support team is here to help.
                        </p>
                        <Button onClick={() => setActiveTab("contact")} size="sm">
                          Contact Support
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
