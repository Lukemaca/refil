"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  Clock,
  DollarSign,
  Target,
  Award,
  Building,
  Calendar,
  Download,
  Filter,
  BarChart3,
  Activity,
} from "lucide-react"

interface AnalyticsData {
  overview: {
    totalApplications: number
    approvedApplications: number
    pendingApplications: number
    rejectedApplications: number
    totalLoanValue: number
    avgProcessingTime: number
    approvalRate: number
    customerSatisfaction: number
  }
  performance: {
    monthlyApplications: Array<{ month: string; applications: number; approved: number }>
    teamPerformance: Array<{ team: string; efficiency: number; completed: number; avgTime: number }>
    processingTimes: Array<{ stage: string; avgTime: number; target: number }>
  }
  teams: Array<{
    name: string
    members: number
    completed: number
    efficiency: number
    workload: number
  }>
  lenders: Array<{
    name: string
    applications: number
    approvalRate: number
    avgRate: number
    marketShare: number
  }>
  trends: {
    applicationTrend: number
    approvalTrend: number
    processingTimeTrend: number
    satisfactionTrend: number
  }
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("30d")

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock analytics data
      const mockData: AnalyticsData = {
        overview: {
          totalApplications: 1247,
          approvedApplications: 892,
          pendingApplications: 234,
          rejectedApplications: 121,
          totalLoanValue: 45600000,
          avgProcessingTime: 3.2,
          approvalRate: 71.5,
          customerSatisfaction: 4.6,
        },
        performance: {
          monthlyApplications: [
            { month: "Jan", applications: 98, approved: 72 },
            { month: "Feb", applications: 112, approved: 84 },
            { month: "Mar", applications: 134, approved: 98 },
            { month: "Apr", applications: 156, approved: 118 },
            { month: "May", applications: 142, approved: 103 },
            { month: "Jun", applications: 167, approved: 125 },
            { month: "Jul", applications: 189, approved: 142 },
            { month: "Aug", applications: 178, approved: 134 },
            { month: "Sep", applications: 71, approved: 16 },
          ],
          teamPerformance: [
            { team: "Senior Underwriting", efficiency: 94.5, completed: 345, avgTime: 3.2 },
            { team: "Underwriting Team", efficiency: 89.8, completed: 567, avgTime: 4.1 },
            { team: "Documentation Team", efficiency: 96.1, completed: 234, avgTime: 2.8 },
            { team: "Customer Service", efficiency: 87.3, completed: 156, avgTime: 1.5 },
          ],
          processingTimes: [
            { stage: "Initial Review", avgTime: 0.8, target: 1.0 },
            { stage: "Documentation", avgTime: 1.2, target: 1.5 },
            { stage: "Underwriting", avgTime: 2.1, target: 2.0 },
            { stage: "Final Approval", avgTime: 0.6, target: 0.5 },
          ],
        },
        teams: [
          { name: "Senior Underwriting", members: 4, completed: 345, efficiency: 94.5, workload: 85 },
          { name: "Underwriting Team", members: 5, completed: 567, efficiency: 89.8, workload: 78 },
          { name: "Documentation Team", members: 3, completed: 234, efficiency: 96.1, workload: 92 },
          { name: "Customer Service", members: 4, completed: 156, efficiency: 87.3, workload: 65 },
        ],
        lenders: [
          { name: "Commonwealth Bank", applications: 234, approvalRate: 78.2, avgRate: 5.89, marketShare: 18.8 },
          { name: "Westpac", applications: 198, approvalRate: 72.1, avgRate: 5.95, marketShare: 15.9 },
          { name: "ANZ", applications: 176, approvalRate: 75.6, avgRate: 5.92, marketShare: 14.1 },
          { name: "NAB", applications: 165, approvalRate: 69.7, avgRate: 6.01, marketShare: 13.2 },
          { name: "Macquarie Bank", applications: 142, approvalRate: 81.3, avgRate: 5.76, marketShare: 11.4 },
          { name: "ING", applications: 128, approvalRate: 74.2, avgRate: 5.88, marketShare: 10.3 },
          { name: "Others", applications: 204, approvalRate: 71.1, avgRate: 5.97, marketShare: 16.3 },
        ],
        trends: {
          applicationTrend: 12.3,
          approvalTrend: 8.7,
          processingTimeTrend: -15.2,
          satisfactionTrend: 5.1,
        },
      }

