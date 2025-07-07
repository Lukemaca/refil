"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  BarChart3,
  Building2,
  Landmark,
  Smartphone,
  Users,
  CheckCircle,
  Clock,
  Shield,
  Award,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function CompareLendersSection() {
  const lenderTypes = [
    {
      icon: <Landmark className="w-8 h-8 text-blue-600" />,
      title: "Big 4 Banks",
      count: "4 Lenders",
      description: "ANZ, CBA, NAB, Westpac",
      features: ["Established reputation", "Branch network", "Full service banking"],
    },
    {
      icon: <Building2 className="w-8 h-8 text-green-600" />,
      title: "Regional Banks",
      count: "8 Lenders",
      description: "Bendigo, BOQ, Suncorp, ING",
      features: ["Competitive rates", "Personal service", "Local expertise"],
    },
    {
      icon: <Smartphone className="w-8 h-8 text-purple-600" />,
      title: "Online Lenders",
      count: "12 Lenders",
      description: "Athena, Tic:Toc, Nano, Lendi",
      features: ["Digital-first", "Fast approval", "Lower overheads"],
    },
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: "Credit Unions",
      count: "6+ Lenders",
      description: "Member-owned institutions",
      features: ["Member benefits", "Community focus", "Competitive rates"],
    },
  ]

  const comparisonFeatures = [
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      title: "Interest Rates",
      description: "Variable, fixed, and split rate options",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-green-600" />,
      title: "Fees & Charges",
      description: "Application, ongoing, and exit fees",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-purple-600" />,
      title: "Loan Features",
      description: "Offset accounts, redraw, extra payments",
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      title: "Approval Times",
      description: "Pre-approval and settlement timeframes",
    },
    {
      icon: <Shield className="w-6 h-6 text-red-600" />,
      title: "Security & Trust",
      description: "APRA regulation and customer reviews",
    },
    {
      icon: <Award className="w-6 h-6 text-indigo-600" />,
      title: "Customer Service",
      description: "Support channels and satisfaction ratings",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <BarChart3 className="w-4 h-4 mr-2" />
            Compare 30+ Lenders
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Australian Lenders in One Place</h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Don't limit yourself to just one or two banks. Compare rates, fees, and features from every major lender in
            Australia - all completely free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8" asChild>
              <Link href="/signup" className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Compare Lenders Now
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 bg-transparent"
              asChild
            >
              <Link href="/signup" className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Start Competition
              </Link>
            </Button>
          </div>
        </div>

        {/* Lender Types Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {lenderTypes.map((type, index) => (
            <Card
              key={index}
              className="bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  {type.icon}
                  <h3 className="text-lg font-semibold text-gray-900 mt-3 mb-1">{type.title}</h3>
                  <div className="text-sm text-blue-600 font-medium">{type.count}</div>
                  <div className="text-sm text-gray-600 mt-2">{type.description}</div>
                </div>

                <div className="space-y-2">
                  {type.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* What You Can Compare */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What You Can Compare</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get a complete picture of each lender's offering. Compare everything that matters to make the best
              decision for your situation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {comparisonFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
                <div className="text-sm text-gray-600">Free to use</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 mb-1">2 min</div>
                <div className="text-sm text-gray-600">Quick application</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-1">24hr</div>
                <div className="text-sm text-gray-600">Get competing offers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
