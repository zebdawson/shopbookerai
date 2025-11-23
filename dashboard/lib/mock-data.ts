export interface Call {
  id: string
  date: Date
  callerName: string
  callerPhone: string
  duration: number // in seconds
  transcript: string
  outcome: 'booked' | 'callback' | 'declined'
  audioUrl?: string
}

export interface Appointment {
  id: string
  title: string
  date: Date
  startTime: string
  endTime: string
  customerName: string
  customerPhone: string
  serviceType: string
  status: 'scheduled' | 'completed' | 'cancelled'
  estimatedRevenue: number
  notes?: string
}

export interface Customer {
  id: string
  name: string
  phone: string
  email: string
  vehicleMake: string
  vehicleModel: string
  vehicleYear: number
  vin: string
  serviceHistory: ServiceRecord[]
  createdAt: Date
}

export interface ServiceRecord {
  id: string
  date: Date
  service: string
  cost: number
  notes?: string
}

export interface AnalyticsData {
  callsByHour: { hour: string; calls: number }[]
  callsByDay: { day: string; calls: number; bookings: number }[]
  conversionTrend: { date: string; rate: number }[]
  revenueByWeek: { week: string; revenue: number }[]
}

// Mock Calls Data
export const mockCalls: Call[] = [
  {
    id: '1',
    date: new Date(2024, 10, 23, 9, 30),
    callerName: 'John Smith',
    callerPhone: '(555) 123-4567',
    duration: 180,
    transcript: 'Customer called about oil change and tire rotation. Mentioned hearing a squeaking noise from front brakes. Appointment scheduled for Thursday at 2 PM.',
    outcome: 'booked',
    audioUrl: '/audio/call1.mp3'
  },
  {
    id: '2',
    date: new Date(2024, 10, 23, 10, 15),
    callerName: 'Sarah Johnson',
    callerPhone: '(555) 234-5678',
    duration: 120,
    transcript: 'Customer inquired about transmission service pricing. Requested callback tomorrow to confirm appointment after checking schedule.',
    outcome: 'callback'
  },
  {
    id: '3',
    date: new Date(2024, 10, 23, 11, 0),
    callerName: 'Mike Davis',
    callerPhone: '(555) 345-6789',
    duration: 90,
    transcript: 'Customer called for diagnostic on check engine light. Booked for Monday morning at 8 AM. Will need at least 2 hours.',
    outcome: 'booked'
  },
  {
    id: '4',
    date: new Date(2024, 10, 23, 13, 45),
    callerName: 'Emily Brown',
    callerPhone: '(555) 456-7890',
    duration: 60,
    transcript: 'Customer asked about pricing for brake replacement. Decided to call back after getting quotes from other shops.',
    outcome: 'declined'
  },
  {
    id: '5',
    date: new Date(2024, 10, 23, 14, 30),
    callerName: 'Robert Wilson',
    callerPhone: '(555) 567-8901',
    duration: 150,
    transcript: 'Customer needs full vehicle inspection before road trip. Also mentioned AC not cooling properly. Scheduled for tomorrow at 10 AM.',
    outcome: 'booked'
  },
  {
    id: '6',
    date: new Date(2024, 10, 22, 8, 15),
    callerName: 'Lisa Anderson',
    callerPhone: '(555) 678-9012',
    duration: 210,
    transcript: 'Customer called about unusual engine noise. Described as knocking sound when accelerating. Emergency appointment scheduled for same day.',
    outcome: 'booked'
  },
  {
    id: '7',
    date: new Date(2024, 10, 22, 11, 30),
    callerName: 'David Martinez',
    callerPhone: '(555) 789-0123',
    duration: 75,
    transcript: 'Inquiry about wheel alignment service. Mentioned car pulling to the right. Will call back next week to schedule.',
    outcome: 'callback'
  },
  {
    id: '8',
    date: new Date(2024, 10, 22, 15, 0),
    callerName: 'Jennifer Taylor',
    callerPhone: '(555) 890-1234',
    duration: 195,
    transcript: 'Customer needs battery replacement and electrical system check. Warning lights appearing on dashboard. Booked for Friday morning.',
    outcome: 'booked'
  }
]

