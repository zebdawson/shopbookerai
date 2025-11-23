'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Phone,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowUpRight,
  PhoneCall
} from 'lucide-react'
import { calculateMetrics, mockCalls, mockAppointments } from '@/lib/mock-data'
import Link from 'next/link'

export default function DashboardPage() {
  const metrics = calculateMetrics()
  const recentCalls = mockCalls.slice(0, 5)
  const upcomingAppointments = mockAppointments
    .filter(apt => apt.status === 'scheduled')
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here&apos;s what&apos;s happening with your shop today.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Calls Today</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.callsToday}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics.callsThisMonth} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Appointments Booked</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.appointmentsBooked}</div>
            <p className="text-xs text-muted-foreground mt-1">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Estimated Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${metrics.estimatedRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              From AI bookings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.conversionRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Calls to bookings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Calls */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Calls</CardTitle>
                <CardDescription>Latest customer interactions</CardDescription>
              </div>
              <Link href="/calls">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCalls.map((call) => (
                <div key={call.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <PhoneCall className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium truncate">{call.callerName}</p>
                      <Badge
                        variant={
                          call.outcome === 'booked'
                            ? 'default'
                            : call.outcome === 'callback'
                            ? 'secondary'
                            : 'outline'
                        }
                        className="shrink-0"
                      >
                        {call.outcome}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{call.callerPhone}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {call.transcript}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {call.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                      <span>•</span>
                      <span>{Math.floor(call.duration / 60)}:{(call.duration % 60).toString().padStart(2, '0')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Next scheduled services</CardDescription>
              </div>
              <Link href="/calendar">
                <Button variant="ghost" size="sm">
                  View Calendar
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-primary/10 shrink-0">
                    <span className="text-xs font-semibold text-primary">
                      {appointment.date.toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="text-sm font-bold text-primary">
                      {appointment.date.getDate()}
                    </span>
                  </div>
                  <div className="flex-1 space-y-1 min-w-0">
                    <p className="text-sm font-medium truncate">{appointment.customerName}</p>
                    <p className="text-xs text-muted-foreground">{appointment.serviceType}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {appointment.startTime} - {appointment.endTime}
                      <span>•</span>
                      <span className="font-medium text-foreground">
                        ${appointment.estimatedRevenue.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
