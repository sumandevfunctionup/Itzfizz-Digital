# ITZFIZZ: Scroll-Driven Hero Section Animation (Next.js & Vercel Ready)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=flat-square&logo=greensock&logoColor=white)](https://greensock.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sumandevfunctionup/Itzfizz-Digital)

An ultra-smooth, 60fps scroll-driven hero section animation recreated and elevated from the reference demo ([car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation/)), built using **Next.js (App Router)**, **TypeScript**, **GSAP ScrollTrigger**, and **Tailwind CSS**.

---

## 🚀 Key Features

1. **Pinned Viewport Scroll-Scrubbing:**
   - Multi-screen scroll track (`280vh`) with viewport pinning via GSAP ScrollTrigger.
   - Smooth kinetic momentum interpolation (`scrub: 1`).

2. **Dynamic Supercar & Trail:**
   - McLaren 720S top-view visual translates horizontally in sync with scroll progress.
   - Dynamic neon green trail (`#45db7d`) progressively expands directly behind the vehicle.

3. **Per-Letter Collision Lighting:**
   - Letter-spaced headline: `W E L C O M E   I T Z F I Z Z`.
   - Each character detects the vehicle's front coordinate and dynamically activates with an emerald glow.

4. **Sequential Milestone Impact Cards:**
   - **58%** — Increase in pick up point use (Neon Lime)
   - **23%** — Decreased in customer phone calls (Electric Sky Blue)
   - **27%** — Boost in routing throughput & efficiency (Obsidian Emerald)
   - **40%** — Turnaround latency reduction in dispatch (Tangerine Orange)

5. **Live Telemetry HUD:**
   - Real-time velocity gauge (calculated from scroll speed).
   - Dynamic dual-clutch transmission gearbox indicator (P, 1–7).
   - Track completion progress bar.

6. **Web Audio API Engine Sound:**
   - Interactive synthesized supercar engine throttle and rumble (muted by default with one-click toggle in the navbar).

7. **Production Architecture:**
   - Turbopack-optimized Next.js 16 build.
   - Zero layout thrashing (GPU-promoted `transform` and `opacity` properties only).
   - 100% Vercel-ready with zero configuration needed.

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

### 3. Production Build & Test
```bash
npm run build
npm start
```

---

## ☁️ Deployment on Vercel

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete Next.js scroll-driven hero animation"
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your `Itzfizz-Digital` repository.
4. Next.js is automatically detected; click **Deploy**!

---

## 📄 Requirements & Assignment Spec
For the complete assignment specifications, grading rubric, and reference analysis, see [ASSIGNMENT_REQUIREMENTS.md](./ASSIGNMENT_REQUIREMENTS.md).
