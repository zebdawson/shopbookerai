'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { mockAnalytics } from '@/lib/mock-data'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts'
import { TrendingUp, Phone, Calendar, DollarSign } from 'lucide-react'

export default function AnalyticsPage() {
  const { callsByHour, callsByDay, conversionTrend, revenueByWeek } = mockAnalytics

  // Chart configurations
  const chartConfig = {
    calls: {
      label: 'Calls',
      color: 'hsl(217, 91%, 60%)',
    },
    bookings: {
      label: 'Bookings',
      color: 'hsl(200, 98%, 39%)',
    },
    rate: {
      label: 'Conversion Rate',
      color: 'hsl(217, 91%, 60%)',
    },
    revenue: {
      label: 'Revenue',
      color: 'hsl(217, 91%, 60%)',
    },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Track performance metrics and business insights
        </p>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">315</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">193</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$32,700</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+15%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Conversion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">61.3%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Calls by Hour */}
        <Card>
          <CardHeader>
            <CardTitle>Calls by Hour</CardTitle>
            <CardDescription>Daily call distribution pattern</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={callsByHour}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="hour"
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="calls"
                    fill="hsl(217, 91%, 60%)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Calls by Day */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
            <CardDescription>Calls vs bookings by day of week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={callsByDay}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="day"
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend
                    wrapperStyle={{ fontSize: '12px' }}
                    iconType="circle"
                  />
                  <Bar
                    dataKey="calls"
                    fill="hsl(217, 91%, 60%)"
                    radius={[4, 4, 0, 0]}
                    name="Calls"
                  />
                  <Bar
                    dataKey="bookings"
                    fill="hsl(200, 98%, 39%)"
                    radius={[4, 4, 0, 0]}
                    name="Bookings"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Conversion Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate Trend</CardTitle>
            <CardDescription>6-week conversion rate percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conversionTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="date"
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    domain={[0, 100]}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="hsl(217, 91%, 60%)"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(217, 91%, 60%)', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Conversion Rate (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Revenue by Week */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Revenue</CardTitle>
            <CardDescription>Revenue attribution from AI bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByWeek}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="week"
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="revenue"
                    fill="hsl(217, 91%, 60%)"
                    radius={[4, 4, 0, 0]}
                    name="Revenue ($)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
          <CardDescription>AI-generated business insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-green-900 dark:text-green-100">Peak Performance</h4>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  Thursday and Friday show the highest call volume and conversion rates. Consider staffing accordingly.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">Optimal Call Times</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Peak call hours are between 10 AM - 11 AM and 2 PM - 3 PM. Ensure AI assistant is properly configured during these times.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg">
              <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100">Revenue Growth</h4>
                <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                  Revenue has been steadily increasing over the past 6 weeks, with an average of $5,467 per week from AI-booked appointments.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
