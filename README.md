# ITZFIZZ: Scroll-Driven Hero Section Animation

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=flat-square&logo=greensock&logoColor=white)](https://greensock.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Live_Demo-success?style=flat-square&logo=github)](https://sumandevfunctionup.github.io/Itzfizz-Digital/)

An ultra-smooth, 60fps scroll-driven hero section animation recreated and elevated from the reference demo ([car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation/)), built using **Next.js 16 (App Router)**, **TypeScript**, **GSAP ScrollTrigger**, and **Tailwind CSS**.

---

## 🌐 Live Demonstrations

- **GitHub Pages:** [https://sumandevfunctionup.github.io/Itzfizz-Digital/](https://sumandevfunctionup.github.io/Itzfizz-Digital/)
- **Original Reference Demo:** [https://paraschaturvedi.github.io/car-scroll-animation/](https://paraschaturvedi.github.io/car-scroll-animation/)

---

## 🚀 Key Features

1. **Pinned Viewport Scroll-Scrubbing:**
   - Multi-screen scroll track (`260vh`) with viewport pinning via GSAP ScrollTrigger.
   - Smooth kinetic momentum interpolation (`scrub: 1`).

2. **Dynamic Supercar & Trail:**
   - McLaren 720S top-view visual translates horizontally in sync with scroll progress.
   - Dynamic neon green trail (`#45db7d`) progressively expands directly behind the vehicle using GPU-accelerated `scaleX`.
   - By 86% of the scroll track, the vehicle drives completely past the right edge of the screen, revealing 100% of the illuminated text.

3. **Per-Letter Collision Lighting:**
   - Letter-spaced headline: `W E L C O M E   I T Z F I Z Z`.
   - Pre-computed coordinate caching ensures **0 layout reflows** during the scroll loop.
   - Each character detects the vehicle's front coordinate and dynamically activates with an emerald glow.

4. **Sequential Milestone Impact Cards:**
   - **58%** — Increase in pick up point use (Neon Lime)
   - **23%** — Decreased in customer phone calls (Electric Sky Blue)
   - **27%** — Increase in pick up point use (Dark Obsidian)
   - **40%** — Decreased in customer phone calls (Tangerine Orange)
   - Strategically positioned with ample vertical clearance (well below navbar and well above screen bottom) with zero overlap.

5. **Live Telemetry HUD:**
   - Direct DOM ref updates for real-time velocity gauge (calculated from scroll speed).
   - Dynamic dual-clutch transmission gearbox indicator (`P`, `1–7`).
   - Track completion progress bar.
   - Zero React re-renders during high-frequency scroll.

6. **Web Audio API Engine Sound:**
   - Interactive synthesized supercar engine throttle and rumble (muted by default with one-click toggle in the navbar).

---

## 🛠️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Static Export
```bash
npm run build
```

---

## 🚀 GitHub Pages Deployment (Automated via GitHub Actions)

This repository includes a pre-configured GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. Go to your repository on GitHub: **[sumandevfunctionup/Itzfizz-Digital](https://github.com/sumandevfunctionup/Itzfizz-Digital)**
2. Click **Settings** → **Pages** (in the left sidebar).
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. Push to `main` (or run the workflow manually from the **Actions** tab).
5. Your site will automatically build and publish to:
   **`https://sumandevfunctionup.github.io/Itzfizz-Digital/`**

---

## ☁️ Deployment on Vercel (Alternative)

1. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Select your `Itzfizz-Digital` repository.
3. Next.js is automatically detected; click **Deploy**!

---

## 📄 Requirements & Assignment Spec
For the complete assignment specifications, grading rubric, and reference analysis, see [ASSIGNMENT_REQUIREMENTS.md](./ASSIGNMENT_REQUIREMENTS.md).
