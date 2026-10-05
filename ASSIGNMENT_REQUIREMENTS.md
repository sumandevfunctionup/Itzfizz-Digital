# Assignment: Scroll-Driven Hero Section Animation

> **Project Name:** ITZFIZZ Scroll-Driven Hero Animation  
> **Reference Live Demo:** [car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation/)  
> **Evaluation Focus:** Motion Quality, Smoothness, Scroll-driven Mechanics, Performance & Code Structure  

---

## 1. Objective

The goal of this assignment is to evaluate a developer's understanding of **advanced frontend animations**, **scroll-based interactions**, and **smooth, 60fps UI behavior** using modern web technologies.

You are required to recreate and elevate the hero section animation inspired by the reference demo, placing special emphasis on:
- High-fidelity motion curves and natural easing
- Dynamic scroll-scrubbed interaction (pinning, timeline scrubbing)
- Staggered initial page load reveals
- Clean, maintainable, and modular code architecture

---

## 2. Reference Demo Deconstruction

The reference implementation at `https://paraschaturvedi.github.io/car-scroll-animation/` implements the following key mechanics:

| Component | Mechanism | Details |
| :--- | :--- | :--- |
| **Track & Section** | Sticky Viewport Pinning | A parent container (e.g. `200vh`–`300vh`) pins the inner viewport (`100vh`) during the scroll interaction. |
| **Main Visual (Vehicle/Object)** | Horizontal Translation | Moves across the screen (`x: endX`) scrubbed synchronously against scroll progress. |
| **Dynamic Trail** | Progressive Reveal | A colored trail (`#45db7d` or brand gradient) expands directly behind the moving element. |
| **Letter Reveal** | Position-based Stagger | The headline letters (`W E L C O M E   I T Z F I Z Z`) reveal their opacity as the vehicle's X coordinate crosses each letter's bounding box. |
| **Statistic Cards** | Scroll-Triggered Thresholds | Impact metric boxes fade in and translate into position at specified scroll offsets (e.g. `top+=400`, `top+=600`, etc.). |

---

## 3. Functional Requirements

### 3.1 Hero Section Layout
- **Above-The-Fold Presence:** The hero section must initially occupy `100vh` (first screen view).
- **Letter-Spaced Headline:** Display a bold, stylized headline with distinct letter spacing:
  ```
  W  E  L  C  O  M  E     I  T  Z  F  I  Z  Z
  ```
- **Impact Metrics & Statistics:** Feature percentage callouts with concise descriptive labels (e.g., *58% Increase in pick up point use*, *23% Decrease in phone calls*, *40% Faster delivery turnaround*).

### 3.2 Initial Load Animation
On initial page load (before user scrolls):
- **Headline Entrance:** The headline must enter smoothly via a staggered letter reveal, smooth fade, or subtle upward translation (`y: 30` to `y: 0`).
- **Metrics Stagger:** Stat cards or introductory badges should animate in sequentially with subtle delays (e.g., `stagger: 0.15s`).
- **Motion Polish:** Curves must feel premium (e.g., `power3.out` or `cubic-bezier(0.16, 1, 0.3, 1)`), avoiding harsh linear transitions.

### 3.3 Scroll-Based Animation (Core Feature)
- **Direct Scroll Coupling:** The primary visual element (car/object/shape) translates smoothly based strictly on scroll position—not on an uncoupled timer or video autoplay.
- **Scrub & Interpolation:** Implement scrub smoothing (`scrub: 1` or `scrub: 1.5` in GSAP ScrollTrigger) to achieve momentum and inertia without lag.
- **Dynamic Interaction:**
  - Reveal/activate headline letters as the object passes over them.
  - Dynamically draw the trail/path behind the moving object.
  - Trigger metric badges at calculated scroll checkpoints along the journey.
- **Section Pinning:** Seamlessly lock the viewport while the animation plays out over the defined scroll distance (e.g., `200vh` to `300vh` scroll budget).

