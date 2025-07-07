"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Upload, Camera, FileText, ImageIcon, X, CheckCircle, AlertCircle } from "lucide-react"

interface DocumentUploaderProps {
  document: {
    id: string
    name: string
    description: string
    required: boolean
    uploadedFiles: any[]
  }
  onFileUpload: (docId: string, file: File) => void
  onFileRemove: (docId: string, fileIndex: number) => void
}

export function DocumentUploader({ document, onFileUpload, onFileRemove }: DocumentUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [errors, setErrors] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"]

    if (file.size > maxSize) {
      return "File size must be less than 10MB"
    }

    if (!allowedTypes.includes(file.type)) {
      return "Only PDF, JPG, and PNG files are allowed"
    }

    return null
  }

  const handleFileUpload = useCallback(
    async (files: FileList) => {
      const newErrors: string[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const error = validateFile(file)

        if (error) {
          newErrors.push(`${file.name}: ${error}`)
          continue
        }

        // Simulate upload progress
        const fileId = `${document.id}-${Date.now()}-${i}`
        setUploadProgress((prev) => ({ ...prev, [fileId]: 0 }))

        // Simulate upload with progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise((resolve) => setTimeout(resolve, 100))
          setUploadProgress((prev) => ({ ...prev, [fileId]: progress }))
        }

        // Complete upload
        onFileUpload(document.id, file)
        setUploadProgress((prev) => {
          const newProgress = { ...prev }
          delete newProgress[fileId]
          return newProgress
        })
      }

      setErrors(newErrors)
      setTimeout(() => setErrors([]), 5000)
    },
    [document.id, onFileUpload],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const files = e.dataTransfer.files
      if (files.length > 0) {
        handleFileUpload(files)
      }
    },
    [handleFileUpload],
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        handleFileUpload(files)
      }
      // Reset input
      if (e.target) {
        e.target.value = ""
      }
    },
    [handleFileUpload],
  )

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("pdf")) {
      return <FileText className="h-5 w-5 text-red-500" />
    }
    return <ImageIcon className="h-5 w-5 text-blue-500" />
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className="flex justify-center">
            <Upload className="h-12 w-12 text-gray-400" />
          </div>

          <div>
            <p className="text-lg font-medium">{isDragging ? "Drop files here" : "Drag & drop files here"}</p>
            <p className="text-sm text-gray-500">or choose from the options below</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center"
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => cameraInputRef.current?.click()}
              className="flex items-center"
            >
              <Camera className="h-4 w-4 mr-2" />
              Take Photo
            </Button>
          </div>

          {/* Hidden file inputs */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
            className="hidden"
          />

          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* Photo Quality Guidelines */}
      <Alert className="border-blue-200 bg-blue-50">
        <Camera className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-700">
          <strong>Photo Tips:</strong> Ensure good lighting, capture the entire document, avoid shadows and glare, and
          keep the document flat and straight.
        </AlertDescription>
      </Alert>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-2">
          {Object.entries(uploadProgress).map(([fileId, progress]) => (
            <div key={fileId} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          ))}
        </div>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Uploaded Files */}
      {document.uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-green-700 flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Uploaded Files ({document.uploadedFiles.length})
          </h4>

          <div className="space-y-2">
            {document.uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file.type)}
                  <div>
                    <p className="font-medium text-green-800">{file.name}</p>
                    <p className="text-sm text-green-600">
                      {formatFileSize(file.size)} • Uploaded {new Date(file.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Uploaded
                  </Badge>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onFileRemove(document.id, index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* File Requirements */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>• Accepted formats: PDF, JPG, PNG</p>
        <p>• Maximum file size: 10MB per file</p>
        <p>• Multiple files can be uploaded</p>
        <p>• Ensure documents are clear and readable</p>
      </div>
    </div>
  )
}
