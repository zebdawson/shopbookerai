# ShopBooker AI Website

A professional, multi-page website for ShopBooker AI - an AI phone assistant for auto repair shops.

## 🚀 Quick Start

### Option 1: Open Directly in Browser
Simply open `index.html` in your web browser to view the site locally.

### Option 2: Run a Local Server (Recommended)
Using Python:
```bash
python3 -m http.server 8000
```

Then visit: `http://localhost:8000`

Using Node.js (if you have http-server installed):
```bash
npx http-server -p 8000
```

## 📁 Project Structure

```
shopbookerai/
├── index.html              # Home page
├── how-it-works.html       # Detailed process explanation
├── demo.html               # Interactive demo & booking
├── pricing.html            # Pricing & ROI calculator
├── about.html              # Company story & mission
├── contact.html            # Contact form
├── css/
│   └── styles.css          # Custom styles
├── js/
│   ├── main.js             # Core functionality
│   ├── demo.js             # Interactive demo features
│   └── pricing.js          # Pricing ROI calculator
├── images/
│   └── logo.png            # Logo (replace with yours)
└── README.md               # This file
```

## 🎨 Design Details

### Brand Colors
- **Primary Blue:** #1E3A8A
- **Secondary Orange:** #F97316
- **Gray:** #6B7280
- **White:** #FFFFFF

### Fonts
- **Headings:** Inter Bold (Google Font)
- **Body:** Inter Regular (Google Font)

### Technology Stack
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Vanilla JavaScript** - No frameworks, pure JS
- **AOS** - Animate On Scroll library
- **Font Awesome** - Icons

## 🖼️ Adding Your Logo

### Step 1: Prepare Your Logo Files
You'll need the following logo variations:
- `logo.png` - Main logo (transparent background recommended)
- `logo-white.png` (optional) - White version for dark backgrounds
- `og-image.jpg` (optional) - Social media sharing image (1200x630px recommended)

### Step 2: Replace Placeholder
1. Download your logo files from Google Drive
2. Copy them to the `images/` folder
3. Replace the existing `logo.png` file
4. The website will automatically use your logo

### Logo Specifications
- **Format:** PNG (with transparency) or SVG
- **Size:** Height should be around 200-300px
- **Aspect Ratio:** Maintain original aspect ratio

## 📧 Connecting Forms to GoHighLevel

### For Demo Form (demo.html)

1. **Create a GoHighLevel Webhook:**
   - Log into your GoHighLevel account
   - Go to Settings → Integrations → Webhooks
   - Create a new webhook for "Demo Requests"
   - Copy the webhook URL

2. **Update demo.html:**
   - Find the `<form id="demo-form">` tag (around line 225)
   - Add the `action` attribute with your webhook URL:
   ```html
   <form id="demo-form" action="YOUR_GOHIGHLEVEL_WEBHOOK_URL" method="POST">
   ```

3. **Update js/main.js:**
   - Find the `handleFormSubmit` function (around line 185)
   - Replace the TODO comment with your webhook URL:
   ```javascript
   const response = await fetch('YOUR_GOHIGHLEVEL_WEBHOOK_URL', {
       method: 'POST',
       body: formData
   });
   ```

### For Contact Form (contact.html)

Follow the same process as above, but for the `contact-form` ID:
1. Create a separate webhook in GoHighLevel for "Contact Requests"
2. Update the form action in `contact.html`
3. Update the fetch URL in `js/main.js`

### Alternative: Form Services

If you prefer not to use webhooks, you can integrate with:
- **Formspree:** https://formspree.io
- **Form submit:** https://formsubmit.co
- **Netlify Forms:** Built-in if deploying to Netlify

## 🚀 Deployment

### Option 1: Netlify (Recommended - Free & Easy)

1. **Create a Netlify account:**
   - Go to https://netlify.com and sign up

2. **Deploy via drag-and-drop:**
   - Click "Add new site" → "Deploy manually"
   - Drag the entire project folder into Netlify
   - Your site will be live in seconds!

3. **Custom domain (optional):**
   - Go to Site settings → Domain management
   - Add your custom domain (e.g., shopbookerai.com)

### Option 2: Vercel (Also Free)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd shopbookerai
vercel
```

3. Follow the prompts

### Option 3: GitHub Pages (Free)

1. Create a GitHub repository
2. Push your code to the repository
3. Go to Settings → Pages
4. Select the branch to deploy from
5. Your site will be live at `https://username.github.io/repository-name`

### Option 4: Traditional Web Hosting

1. Connect to your hosting via FTP/SFTP
2. Upload all files to your public_html or www folder
3. Ensure file permissions are correct (644 for files, 755 for folders)

## 🎯 Customization Guide

### Updating Content

#### Change Pricing
1. Open `pricing.html`
2. Find the pricing amount (line 77): `$797`
3. Update to your desired price
4. Also update the price in `pricing.js` (line 7): `const shopBookerCost = 797;`

