"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useDocuments } from "./DocumentContext"
import { LoanStep, saveCurrentStep } from "@/lib/step-tracker"
import { DocumentUploadCard } from "./DocumentUploadCard"
import { DocumentCategoryProgress } from "./DocumentCategoryProgress"
import { CheckCircle, ChevronLeft, ChevronRight, ArrowRight, Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function DocumentCollectionContent() {
  const router = useRouter()
  const {
    documents,
    currentDocumentIndex,
    uploadDocument,
    nextDocument,
    previousDocument,
    progress,
    categoryProgress,
    overallRequiredProgress,
    overallTotalProgress,
  } = useDocuments()

  const [applicationId, setApplicationId] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [skipDialogOpen, setSkipDialogOpen] = useState(false)

  useEffect(() => {
    // Get application ID from localStorage
    const appId = localStorage.getItem("currentApplicationId")
    if (appId) {
      setApplicationId(appId)
    }
  }, [])

  const currentDocument = documents[currentDocumentIndex]
  const isLastDocument = currentDocumentIndex === documents.length - 1
  const isDocumentUploaded = currentDocument?.uploaded || false

  // Calculate how many documents are completed out of total
  const completedDocuments = documents.filter((doc) => doc.uploaded).length
  const totalDocuments = documents.length
  const requiredDocuments = documents.filter((doc) => doc.required).length
  const completedRequiredDocuments = documents.filter((doc) => doc.required && doc.uploaded).length

  const handleFileUpload = (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return 95
        }
        return prev + 5
      })
    }, 100)

    // Simulate upload completion after 2 seconds
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)

      // Mark document as uploaded
      if (currentDocument) {
        uploadDocument(currentDocument.id)
      }
      setIsUploading(false)

      // Auto advance to next document after a short delay
      setTimeout(() => {
        if (!isLastDocument) {
          nextDocument()
        }
      }, 1500)
    }, 2000)
  }

  const handleComplete = () => {
    if (applicationId) {
      // Save the current step and move to document verification
      saveCurrentStep(applicationId, LoanStep.DOCUMENT_VERIFICATION)
    }
    router.push("/document-verification")
  }

  const handleSkipDocument = () => {
    if (currentDocument && !currentDocument.required) {
      setSkipDialogOpen(true)
    }
  }

  const confirmSkipDocument = () => {
    // Move to the next document without uploading
    if (!isLastDocument) {
      nextDocument()
    }
    setSkipDialogOpen(false)
  }

  // Calculate category progress
  const categories = [...new Set(documents.map((doc) => doc.category))]

  // Guard against empty documents array
  if (!currentDocument) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Loading Documents...</h1>
          <div className="w-12 h-12 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Document Collection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete your document collection by uploading each required document to proceed with your loan approval
            process.
          </p>
        </div>

        {/* Skip Document Dialog - Using shadcn Dialog component */}
        <Dialog open={skipDialogOpen} onOpenChange={setSkipDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Skip Optional Document?</DialogTitle>
              <DialogDescription>
                This document is optional. While not required, providing it may help with your application. Are you sure
                you want to skip it?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSkipDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmSkipDocument}>Skip Document</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Overall Progress */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Your Progress</h2>
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full text-sm">
                Document {currentDocumentIndex + 1} of {totalDocuments}
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="bg-green-100 text-green-800 font-medium px-3 py-1 rounded-full text-sm flex items-center">
                      <span className="mr-1">
                        {completedRequiredDocuments}/{requiredDocuments} Required
                      </span>
                      <Info className="h-4 w-4" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      You've completed {completedRequiredDocuments} of {requiredDocuments} required documents
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Document flow progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>Document Flow Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Required documents progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>Required Documents</span>
              <span>{overallRequiredProgress}%</span>
            </div>
            <Progress
              value={overallRequiredProgress}
              className="h-3 bg-gray-100"
              style={{
                "--tw-bg-opacity": "1",
                backgroundColor: "rgb(243 244 246 / var(--tw-bg-opacity))",
              }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            {categories.map((category) => (
              <DocumentCategoryProgress
                key={category}
                category={category}
                documents={documents.filter((doc) => doc.category === category)}
              />
            ))}
          </div>
        </div>

        {/* Current Document Upload Card */}
        <DocumentUploadCard
          document={currentDocument}
          onFileUpload={handleFileUpload}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
        />

        {/* Navigation Controls */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={previousDocument}
            disabled={currentDocumentIndex === 0 || isUploading}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>

          <div className="flex gap-2">
            {!currentDocument.required && !isDocumentUploaded && (
              <Button
                variant="outline"
                onClick={handleSkipDocument}
                className="flex items-center gap-2"
                disabled={isUploading}
              >
                Skip <ArrowRight className="h-4 w-4" />
              </Button>
            )}

            {isLastDocument && overallRequiredProgress === 100 ? (
              <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
                Complete <CheckCircle className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={nextDocument}
                disabled={(!isDocumentUploaded && currentDocument.required) || isUploading || isLastDocument}
                className="flex items-center gap-2"
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
