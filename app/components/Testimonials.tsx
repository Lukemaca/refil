"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Star, Quote } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      location: "Sydney, NSW",
      image: "/images/testimonial-sarah.png",
      rating: 5,
      text: "Home Online saved us over $12,000 on our home loan. The banks were literally competing for our business - it was amazing to watch!",
      savings: "$12,000",
    },
    {
      name: "Mark Thompson",
      location: "Melbourne, VIC",
      image: "/images/testimonial-mark.png",
      rating: 5,
      text: "I wish I'd known about this service years ago. Got a rate 0.8% lower than my current bank was offering. The process was so simple.",
      savings: "$15,500",
    },
    {
      name: "James Wilson",
      location: "Brisbane, QLD",
      image: "/images/testimonial-james.png",
      rating: 5,
      text: "As a first-time buyer, I was overwhelmed by all the options. Home Online made it easy and got me a fantastic deal.",
      savings: "$8,200",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of Australians who have saved money with Home Online
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2 border-white hover:border-blue-200 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                <Quote className="h-6 w-6 text-blue-600 mb-3" />
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>

                <div className="bg-green-100 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-green-600">Saved {testimonial.savings}</div>
                  <div className="text-sm text-green-700">Over loan lifetime</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg" asChild>
            <Link href="/loan-selection">
              Start Saving Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
