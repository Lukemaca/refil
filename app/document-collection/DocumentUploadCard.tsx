"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { Document } from "./DocumentContext"
import { Upload, CheckCircle, AlertCircle, FileText, FilePlus } from "lucide-react"

interface DocumentUploadCardProps {
  document: Document
  onFileUpload: (file: File) => void
  isUploading: boolean
  uploadProgress: number
}

export function DocumentUploadCard({ document, onFileUpload, isUploading, uploadProgress }: DocumentUploadCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files[0])
    }
  }

  const handleFiles = (file: File) => {
    // Check file type
    const validTypes = [".pdf", ".jpg", ".jpeg", ".png", "application/pdf", "image/jpeg", "image/png"]
    const isValidType = validTypes.some((type) => file.name.toLowerCase().endsWith(type) || file.type.includes(type))

    if (!isValidType) {
      setError("Please upload a PDF or image file")
      return
    }

    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit")
      return
    }

    setError(null)
    onFileUpload(file)
  }

  const getIconComponent = () => {
    switch (document.icon) {
      case "id-card":
        return <FileText className="h-12 w-12" />
      case "passport":
        return <FileText className="h-12 w-12" />
      case "home":
        return <FileText className="h-12 w-12" />
      case "receipt":
        return <FileText className="h-12 w-12" />
      case "file-text":
        return <FileText className="h-12 w-12" />
      case "briefcase":
        return <FileText className="h-12 w-12" />
      case "landmark":
        return <FileText className="h-12 w-12" />
      case "trending-up":
        return <FileText className="h-12 w-12" />
      case "gift":
        return <FileText className="h-12 w-12" />
      case "file-signature":
        return <FileText className="h-12 w-12" />
      case "shield":
        return <FileText className="h-12 w-12" />
      case "file-minus":
        return <FileText className="h-12 w-12" />
      default:
        return <FilePlus className="h-12 w-12" />
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-1">{document.name}</h2>
        <div className="flex items-center">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${document.required ? "bg-red-400" : "bg-blue-400"}`}
          >
            {document.required ? "Required" : "Optional"}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-400 ml-2">
            {document.category.charAt(0).toUpperCase() + document.category.slice(1)}
          </span>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 mb-6">{document.description}</p>

        {!document.required && !document.uploaded && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-blue-700 text-sm flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              This document is optional. You can skip it, but providing it may help with your application.
            </p>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
        />

        {document.uploaded ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 rounded-full p-4 mb-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-700 mb-2">Document Uploaded</h3>
              <p className="text-green-600">This document has been successfully uploaded.</p>
              <Button variant="outline" className="mt-4" onClick={() => fileInputRef.current?.click()}>
                Replace Document
              </Button>
            </div>
          </div>
        ) : (
          <div
            className={`border-4 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {isUploading ? (
              <div className="flex flex-col items-center">
                <div className="mb-4">
                  <div className="w-16 h-16 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin"></div>
                </div>
                <h3 className="text-xl font-bold text-blue-700 mb-2">Uploading Document...</h3>
                <Progress value={uploadProgress} className="h-2 w-full max-w-xs mx-auto mt-2" />
                <p className="text-blue-600 mt-2">{uploadProgress}% Complete</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full p-4 mb-4">{getIconComponent()}</div>
                <h3 className="text-xl font-bold mb-2">Upload {document.name}</h3>
                <p className="text-gray-500 mb-4">Drag and drop your file here or click to browse</p>
                <Button className="flex items-center gap-2">
                  <Upload className="h-4 w-4" /> Select File
                </Button>
                <p className="text-xs text-gray-400 mt-4">PDF, JPG, PNG (Max 10MB)</p>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-50 text-red-700 p-3 rounded-md border border-red-200 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}
