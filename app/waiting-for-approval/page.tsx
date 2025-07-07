import { BackToDashboardButton } from "@/app/components/BackToDashboardButton"
import WaitingForApprovalContent from "./WaitingForApprovalContent"

export default function WaitingForApprovalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <BackToDashboardButton />
        </div>
        <WaitingForApprovalContent />
      </div>
    </div>
  )
}
