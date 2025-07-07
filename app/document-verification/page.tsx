"use client"

import { BackToDashboardButton } from "@/app/components/BackToDashboardButton"
import DocumentVerificationContent from "./DocumentVerificationContent"

export default function DocumentVerificationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <BackToDashboardButton />
        </div>
        <DocumentVerificationContent />
      </div>
    </div>
  )
}
