"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Clock, Shield, Star, CheckCircle, DollarSign, Target, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Benefits() {
  const benefits = [
    {
      icon: <DollarSign className="w-12 h-12 text-green-600" />,
      title: "Save Thousands Every Year",
      description: "Our customers save an average of $2,847 annually compared to going direct to banks.",
      stat: "$2,847",
      statLabel: "Average Annual Savings",
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-600" />,
      title: "Save Hours of Time",
      description: "No more calling banks or visiting branches. One application reaches 30+ lenders instantly.",
      stat: "2 min",
      statLabel: "Application Time",
    },
    {
      icon: <Target className="w-12 h-12 text-purple-600" />,
      title: "Get Better Rates",
      description: "Competition drives down rates. Lenders offer their best deals to win your business.",
      stat: "0.15%",
      statLabel: "Average Rate Improvement",
    },
    {
      icon: <Shield className="w-12 h-12 text-red-600" />,
      title: "100% Free & Secure",
      description: "No hidden fees, no obligations. Your information is protected with bank-level security.",
      stat: "100%",
      statLabel: "Free to Use",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      location: "Sydney, NSW",
      image: "/images/testimonial-sarah.png",
      rating: 5,
      text: "Saved $3,200 per year on my home loan. The process was so easy - banks competed for my business instead of me chasing them around.",
      savings: "$3,200/year",
    },
    {
      name: "Mark Thompson",
      location: "Melbourne, VIC",
      image: "/images/testimonial-mark.png",
      rating: 5,
      text: "Got a rate 0.2% lower than my bank offered directly. The competition really works - highly recommend Home Online.",
      savings: "0.2% better rate",
    },
    {
      name: "James Wilson",
      location: "Brisbane, QLD",
      image: "/images/testimonial-james.png",
      rating: 5,
      text: "Refinanced in just 3 weeks. The team handled everything while lenders competed for my loan. Couldn't be happier.",
      savings: "3 week settlement",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            Real Results for Real People
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join 50,000+ Australians Who've Saved Big
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. See how our competition-based approach has helped thousands of Australians
            secure better home loans.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">{benefit.icon}</div>

                <div className="mb-4">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{benefit.stat}</div>
                  <div className="text-sm text-gray-600">{benefit.statLabel}</div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>

                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h3>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900">4.9/5</span>
              <span className="text-gray-600">from 10,000+ reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.location}</div>
                    </div>
                  </div>

                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">"{testimonial.text}"</p>

                  <div className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Saved {testimonial.savings}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to Save on Your Home Loan?</h3>

            <p className="text-lg text-gray-600 mb-8">
              Join thousands of Australians who've already saved big with our competition platform. It's free, fast, and
              there's no obligation to proceed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8" asChild>
                <Link href="/signup" className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Join Them Today
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 bg-transparent"
                asChild
              >
                <Link href="/loan-calculator" className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Calculate Savings
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>No Obligation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>2 Minute Setup</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
