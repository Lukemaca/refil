"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Send, MessageSquare, User, CheckCircle, FileText, Phone, Mail, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  sender: "admin" | "client"
  senderName: string
  content: string
  timestamp: string
  type: "message" | "system" | "document_request"
  read: boolean
  attachments?: string[]
}

interface Application {
  id: string
  applicantName: string
  email: string
  phone: string
  status: string
  lender: string
  amount: number
}

export default function ApplicationMessages() {
  const params = useParams()
  const applicationId = params.id as string
  const { toast } = useToast()

  const [application, setApplication] = useState<Application | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock application data
      const mockApplication: Application = {
        id: applicationId,
        applicantName: "John Smith",
        email: "john.smith@email.com",
        phone: "+61 400 123 456",
        status: "document_verification",
        lender: "Commonwealth Bank",
        amount: 250000,
      }

      // Mock messages
      const mockMessages: Message[] = [
        {
          id: "msg1",
          sender: "admin",
          senderName: "Sarah (Home Online)",
          content:
            "Welcome to Home Online! I'll be your dedicated loan specialist. I've received your application and will guide you through the process.",
          timestamp: "2023-11-28T09:00:00Z",
          type: "message",
          read: true,
        },
        {
          id: "msg2",
          sender: "client",
          senderName: "John Smith",
          content: "Thank you Sarah! I'm excited to get started. What documents do you need from me first?",
          timestamp: "2023-11-28T09:15:00Z",
          type: "message",
          read: true,
        },
        {
          id: "msg3",
          sender: "admin",
          senderName: "Sarah (Home Online)",
          content:
            "Great question! I'll need your last 3 months of payslips, bank statements, and a copy of your ID. I'll send you a secure document upload link.",
          timestamp: "2023-11-28T09:30:00Z",
          type: "message",
          read: true,
        },
        {
          id: "msg4",
          sender: "admin",
          senderName: "System",
          content: "Document request sent: Payslips (last 3 months), Bank statements (last 3 months), Photo ID",
          timestamp: "2023-11-28T09:31:00Z",
          type: "document_request",
          read: true,
        },
        {
          id: "msg5",
          sender: "client",
          senderName: "John Smith",
          content:
            "I've uploaded my payslips and ID. Still working on getting the bank statements - should have them by tomorrow.",
          timestamp: "2023-11-28T14:30:00Z",
          type: "message",
          read: false,
        },
        {
          id: "msg6",
          sender: "client",
          senderName: "John Smith",
          content: "Also, I have a question about the interest rate. Is there room for negotiation with the lender?",
          timestamp: "2023-11-28T14:32:00Z",
          type: "message",
          read: false,
        },
        {
          id: "msg7",
          sender: "client",
          senderName: "John Smith",
          content: "One more thing - when do you think we'll hear back from the lender?",
          timestamp: "2023-11-28T14:35:00Z",
          type: "message",
          read: false,
        },
      ]

      setApplication(mockApplication)
      setMessages(mockMessages)
      setLoading(false)
    }

    fetchData()
  }, [applicationId])

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: `msg${Date.now()}`,
      sender: "admin",
      senderName: "You (Home Online)",
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: "message",
      read: true,
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Mark client messages as read
    setMessages((prev) => prev.map((msg) => ({ ...msg, read: true })))

    toast({
      title: "Message Sent",
      description: "Your message has been sent to the client",
    })
  }

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply)
  }

  const quickReplies = [
    "Thank you for the update. I'll review your documents shortly.",
    "I'll check with the lender and get back to you within 24 hours.",
    "Please upload the remaining documents when convenient.",
    "Your application is progressing well. I'll keep you updated.",
    "Let me schedule a call to discuss your questions in detail.",
  ]

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-center">Application not found</h1>
      </div>
    )
  }

  const unreadCount = messages.filter((m) => !m.read && m.sender === "client").length

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="outline" asChild className="mr-4 bg-transparent">
          <Link href="/admin/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Messages - {application.applicantName}</h1>
          <p className="text-gray-500">
            Application #{application.id} - {application.lender}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="flex-shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-blue-600" />
                  Conversation
                </CardTitle>
                {unreadCount > 0 && <Badge className="bg-red-500 text-white">{unreadCount} unread</Badge>}
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                          message.sender === "admin"
                            ? "bg-blue-600 text-white"
                            : message.type === "system" || message.type === "document_request"
                              ? "bg-gray-100 text-gray-900 border"
                              : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium opacity-75">{message.senderName}</span>
                          <div className="flex items-center space-x-1">
                            {message.type === "document_request" && <FileText className="h-3 w-3" />}
                            {message.type === "system" && <CheckCircle className="h-3 w-3" />}
                            {!message.read && message.sender === "client" && (
                              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-75 mt-2">{new Date(message.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <Separator />

              <div className="p-4 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    rows={3}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} className="self-end">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="font-medium">{application.applicantName}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm">{application.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm">{application.phone}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Loan Amount:</span>
                  <span className="text-sm font-medium">${application.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Lender:</span>
                  <span className="text-sm font-medium">{application.lender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Status:</span>
                  <Badge variant="outline">{application.status.replace("_", " ")}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Request Documents
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Call
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Call Client
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Message Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Total Messages:</span>
                <span className="text-sm font-medium">{messages.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Unread:</span>
                <span className="text-sm font-medium">{unreadCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Last Activity:</span>
                <span className="text-sm font-medium">
                  {messages.length > 0
                    ? new Date(messages[messages.length - 1].timestamp).toLocaleDateString()
                    : "No activity"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
