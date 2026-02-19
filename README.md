# Oh Pepitos - Promotional Website

A promotional website for **Oh Pepitos**, a Venezuelan pepito restaurant located in Orlando, Florida. This project showcases the restaurant's menu, specialties, and contact information.

## Purpose

This is a static promotional website designed to:
- Display the Oh Pepitos menu (pepitos, waffles, salads, drinks)
- Showcase restaurant specialties and promotions
- Provide contact information and ordering options (WhatsApp, phone)
- Enable customers to learn about the restaurant and place orders

## Technologies

- **HTML5** - Semantic markup
- **CSS3** - Styling with custom design
- **Bootstrap** - Responsive grid and components
- **jQuery** - DOM manipulation and interactions
- **Owl Carousel** - Banner and promotion sliders
- **Font Awesome** - Icons
- **Material Icons** - Additional icons (Google)
- **Google Fonts** - PT Sans Narrow, Pacifico

## Structure

| Page | Description |
|------|-------------|
| `index.html` | Home page with banner, menu preview, specialties, promotions, customer reviews |
| `menu-1.html` | Full menu with tabbed categories (pepitos, salads, waffles, drinks) |
| `contact.html` | Contact form and location (Google Maps) |
| `404.html` | Custom 404 error page |

## Setup

### Prerequisites

- Node.js (optional, for build step)
- A static file server or browser (for local preview)

### Configuration

1. Copy `.env.example` to `.env`
2. Fill in your values:
   - `GA_ID` - Google Analytics ID
   - `CONTACT_PHONE` - Phone number for display
   - `CONTACT_EMAIL` - Email address
   - `CONTACT_ADDRESS` - Physical address
   - `WHATSAPP_NUMBER` - Phone number for WhatsApp links (e.g. +15615308018)

### Build (for deployment)

```bash
npm run build
```

This replaces placeholders in HTML with values from `.env` and outputs to the `dist/` folder.

### Local Preview

**Option A - Direct file open:** Open `index.html` in a browser (placeholders will show empty; use build for full preview).

**Option B - With build:**
```bash
npm run build
npm run preview
```

**Option C - Any static server:**
```bash
npx serve .
# or
python -m http.server 8000
```

## License

Designed by [Taga Studios](https://tagastudios.com).
