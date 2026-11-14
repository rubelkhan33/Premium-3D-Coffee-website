# EMBER & BEAN — 3D Specialty Coffee Shop Experience

> *“Slow mornings. Deep conversations. Exceptional coffee.”*

An original, production-grade, premium 3D coffee shop digital brand experience built with **React**, **TypeScript**, **Three.js / React Three Fiber**, **GSAP**, **Lenis smooth scrolling**, and **Tailwind CSS**.

---

## ✨ Features & Experiences

- **Hero 3D Ceramic Experience**:
  - Procedurally crafted stoneware ceramic cup with ergonomic handle and saucer.
  - Realistic ceramic glaze with PBR physical properties and ground contact shadows (`@react-three/drei`).
  - Procedural crema texture with delicate heart/rosetta latte art.
  - Procedural rising steam particles responding to mouse movement and scroll depth.
- **Interactive 3D Coffee Beans**:
  - Roasted bean meshes reacting to mouse proximity with spring repulsion and rotational torque.
- **Signature Drink 3D Showcase**:
  - Modern fluted glass tumbler with iced cubes, layered espresso float, dehydrated citrus wheel garnish, and 3D pinned ingredient callouts (*Espresso, Vanilla, Sea Salt, Milk*).
- **The Craft — Extraction Lab Simulator**:
  - Real-time extraction duration (20s–34s) and water temperature (90°C–96°C) sliders with live calculations for Extraction Yield %, TDS %, and dynamic flavor profile notes.
- **Curated Seasonal Menu & Spec Sheets**:
  - Categorized tabs (*Espresso*, *Filter*, *Signature*, *Cold*) with detailed tasting notes, farm origin, roast level, and brew parameters modal.
- **From Bean to Cup**:
  - 5-stage traceability timeline (*Source*, *Roast*, *Grind*, *Brew*, *Serve*) with technical SVG schematics (responsive mobile card stack).
- **Atmosphere & Time-of-Day Switcher**:
  - Interactive lighting switcher for Morning (07:30 AM), Roastery (01:30 PM), and Evening (07:00 PM).
- **Web Audio Sound Engine**:
  - Pure Web Audio API ambient room tone, 55Hz harmonic boiler hum, ceramic clinks, and steam hiss (Default: OFF with visible toggle).
- **Kinetic Smooth Scroll & Custom Desktop Cursor**:
  - Lenis smooth scrolling with `prefers-reduced-motion` compliance.
  - Custom desktop follower cursor with dynamic modes (`hover`, `drag`, `explore`).
- **Counter Pickup Order Modal**:
  - Curated order builder with pickup time selection and live total calculation.

---

## 🛠️ Tech Stack

- **Framework**: React 18 / 19, TypeScript, Vite
- **3D & WebGL**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animation & Motion**: GSAP, `@gsap/react`, ScrollTrigger, Lenis
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Audio**: Web Audio API (procedural synthesis, no external audio assets needed)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or pnpm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Phitron-batc/3D-Coffee-Shop.git

# Navigate into the project directory
cd 3D-Coffee-Shop

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Production Build

```bash
# Type check and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## ☕ Contact & Social

- **Location**: 27 Willow Street, Old Mill Arts District
- **WhatsApp**: [+88 01768-877746](https://wa.me/8801768877746)
- **LinkedIn**: [rubelkhan-ai](https://www.linkedin.com/in/rubelkhan-ai)
- **Hours**: Open Daily 7:00 AM — 9:00 PM

---

© 2026 EMBER & BEAN Roasting Co. All rights reserved.
