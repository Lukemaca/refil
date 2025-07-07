import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { HelpCircle, DollarSign, Home, Calculator, FileText, ArrowRight } from "lucide-react"

export default function FirstTimeBuyerPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Your First Home, Made Simple</h1>
                <p className="text-xl text-gray-700 mb-8">
                  Navigating the home buying process for the first time can be overwhelming. Home Online is here to
                  guide you every step of the way with expert advice, competitive rates, and support for first-time
                  buyers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href="/loan-calculator">Calculate What You Can Borrow</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/loan-application/new-purchase">Apply Now</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="/first-home-keys.png"
                  alt="First-time home buyers receiving keys"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* First Home Buyer Benefits */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">First Home Buyer Benefits</h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              As a first-time buyer, you may be eligible for special grants, concessions, and support programs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-2 border-blue-100">
                <CardContent className="pt-6">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">First Home Owner Grant</h3>
                  <p className="text-gray-600 mb-4">
                    You may be eligible for a government grant to help with your first home purchase. Grants vary by
                    state and can range from $10,000 to $20,000.
                  </p>
                  <Link href="/first-time-buyer/grants" className="text-blue-600 hover:underline flex items-center">
                    Learn more about grants <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100">
                <CardContent className="pt-6">
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Stamp Duty Concessions</h3>
                  <p className="text-gray-600 mb-4">
                    First home buyers often receive significant stamp duty discounts or exemptions, potentially saving
                    you thousands on your purchase.
                  </p>
                  <Link
                    href="/first-time-buyer/stamp-duty"
                    className="text-green-600 hover:underline flex items-center"
                  >
                    Calculate your savings <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100">
                <CardContent className="pt-6">
                  <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Home className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Low Deposit Options</h3>
                  <p className="text-gray-600 mb-4">
                    Access special loan programs that allow you to purchase with as little as 5% deposit, helping you
                    get into your first home sooner.
                  </p>
                  <Link
                    href="/first-time-buyer/low-deposit"
                    className="text-purple-600 hover:underline flex items-center"
                  >
                    Explore low deposit options <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* First Home Buyer Steps */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Your First Home Buying Journey</h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Follow these steps to navigate the process of buying your first home with confidence.
            </p>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-blue-200"></div>

                {/* Step 1 */}
                <div className="relative flex flex-col md:flex-row items-center mb-12">
                  <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                    <h3 className="text-xl font-bold text-blue-700">Check Your Borrowing Power</h3>
                    <p className="text-gray-600 mt-2">
                      Understand how much you can borrow based on your income, expenses, and deposit.
                    </p>
                  </div>
                  <div className="z-10 flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="flex-1 md:pl-8">
                    <Button asChild variant="outline" size="sm">
                      <Link href="/loan-calculator">Use Our Calculator</Link>
                    </Button>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex flex-col md:flex-row items-center mb-12">
                  <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0 md:order-1">
                    <Button asChild variant="outline" size="sm">
                      <Link href="/first-time-buyer/savings-tips">Savings Tips</Link>
                    </Button>
                  </div>
                  <div className="z-10 flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="flex-1 md:pl-8 md:order-3">
                    <h3 className="text-xl font-bold text-blue-700">Save Your Deposit</h3>
                    <p className="text-gray-600 mt-2">
                      Build your deposit and prepare for additional costs like stamp duty, legal fees, and moving
                      expenses.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex flex-col md:flex-row items-center mb-12">
                  <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                    <h3 className="text-xl font-bold text-blue-700">Get Pre-Approval</h3>
                    <p className="text-gray-600 mt-2">
                      Apply for pre-approval to understand exactly what you can borrow and shop with confidence.
                    </p>
                  </div>
                  <div className="z-10 flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className="flex-1 md:pl-8">
                    <Button asChild variant="outline" size="sm">
                      <Link href="/pre-approval">Apply for Pre-Approval</Link>
                    </Button>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative flex flex-col md:flex-row items-center mb-12">
                  <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0 md:order-1">
                    <Button asChild variant="outline" size="sm">
                      <Link href="/first-time-buyer/property-checklist">Property Checklist</Link>
                    </Button>
                  </div>
                  <div className="z-10 flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div className="flex-1 md:pl-8 md:order-3">
                    <h3 className="text-xl font-bold text-blue-700">Find Your Property</h3>
                    <p className="text-gray-600 mt-2">
                      Search for properties within your budget and attend inspections to find your perfect first home.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                    <h3 className="text-xl font-bold text-blue-700">Complete Your Purchase</h3>
                    <p className="text-gray-600 mt-2">
                      Make an offer, finalize your home loan, and complete the settlement process to get your keys.
                    </p>
                  </div>
                  <div className="z-10 flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <div className="flex-1 md:pl-8">
                    <Button asChild variant="outline" size="sm">
                      <Link href="/loan-application/new-purchase">Apply for Your Loan</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* First Home Buyer FAQ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Common Questions for First-Time Buyers</h2>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold flex items-center text-blue-800">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  How much deposit do I need as a first home buyer?
                </h3>
                <p className="mt-3 text-gray-700">
                  While 20% is ideal to avoid Lenders Mortgage Insurance (LMI), many first home buyers can purchase with
                  as little as 5% deposit. Government schemes may also help you purchase with a smaller deposit without
                  paying LMI.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold flex items-center text-blue-800">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  What grants and concessions am I eligible for?
                </h3>
                <p className="mt-3 text-gray-700">
                  Eligibility varies by state and territory, but most first home buyers can access stamp duty
                  concessions and grants between $10,000-$20,000 for new homes. Income caps and property value limits
                  apply.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold flex items-center text-blue-800">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  How much can I borrow for my first home?
                </h3>
                <p className="mt-3 text-gray-700">
                  Lenders typically allow you to borrow 4-6 times your annual income, depending on your expenses, debts,
                  and credit score. Use our calculator to get a personalized estimate based on your financial situation.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold flex items-center text-blue-800">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  What additional costs should I budget for?
                </h3>
                <p className="mt-3 text-gray-700">
                  Beyond your deposit, budget for stamp duty (if applicable), legal fees ($1,500-$3,000), building and
                  pest inspections ($500-$1,000), mortgage registration fees, and moving costs. We recommend having an
                  additional 5% of the property price for these expenses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* First Home Buyer Tools */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Tools for First Home Buyers</h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Use these resources to help you navigate your first home purchase with confidence.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Calculator className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Borrowing Power Calculator</h3>
                  <p className="text-gray-600 mb-4">
                    Estimate how much you can borrow based on your income and expenses.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/loan-calculator">Calculate Now</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Deposit Savings Calculator</h3>
                  <p className="text-gray-600 mb-4">Plan your savings journey to reach your deposit goal faster.</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/loan-calculator">Plan Your Savings</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Home className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Grant Eligibility Checker</h3>
                  <p className="text-gray-600 mb-4">Check which government grants and concessions you qualify for.</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/first-time-buyer/grants">Check Eligibility</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">First Home Buyer Checklist</h3>
                  <p className="text-gray-600 mb-4">Download our comprehensive checklist for first-time buyers.</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/first-time-buyer/checklist">Download Checklist</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to start your home buying journey?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Let Home Online help you navigate the process and find the perfect loan for your first home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                <Link href="/loan-application/new-purchase">Apply for Your First Home Loan</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                <Link href="/contact">Speak to a Specialist</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
