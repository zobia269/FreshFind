# FreshFind — The Farmers Market & Fresh Produce Dictionary

A React web application providing an interactive encyclopedia and field guide for farmers market enthusiasts, home cooks, chefs, and curious eaters.


Team name 
MSG-SAMTIZE:https://aptechmetrostargate.com:114/

---

## 🌟 Key Features

1. **The Interactive Market Dictionary & Catalog**
   - Rich entries across **Heirloom Fruits**, **Artisanal Vegetables**, **Wild Fungi**, **Botanicals & Herbs**, **Market Jargon**, and **Chef Prep Techniques**.
   - Multi-faceted instant search (name, aliases, botanical Latin name, flavor pairings, culinary methods).
   - Category filtering and A-Z alphabetical jump index.
   - Price tiers (`$`, `$$`, `$$$`, `$$$$`) and Brix sugar levels.
   - Built-in text-to-speech phonetic pronunciation tool.

2. **Sensory Ripeness Masterclass (4-Point Diagnostic Guide)**
   - Every produce entry features specific guidelines:
     - 👁️ **Visual Test (Look)**: Skin color, webbing, bloom, and stem scar.
     - ✋ **Tactile Test (Feel)**: Firmness, elasticity, weight-for-size, shoulder give.
     - 👃 **Aroma Test (Smell)**: Fragrance at the blossom end vs stem cavity.
     - ⚠️ **What to Avoid**: Signs of frost damage, waterlogging, or early harvest.

3. **Interactive Freshness & Ripeness Inspector**
   - Diagnostic tool where users dial in 3 sensory inputs (tactile give, stem check, skin/aroma).
   - Generates a real-time Ripeness Index (0–100%) with status verdicts (Underripe, Peak Ready, Salvage Stage) and actionable kitchen preparations.

4. **12-Month Seasonal Harvest Calendar**
   - Automatically detects current month or lets users cycle through January–December.
   - Displays what's in peak abundance, why seasonal buying saves up to 40%, and how local produce avoids extended cold chains.

5. **Market Jargon Decoder & Brix Refractometer Simulator**
   - Interactive Brix slider (2° to 30° Bx) with an optical refractometer blue-sky reticle simulation.
   - Side-by-side comparison matrix: **Heirloom vs. Hybrid (F1) vs. GMO**.
   - Definitions for *Dry-Farmed*, *Demeter Biodynamic*, *CSA*, *Number 2s / Seconds*, *Climacteric vs Non-Climacteric*, and *IPM*.

6. **Farmers Market Master Quiz**
   - 10-question trivia game testing agronomic knowledge, wild foraging safety, and ripeness science.
   - Instant feedback with agricultural explanations and confetti rewards upon completion.

7. **My Market Basket (Shopping Drawer)**
   - Save favorite finds to your basket with `localStorage` persistence.
   - Interactive checklist for market day.
   - Notes scratchpad, copy-to-clipboard, and print layout.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Routing**: React Router 7 (`BrowserRouter`)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti, Web Speech API (`SpeechSynthesis`)

---

## 🗺️ Pages & Routes

Every page has its own URL, so it can be bookmarked, shared and reloaded directly.

| URL | Page | Component |
|---|---|---|
| `/` | Home (hero & daily discovery) | `pages/HomePage.jsx` |
| `/markets` | Farmers Markets, schedules & map | `pages/MarketsPage.jsx` |
| `/dictionary` | Produce Guide & ripeness cues | `pages/DictionaryPage.jsx` |
| `/planner` | Visit Planner itinerary builder | `pages/PlannerPage.jsx` |
| `/about` | About FreshFind & mission | `pages/AboutPage.jsx` |
| `/contact` | Community contact form & FAQ | `pages/ContactPage.jsx` |
| `*` | 404 — stall not found | `pages/NotFoundPage.jsx` |

Legacy anchors (`/home`, `/contact-section`, `/about-contact`) redirect to their new
equivalents. Navbar, Hero and Footer all navigate through the `onNavigate(sectionId)`
callback, so routes are only declared once — in the `ROUTE_PATHS` map in `src/App.jsx`.

> **Deploying:** the app uses real URL routes, so the host must fall back to
> `index.html` for unknown paths. `public/_redirects` covers Netlify / Cloudflare
> Pages. On Vercel add a `vercel.json` with a rewrite to `/index.html`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Run

```bash
# Navigate to the project directory
cd fresh-find-market-dictionary

# Install dependencies (already installed)
npm install

# Start the local development server
npm run dev

# Build for production
npm run build
```

---

## 📁 Project Structure

```
fresh-find-market-dictionary/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── _redirects             # SPA history fallback for static hosts
└── src/
    ├── main.jsx               # React root + BrowserRouter
    ├── App.jsx                # App shell: header, navbar, routes, modals, footer
    ├── index.css
    ├── data/
    │   ├── dictionaryData.js  # 60+ produce entries, Brix scale, ripeness matrices
    │   ├── marketData.js      # Regional farmers market records & schedules
    │   └── quizData.js        # 10 market quiz questions & explanations
    ├── pages/                 # One file per route
    │   ├── HomePage.jsx
    │   ├── MarketsPage.jsx
    │   ├── DictionaryPage.jsx
    │   ├── PlannerPage.jsx
    │   ├── AboutPage.jsx
    │   ├── ContactPage.jsx
    │   └── NotFoundPage.jsx
    └── components/
        ├── Navbar.jsx             # Top bar, search input, basket counter
        ├── TopHeaderBar.jsx       # Clock, geolocation, visitor counter, breadcrumbs
        ├── HeroSection.jsx        # Seasonal alert banner, daily discovery
        ├── MarketsSection.jsx     # Market cards, schedule table, interactive map
        ├── MarketDetailModal.jsx  # Market deep dive + plan-a-visit
        ├── DictionaryGrid.jsx     # Category pills, A-Z index, produce cards
        ├── ProduceCard.jsx        # Individual card with pronunciation & cues
        ├── ProduceDetailModal.jsx # Deep dive modal with 4-point sensory guide
        ├── AboutSection.jsx       # About page: mission, pillars, coverage
        ├── ContactSection.jsx     # Contact page: channels, form, FAQ
        ├── RipenessInspector.jsx  # Interactive diagnostic ripeness tool
        ├── SeasonalCalendar.jsx   # 12-month visual produce harvest chart
        ├── JargonDecoder.jsx      # Brix refractometer simulator & heirloom matrix
        ├── MarketQuiz.jsx         # Trivia challenge with confetti
        ├── MarketBasketDrawer.jsx # Slide-over shopping basket & checklist
        ├── ChatbotWidget.jsx      # Offline keyword-matching assistant
        ├── DummyAuthModal.jsx     # Sign in / sign up design modal
        └── Footer.jsx             # 5 Golden Rules of Farmers Market Shopping
```
