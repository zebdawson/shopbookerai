# AutoRepair AI Dashboard

A professional, mobile-responsive dashboard for auto repair shop owners built with Next.js 14, Tailwind CSS, shadcn/ui, and Supabase.

## Features

### 📊 Dashboard Homepage
- **Key Metrics Cards** showing:
  - Calls answered today/this month
  - Appointments booked
  - Estimated revenue from AI bookings
  - Conversion rate (calls to bookings)
- **Recent Calls** feed with caller info and outcomes
- **Upcoming Appointments** preview

### 📅 Calendar View
- Full calendar with monthly view
- Color-coded appointments by service type
- Click on days to view all appointments
- Click on appointments to view detailed information
- Visual service type legend

### 📞 Call Log
- Comprehensive table of all customer calls
- Search and filter by caller name, phone, transcript, or outcome
- Detailed call view with AI transcript summary
- Call duration and timestamp tracking
- Audio playback option (demo feature)

### 👥 Customer Database
- Searchable customer table
- Filter by name, phone, email, or vehicle info
- Detailed customer profiles with contact and vehicle information
- Complete service history tracking
- Quick stats (total services, total spent, last service)

### 📈 Analytics
- Key performance metrics (calls, appointments, revenue, conversion)
- Interactive charts:
  - Calls by hour distribution
  - Weekly performance (calls vs bookings)
  - Conversion rate trends
  - Weekly revenue attribution
- AI-generated insights with actionable recommendations

### ⚙️ Settings
- Shop information management
- Business hours configuration
- Email notification preferences
- Supabase integration settings
- AI assistant configuration

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Backend**: Supabase (configured, using mock data for demo)
- **Date Handling**: date-fns
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- (Optional) Supabase account for backend integration

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables** (optional):

   Update `.env.local` with your Supabase credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:

   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
dashboard/
├── app/
│   ├── analytics/          # Analytics page with charts
│   ├── calendar/           # Calendar view
│   ├── calls/             # Call log table
│   ├── customers/         # Customer database
│   ├── settings/          # Settings page
│   ├── layout.tsx         # Root layout with sidebar
│   ├── page.tsx           # Dashboard homepage
│   └── globals.css        # Global styles and theme
├── components/
│   ├── ui/                # shadcn/ui components
│   └── sidebar.tsx        # Navigation sidebar
├── lib/
│   ├── mock-data.ts       # Demo data for all features
│   ├── supabase.ts        # Supabase client configuration
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## Color Scheme

Professional blue/gray theme:
- Primary: Blue (#4A9FF5)
- Secondary: Light gray
- Accent colors for different service types
- Full dark mode support (ready to implement)

## Mobile Responsive

- Mobile-first design approach
- Responsive sidebar with hamburger menu
- Optimized tables and cards for small screens
- Touch-friendly interface

## Demo Data

The dashboard includes comprehensive mock data:
- 8 sample calls with various outcomes
- 8 appointments across different dates
- 5 customers with service history
- Analytics data for charts and trends

## Customization

### Adding Real Data

Replace mock data imports with Supabase queries:

```typescript
import { supabase } from '@/lib/supabase'

const { data: calls } = await supabase
  .from('calls')
  .select('*')
  .order('date', { ascending: false })
```

### Changing Theme Colors

Edit `app/globals.css` to customize colors:

```css
:root {
  --primary: 217 91% 60%;
  --secondary: 210 40% 96.1%;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Static page generation
- Code splitting
- Optimized bundle sizes
- Total first load JS: ~87.5 kB (shared)

## License

MIT

---

Built with ❤️ for auto repair shop owners
