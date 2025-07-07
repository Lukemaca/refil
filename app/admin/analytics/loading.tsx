export default function AdminAnalyticsLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <h1 className="text-2xl font-semibold text-gray-700">Loading Analytics...</h1>
        <p className="text-gray-500">Fetching performance data</p>
      </div>
    </div>
  )
}
