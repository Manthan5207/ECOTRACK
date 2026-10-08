# EcoTrack — "Monitor. Calculate. Act." 🌍✨

> A unified, high-performance web platform that measures your household carbon footprint, delivers live hyper-local air quality & weather forecasts for any city, provides daily activity carbon logging with monthly budgeting, delivers daily environmental news briefings, and generates personalized action plans with community leaderboard sprints.

---

## 🌟 Key Features

### 1. 📊 Live Atmospheric Dashboard (`/dashboard`)
- **Real-Time Air Quality Gauge**: Semicircle animated SVG gauge tracking US AQI with dynamic color categories and personalized health advisories.
- **Atmospheric Pollutant Spectrum**: Live concentrations of **PM2.5**, **PM10**, **NO₂**, **O₃**, **CO**, **SO₂**, and **UV Index** with WHO reference limits and health risk tooltips.
- **Current Meteorology**: Live temperature, "feels-like" thermal comfort, humidity, wind velocity, surface pressure, and solar UV radiation.
- **24-Hour Trajectory Area Chart**: Interactive Recharts visualization with toggles between **AQI**, **Temperature (°C)**, and **PM2.5 (µg/m³)**.
- **7-Day Weather Forecast**: WMO code-mapped weather condition cards with precipitation probability and diurnal temperature ranges.
- **Global & Indian City Search**: Instant debounced search with autocomplete plus GPS **"Use My Location"** one-click geolocation.
- **Combined Insight Banner**: Dynamic synergy banner connecting live ambient AQI with your commute footprint.

### 2. ⚡ Daily Activity Carbon Logger & Budget (`/tracker`) — *New Core Feature*
- **Multimodal Activity Logging**: Track daily commutes (Metro, Bus, Walk/Cycle, EV, Carpool, Car), home energy conservation, plant-based diets, and recycling/composting.
- **Instant CO₂ Metrics**: Automatic calculation of kilograms of CO₂ emitted vs fossil baseline avoided.
- **Monthly Carbon Budget & Burn Rate**: Configurable monthly carbon ceiling (e.g. 180 kg CO₂/month) with visual progress bar, remaining allowance, and pacing projections.
- **Interactive Daily Activity Timeline**: Chronological log with quick date filters and entry management.
- **Habit Streaks & Badges**: Daily check-ins increment active streak multipliers and unlock citizen achievements.

### 3. 📰 Daily Environmental News Hub (`/news`) — *New Feature*
- **Curated Global News**: High-impact climate, clean energy, and sustainability briefing updated daily.
- **Topic Filters**: Renewable Energy, Green Tech & AI, Climate Policy, Clean Mobility, and Nature & Oceans.
- **In-App Article Reader**: Modal view with reading times, publication sources, tag filters, and bookmarking.

### 4. 🧮 Precision Carbon Footprint Calculator (`/calculator`)
- **4-Step Interactive Wizard**:
  1. **Mobility**: Petrol/Diesel/CNG/EV car, Two-wheeler, Metro/train, Bus, and Domestic flights.
  2. **Home Energy**: Monthly electricity consumption (kWh / ₹ bill) and LPG cooking cylinders.
  3. **Diet & Nutrition**: Plant-based vegan, Indian lacto-vegetarian, eggetarian, flexitarian, and daily meat profiles.
  4. **Goods & Waste**: Minimalist to high consumer goods, and recycling/home composting credits.
- **Live Running Total Sidebar**: Instant calculation of annual emissions in **metric tonnes and kg CO₂e / year**.
- **Visual Results Breakdown**: Recharts Donut chart, comparative benchmark bars (**You vs India avg [2.0t] vs IPCC 2030 target [2.3t] vs World avg [4.7t]**), and top 3 emission drivers.

### 5. 🎯 Action Plan, Gamification & Share Card (`/actions`)
- **Ranked ROI Recommendations**: Tailored actions prioritizing your highest emission categories.
- **Interactive Pledges**: Check off commitments with celebration confetti and live-updating counters.
- **Equivalencies**: Real-time conversion into **trees planted**, **km car driving avoided**, and **smartphone charges**.
- **Eco Score (0–100) & Badges**: Gamified rating with streak tracking saved to `localStorage`.
- **High-Res Share Card Export**: Export a downloadable PNG badge card using `html-to-image` and the Web Share API.
- **Tree Offset Calculator**: Compute exact native tree requirements to neutralize your footprint.

### 6. 🏆 Weekly Leaderboard & Eco Points Competition (`/leaderboard`)
- **Weekly Seasons**: Fresh competition cycle runs every Monday 00:00 to Sunday 23:59 (local user time) with live countdown timer.
- **Podium & Celebrations**: Top 3 ranking podium with gold crown on #1, smooth entrance rise, and celebration confetti.
- **Dynamic Scope & Category Filters**: City, Country, Global, and Weekly Sprints.

### 7. 📚 Climate Knowledge & Learning (`/learn`)
- Myth vs Fact breakdown cards.
- Interactive FAQ accordion for urban atmospheric science.
- Scientific environmental glossary (AQI, PM2.5, Scope 1/2/3, UHI effect).

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Core** | React 18.2 + Vite 5.1 (ES Modules) |
| **Styling** | Tailwind CSS 3.4 + PostCSS + Autoprefixer |
| **Icons & UI** | Lucide React |
| **Animations** | Framer Motion 11 + Canvas Confetti |
| **Data Viz** | Recharts 2.12 + Custom SVG Gauges |
| **State** | Zustand 4.5 (`persist` middleware with LocalStorage) |
| **Routing** | React Router DOM 6.22 |
| **Auth** | Firebase 12 (Google, GitHub, Microsoft, Email) + Zero-Config Demo Mode |
| **Live APIs** | Open-Meteo Air Quality & Weather API (CAMS model, zero-key, real-time) |

---

## 🚀 Quick Start

### 1. Clone and Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```

---

*Designed and engineered for maximum ecological impact • EcoTrack 2026*
