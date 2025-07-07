"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, DollarSign, Shield, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Header from "./Header"
import Footer from "./Footer"

export default function BrokerHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">🤝 Partner with Home Online</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Grow Your <span className="text-green-600">Brokerage</span> with Our Platform
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join Australia's leading home loan auction platform. Access more clients, competitive broker fee
                  estimates, and streamlined processes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6">
                  <Link href="/partner-invite">Become a Partner</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                  <Link href="/loan-tools">View Broker Tools</Link>
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white"></div>
                  </div>
                  <span className="text-sm text-gray-600">500+ Partner Brokers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.8</span>
                  <span className="text-sm text-gray-600">(Broker Rating)</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/professional-couple-laptop.png"
                alt="Professional brokers using Home Online platform"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
                priority
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-green-500" />
                  <div>
                    <div className="font-semibold text-gray-900">Avg. Broker Fee</div>
                    <div className="text-2xl font-bold text-green-600">$3,200</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Broker Benefits */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Partner with Home Online?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access our growing client base and competitive broker fee estimates while we handle the marketing and lead
              generation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Quality Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Access pre-qualified clients who are ready to proceed with their home loan applications.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Competitive Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Earn competitive broker fee estimates with transparent pricing and fast payment processing.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Full Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Dedicated support team, training resources, and technology tools to help you succeed.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-600">500+</div>
              <div className="text-gray-600">Partner Brokers</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">50,000+</div>
              <div className="text-gray-600">Loans Processed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-600">$3.2B+</div>
              <div className="text-gray-600">Loans Settled</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-orange-600">24hrs</div>
              <div className="text-gray-600">Avg. Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Partner with Us?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful brokers who are growing their business with Home Online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6">
              <Link href="/partner-invite">Apply Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-6 bg-transparent"
            >
              <Link href="/loan-tools">View Tools</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