// Mock Appointments Data
export const mockAppointments: Appointment[] = [
  {
    id: 'apt1',
    title: 'Oil Change & Tire Rotation - John Smith',
    date: new Date(2024, 10, 28, 14, 0),
    startTime: '14:00',
    endTime: '15:30',
    customerName: 'John Smith',
    customerPhone: '(555) 123-4567',
    serviceType: 'Maintenance',
    status: 'scheduled',
    estimatedRevenue: 89.99,
    notes: 'Check brake pads - customer reported squeaking'
  },
  {
    id: 'apt2',
    title: 'Engine Diagnostic - Mike Davis',
    date: new Date(2024, 10, 25, 8, 0),
    startTime: '08:00',
    endTime: '10:00',
    customerName: 'Mike Davis',
    customerPhone: '(555) 345-6789',
    serviceType: 'Diagnostic',
    status: 'scheduled',
    estimatedRevenue: 125.00,
    notes: 'Check engine light - code P0300'
  },
  {
    id: 'apt3',
    title: 'Full Inspection - Robert Wilson',
    date: new Date(2024, 10, 24, 10, 0),
    startTime: '10:00',
    endTime: '12:00',
    customerName: 'Robert Wilson',
    customerPhone: '(555) 567-8901',
    serviceType: 'Inspection',
    status: 'scheduled',
    estimatedRevenue: 179.99,
    notes: 'Pre-road trip inspection + AC diagnosis'
  },
  {
    id: 'apt4',
    title: 'Battery Replacement - Jennifer Taylor',
    date: new Date(2024, 10, 29, 9, 0),
    startTime: '09:00',
    endTime: '10:30',
    customerName: 'Jennifer Taylor',
    customerPhone: '(555) 890-1234',
    serviceType: 'Electrical',
    status: 'scheduled',
    estimatedRevenue: 249.99,
    notes: 'Dashboard warning lights - check electrical system'
  },
  {
    id: 'apt5',
    title: 'Brake Service - Alex Thompson',
    date: new Date(2024, 10, 26, 13, 0),
    startTime: '13:00',
    endTime: '15:00',
    customerName: 'Alex Thompson',
    customerPhone: '(555) 111-2222',
    serviceType: 'Brakes',
    status: 'scheduled',
    estimatedRevenue: 399.99,
    notes: 'Front brake pads and rotors replacement'
  },
  {
    id: 'apt6',
    title: 'Transmission Service - Maria Garcia',
    date: new Date(2024, 10, 27, 11, 0),
    startTime: '11:00',
    endTime: '13:00',
    customerName: 'Maria Garcia',
    customerPhone: '(555) 333-4444',
    serviceType: 'Transmission',
    status: 'scheduled',
    estimatedRevenue: 189.99,
    notes: 'Transmission fluid change and inspection'
  },
  {
    id: 'apt7',
    title: 'Tire Replacement - Chris Lee',
    date: new Date(2024, 10, 23, 15, 0),
    startTime: '15:00',
    endTime: '16:30',
    customerName: 'Chris Lee',
    customerPhone: '(555) 555-6666',
    serviceType: 'Tires',
    status: 'completed',
    estimatedRevenue: 599.99,
    notes: 'All 4 tires replaced - Michelin Defender'
  },
  {
    id: 'apt8',
    title: 'AC Repair - Patricia White',
    date: new Date(2024, 10, 24, 14, 0),
    startTime: '14:00',
    endTime: '16:00',
    customerName: 'Patricia White',
    customerPhone: '(555) 777-8888',
    serviceType: 'AC/Heating',
    status: 'scheduled',
    estimatedRevenue: 299.99,
    notes: 'AC not cooling - possible refrigerant leak'
  }
]

// Mock Customers Data
export const mockCustomers: Customer[] = [
  {
    id: 'cust1',
    name: 'John Smith',
    phone: '(555) 123-4567',
    email: 'john.smith@email.com',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry',
    vehicleYear: 2019,
    vin: '4T1B11HK1KU123456',
    createdAt: new Date(2023, 5, 15),
    serviceHistory: [
      { id: 's1', date: new Date(2024, 8, 10), service: 'Oil Change', cost: 49.99, notes: '5W-30 synthetic' },
      { id: 's2', date: new Date(2024, 5, 20), service: 'Tire Rotation', cost: 39.99 },
      { id: 's3', date: new Date(2024, 2, 5), service: 'Brake Inspection', cost: 0, notes: 'Complimentary - no issues found' }
    ]
  },
  {
    id: 'cust2',
    name: 'Sarah Johnson',
    phone: '(555) 234-5678',
    email: 'sarah.j@email.com',
    vehicleMake: 'Honda',
    vehicleModel: 'Accord',
    vehicleYear: 2020,
    vin: '1HGCV1F30LA123456',
    createdAt: new Date(2023, 7, 22),
    serviceHistory: [
      { id: 's4', date: new Date(2024, 9, 15), service: 'Transmission Service', cost: 189.99 },
      { id: 's5', date: new Date(2024, 6, 8), service: 'AC Recharge', cost: 129.99 },
      { id: 's6', date: new Date(2024, 3, 12), service: 'Engine Air Filter', cost: 29.99 }
    ]
  },
  {
    id: 'cust3',
    name: 'Mike Davis',
    phone: '(555) 345-6789',
    email: 'mike.davis@email.com',
    vehicleMake: 'Ford',
    vehicleModel: 'F-150',
    vehicleYear: 2018,
    vin: '1FTEW1EP2JFA12345',
    createdAt: new Date(2023, 3, 10),
    serviceHistory: [
      { id: 's7', date: new Date(2024, 7, 25), service: 'Brake Replacement', cost: 399.99, notes: 'Front pads and rotors' },
      { id: 's8', date: new Date(2024, 4, 18), service: 'Oil Change', cost: 59.99, notes: '5W-20 synthetic' },
      { id: 's9', date: new Date(2024, 1, 3), service: 'Battery Replacement', cost: 179.99, notes: 'OEM battery' }
    ]
  },
  {
    id: 'cust4',
    name: 'Emily Brown',
    phone: '(555) 456-7890',
    email: 'emily.brown@email.com',
    vehicleMake: 'Chevrolet',
    vehicleModel: 'Malibu',
    vehicleYear: 2021,
    vin: '1G1ZD5ST7MF123456',
    createdAt: new Date(2024, 0, 5),
    serviceHistory: [
      { id: 's10', date: new Date(2024, 8, 30), service: 'State Inspection', cost: 49.99 },
      { id: 's11', date: new Date(2024, 5, 14), service: 'Wheel Alignment', cost: 89.99 }
    ]
  },
  {
    id: 'cust5',
    name: 'Robert Wilson',
    phone: '(555) 567-8901',
    email: 'r.wilson@email.com',
    vehicleMake: 'Nissan',
    vehicleModel: 'Altima',
    vehicleYear: 2017,
    vin: '1N4AL3AP9HC123456',
    createdAt: new Date(2023, 9, 18),
    serviceHistory: [
      { id: 's12', date: new Date(2024, 7, 5), service: 'Cooling System Flush', cost: 149.99 },
      { id: 's13', date: new Date(2024, 4, 22), service: 'Serpentine Belt', cost: 89.99 },
      { id: 's14', date: new Date(2024, 2, 10), service: 'Oil Change', cost: 49.99 }
    ]
  }
]

