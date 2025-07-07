"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

export interface Document {
  id: string
  name: string
  description: string
  category: string
  icon: string
  required: boolean
  uploaded: boolean
}

interface DocumentContextType {
  documents: Document[]
  currentDocumentIndex: number
  uploadDocument: (id: string) => void
  nextDocument: () => void
  previousDocument: () => void
  progress: number
  categoryProgress: Record<string, number>
  overallRequiredProgress: number
  overallTotalProgress: number
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined)

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [categoryProgress, setCategoryProgress] = useState<Record<string, number>>({})
  const [overallRequiredProgress, setOverallRequiredProgress] = useState(0)
  const [overallTotalProgress, setOverallTotalProgress] = useState(0)

  useEffect(() => {
    // Mock documents data - load asynchronously to avoid blocking the main thread
    const loadDocuments = () => {
      const mockDocuments: Document[] = [
        {
          id: "1",
          name: "Proof of Identity",
          description: "Upload your driver's license, passport, or other government-issued ID",
          category: "identity",
          icon: "id-card",
          required: true,
          uploaded: false,
        },
        {
          id: "2",
          name: "Proof of Address",
          description: "Upload a utility bill, bank statement, or other document showing your current address",
          category: "identity",
          icon: "home",
          required: true,
          uploaded: false,
        },
        {
          id: "3",
          name: "Proof of Income",
          description: "Upload your last 2-3 pay stubs or income statements",
          category: "income",
          icon: "receipt",
          required: true,
          uploaded: false,
        },
        {
          id: "4",
          name: "Tax Returns",
          description: "Upload your tax returns from the last 2 years",
          category: "income",
          icon: "file-text",
          required: true,
          uploaded: false,
        },
        {
          id: "5",
          name: "Employment Verification",
          description: "Upload a letter from your employer confirming your employment status",
          category: "income",
          icon: "briefcase",
          required: false,
          uploaded: false,
        },
        {
          id: "6",
          name: "Bank Statements",
          description: "Upload your bank statements from the last 3 months",
          category: "financial",
          icon: "landmark",
          required: true,
          uploaded: false,
        },
        {
          id: "7",
          name: "Investment Statements",
          description: "Upload statements for any investment accounts you have",
          category: "financial",
          icon: "trending-up",
          required: false,
          uploaded: false,
        },
        {
          id: "8",
          name: "Gift Letter",
          description: "If you're receiving gift funds for your down payment, upload a gift letter",
          category: "financial",
          icon: "gift",
          required: false,
          uploaded: false,
        },
        {
          id: "9",
          name: "Purchase Agreement",
          description: "Upload the signed purchase agreement for the property",
          category: "property",
          icon: "file-signature",
          required: true,
          uploaded: false,
        },
        {
          id: "10",
          name: "Homeowners Insurance",
          description: "Upload proof of homeowners insurance",
          category: "property",
          icon: "shield",
          required: false,
          uploaded: false,
        },
        {
          id: "11",
          name: "Current Mortgage Statement",
          description: "If refinancing, upload your current mortgage statement",
          category: "property",
          icon: "file-minus",
          required: false,
          uploaded: false,
        },
      ]

      setDocuments(mockDocuments)
    }

    // Use setTimeout to avoid blocking the main thread
    setTimeout(loadDocuments, 0)
  }, [])

  // Calculate progress whenever documents change
  useEffect(() => {
    if (documents.length === 0) return

    // Calculate overall required documents progress
    const requiredDocs = documents.filter((doc) => doc.required)
    const completedRequiredDocs = requiredDocs.filter((doc) => doc.uploaded)
    const requiredProgress =
      requiredDocs.length > 0 ? Math.round((completedRequiredDocs.length / requiredDocs.length) * 100) : 100

    // Calculate overall total progress (including optional docs)
    const completedDocs = documents.filter((doc) => doc.uploaded)
    const totalProgress = Math.round((completedDocs.length / documents.length) * 100)

    // Calculate progress by category
    const categories = [...new Set(documents.map((doc) => doc.category))]
    const categoryProgressData: Record<string, number> = {}

    categories.forEach((category) => {
      const categoryDocs = documents.filter((doc) => doc.category === category)
      const requiredCategoryDocs = categoryDocs.filter((doc) => doc.required)
      const completedRequiredCategoryDocs = requiredCategoryDocs.filter((doc) => doc.uploaded)

      // If there are required docs in this category, calculate progress based on them
      // Otherwise, calculate based on all docs in the category
      if (requiredCategoryDocs.length > 0) {
        categoryProgressData[category] = Math.round(
          (completedRequiredCategoryDocs.length / requiredCategoryDocs.length) * 100,
        )
      } else if (categoryDocs.length > 0) {
        const completedCategoryDocs = categoryDocs.filter((doc) => doc.uploaded)
        categoryProgressData[category] = Math.round((completedCategoryDocs.length / categoryDocs.length) * 100)
      } else {
        categoryProgressData[category] = 100 // No docs in category = 100% complete
      }
    })

    // Calculate progress based on current document index
    // This makes the progress bar reflect how far along the user is in the document flow
    const flowProgress = documents.length > 0 ? Math.round(((currentDocumentIndex + 1) / documents.length) * 100) : 0

    // Set all progress values
    setProgress(flowProgress)
    setCategoryProgress(categoryProgressData)
    setOverallRequiredProgress(requiredProgress)
    setOverallTotalProgress(totalProgress)
  }, [documents, currentDocumentIndex])

  const uploadDocument = (id: string) => {
    setDocuments((prevDocs) => prevDocs.map((doc) => (doc.id === id ? { ...doc, uploaded: true } : doc)))
  }

  const nextDocument = () => {
    if (currentDocumentIndex < documents.length - 1) {
      setCurrentDocumentIndex((prev) => prev + 1)
    }
  }

  const previousDocument = () => {
    if (currentDocumentIndex > 0) {
      setCurrentDocumentIndex((prev) => prev - 1)
    }
  }

  return (
    <DocumentContext.Provider
      value={{
        documents,
        currentDocumentIndex,
        uploadDocument,
        nextDocument,
        previousDocument,
        progress,
        categoryProgress,
        overallRequiredProgress,
        overallTotalProgress,
      }}
    >
      {children}
    </DocumentContext.Provider>
  )
}

export function useDocuments() {
  const context = useContext(DocumentContext)
  if (context === undefined) {
    throw new Error("useDocuments must be used within a DocumentProvider")
  }
  return context
}