### 3.4 Motion & Performance Guidelines
- **GPU-Accelerated Properties:** Rely primarily on `transform` (`translateX`, `translateY`, `scale`) and `opacity`.
- **Zero Layout Thrashing:** Avoid reading geometry (`getBoundingClientRect`, `offsetHeight`) inside high-frequency scroll loops; pre-calculate or cache values and update only on resize.
- **Hardware Layer Promotion:** Utilize `will-change: transform` appropriately on active moving targets.
- **Responsive Adaptability:** Handle varying viewport widths gracefully (mobile, tablet, desktop) without breaking layout bounds or overflowing horizontally.

---

## 4. Tech Stack Specification

### Mandatory Technologies
- **Core:** HTML5, CSS3, JavaScript (ES6+)
- **Animation Engine:** **GSAP** (GreenSock Animation Platform) + **ScrollTrigger**
- **Framework (Either of the following):**
  - Next.js / React.js with Tailwind CSS
  - Modern Vanilla Web Stack (HTML + Modern CSS + Modular JS + GSAP)

### Optional / Bonus Points
- **Bootstrap:** For clean grid structure and responsive scaffolding.
- **WordPress:** Packaging as a custom theme, block (Gutenberg), or template.
- **Smooth Scroll Libraries:** Integration with Lenis (`@studio-freight/lenis` or `lenis`) for luxury kinetic scrolling.
- **3D / Canvas Element:** Three.js / WebGL / Canvas implementation of the moving object or trail.

---

## 5. Suggested Project Structure

### Option A: Next.js + Tailwind CSS
```plaintext
itzfizz-scroll-hero/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── HeroSection.tsx
│   ├── ScrollTrack.tsx
│   ├── MovingObject.tsx
│   ├── HeadlineReveal.tsx
│   └── MetricCard.tsx
├── public/
│   ├── images/
│   │   └── car-top-view.png
│   └── icons/
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

### Option B: Vanilla JS + GSAP
```plaintext
itzfizz-scroll-hero/
├── index.html
├── style.css
├── main.js
├── assets/
│   ├── car-top-view.png
│   └── favicon.ico
└── README.md
```

---

## 6. Implementation Checklist & Evaluation Rubric

### Verification Checklist
- [ ] Section fills 100vh on initial render without jitter.
- [ ] Initial load animation runs cleanly with no flash of unstyled content (FOUC).
- [ ] Sticky pinning activates smoothly with zero sudden jump when entering/exiting.
- [ ] Car / visual object translates in 1:1 sync with scroll scrub.
- [ ] Headline letters dynamically highlight or change state as the vehicle passes.
- [ ] Stat cards appear at distinct scroll progress intervals.
- [ ] Resize listener recalibrates boundaries (`ScrollTrigger.refresh()`).
- [ ] Fully responsive on desktop (1920x1080), laptop (1366x768), tablet, and mobile.
- [ ] Console has zero errors and no performance warnings.

### Evaluation Criteria

| Category | Weight | Description |
| :--- | :---: | :--- |
| **Motion Quality & Polish** | 35% | Smoothness of scroll scrub, natural easing curves, absence of stutter. |
| **Interaction Accuracy** | 25% | Faithful implementation of trail, letter reveals, and stat triggers. |
| **Code Structure & Cleanliness**| 20% | Semantic markup, modular JS/React components, readable naming. |
| **Performance & Optimization** | 10% | 60fps rendering, GPU acceleration, no layout thrashing. |
| **Responsiveness & Cross-browser**| 10% | Clean degradation across viewport sizes and major browsers. |

---

## 7. Submission Instructions

1. **Repository:** Push the clean, structured source code to a public GitHub repository.
2. **Live Deployment:** Deploy to a free hosting provider:
   - **GitHub Pages** (preferred for Vanilla)
   - **Vercel** / **Netlify** (preferred for Next.js / React)
3. **Documentation:** Include a clear `README.md` containing:
   - Live demo URL
   - Setup and installation instructions (`npm install && npm run dev` or local server instructions)
   - Architectural decisions & animation logic explanation
   - Tech stack & libraries used
