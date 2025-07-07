import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  // You can add any UI inside Loading, including a skeleton.
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Loading Loan Options...</h1>
      <p className="text-gray-600 mb-8 text-center">Please wait while we fetch the best loan options for you.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-6 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-10 bg-gray-200 rounded-md"></div>
          </CardContent>
        </Card>

        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-6 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-10 bg-gray-200 rounded-md"></div>
          </CardContent>
        </Card>

        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-6 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-10 bg-gray-200 rounded-md"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
