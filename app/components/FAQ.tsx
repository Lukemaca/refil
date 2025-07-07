"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "How does Home Online work?",
      answer:
        "We present your loan application to multiple banks and lenders who then compete to offer you their best rates and terms. This competition typically results in better deals than you'd get approaching banks individually.",
    },
    {
      question: "Is there any cost to use Home Online?",
      answer:
        "No, our service is completely free for borrowers. We're paid by the lenders when you successfully settle a loan, so there are no upfront costs or hidden fees for you.",
    },
    {
      question: "How much can I save?",
      answer:
        "Our customers save an average of $8,500 over the life of their loan, with typical rate reductions of 0.5-1% below standard bank rates. Your actual savings will depend on your specific circumstances and the offers received.",
    },
    {
      question: "How long does the process take?",
      answer:
        "You can complete our application in about 5 minutes. Pre-approval typically takes 24-48 hours, and full approval and settlement usually occurs within 2-4 weeks, depending on your situation.",
    },
    {
      question: "What types of loans do you offer?",
      answer:
        "We help with all types of home loans including first home buyer loans, refinancing, investment property loans, and construction loans. Our network includes major banks and specialist lenders.",
    },
    {
      question: "Will applying affect my credit score?",
      answer:
        "Initially, we only perform a soft credit check which doesn't affect your credit score. A full credit check is only done when you decide to proceed with a specific lender's offer.",
    },
    {
      question: "What if I'm not approved?",
      answer:
        "If you're not approved by our initial lenders, we'll work with you to improve your application and approach alternative lenders. There's no obligation to proceed if you're not satisfied with the offers.",
    },
    {
      question: "Can I still use Home Online if I have bad credit?",
      answer:
        "Yes, we work with specialist lenders who cater to borrowers with various credit situations. While options may be more limited, we'll do our best to find suitable solutions.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about getting banks to compete for your home loan
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 mb-12">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-2 border-gray-100">
                <CardContent className="p-0">
                  <button
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg" asChild>
              <Link href="/loan-selection">
                Start Your Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
