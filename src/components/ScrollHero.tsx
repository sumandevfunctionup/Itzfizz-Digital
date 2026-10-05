"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Gauge } from "lucide-react";
import { engineSound } from "@/utils/engineAudio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollHeroProps {
  soundEnabled: boolean;
  onScrollProgressUpdate: (progress: number) => void;
}

const HEADLINE_TEXT = "WELCOME ITZFIZZ";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const ScrollHero: React.FC<ScrollHeroProps> = ({
  soundEnabled,
  onScrollProgressUpdate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  // The 4 Stat Box Refs
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);
  const box4Ref = useRef<HTMLDivElement>(null);

  // High-performance direct DOM telemetry refs (Eliminates React re-renders during scroll)
  const speedDisplayRef = useRef<HTMLSpanElement>(null);
  const gearDisplayRef = useRef<HTMLDivElement>(null);
  const progressDisplayRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !carRef.current || !trailRef.current) return;

    const carEl = carRef.current;
    const trailEl = trailRef.current;
    const letterEls = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    const boxEls = [
      box1Ref.current,
      box2Ref.current,
      box3Ref.current,
      box4Ref.current,
    ].filter(Boolean) as HTMLDivElement[];

    // -------------------------------------------------------------
    // 1. INITIAL LOAD ANIMATION (Requirement #2 - GSAP Timeline)
    // -------------------------------------------------------------
    const introTl = gsap.timeline();

    // 1a. Letters initial staggered entrance
    introTl.fromTo(
      letterEls,
      { opacity: 0, y: 15 },
      {
        opacity: 0.25,
        y: 0,
        duration: 0.8,
        stagger: 0.035,
        ease: "power3.out",
      }
    );

    // 1b. The 4 Stat Boxes animate in on page load (one by one with subtle delay)
    introTl.fromTo(
      boxEls,
      { opacity: 0, scale: 0.9, y: (i) => (i % 2 === 0 ? -15 : 15) },
      {
        opacity: 0.65,
        scale: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "back.out(1.2)",
      },
      "-=0.4"
    );

    // 1c. Car rolls into start position
    introTl.fromTo(
      carEl,
      { x: -160, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
      "-=0.6"
    );

    // -------------------------------------------------------------
    // 2. SCROLL-BASED ANIMATION (Requirement #3 & #4 - GPU Accelerated)
    // -------------------------------------------------------------
    const ctx = gsap.context(() => {
      // ⚡ OPTIMIZATION 1: Pre-calculate & cache road dimensions
      const getDimensions = () => {
        const roadWidth = window.innerWidth;
        const carWidth = carEl.offsetWidth || 340;
        // Total distance for the entire car to fully clear the right viewport
        const totalTravel = roadWidth + carWidth + 80;
        return { roadWidth, carWidth, totalTravel };
      };

      let dims = getDimensions();

      // ⚡ OPTIMIZATION 2: Pre-compute letter coordinates to eliminate layout reflows in scroll loop
      const cacheLetterPositions = () => {
        return letterEls.map((letter) => {
          const rect = letter.getBoundingClientRect();
          return rect.left;
        });
      };

      let cachedLetterLefts = cacheLetterPositions();

      // Master ScrollTrigger for buttery 60-120fps scrubbing
      const mainScrollTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smooth kinetic momentum
        pin: trackRef.current,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // By 86% of the scroll track, the car has completely driven off-screen to the right!
          const carProgress = Math.min(1, progress / 0.86);
          const currentX = carProgress * dims.totalTravel;
          const carFrontX = currentX + dims.carWidth * 0.85;

          // ⚡ OPTIMIZATION 3: Pure GPU translate3d (Hardware compositing)
          gsap.set(carEl, { x: currentX, force3D: true });

          // ⚡ OPTIMIZATION 4: Pure GPU scaleX for trail (Zero DOM layout reflow)
          const trailScale = Math.min(1, Math.max(0, (currentX + dims.carWidth * 0.2) / dims.roadWidth));
          gsap.set(trailEl, { scaleX: trailScale, transformOrigin: "left center", force3D: true });

          // ⚡ OPTIMIZATION 5: Read from cached coordinates (0 getBoundingClientRect calls during scroll!)
          for (let i = 0; i < letterEls.length; i++) {
            const letter = letterEls[i];
            const letterLeft = cachedLetterLefts[i];
            if (carFrontX >= letterLeft) {
              if (!letter.classList.contains("active")) {
                letter.classList.add("active");
              }
            } else {
              if (letter.classList.contains("active")) {
                letter.classList.remove("active");
              }
            }
          }

          // ⚡ OPTIMIZATION 6: High-frequency DOM telemetry updates without React re-render overhead
          const velocity = Math.abs(self.getVelocity() || 0);
          const computedMph = Math.min(
            195,
            Math.round(velocity / 16 + (progress > 0.02 ? 35 : 0))
          );

          let gear = "P";
          if (progress > 0.01) {
            if (computedMph > 140) gear = "7";
            else if (computedMph > 110) gear = "6";
            else if (computedMph > 80) gear = "5";
            else if (computedMph > 55) gear = "4";
            else if (computedMph > 35) gear = "3";
            else if (computedMph > 15) gear = "2";
            else gear = "1";
          }

          const pct = Math.round(progress * 100);

          if (speedDisplayRef.current) speedDisplayRef.current.textContent = `${computedMph}`;
          if (gearDisplayRef.current) gearDisplayRef.current.textContent = gear;
          if (progressDisplayRef.current) progressDisplayRef.current.textContent = `${pct}%`;
          if (progressBarRef.current) progressBarRef.current.style.width = `${pct}%`;

          onScrollProgressUpdate(pct);

          // Engine Sound Pitch Modulation
          if (soundEnabled) {
            engineSound.setThrottle(Math.min(1, velocity / 2000));
          }
        },
      });

      // -----------------------------------------------------------
      // 3. STAT BOXES SCROLL TRIGGER HIGHLIGHTS
      // -----------------------------------------------------------

      // Box 1: 58% (Top Left)
      if (box1Ref.current) {
        gsap.to(box1Ref.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top+=150 top",
            end: "top+=450 top",
            scrub: 0.5,
          },
          opacity: 1,
          scale: 1.04,
          boxShadow: "0 20px 35px -8px rgba(222, 245, 79, 0.45)",
        });
      }

      // Box 2: 23% (Bottom Left)
      if (box2Ref.current) {
        gsap.to(box2Ref.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top+=450 top",
            end: "top+=750 top",
            scrub: 0.5,
          },
          opacity: 1,
          scale: 1.04,
          boxShadow: "0 20px 35px -8px rgba(106, 201, 255, 0.45)",
        });
      }

      // Box 3: 27% (Top Right)
      if (box3Ref.current) {
        gsap.to(box3Ref.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top+=750 top",
            end: "top+=1050 top",
            scrub: 0.5,
          },
          opacity: 1,
          scale: 1.04,
          boxShadow: "0 20px 35px -8px rgba(69, 219, 125, 0.45)",
        });
      }

      // Box 4: 40% (Bottom Right)
      if (box4Ref.current) {
        gsap.to(box4Ref.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top+=1050 top",
            end: "top+=1350 top",
            scrub: 0.5,
          },
          opacity: 1,
          scale: 1.04,
          boxShadow: "0 20px 35px -8px rgba(250, 115, 40, 0.45)",
        });
      }

      // Debounced resize handler recalibrates cached values smoothly
      let resizeTimer: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          dims = getDimensions();
          cachedLetterLefts = cacheLetterPositions();
          ScrollTrigger.refresh();
        }, 150);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", handleResize);
        mainScrollTrigger.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [soundEnabled, onScrollProgressUpdate]);

  return (
    <div
      ref={containerRef}
      id="hero-scroll-section"
      className="relative w-full h-[260vh] bg-[#121212]"
    >
      {/* Pinned 100vh Viewport Track (Clean, Spacious, Uncluttered) */}
      <div
        ref={trackRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#121212] select-none"
      >
        {/* Subtle Ambient Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#121212]/60 to-[#0a0a0a] pointer-events-none" />

        {/* ------------------------------------------------------------- */}
        {/* STAT BOX 1: 58% (Top Left - Safely below navbar) */}
        {/* ------------------------------------------------------------- */}
        <div
          ref={box1Ref}
          className="absolute z-20 pointer-events-none transition-all duration-300 rounded-2xl bg-[#def54f] text-[#111] px-5 py-4 sm:px-6 sm:py-5 shadow-xl flex flex-col justify-center w-[210px] sm:w-[260px] top-16 sm:top-20 left-4 sm:left-10"
        >
          <span className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-[#111]">
            58%
          </span>
          <span className="mt-1 text-xs sm:text-sm font-bold leading-tight text-[#111]/90">
            Increase in pick up point use
          </span>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* STAT BOX 3: 27% (Top Right - Safely below navbar) */}
        {/* ------------------------------------------------------------- */}
        <div
          ref={box3Ref}
          className="absolute z-20 pointer-events-none transition-all duration-300 rounded-2xl bg-[#262a34] text-white border border-white/10 px-5 py-4 sm:px-6 sm:py-5 shadow-xl flex flex-col justify-center w-[210px] sm:w-[260px] top-16 sm:top-20 right-4 sm:right-10"
        >
          <span className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-emerald-400">
            27%
          </span>
          <span className="mt-1 text-xs sm:text-sm font-bold leading-tight text-gray-200">
            Increase in pick up point use
          </span>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* CENTER ROAD TRACK (200px Height, Full Width) */}
        {/* ------------------------------------------------------------- */}
        <div
          ref={roadRef}
          className="relative w-screen h-[180px] sm:h-[200px] bg-[#1a1c23] flex items-center overflow-hidden z-10 shadow-2xl"
        >
          {/* Top Race Curb */}
          <div className="absolute top-0 left-0 right-0 h-2.5 road-curb-top z-30" />

          {/* Road Center Dashed Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 road-centerline pointer-events-none opacity-30 z-0" />

          {/* Dynamic Green Trail Behind Car (scaleX GPU transform) */}
          <div
            ref={trailRef}
            className="absolute top-0 left-0 h-full w-full trail-glow z-1 pointer-events-none origin-left"
            style={{ transform: "scaleX(0)" }}
          />

          {/* Letter-Spaced Headline (WELCOME ITZFIZZ) */}
          <div className="absolute left-6 sm:left-14 right-6 sm:right-14 z-5 flex items-center justify-between pointer-events-none">
            {HEADLINE_TEXT.split("").map((char, index) => {
              if (char === " ") {
                return (
                  <span
                    key={`space-${index}`}
                    className="w-4 sm:w-10 inline-block"
                  >
                    &nbsp;
                  </span>
                );
              }
              return (
                <span
                  key={`char-${index}`}
                  ref={(el) => {
                    lettersRef.current[index] = el;
                  }}
                  className="headline-letter font-mono font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white/20 select-none"
                >
                  {char}
                </span>
              );
            })}
          </div>

          {/* Supercar Visual Element (McLaren 720S Top View) */}
          <div
            ref={carRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 will-change-transform flex items-center filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)]"
            style={{ height: "100%", width: "auto" }}
          >
            <div className="relative h-[150px] sm:h-[180px] w-[300px] sm:w-[370px] flex items-center">
              <Image
                src={`${basePath}/images/car-top-view.png`}
                alt="McLaren 720S Top View"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 300px, 370px"
              />
              {/* Subtle headlight beam on car nose */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-28 h-20 bg-gradient-to-r from-amber-300/30 to-transparent blur-md rounded-full pointer-events-none" />
            </div>
          </div>

          {/* Bottom Race Curb */}
          <div className="absolute bottom-0 left-0 right-0 h-2.5 road-curb-bottom z-30" />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* STAT BOX 2: 23% (Bottom Left - Safely above screen bottom) */}
        {/* ------------------------------------------------------------- */}
        <div
          ref={box2Ref}
          className="absolute z-20 pointer-events-none transition-all duration-300 rounded-2xl bg-[#6ac9ff] text-[#111] px-5 py-4 sm:px-6 sm:py-5 shadow-xl flex flex-col justify-center w-[210px] sm:w-[260px] bottom-16 sm:bottom-20 left-4 sm:left-10"
        >
          <span className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-[#111]">
            23%
          </span>
          <span className="mt-1 text-xs sm:text-sm font-bold leading-tight text-[#111]/90">
            Decreased in customer phone calls
          </span>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* STAT BOX 4: 40% (Bottom Right - Safely above screen bottom) */}
        {/* ------------------------------------------------------------- */}
        <div
          ref={box4Ref}
          className="absolute z-20 pointer-events-none transition-all duration-300 rounded-2xl bg-[#fa7328] text-[#111] px-5 py-4 sm:px-6 sm:py-5 shadow-xl flex flex-col justify-center w-[210px] sm:w-[260px] bottom-16 sm:bottom-20 right-4 sm:right-10"
        >
          <span className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-[#111]">
            40%
          </span>
          <span className="mt-1 text-xs sm:text-sm font-bold leading-tight text-[#111]/90">
            Decreased in customer phone calls
          </span>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MINIMAL BOTTOM HUD BAR (Discreet, centered, non-intrusive) */}
        {/* ------------------------------------------------------------- */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full glass-panel text-xs font-mono text-gray-300 shadow-2xl">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            <span className="text-[11px] font-semibold text-gray-300 hidden sm:inline">
              SCROLL TO DRIVE
            </span>
          </div>
          <span className="text-gray-600">|</span>
          <div className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-emerald-400" />
            <span ref={speedDisplayRef} className="font-bold text-white">0</span>
            <span className="text-[10px] text-gray-400">MPH</span>
          </div>
          <span className="text-gray-600">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400">GEAR:</span>
            <div ref={gearDisplayRef} className="font-bold text-emerald-400">P</div>
          </div>
          <span className="text-gray-600">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400">PROGRESS:</span>
            <span ref={progressDisplayRef} className="font-bold text-white">0%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
