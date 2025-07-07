"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  BarChart3,
  TrendingUp,
  Shield,
  Clock,
  Users,
  CheckCircle,
  Zap,
  Award,
  Target,
  DollarSign,
  FileText,
  Phone,
} from "lucide-react"
import Link from "next/link"

export default function Features() {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Banks Compete For You",
      description:
        "30+ lenders actively compete for your business, driving down rates and improving terms automatically.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-green-600" />,
      title: "Compare Everything",
      description: "Compare rates, fees, features, and approval times from all major Australian lenders in one place.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: "Guaranteed Savings",
      description:
        "Our competition process ensures you get better rates than going direct to banks. Average savings: $2,847/year.",
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: "Fast & Simple",
      description:
        "Complete your application in 2 minutes. Get competing offers within 24 hours. No paperwork hassles.",
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "100% Secure & Free",
      description: "Bank-level security, no hidden fees, no obligations. Your information is protected and never sold.",
    },
    {
      icon: <Award className="w-8 h-8 text-indigo-600" />,
      title: "Expert Support",
      description: "Dedicated loan specialists guide you through the process and help you choose the best offer.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Why Choose Home Online
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Smarter Way to Get a Home Loan</h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stop shopping around and let lenders compete for you. Our platform makes getting the best home loan deal
            effortless and transparent.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Competition Process Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How The Competition Works</h3>
              <p className="text-lg text-gray-600 mb-6">
                Our unique platform creates a competitive environment where lenders actively bid for your business,
                ensuring you get the best possible deal.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Submit Once, Reach All</div>
                    <div className="text-gray-600">One application reaches 30+ lenders simultaneously</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Lenders Compete</div>
                    <div className="text-gray-600">Banks actively compete with their best rates and terms</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">You Choose</div>
                    <div className="text-gray-600">Compare all offers and select the best deal for you</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <Link href="/signup" className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Start The Competition
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                  asChild
                >
                  <Link href="/signup" className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Compare All Lenders
                  </Link>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Compare Rates</div>
                      <div className="text-sm text-gray-600">Variable, fixed, and split rates</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Compare Features</div>
                      <div className="text-sm text-gray-600">Offset accounts, redraw, extra payments</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Compare Service</div>
                      <div className="text-sm text-gray-600">Customer support, online banking, apps</div>
                    </div>
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