      setData(mockData)
      setLoading(false)
    }

    fetchAnalytics()
  }, [timeRange])

  const getTrendIcon = (trend: number) => {
    return trend > 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  const getTrendColor = (trend: number) => {
    return trend > 0 ? "text-green-600" : "text-red-600"
  }

  if (loading) {
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

  if (!data) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">Comprehensive performance insights and metrics</p>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="bg-white">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-1">
            <TabsList className="grid w-full grid-cols-5 bg-gray-50">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white">
                <BarChart3 className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-white">
                <Activity className="h-4 w-4 mr-2" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="teams" className="data-[state=active]:bg-white">
                <Users className="h-4 w-4 mr-2" />
                Teams
              </TabsTrigger>
              <TabsTrigger value="lenders" className="data-[state=active]:bg-white">
                <Building className="h-4 w-4 mr-2" />
                Lenders
              </TabsTrigger>
              <TabsTrigger value="trends" className="data-[state=active]:bg-white">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trends
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Applications</CardTitle>
                  <FileText className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {data.overview.totalApplications.toLocaleString()}
                  </div>
                  <div className="flex items-center mt-1">
                    {getTrendIcon(data.trends.applicationTrend)}
                    <span className={`text-xs ml-1 ${getTrendColor(data.trends.applicationTrend)}`}>
                      {Math.abs(data.trends.applicationTrend)}% from last period
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Approval Rate</CardTitle>
                  <Target className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{data.overview.approvalRate}%</div>
                  <div className="flex items-center mt-1">
                    {getTrendIcon(data.trends.approvalTrend)}
                    <span className={`text-xs ml-1 ${getTrendColor(data.trends.approvalTrend)}`}>
                      {Math.abs(data.trends.approvalTrend)}% from last period
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Avg Processing Time</CardTitle>
                  <Clock className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{data.overview.avgProcessingTime} days</div>
                  <div className="flex items-center mt-1">
                    {getTrendIcon(data.trends.processingTimeTrend)}
                    <span className={`text-xs ml-1 ${getTrendColor(data.trends.processingTimeTrend)}`}>
                      {Math.abs(data.trends.processingTimeTrend)}% from last period
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Loan Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    ${(data.overview.totalLoanValue / 1000000).toFixed(1)}M
                  </div>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-xs ml-1 text-green-600">12.5% from last period</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Application Status Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Application Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Approved</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{data.overview.approvedApplications}</div>
                      <div className="text-xs text-gray-500">
                        {((data.overview.approvedApplications / data.overview.totalApplications) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <Progress
                    value={(data.overview.approvedApplications / data.overview.totalApplications) * 100}
                    className="h-2"
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Pending</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{data.overview.pendingApplications}</div>
                      <div className="text-xs text-gray-500">
                        {((data.overview.pendingApplications / data.overview.totalApplications) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <Progress
                    value={(data.overview.pendingApplications / data.overview.totalApplications) * 100}
                    className="h-2"
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Rejected</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{data.overview.rejectedApplications}</div>
                      <div className="text-xs text-gray-500">
                        {((data.overview.rejectedApplications / data.overview.totalApplications) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <Progress
                    value={(data.overview.rejectedApplications / data.overview.totalApplications) * 100}
                    className="h-2"
                  />
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-2">{data.overview.customerSatisfaction}</div>
                    <div className="flex justify-center space-x-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Award
                          key={star}
                          className={`h-6 w-6 ${
                            star <= Math.floor(data.overview.customerSatisfaction)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      Average rating from {data.overview.totalApplications} reviews
                    </p>
                    <div className="flex items-center justify-center mt-2">
                      {getTrendIcon(data.trends.satisfactionTrend)}
                      <span className={`text-sm ml-1 ${getTrendColor(data.trends.satisfactionTrend)}`}>
                        {Math.abs(data.trends.satisfactionTrend)}% from last period
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Monthly Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.performance.monthlyApplications.map((month) => (
                      <div key={month.month} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{month.month}</span>
                          <div className="text-right">
                            <div className="text-sm font-semibold">{month.applications} total</div>
                            <div className="text-xs text-green-600">{month.approved} approved</div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Progress value={(month.applications / 200) * 100} className="h-2" />
                          <Progress value={(month.approved / month.applications) * 100} className="h-1 bg-green-100" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Processing Times by Stage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.performance.processingTimes.map((stage) => (
                      <div key={stage.stage} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{stage.stage}</span>
                          <div className="text-right">
                            <div className="text-sm font-semibold">{stage.avgTime} days</div>
                            <div className="text-xs text-gray-500">Target: {stage.target} days</div>
                          </div>
                        </div>
                        <div className="relative">
                          <Progress value={(stage.avgTime / stage.target) * 100} className="h-2" />
                          {stage.avgTime > stage.target && (
                            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Team Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.performance.teamPerformance.map((team) => (
                    <div key={team.team} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium text-gray-900">{team.team}</h3>
                        <Badge className="bg-blue-100 text-blue-800">{team.efficiency}% efficiency</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Completed</div>
                          <div className="font-semibold">{team.completed}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Avg Time</div>
                          <div className="font-semibold">{team.avgTime} days</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Efficiency</div>
                          <Progress value={team.efficiency} className="h-2 mt-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teams Tab */}
          <TabsContent value="teams">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.teams.map((team) => (
                <Card key={team.name} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-semibold">{team.name}</CardTitle>
                      <Badge className="bg-green-100 text-green-800">{team.efficiency}%</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Members</div>
                        <div className="font-semibold flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {team.members}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Completed</div>
                        <div className="font-semibold">{team.completed}</div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Workload</span>
                        <span>{team.workload}%</span>
                      </div>
                      <Progress value={team.workload} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Efficiency</span>
                        <span>{team.efficiency}%</span>
                      </div>
                      <Progress value={team.efficiency} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Lenders Tab */}
          <TabsContent value="lenders">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Lender Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.lenders.map((lender) => (
                    <div key={lender.name} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium text-gray-900">{lender.name}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-blue-100 text-blue-800">{lender.marketShare}% market share</Badge>
                          <Badge className="bg-green-100 text-green-800">{lender.approvalRate}% approval</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Applications</div>
                          <div className="font-semibold">{lender.applications}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Approval Rate</div>
                          <div className="font-semibold">{lender.approvalRate}%</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Avg Rate</div>
                          <div className="font-semibold">{lender.avgRate}%</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Market Share</div>
                          <Progress value={lender.marketShare} className="h-2 mt-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Key Trends</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Applications</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(data.trends.applicationTrend)}
                      <span className={`font-semibold ${getTrendColor(data.trends.applicationTrend)}`}>
                        {Math.abs(data.trends.applicationTrend)}%
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Target className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Approval Rate</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(data.trends.approvalTrend)}
                      <span className={`font-semibold ${getTrendColor(data.trends.approvalTrend)}`}>
                        {Math.abs(data.trends.approvalTrend)}%
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Processing Time</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(data.trends.processingTimeTrend)}
                      <span className={`font-semibold ${getTrendColor(data.trends.processingTimeTrend)}`}>
                        {Math.abs(data.trends.processingTimeTrend)}%
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Customer Satisfaction</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(data.trends.satisfactionTrend)}
                      <span className={`font-semibold ${getTrendColor(data.trends.satisfactionTrend)}`}>
                        {Math.abs(data.trends.satisfactionTrend)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
