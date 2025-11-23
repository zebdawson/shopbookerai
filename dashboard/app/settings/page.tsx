'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your shop settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shop Information</CardTitle>
              <CardDescription>Update your shop&apos;s basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shop-name">Shop Name</Label>
                <Input id="shop-name" defaultValue="Auto Shop Demo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shop-email">Email</Label>
                <Input id="shop-email" type="email" defaultValue="demo@autoshop.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shop-phone">Phone</Label>
                <Input id="shop-phone" type="tel" defaultValue="(555) 000-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shop-address">Address</Label>
                <Input id="shop-address" defaultValue="123 Main St, City, State 12345" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>Set your operating hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="text-sm font-medium">Monday - Friday</span>
                <Input type="time" defaultValue="08:00" />
                <Input type="time" defaultValue="17:00" />
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="text-sm font-medium">Saturday</span>
                <Input type="time" defaultValue="09:00" />
                <Input type="time" defaultValue="14:00" />
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="text-sm font-medium">Sunday</span>
                <span className="text-sm text-muted-foreground col-span-2">Closed</span>
              </div>
              <Button>Save Hours</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure email notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Appointment Bookings</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email when AI books a new appointment
                  </p>
                </div>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Missed Calls</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when a call couldn&apos;t be answered
                  </p>
                </div>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Daily Summary</Label>
                  <p className="text-sm text-muted-foreground">
                    Daily report of calls and bookings
                  </p>
                </div>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Supabase Integration</CardTitle>
              <CardDescription>Configure your Supabase backend connection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="supabase-url">Supabase URL</Label>
                <Input
                  id="supabase-url"
                  placeholder="https://your-project.supabase.co"
                  defaultValue="https://your-project.supabase.co"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supabase-key">Supabase Anon Key</Label>
                <Input
                  id="supabase-key"
                  type="password"
                  placeholder="your-anon-key"
                  defaultValue="••••••••••••••••"
                />
              </div>
              <div className="flex gap-2">
                <Button>Test Connection</Button>
                <Button variant="outline">Save Configuration</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Assistant Settings</CardTitle>
              <CardDescription>Configure AI phone assistant behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ai-greeting">Greeting Message</Label>
                <Input
                  id="ai-greeting"
                  defaultValue="Thank you for calling Auto Shop Demo. How can I help you today?"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="booking-limit">Max Appointments Per Day</Label>
                <Input id="booking-limit" type="number" defaultValue="12" />
              </div>
              <Button>Update Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
