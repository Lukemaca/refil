"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface BackToDashboardButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function BackToDashboardButton({
  variant = "outline",
  size = "default",
  className = "",
}: BackToDashboardButtonProps) {
  const router = useRouter()

  const handleBackToDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <Button variant={variant} size={size} onClick={handleBackToDashboard} className={`flex items-center ${className}`}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Dashboard
    </Button>
  )
}
