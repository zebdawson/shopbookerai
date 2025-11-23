'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Phone, DollarSign } from 'lucide-react'
import { mockAppointments, type Appointment } from '@/lib/mock-data'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns'

const serviceTypeColors: Record<string, string> = {
  'Maintenance': 'bg-blue-500',
  'Diagnostic': 'bg-purple-500',
  'Inspection': 'bg-green-500',
  'Electrical': 'bg-yellow-500',
  'Brakes': 'bg-red-500',
  'Transmission': 'bg-pink-500',
  'Tires': 'bg-orange-500',
  'AC/Heating': 'bg-cyan-500',
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getAppointmentsForDay = (day: Date) => {
    return mockAppointments.filter(apt => isSameDay(apt.date, day))
  }

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Calculate padding days for the start of the month
  const startDayOfWeek = monthStart.getDay()
  const paddingDays = Array(startDayOfWeek).fill(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground mt-2">
            View and manage all appointments
          </p>
        </div>
        <Button>
          <CalendarIcon className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>

      {/* Calendar Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{format(currentDate, 'MMMM yyyy')}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Week day headers */}
            {weekDays.map(day => (
              <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
                {day}
              </div>
            ))}

            {/* Padding days */}
            {paddingDays.map((_, index) => (
              <div key={`padding-${index}`} className="min-h-24" />
            ))}

            {/* Calendar days */}
            {days.map(day => {
              const dayAppointments = getAppointmentsForDay(day)
              const isToday = isSameDay(day, new Date())

              return (
                <div
                  key={day.toString()}
                  className={`
                    min-h-24 border rounded-lg p-2 cursor-pointer transition-colors
                    ${isToday ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
                  `}
                  onClick={() => setSelectedDay(day)}
                >
                  <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary' : ''}`}>
                    {format(day, 'd')}
                  </div>
                  <div className="space-y-1">
                    {dayAppointments.slice(0, 2).map(apt => (
                      <div
                        key={apt.id}
                        className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 ${serviceTypeColors[apt.serviceType] || 'bg-gray-500'} text-white truncate`}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedAppointment(apt)
                        }}
                      >
                        {apt.startTime} {apt.customerName}
                      </div>
                    ))}
                    {dayAppointments.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{dayAppointments.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-sm font-semibold mb-3">Service Types</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(serviceTypeColors).map(([type, color]) => (
                <div key={type} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded ${color}`} />
                  <span className="text-sm text-muted-foreground">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointment Details Dialog */}
      <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              {selectedAppointment && format(selectedAppointment.date, 'MMMM d, yyyy')}
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{selectedAppointment.customerName}</h3>
                <Badge className="mt-2">{selectedAppointment.serviceType}</Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedAppointment.startTime} - {selectedAppointment.endTime}</span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedAppointment.customerPhone}</span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>${selectedAppointment.estimatedRevenue.toFixed(2)}</span>
                </div>
              </div>

              {selectedAppointment.notes && (
                <div className="pt-3 border-t">
                  <h4 className="text-sm font-semibold mb-2">Notes</h4>
                  <p className="text-sm text-muted-foreground">{selectedAppointment.notes}</p>
                </div>
              )}

              <div className="flex gap-2 pt-3">
                <Button className="flex-1">Reschedule</Button>
                <Button variant="outline" className="flex-1">Cancel</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Day Appointments Dialog */}
      <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedDay && format(selectedDay, 'MMMM d, yyyy')}
            </DialogTitle>
            <DialogDescription>
              {selectedDay && getAppointmentsForDay(selectedDay).length} appointments
            </DialogDescription>
          </DialogHeader>
          {selectedDay && (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getAppointmentsForDay(selectedDay).length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No appointments for this day</p>
              ) : (
                getAppointmentsForDay(selectedDay).map(apt => (
                  <div
                    key={apt.id}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:border-primary/50 cursor-pointer transition-colors"
                    onClick={() => {
                      setSelectedDay(null)
                      setSelectedAppointment(apt)
                    }}
                  >
                    <div className={`w-1 h-full rounded ${serviceTypeColors[apt.serviceType] || 'bg-gray-500'}`} />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{apt.customerName}</h4>
                        <Badge>{apt.serviceType}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{apt.startTime} - {apt.endTime}</span>
                        <span>•</span>
                        <span>${apt.estimatedRevenue.toFixed(2)}</span>
                      </div>
                      {apt.notes && (
                        <p className="text-sm text-muted-foreground">{apt.notes}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
