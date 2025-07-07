"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Send,
  Clock,
  Shield,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface ApprovalChecklist {
  id: string
  item: string
  checked: boolean
  required: boolean
}

interface LenderOption {
  id: string
  name: string
  interestRate: number
  fees: number
  features: string[]
  recommended: boolean
}

export default function ApprovalPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [approvalDecision, setApprovalDecision] = useState<"approve" | "reject" | "">("")
  const [approvalNotes, setApprovalNotes] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")
  const [selectedLenders, setSelectedLenders] = useState<string[]>([])
  const [nextStep, setNextStep] = useState("lender_submission")
  const [checklist, setChecklist] = useState<ApprovalChecklist[]>([])
  const [clientName, setClientName] = useState("")
  const [loanAmount, setLoanAmount] = useState(0)

  const lenderOptions: LenderOption[] = [
    {
      id: "cba",
      name: "Commonwealth Bank",
      interestRate: 5.29,
      fees: 395,
      features: ["Offset account", "Redraw facility", "Extra repayments"],
      recommended: true,
    },
    {
      id: "westpac",
      name: "Westpac",
      interestRate: 5.35,
      fees: 600,
      features: ["Offset account", "Redraw facility"],
      recommended: false,
    },
    {
      id: "anz",
      name: "ANZ",
      interestRate: 5.25,
      fees: 395,
      features: ["Offset account", "Split loan option"],
      recommended: true,
    },
    {
      id: "nab",
      name: "NAB",
      interestRate: 5.42,
      fees: 0,
      features: ["Offset account", "No establishment fee"],
      recommended: false,
    },
  ]

  useEffect(() => {
    const fetchApplicationData = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data
      setClientName("Sarah Johnson")
      setLoanAmount(450000)
      setSelectedLenders(["cba", "anz"]) // Pre-select recommended lenders

      const mockChecklist: ApprovalChecklist[] = [
        { id: "1", item: "Identity verification completed", checked: true, required: true },
        { id: "2", item: "Income documentation verified", checked: true, required: true },
        { id: "3", item: "Credit check completed", checked: true, required: true },
        { id: "4", item: "Property valuation received", checked: true, required: true },
        { id: "5", item: "Debt-to-income ratio acceptable", checked: true, required: true },
        { id: "6", item: "Employment verification completed", checked: true, required: true },
        { id: "7", item: "Bank statements reviewed", checked: true, required: true },
        { id: "8", item: "Risk assessment completed", checked: true, required: true },
        { id: "9", item: "Compliance checks passed", checked: true, required: true },
        { id: "10", item: "Manager review completed", checked: false, required: false },
      ]

      setChecklist(mockChecklist)
      setLoading(false)
    }

    fetchApplicationData()
  }, [params.id])

  const handleChecklistChange = (id: string, checked: boolean) => {
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, checked } : item)))
  }

  const handleLenderSelection = (lenderId: string, selected: boolean) => {
    if (selected) {
      setSelectedLenders((prev) => [...prev, lenderId])
    } else {
      setSelectedLenders((prev) => prev.filter((id) => id !== lenderId))
    }
  }

  const handleSubmitApproval = async () => {
    if (approvalDecision === "approve") {
      // Validate required checklist items
      const requiredItems = checklist.filter((item) => item.required)
      const uncheckedRequired = requiredItems.filter((item) => !item.checked)

      if (uncheckedRequired.length > 0) {
        toast({
          title: "Required Items Missing",
          description: "Please complete all required checklist items before approving.",
          variant: "destructive",
        })
        return
      }

      if (selectedLenders.length === 0) {
        toast({
          title: "No Lenders Selected",
          description: "Please select at least one lender to submit the application to.",
          variant: "destructive",
        })
        return
      }
    } else if (approvalDecision === "reject") {
      if (!rejectionReason.trim()) {
        toast({
          title: "Rejection Reason Required",
          description: "Please provide a reason for rejecting this application.",
          variant: "destructive",
        })
        return
      }
    }

    setSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (approvalDecision === "approve") {
      toast({
        title: "Application Approved",
        description: `${clientName}'s application has been approved and submitted to ${selectedLenders.length} lender(s).`,
      })
    } else {
      toast({
        title: "Application Rejected",
        description: `${clientName}'s application has been rejected.`,
        variant: "destructive",
      })
    }

    // Redirect back to application detail
    router.push(`/admin/applications/${params.id}`)
  }

  const allRequiredItemsChecked = checklist.filter((item) => item.required).every((item) => item.checked)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Loading Approval Form...</h1>
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button variant="outline" size="sm" asChild className="mr-4 bg-transparent">
            <Link href={`/admin/applications/${params.id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Application
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Approval Decision</h1>
            <p className="text-gray-500">
              {clientName} - ${loanAmount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Pre-Approval Checklist */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
              Pre-Approval Checklist
            </CardTitle>
            <CardDescription>
              Verify all required items have been completed before making an approval decision
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {checklist.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={item.id}
                    checked={item.checked}
                    onCheckedChange={(checked) => handleChecklistChange(item.id, checked as boolean)}
                  />
                  <Label htmlFor={item.id} className={`flex-grow ${item.checked ? "line-through text-gray-500" : ""}`}>
                    {item.item}
                    {item.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  {item.checked && <CheckCircle className="h-4 w-4 text-green-600" />}
                </div>
              ))}
            </div>

            {!allRequiredItemsChecked && (
              <Alert className="mt-4 bg-amber-50 border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-800">Required Items Pending</AlertTitle>
                <AlertDescription className="text-amber-700">
                  Please complete all required checklist items before approving this application.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Approval Decision */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-blue-600" />
              Approval Decision
            </CardTitle>
            <CardDescription>Make your approval decision and provide any necessary notes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Decision</Label>
              <div className="flex gap-4 mt-2">
                <Button
                  variant={approvalDecision === "approve" ? "default" : "outline"}
                  onClick={() => setApprovalDecision("approve")}
                  className={approvalDecision === "approve" ? "bg-green-600 hover:bg-green-700" : ""}
                  disabled={!allRequiredItemsChecked}
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Approve
                </Button>
                <Button
                  variant={approvalDecision === "reject" ? "destructive" : "outline"}
                  onClick={() => setApprovalDecision("reject")}
                >
                  <ThumbsDown className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </div>
            </div>

            {approvalDecision === "approve" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="approval-notes">Approval Notes (Optional)</Label>
                  <Textarea
                    id="approval-notes"
                    value={approvalNotes}
                    onChange={(e) => setApprovalNotes(e.target.value)}
                    placeholder="Add any notes about this approval decision..."
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Next Step</Label>
                  <Select value={nextStep} onValueChange={setNextStep}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lender_submission">Submit to Lenders</SelectItem>
                      <SelectItem value="document_collection">Additional Documents Required</SelectItem>
                      <SelectItem value="manual_review">Manual Review Required</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {approvalDecision === "reject" && (
              <div>
                <Label htmlFor="rejection-reason">Rejection Reason *</Label>
                <Textarea
                  id="rejection-reason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Please provide a detailed reason for rejecting this application..."
                  className="mt-2"
                  required
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lender Selection (only show if approving) */}
        {approvalDecision === "approve" && nextStep === "lender_submission" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-purple-600" />
                Lender Selection
              </CardTitle>
              <CardDescription>Select which lenders to submit this application to</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lenderOptions.map((lender) => (
                  <div
                    key={lender.id}
                    className={`border rounded-lg p-4 ${
                      selectedLenders.includes(lender.id) ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={lender.id}
                          checked={selectedLenders.includes(lender.id)}
                          onCheckedChange={(checked) => handleLenderSelection(lender.id, checked as boolean)}
                        />
                        <div>
                          <div className="flex items-center">
                            <Label htmlFor={lender.id} className="font-medium">
                              {lender.name}
                            </Label>
                            {lender.recommended && (
                              <Badge className="ml-2 bg-green-100 text-green-800">Recommended</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {lender.interestRate}% interest rate • ${lender.fees} fees
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {lender.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {selectedLenders.length === 0 && (
                  <Alert className="bg-amber-50 border-amber-200">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertTitle className="text-amber-800">No Lenders Selected</AlertTitle>
                    <AlertDescription className="text-amber-700">
                      Please select at least one lender to submit the application to.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" asChild>
            <Link href={`/admin/applications/${params.id}`}>Cancel</Link>
          </Button>
          <Button
            onClick={handleSubmitApproval}
            disabled={!approvalDecision || submitting}
            className={approvalDecision === "approve" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {submitting ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                {approvalDecision === "approve" ? "Approve & Submit" : "Reject Application"}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