#### Update Contact Email
1. Search for `support@shopbookerai.com` across all files
2. Replace with your actual support email

#### Modify Hero Headlines
Edit the `<h1>` tags in each page's hero section to customize messaging.

#### Update Testimonials
1. Open `index.html`
2. Find the testimonials section (around line 420)
3. Replace placeholder names, quotes, and companies

### Adding New Pages

1. **Create HTML file:**
   ```bash
   cp contact.html new-page.html
   ```

2. **Update navigation:**
   Add link to the navigation in ALL pages:
   ```html
   <a href="new-page.html">New Page</a>
   ```

3. **Update footer:**
   Add link to footer in ALL pages

### Changing Colors

#### Option 1: Update Tailwind Config
In each HTML file, find the `tailwind.config` script tag and update:
```javascript
'primary-blue': '#YOUR_COLOR',
'secondary-orange': '#YOUR_COLOR',
```

#### Option 2: Update CSS Variables
In `css/styles.css`, add at the top:
```css
:root {
    --primary-blue: #1E3A8A;
    --secondary-orange: #F97316;
}
```

## 📊 Features

### Interactive Elements
- ✅ Animated counter on hero section
- ✅ Interactive ROI calculator (home & pricing pages)
- ✅ Simulated demo conversations (demo page)
- ✅ Smooth scroll animations (AOS library)
- ✅ Mobile responsive menu
- ✅ Back to top button
- ✅ Form validation
- ✅ Toast notifications

### SEO Optimized
- ✅ Semantic HTML5
- ✅ Meta tags for each page
- ✅ Open Graph tags for social sharing
- ✅ Descriptive alt tags
- ✅ Mobile-friendly design
- ✅ Fast loading times

### Accessibility
- ✅ ARIA labels where needed
- ✅ Keyboard navigation support
- ✅ Focus states on interactive elements
- ✅ Sufficient color contrast

## 🔧 Troubleshooting

### Logo Not Showing
- Check that `logo.png` exists in the `images/` folder
- Verify file name is exactly `logo.png` (case-sensitive)
- Clear browser cache (Cmd/Ctrl + Shift + R)

### Forms Not Submitting
- Open browser console (F12) to check for errors
- Verify GoHighLevel webhook URL is correct
- Test webhook in GoHighLevel first
- Check that all required fields have the `required` attribute

### Animations Not Working
- Ensure you have internet connection (AOS loads from CDN)
- Check browser console for errors
- Verify AOS script is loading: `<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>`

### ROI Calculator Not Updating
- Open browser console and check for JavaScript errors
- Verify `main.js` is loading correctly
- Check that slider IDs match in HTML and JavaScript

## 📱 Browser Compatibility

Tested and working on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Finding Free Images

### Unsplash (Recommended)
Search for auto repair shop images:
- https://unsplash.com/s/photos/auto-repair
- https://unsplash.com/s/photos/mechanic
- https://unsplash.com/s/photos/car-service

### Other Free Stock Photo Sites
- Pexels: https://www.pexels.com
- Pixabay: https://pixabay.com
- Burst (by Shopify): https://burst.shopify.com

### How to Add Images
1. Download high-quality images (1920x1080 or larger)
2. Optimize images using:
   - TinyPNG: https://tinypng.com
   - Squoosh: https://squoosh.app
3. Save to `images/` folder
4. Update image src in HTML:
   ```html
   <img src="images/your-image.jpg" alt="Descriptive text">
   ```

## 📈 Analytics & Tracking

### Google Analytics
Add before closing `</head>` tag in all pages:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Facebook Pixel
Add before closing `</head>` tag:
```html
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

## 🔐 Security Best Practices

1. **Never commit sensitive data:**
   - Don't hardcode API keys or webhook URLs in public repos
   - Use environment variables for production

2. **Form spam protection:**
   - Add Google reCAPTCHA to forms
   - Implement honeypot fields
   - Use rate limiting on your backend

3. **HTTPS:**
   - Always use HTTPS in production (Netlify/Vercel provide this free)
   - Update all external links to use HTTPS

## 📝 License

This website was custom-built for ShopBooker AI. All rights reserved.

## 🤝 Support

For questions or issues:
- Email: support@shopbookerai.com
- Include screenshots of any errors
- Specify which browser and device you're using

## 🎉 Next Steps

1. ✅ Replace placeholder logo with your actual logo
2. ✅ Connect forms to GoHighLevel
3. ✅ Update testimonials with real customer feedback
4. ✅ Add real team photos (optional)
5. ✅ Set up analytics tracking
6. ✅ Deploy to production
7. ✅ Test all forms and links
8. ✅ Set up custom domain

---

**Built with ❤️ for ShopBooker AI**

*Last updated: 2025*
