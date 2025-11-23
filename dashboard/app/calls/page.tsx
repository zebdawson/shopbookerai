'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Phone, Clock, Play, Download } from 'lucide-react'
import { mockCalls, type Call } from '@/lib/mock-data'

export default function CallsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [outcomeFilter, setOutcomeFilter] = useState<string>('all')
  const [selectedCall, setSelectedCall] = useState<Call | null>(null)

  const filteredCalls = mockCalls.filter(call => {
    const matchesSearch =
      call.callerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.callerPhone.includes(searchTerm) ||
      call.transcript.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesOutcome = outcomeFilter === 'all' || call.outcome === outcomeFilter

    return matchesSearch && matchesOutcome
  })

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Call Log</h1>
        <p className="text-muted-foreground mt-2">
          Review all customer call interactions and outcomes
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Calls</CardTitle>
          <CardDescription>Search and filter call history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, phone, or transcript..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={outcomeFilter} onValueChange={setOutcomeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by outcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Outcomes</SelectItem>
                <SelectItem value="booked">Booked</SelectItem>
                <SelectItem value="callback">Callback</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredCalls.length} of {mockCalls.length} calls
          </div>
        </CardContent>
      </Card>

      {/* Calls Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Calls</CardTitle>
          <CardDescription>All customer phone interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Caller</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Outcome</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCalls.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No calls found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCalls.map((call) => (
                    <TableRow
                      key={call.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedCall(call)}
                    >
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {call.date.toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {call.date.toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{call.callerName}</TableCell>
                      <TableCell className="text-muted-foreground">{call.callerPhone}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {formatDuration(call.duration)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            call.outcome === 'booked'
                              ? 'default'
                              : call.outcome === 'callback'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {call.outcome}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCall(call)
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Call Details Dialog */}
      <Dialog open={!!selectedCall} onOpenChange={() => setSelectedCall(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Call Details</DialogTitle>
            <DialogDescription>
              {selectedCall && selectedCall.date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
            </DialogDescription>
          </DialogHeader>
          {selectedCall && (
            <div className="space-y-6">
              {/* Caller Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Caller Name</label>
                  <p className="text-lg font-semibold mt-1">{selectedCall.callerName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                  <p className="text-lg font-semibold mt-1">{selectedCall.callerPhone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Duration</label>
                  <p className="text-lg font-semibold mt-1">{formatDuration(selectedCall.duration)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Outcome</label>
                  <div className="mt-1">
                    <Badge
                      variant={
                        selectedCall.outcome === 'booked'
                          ? 'default'
                          : selectedCall.outcome === 'callback'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {selectedCall.outcome}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Transcript */}
              <div className="pt-4 border-t">
                <label className="text-sm font-medium text-muted-foreground">AI Transcript Summary</label>
                <div className="mt-2 p-4 bg-muted rounded-lg">
                  <p className="text-sm leading-relaxed">{selectedCall.transcript}</p>
                </div>
              </div>

              {/* Audio Player */}
              {selectedCall.audioUrl && (
                <div className="pt-4 border-t">
                  <label className="text-sm font-medium text-muted-foreground">Call Recording</label>
                  <div className="mt-2 flex items-center gap-3">
                    <Button variant="outline" size="sm">
                      <Play className="mr-2 h-4 w-4" />
                      Play Recording
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Note: Audio playback is a demo feature
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button className="flex-1">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Back
                </Button>
                <Button variant="outline" className="flex-1">
                  View Customer Profile
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
