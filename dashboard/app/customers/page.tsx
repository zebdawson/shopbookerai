'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, UserPlus, Mail, Phone, Car, Calendar } from 'lucide-react'
import { mockCustomers, type Customer } from '@/lib/mock-data'

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const filteredCustomers = mockCustomers.filter(customer => {
    const searchLower = searchTerm.toLowerCase()
    return (
      customer.name.toLowerCase().includes(searchLower) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchLower) ||
      customer.vehicleMake.toLowerCase().includes(searchLower) ||
      customer.vehicleModel.toLowerCase().includes(searchLower) ||
      customer.vin.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground mt-2">
            Manage your customer database and service history
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Customers</CardTitle>
          <CardDescription>Find customers by name, phone, email, or vehicle info</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredCustomers.length} of {mockCustomers.length} customers
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Database</CardTitle>
          <CardDescription>Complete list of all customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>VIN</TableHead>
                  <TableHead>Customer Since</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No customers found matching your search
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow
                      key={customer.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm">{customer.phone}</span>
                          <span className="text-xs text-muted-foreground">{customer.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium">
                            {customer.vehicleYear} {customer.vehicleMake}
                          </span>
                          <span className="text-xs text-muted-foreground">{customer.vehicleModel}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{customer.vin}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {customer.createdAt.toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric'
                        })}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCustomer(customer)
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

      {/* Customer Profile Dialog */}
      <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Customer Profile</DialogTitle>
            <DialogDescription>Complete customer information and service history</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">Customer Info</TabsTrigger>
                <TabsTrigger value="history">Service History</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-6 mt-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                      <p className="text-lg font-semibold">{selectedCustomer.name}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Customer Since</label>
                      <p className="text-lg">
                        {selectedCustomer.createdAt.toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number
                      </label>
                      <p className="text-lg">{selectedCustomer.phone}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </label>
                      <p className="text-lg">{selectedCustomer.email}</p>
                    </div>
                  </div>
                </div>

                {/* Vehicle Information */}
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Vehicle Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Make & Model</label>
                      <p className="text-lg font-semibold">
                        {selectedCustomer.vehicleMake} {selectedCustomer.vehicleModel}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Year</label>
                      <p className="text-lg">{selectedCustomer.vehicleYear}</p>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-muted-foreground">VIN</label>
                      <p className="text-lg font-mono">{selectedCustomer.vin}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardDescription>Total Services</CardDescription>
                        <CardTitle className="text-2xl">{selectedCustomer.serviceHistory.length}</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardDescription>Total Spent</CardDescription>
                        <CardTitle className="text-2xl">
                          ${selectedCustomer.serviceHistory.reduce((sum, s) => sum + s.cost, 0).toFixed(2)}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardDescription>Last Service</CardDescription>
                        <CardTitle className="text-2xl">
                          {selectedCustomer.serviceHistory[0]?.date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-6 border-t">
                  <Button className="flex-1">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Customer
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Appointment
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Service History</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedCustomer.serviceHistory.length} total services
                  </p>
                </div>

                {selectedCustomer.serviceHistory.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No service history available
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedCustomer.serviceHistory
                      .sort((a, b) => b.date.getTime() - a.date.getTime())
                      .map((service) => (
                        <Card key={service.id}>
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <CardTitle className="text-base">{service.service}</CardTitle>
                                <CardDescription>
                                  {service.date.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </CardDescription>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold">${service.cost.toFixed(2)}</p>
                              </div>
                            </div>
                          </CardHeader>
                          {service.notes && (
                            <CardContent>
                              <p className="text-sm text-muted-foreground">{service.notes}</p>
                            </CardContent>
                          )}
                        </Card>
                      ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
