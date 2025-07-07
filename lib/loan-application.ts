// Step definitions for the loan application process
export enum LoanStep {
  APPLICATION = "application",
  CONDITIONAL_APPROVAL = "conditional_approval",
  DOCUMENT_COLLECTION = "document_collection",
  DOCUMENT_VERIFICATION = "document_verification",
  LOAN_OFFER = "loan_offer",
  LOAN_ACCEPTANCE = "loan_acceptance",
  FINAL_APPROVAL = "final_approval",
  LOAN_SIGNING = "loan_signing",
  FUNDING = "funding",
  COMPLETED = "completed",
}

// Save the current step to localStorage
export function saveCurrentStep(applicationId: string, step: LoanStep): void {
  if (typeof window !== "undefined") {
    const key = `loan_step_${applicationId}`
    localStorage.setItem(key, step)
  }
}
