import { Suspense } from "react"
import LoanCalculatorContent from "./LoanCalculatorContent"

export default function LoanCalculatorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoanCalculatorContent />
    </Suspense>
  )
}
