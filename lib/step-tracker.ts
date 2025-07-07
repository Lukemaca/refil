// Step definitions for the loan application process
export enum LoanStep {
  APPLICATION = "application",
  CONDITIONAL_APPROVAL = "conditional_approval",
  DOCUMENT_COLLECTION = "document_collection",
  DOCUMENT_VERIFICATION = "document_verification",
  LOAN_OFFER = "loan_offer",
  LOAN_COMPARISON = "loan_comparison",
  LOAN_ACCEPTANCE = "loan_acceptance",
  FINAL_APPROVAL = "final_approval",
  LOAN_SIGNING = "loan_signing",
  FUNDING = "funding",
  COMPLETED = "completed",
}

// Step metadata for UI display
export const stepInfo = {
  [LoanStep.APPLICATION]: {
    title: "Application",
    description: "Complete your loan application form",
    path: "/loan-application",
  },
  [LoanStep.CONDITIONAL_APPROVAL]: {
    title: "Conditional Approval",
    description: "Review your conditional approval details",
    path: "/conditional-approval",
  },
  [LoanStep.DOCUMENT_COLLECTION]: {
    title: "Document Collection",
    description: "Upload required documents for verification",
    path: "/document-collection",
  },
  [LoanStep.DOCUMENT_VERIFICATION]: {
    title: "Document Verification",
    description: "Documents are being verified",
    path: "/document-verification",
  },
  [LoanStep.LOAN_OFFER]: {
    title: "Loan Offers",
    description: "Review your personalized loan offers",
    path: "/loan-offer",
  },
  [LoanStep.LOAN_COMPARISON]: {
    title: "Loan Comparison",
    description: "Compare your selected loan offers",
    path: "/loan-comparison",
  },
  [LoanStep.LOAN_ACCEPTANCE]: {
    title: "Loan Acceptance",
    description: "Accept your chosen loan offer",
    path: "/loan-acceptance",
  },
  [LoanStep.FINAL_APPROVAL]: {
    title: "Final Approval",
    description: "Review your final loan approval",
    path: "/final-approval",
  },
  [LoanStep.LOAN_SIGNING]: {
    title: "Loan Signing",
    description: "Sign your loan documents",
    path: "/loan-signing",
  },
  [LoanStep.FUNDING]: {
    title: "Funding",
    description: "Loan funding and closing process",
    path: "/funding",
  },
  [LoanStep.COMPLETED]: {
    title: "Completed",
    description: "Your loan process is complete",
    path: "/loan-completed",
  },
}

// Get the next step in the process
export function getNextStep(currentStep: LoanStep): LoanStep {
  const steps = Object.values(LoanStep)
  const currentIndex = steps.indexOf(currentStep)

  if (currentIndex < 0 || currentIndex >= steps.length - 1) {
    return currentStep // Return current step if it's invalid or the last step
  }

  return steps[currentIndex + 1]
}

// Save the current step to localStorage
export function saveCurrentStep(applicationId: string, step: LoanStep): void {
  if (typeof window !== "undefined") {
    const key = `loan_step_${applicationId}`
    localStorage.setItem(key, step)
  }
}

// Get the current step from localStorage
export function getCurrentStep(applicationId: string): LoanStep {
  if (typeof window !== "undefined") {
    const key = `loan_step_${applicationId}`
    const step = localStorage.getItem(key)
    return (step as LoanStep) || LoanStep.APPLICATION
  }
  return LoanStep.APPLICATION
}

// Get the path for the current step
export function getStepPath(step: LoanStep): string {
  return stepInfo[step]?.path || "/dashboard"
}
