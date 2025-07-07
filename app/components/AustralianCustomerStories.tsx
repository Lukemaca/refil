"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Thompson",
    location: "Sydney, NSW",
    rating: 5,
    savings: 12000,
    image: "/images/testimonial-sarah.png",
    text: "Home Online helped me save thousands on my mortgage! The process was so easy and stress-free.",
  },
  {
    name: "James Miller",
    location: "Melbourne, VIC",
    rating: 4,
    savings: 8500,
    image: "/images/testimonial-james.png",
    text: "I was skeptical at first, but Home Online really delivered. I got a better rate than I thought possible.",
  },
  {
    name: "Mark Davis",
    location: "Brisbane, QLD",
    rating: 5,
    savings: 15000,
    image: "/images/testimonial-mark.png",
    text: "Thanks to Home Online, I'm now paying off my home loan years earlier. Highly recommend their service!",
  },
]

export function AustralianCustomerStories() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Real Savings for Real Australians</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Avatar className="w-12 h-12 mr-4">
                  <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  <div className="flex items-center mt-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{testimonial.text}</p>
              <div className="flex items-center justify-between">
                <span className="text-blue-600 font-medium">Saved: ${testimonial.savings.toLocaleString()}</span>
                <img src="/images/testimonial-mark.png" alt="Verified" className="h-6 w-auto" />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Join thousands of Australians who have found a better home loan with Home Online.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Based on a sample of 1,000 customers who refinanced between January 2024 and June 2024.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function Testimonials() {
  return <AustralianCustomerStories />
}