// Mock Analytics Data
export const mockAnalytics: AnalyticsData = {
  callsByHour: [
    { hour: '8 AM', calls: 5 },
    { hour: '9 AM', calls: 12 },
    { hour: '10 AM', calls: 15 },
    { hour: '11 AM', calls: 18 },
    { hour: '12 PM', calls: 10 },
    { hour: '1 PM', calls: 8 },
    { hour: '2 PM', calls: 14 },
    { hour: '3 PM', calls: 16 },
    { hour: '4 PM', calls: 13 },
    { hour: '5 PM', calls: 7 }
  ],
  callsByDay: [
    { day: 'Mon', calls: 45, bookings: 28 },
    { day: 'Tue', calls: 52, bookings: 32 },
    { day: 'Wed', calls: 48, bookings: 30 },
    { day: 'Thu', calls: 55, bookings: 35 },
    { day: 'Fri', calls: 62, bookings: 38 },
    { day: 'Sat', calls: 38, bookings: 22 },
    { day: 'Sun', calls: 15, bookings: 8 }
  ],
  conversionTrend: [
    { date: 'Week 1', rate: 58 },
    { date: 'Week 2', rate: 62 },
    { date: 'Week 3', rate: 65 },
    { date: 'Week 4', rate: 63 },
    { date: 'Week 5', rate: 68 },
    { date: 'Week 6', rate: 71 }
  ],
  revenueByWeek: [
    { week: 'W1', revenue: 4500 },
    { week: 'W2', revenue: 5200 },
    { week: 'W3', revenue: 4800 },
    { week: 'W4', revenue: 6100 },
    { week: 'W5', revenue: 5700 },
    { week: 'W6', revenue: 6400 }
  ]
}

// Helper functions
export function getCallsToday(): Call[] {
  const today = new Date()
  return mockCalls.filter(call =>
    call.date.getDate() === today.getDate() &&
    call.date.getMonth() === today.getMonth() &&
    call.date.getFullYear() === today.getFullYear()
  )
}

export function getCallsThisMonth(): Call[] {
  const today = new Date()
  return mockCalls.filter(call =>
    call.date.getMonth() === today.getMonth() &&
    call.date.getFullYear() === today.getFullYear()
  )
}

export function getAppointmentsToday(): Appointment[] {
  const today = new Date()
  return mockAppointments.filter(apt =>
    apt.date.getDate() === today.getDate() &&
    apt.date.getMonth() === today.getMonth() &&
    apt.date.getFullYear() === today.getFullYear()
  )
}

export function getAppointmentsThisMonth(): Appointment[] {
  const today = new Date()
  return mockAppointments.filter(apt =>
    apt.date.getMonth() === today.getMonth() &&
    apt.date.getFullYear() === today.getFullYear()
  )
}

export function calculateMetrics() {
  const callsToday = getCallsToday()
  const callsThisMonth = getCallsThisMonth()
  const appointmentsThisMonth = getAppointmentsThisMonth()

  const bookedCalls = callsThisMonth.filter(call => call.outcome === 'booked')
  const totalRevenue = appointmentsThisMonth.reduce((sum, apt) => sum + apt.estimatedRevenue, 0)
  const conversionRate = callsThisMonth.length > 0
    ? (bookedCalls.length / callsThisMonth.length) * 100
    : 0

  return {
    callsToday: callsToday.length,
    callsThisMonth: callsThisMonth.length,
    appointmentsBooked: bookedCalls.length,
    estimatedRevenue: totalRevenue,
    conversionRate: conversionRate.toFixed(1)
  }
}
