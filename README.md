# ✈️ Traveloop

**Traveloop** is a full-featured travel planning web application built with React, Vite and Tailwind CSS. It lets you plan trips end-to-end — from building multi-city itineraries and tracking budgets to journaling memories and sharing trips with friends.

---

## 🌐 Live Preview

> Deploy to Vercel in one click — `vercel.json` is already configured with SPA rewrites.

---

## 📸 Features at a Glance

| Section | Description |
|---|---|
| 🌍 Landing Page | Hero with destination search, 3D fan carousel, interactive features section, testimonials and CTA |
| 🏠 Dashboard | Trip overview, budget progress, quick actions and recommended destinations |
| 🗺️ My Trips | Trip cards with status badges, budget tracking and cover images |
| ✈️ Create Trip | Form to scaffold a new trip with dates, destinations and budget |
| 📋 Itinerary Builder | Drag-and-drop day planner with time slots, activity types and cost tracking |
| 👁️ Itinerary View | Read-only timeline view of a built itinerary |
| 🏙️ Explore Cities | Full-screen hero city browser with filters by region and cost index |
| 🎯 Activities | Activity discovery with category filters, ratings and booking CTA |
| 💰 Budget Tracker | Expense log with category breakdown charts and overspend alerts |
| 🧳 Packing Checklist | Smart packing list grouped by category with progress tracking |
| 📓 Travel Journal | Rich notes tied to trip days with timestamps and mood tags |
| 🔗 Shared Trip | Read-only shareable trip view for collaborators |
| 👤 Profile & Settings | Personal info, preferences and theme settings |
| 📊 Analytics | Admin dashboard with user stats, trip trends and revenue charts |

---

## 🛠️ Tech Stack

- **React 18** — component-driven UI
- **Vite 6** — lightning-fast dev server and build tool
- **Tailwind CSS 3** — utility-first styling
- **PostCSS + Autoprefixer** — CSS processing pipeline
- **Vercel** — zero-config deployment with SPA routing

---

## 📁 Project Structure

```
Traveloop2/
├── public/
├── src/
│   ├── App.jsx          # All pages, components and data in one file
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles + Tailwind directives
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json          # SPA rewrite rules for Vercel
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/traveloop.git
cd traveloop

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173` with hot module replacement.

### Production Build

```bash
npm run build
```

Output is placed in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 🌍 Deployment

### Vercel (Recommended)

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the project
3. Vercel auto-detects Vite — no config needed
4. The included `vercel.json` handles client-side routing

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Manual / Other Hosts

Build the project and serve the `dist/` folder from any static host (Netlify, GitHub Pages, AWS S3, etc.). Make sure all routes redirect to `index.html` for client-side navigation to work.

---

## 🎨 Design Highlights

- **Dark immersive landing** — deep space indigo/purple gradient flows from the hero through every section without jarring background jumps
- **3D Fan Carousel** — trending destinations displayed in a perspective-transformed fan layout with smooth CSS 3D transitions
- **Interactive Feature Tabs** — "Plan Your Perfect Trip" section with live mock UI previews that swap per selected feature
- **Dark-to-light transitions** — gradient section backgrounds blend seamlessly instead of hard cuts
- **Glassmorphism cards** — backdrop-blur panels with subtle white borders used throughout the dark sections
- **Fully responsive** — mobile sidebar drawer, responsive grids and touch-friendly tap targets across all pages

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^6.0.3"
  }
}
```

---

## 🗺️ Pages & Routing

Traveloop uses a simple client-side state router (`useState`) — no external router library needed.

| Route Key | Component | Description |
|---|---|---|
| `home` | `LandingPage` | Public marketing page |
| `login` | `LoginPage` | Sign in form |
| `signup` | `SignupPage` | Registration with password strength meter |
| `forgot` | `ForgotPage` | Password reset flow |
| `dashboard` | `Dashboard` | Main app home |
| `trips` | `TripsPage` | All trips list |
| `createtrip` | `CreateTripPage` | New trip wizard |
| `itinerary` | `ItineraryBuilder` | Day-by-day planner |
| `itinerary-view` | `ItineraryView` | Read-only itinerary timeline |
| `cities` | `CitiesPage` | City explorer with filters |
| `activities` | `ActivitiesPage` | Activity discovery |
| `budget` | `BudgetPage` | Expense tracker |
| `packing` | `PackingPage` | Packing checklist |
| `journal` | `JournalPage` | Travel journal |
| `shared` | `SharedTrip` | Shareable read-only view |
| `profile` | `ProfilePage` | User settings |
| `admin` | `AdminPage` | Analytics dashboard |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — feel free to use, modify and distribute.

---

<div align="center">
  Built with ❤️ using React + Vite + Tailwind CSS
</div>
