"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, DollarSign, Award } from "lucide-react"
import Image from "next/image"

export default function AustralianStats() {
  const stats = [
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      value: "2.3%",
      label: "Average Rate Reduction",
      description: "Customers save on average",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: (
        <Image
          src="/images/happy-family-home.jpg"
          alt="Happy Australian family"
          width={64}
          height={64}
          className="rounded-full object-cover"
        />
      ),
      value: "15,000+",
      label: "Successful Families",
      description: "Helped achieve their home loan goals",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-purple-600" />,
      value: "$2.1B+",
      label: "Loans Processed",
      description: "Total value facilitated",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <Award className="h-8 w-8 text-orange-600" />,
      value: "4.9/5",
      label: "Customer Rating",
      description: "Based on 5,000+ reviews",
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Trusted by Thousands of Australians</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the growing number of Australians who have saved money and time with our loan competition platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <div className={`p-4 rounded-full bg-gradient-to-r ${stat.color} shadow-lg`}>
                    {typeof stat.icon === "object" && "type" in stat.icon ? (
                      stat.icon
                    ) : (
                      <div className="text-white">{stat.icon}</div>
                    )}
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Live Platform</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">ASIC Regulated</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Bank Grade Security</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
