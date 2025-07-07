import { CheckCircle } from "lucide-react"
import type { Document } from "./DocumentContext"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DocumentCategoryProgressProps {
  category: string
  documents: Document[]
}

export function DocumentCategoryProgress({ category, documents }: DocumentCategoryProgressProps) {
  const requiredDocs = documents.filter((doc) => doc.required)
  const uploadedRequiredDocs = requiredDocs.filter((doc) => doc.uploaded)

  // Calculate progress based on required documents first
  let progress = 0
  if (requiredDocs.length > 0) {
    progress = Math.round((uploadedRequiredDocs.length / requiredDocs.length) * 100)
  } else {
    // If no required docs, calculate based on all docs
    const uploadedDocs = documents.filter((doc) => doc.uploaded)
    progress = documents.length > 0 ? Math.round((uploadedDocs.length / documents.length) * 100) : 100
  }

  const getCategoryColor = () => {
    switch (category) {
      case "identity":
        return "bg-blue-100 text-blue-800"
      case "income":
        return "bg-green-100 text-green-800"
      case "assets":
        return "bg-purple-100 text-purple-800"
      case "property":
        return "bg-amber-100 text-amber-800"
      case "financial":
        return "bg-purple-100 text-purple-800"
      case "additional":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = () => {
    switch (category) {
      case "identity":
        return "bg-blue-200"
      case "income":
        return "bg-green-200"
      case "assets":
        return "bg-purple-200"
      case "property":
        return "bg-amber-200"
      case "financial":
        return "bg-purple-200"
      case "additional":
        return "bg-gray-200"
      default:
        return "bg-gray-200"
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center p-3 rounded-lg bg-white border cursor-pointer hover:border-blue-300 transition-colors">
            <div className={`rounded-full p-2 ${getCategoryIcon()}`}>
              {progress === 100 ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <div className="h-5 w-5 flex items-center justify-center font-bold">
                  {uploadedRequiredDocs.length}/{requiredDocs.length}
                </div>
              )}
            </div>
            <div className="mt-2 text-center">
              <div className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor()}`}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </div>
              <div className="text-xs mt-1 text-gray-500">{progress}%</div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <p className="font-medium">{category.charAt(0).toUpperCase() + category.slice(1)} Documents</p>
            <p>
              Required: {uploadedRequiredDocs.length}/{requiredDocs.length} completed
            </p>
            <p>
              Total: {documents.filter((doc) => doc.uploaded).length}/{documents.length} documents
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
