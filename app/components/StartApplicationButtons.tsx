"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface StartApplicationButtonsProps {
  className?: string
}

export default function StartApplicationButtons({ className = "" }: StartApplicationButtonsProps) {
  const router = useRouter()
  const [applicationType, setApplicationType] = useState<string | null>(null)

  useEffect(() => {
    // Retrieve the application type from localStorage if available
    const storedType = localStorage.getItem("applicationType")
    if (storedType) {
      setApplicationType(storedType)
    }
  }, [])

  const startApplication = () => {
    if (applicationType === "refinance") {
      router.push("/loan-application/refinance")
    } else if (applicationType === "newPurchase") {
      router.push("/loan-application/new-purchase")
    } else if (applicationType === "firstTime") {
      router.push("/loan-application/gamified?type=firstTime")
    } else {
      // If no type is selected, redirect to loan selection page
      router.push("/loan-selection")
    }
  }

  return (
    <div className={`flex flex-col items-center space-y-4 mb-8 ${className}`}>
      <h2 className="text-2xl font-semibold text-center">
        Ready to proceed with your {getApplicationTypeLabel(applicationType)} application?
      </h2>
      <Button onClick={startApplication} className="px-8 py-6 text-lg">
        Start My Application
      </Button>
      <p className="text-sm text-gray-500">
        {applicationType
          ? `Continue with your ${getApplicationTypeLabel(applicationType)} application`
          : "Select your loan type to begin your application"}
      </p>
    </div>
  )
}

function getApplicationTypeLabel(type: string | null): string {
  switch (type) {
    case "refinance":
      return "refinance"
    case "newPurchase":
      return "new home loan"
    case "firstTime":
      return "first-time buyer"
    default:
      return "home loan"
  }
}
