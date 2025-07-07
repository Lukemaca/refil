"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Search, TrendingUp, CheckCircle, Clock, Shield, Users, Award } from "lucide-react"
import Link from "next/link"

export default function Process() {
  const steps = [
    {
      number: "01",
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: "Quick Application",
      description: "Complete our simple 2-minute application with your basic details and loan requirements.",
      time: "2 minutes",
      features: ["No paperwork required", "Secure & confidential", "No impact on credit score"],
    },
    {
      number: "02",
      icon: <Search className="w-8 h-8 text-green-600" />,
      title: "Lenders Compete",
      description: "30+ lenders review your application and compete with their best rates and terms.",
      time: "24 hours",
      features: ["Automatic comparison", "Real competition", "Best rates guaranteed"],
    },
    {
      number: "03",
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: "Choose Your Winner",
      description: "Review all competing offers side-by-side and select the best deal for your situation.",
      time: "Your choice",
      features: ["Clear comparisons", "Expert guidance", "No pressure to choose"],
    },
    {
      number: "04",
      icon: <CheckCircle className="w-8 h-8 text-orange-600" />,
      title: "Secure Your Loan",
      description: "We handle the paperwork and guide you through to settlement with your chosen lender.",
      time: "2-6 weeks",
      features: ["Full support", "Progress tracking", "Settlement assistance"],
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <Clock className="w-4 h-4 mr-2" />
            Simple 4-Step Process
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting the best home loan deal has never been easier. Our streamlined process puts you in control while
            lenders compete for your business.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0"></div>
              )}

              <Card className="relative z-10 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  {/* Step Number */}
                  <div className="text-4xl font-bold text-gray-200 mb-4">{step.number}</div>

                  {/* Icon */}
                  <div className="mb-4">{step.icon}</div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>

                  {/* Time Indicator */}
                  <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4">
                    <Clock className="w-4 h-4 mr-1" />
                    {step.time}
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {step.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why Our Process Works Better</h3>
              <p className="text-lg text-gray-600 mb-6">
                Traditional loan shopping is time-consuming and often leaves money on the table. Our competition-based
                approach ensures you get the best possible deal.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">No Shopping Around</div>
                    <div className="text-gray-600">One application reaches all lenders simultaneously</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Real Competition</div>
                    <div className="text-gray-600">Lenders know they're competing and offer their best rates</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Expert Support</div>
                    <div className="text-gray-600">Dedicated specialists guide you through every step</div>
                  </div>
                </div>
              </div>

              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link href="/signup" className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Start Your Application
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">$2,847</div>
                    <div className="text-gray-900 font-semibold mb-1">Average Annual Savings</div>
                    <div className="text-sm text-gray-600">Compared to going direct to banks</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">50,000+</div>
                    <div className="text-gray-900 font-semibold mb-1">Australians Helped</div>
                    <div className="text-sm text-gray-600">Successfully secured better loans</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
                    <div className="text-gray-900 font-semibold mb-1">Customer Rating</div>
                    <div className="text-sm text-gray-600">Based on 10,000+ reviews</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
