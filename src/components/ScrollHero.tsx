"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TrendingUp,
  TrendingDown,
  Gauge,
  Zap,
  ArrowDown,
  Activity,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { engineSound } from "@/utils/engineAudio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollHeroProps {
  soundEnabled: boolean;
  onScrollProgressUpdate: (progress: number) => void;
}

const HEADLINE_WORD_1 = "WELCOME";
const HEADLINE_WORD_2 = "ITZFIZZ";

interface StatItem {
  id: string;
  pct: string;
  label: string;
  badge: string;
  colorClass: string;
  activeBorder: string;
  icon: React.ReactNode;
  milestone: number; // progress 0..1 threshold
}

const STAT_ITEMS: StatItem[] = [
  {
    id: "stat-1",
    pct: "58%",
    label: "Increase in pick up point use",
    badge: "Pickup Point Growth",
    colorClass: "bg-[#def54f] text-[#111]",
    activeBorder: "ring-4 ring-yellow-400 shadow-yellow-400/50",
    icon: <TrendingUp className="w-4 h-4 text-black" />,
    milestone: 0.2,
  },
  {
    id: "stat-2",
    pct: "23%",
    label: "Decreased in customer phone calls",
    badge: "Call Volume Drop",
    colorClass: "bg-[#6ac9ff] text-[#111]",
    activeBorder: "ring-4 ring-cyan-400 shadow-cyan-400/50",
    icon: <TrendingDown className="w-4 h-4 text-black" />,
    milestone: 0.45,
  },
  {
    id: "stat-3",
    pct: "27%",
    label: "Increase in pick up point use",
    badge: "Efficiency Uptick",
    colorClass: "bg-[#18202d] text-white border border-emerald-500/40",
    activeBorder: "ring-4 ring-emerald-400 shadow-emerald-400/50",
    icon: <Zap className="w-4 h-4 text-emerald-400" />,
    milestone: 0.7,
  },
  {
    id: "stat-4",
    pct: "40%",
    label: "Decreased in customer phone calls",
    badge: "Turnaround Boost",
    colorClass: "bg-[#fa7328] text-[#111]",
    activeBorder: "ring-4 ring-orange-400 shadow-orange-400/50",
    icon: <Gauge className="w-4 h-4 text-black" />,
    milestone: 0.9,
  },
];

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
  const statCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Telemetry HUD state
  const [speedMph, setSpeedMph] = useState(0);
  const [currentGear, setCurrentGear] = useState("P");
  const [progressPct, setProgressPct] = useState(0);
  const [activeMilestones, setActiveMilestones] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    if (!containerRef.current || !carRef.current || !trailRef.current) return;

    const carEl = carRef.current;
    const trailEl = trailRef.current;
    const letterEls = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    const statEls = statCardsRef.current.filter(Boolean) as HTMLDivElement[];

    // ---------------------------------------------------------------
    // 1. INITIAL LOAD ANIMATION (Requirement #2)
    // Headline appears smoothly (staggered reveal)
    // Statistics animate in one by one with subtle delay
    // ---------------------------------------------------------------
    const introTl = gsap.timeline();

    // 1a. Initial Headline entrance: fade + upward slide with stagger
    introTl.fromTo(
      letterEls,
      { opacity: 0, y: 24, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.035,
        ease: "power3.out",
      }
    );

    // 1b. Impact metrics / statistics animate in one-by-one with subtle delay
    introTl.fromTo(
      statEls,
      { opacity: 0, y: 30, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        stagger: 0.15,
        ease: "back.out(1.2)",
      },
      "-=0.3"
    );

    // 1c. Car rolls into start position
    introTl.fromTo(
      carEl,
      { x: -140, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
      "-=0.6"
    );

    // 1d. HUD telemetry entrance
    introTl.fromTo(
      ".telemetry-hud-box",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.4"
    );

    // ---------------------------------------------------------------
    // 2. SCROLL-BASED ANIMATION (Core Feature - Requirement #3)
    // ---------------------------------------------------------------
    const ctx = gsap.context(() => {
      const getDimensions = () => {
        const roadWidth = window.innerWidth;
        const carWidth = carEl.offsetWidth || 220;
        const endX = roadWidth - carWidth - 16;
        return { roadWidth, carWidth, endX };
      };

      let dims = getDimensions();

      const mainScrollTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smooth kinetic interpolation
        pin: trackRef.current,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentX = progress * dims.endX;
          const carFrontX = currentX + dims.carWidth * 0.9;

          // GPU Transform translation for the vehicle
          gsap.set(carEl, { x: currentX });

          // Expand dynamic trail behind car
          gsap.set(trailEl, { width: currentX + dims.carWidth * 0.25 });

          // Per-letter reactive glow as car travels
          letterEls.forEach((letter) => {
            const rect = letter.getBoundingClientRect();
            if (carFrontX >= rect.left) {
              if (!letter.classList.contains("active")) {
                letter.classList.add("active");
                gsap.to(letter, {
                  color: "#45db7d",
                  duration: 0.15,
                  overwrite: "auto",
                });
              }
            } else {
              if (letter.classList.contains("active")) {
                letter.classList.remove("active");
                gsap.to(letter, {
                  color: "#ffffff",
                  duration: 0.15,
                  overwrite: "auto",
                });
              }
            }
          });

          // Milestone triggers for the 4 statistics cards
          const newMilestones = STAT_ITEMS.map((item) => progress >= item.milestone);
          setActiveMilestones(newMilestones);

          // Real-time speed calculation from scroll velocity
          const velocity = Math.abs(self.getVelocity() || 0);
          const computedMph = Math.min(195, Math.round((velocity / 16) + (progress > 0.02 ? 35 : 0)));
          setSpeedMph(computedMph);

          // Gear selector
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
          setCurrentGear(gear);

          const pct = Math.round(progress * 100);
          setProgressPct(pct);
          onScrollProgressUpdate(pct);

          // Engine SFX
          if (soundEnabled) {
            engineSound.setThrottle(Math.min(1, velocity / 2000));
          }
        },
      });

      const handleResize = () => {
        dims = getDimensions();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        mainScrollTrigger.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [soundEnabled, onScrollProgressUpdate]);

  return (
    <div
      ref={containerRef}
      id="hero-scroll-container"
      className="relative w-full h-[280vh] bg-[#0a0c10]"
    >
      {/* Pinned Viewport Hero Section (100vh - Above The Fold) */}
      <div
        ref={trackRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between items-center bg-[#0a0c10] select-none z-10"
      >
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-48 bg-lime-500/5 blur-[100px] rounded-full pointer-events-none" />

        {/* ------------------------------------------------------------- */}
        {/* TOP SECTION: Headline (W E L C O M E   I T Z F I Z Z) */}
        {/* ------------------------------------------------------------- */}
        <div className="w-full max-w-7xl mx-auto pt-20 px-4 sm:px-8 flex flex-col items-center text-center z-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ITZFIZZ DIGITAL EXPERIENCE</span>
          </div>

          {/* Letter-Spaced Headline */}
          <h1
            aria-label="WELCOME ITZFIZZ"
            className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-8 gap-y-2 font-mono font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-[0.25em] sm:tracking-[0.35em] text-white"
          >
            {/* Word 1: W E L C O M E */}
            <span className="inline-flex">
              {HEADLINE_WORD_1.split("").map((letter, i) => (
                <span
                  key={`w1-${i}`}
                  ref={(el) => {
                    lettersRef.current[i] = el;
                  }}
                  className="headline-letter inline-block transition-colors duration-150"
                >
                  {letter}
                </span>
              ))}
            </span>

            {/* Word 2: I T Z F I Z Z */}
            <span className="inline-flex text-emerald-400">
              {HEADLINE_WORD_2.split("").map((letter, i) => (
                <span
                  key={`w2-${i}`}
                  ref={(el) => {
                    lettersRef.current[HEADLINE_WORD_1.length + i] = el;
                  }}
                  className="headline-letter inline-block transition-colors duration-150"
                >
                  {letter}
                </span>
              ))}
            </span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-gray-400 font-sans tracking-wide max-w-xl">
            Precision scroll-scrubbed motion kinematics with kinetic vehicle tracking
          </p>

          {/* ------------------------------------------------------------- */}
          {/* IMPACT METRICS & STATISTICS (Percentages with Short Descriptions) */}
          {/* Below Headline - Animated in on page load (Requirement #1 & #2) */}
          {/* ------------------------------------------------------------- */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full mt-6 max-w-6xl">
            {STAT_ITEMS.map((item, idx) => {
              const isActive = activeMilestones[idx];
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    statCardsRef.current[idx] = el;
                  }}
                  className={`p-3.5 sm:p-4 rounded-2xl shadow-xl transition-all duration-300 transform ${
                    item.colorClass
                  } ${
                    isActive
                      ? `${item.activeBorder} scale-[1.04] -translate-y-1`
                      : "hover:scale-[1.02] opacity-90"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight">
                      {item.pct}
                    </span>
                    <span className="p-1 rounded-lg bg-black/10">
                      {item.icon}
                    </span>
                  </div>
                  <p className="text-xs sm:text-xs font-semibold leading-snug line-clamp-2 text-inherit">
                    {item.label}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider opacity-75">
                    <span>{item.badge}</span>
                    {isActive && (
                      <span className="flex items-center gap-1 font-bold text-emerald-800">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>ACTIVE</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* CENTER ROAD TRACK (With McLaren Supercar and Dynamic Trail) */}
        {/* ------------------------------------------------------------- */}
        <div
          ref={roadRef}
          className="relative w-full h-[150px] sm:h-[180px] road-texture flex items-center overflow-hidden z-20 my-auto shadow-2xl"
        >
          {/* Top Race Curb */}
          <div className="absolute top-0 left-0 right-0 h-2 road-curb-top z-30" />

          {/* Road Center Dashed Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 road-centerline pointer-events-none opacity-40 z-0" />

          {/* Dynamic Green Trail Behind Car */}
          <div
            ref={trailRef}
            className="absolute top-0 left-0 h-full trail-glow z-10 pointer-events-none"
            style={{ width: 0 }}
          />

          {/* Supercar Visual Element (McLaren 720S Top View) */}
          <div
            ref={carRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 will-change-transform flex items-center filter drop-shadow-[0_12px_12px_rgba(0,0,0,0.85)]"
            style={{ height: "100%", width: "auto" }}
          >
            <div className="relative h-[130px] sm:h-[160px] w-[280px] sm:w-[350px] flex items-center">
              <Image
                src="/images/car-top-view.png"
                alt="McLaren 720S Top View"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 280px, 350px"
              />
              {/* Headlight beam */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-16 bg-gradient-to-r from-amber-300/30 to-transparent blur-md rounded-full pointer-events-none" />
            </div>
          </div>

          {/* Bottom Race Curb */}
          <div className="absolute bottom-0 left-0 right-0 h-2 road-curb-bottom z-30" />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* BOTTOM SECTION: Live Telemetry HUD Bar & Scroll Cue */}
        {/* ------------------------------------------------------------- */}
        <div className="w-full max-w-7xl mx-auto pb-6 px-4 sm:px-8 flex flex-col gap-3 z-20">
          <div className="telemetry-hud-box flex items-center justify-between p-3 sm:p-4 rounded-2xl glass-panel shadow-2xl">
            {/* Speedometer */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                <Gauge className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-gray-400">
                  Telemetry Velocity
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-xl sm:text-2xl font-black text-white">
                    {speedMph}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold">
                    MPH
                  </span>
                </div>
              </div>
            </div>

            {/* Gear Indicator */}
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <div className="text-[10px] uppercase font-mono tracking-wider text-gray-400">
                  Transmission
                </div>
                <div className="text-xs font-mono text-gray-300">Dual-Clutch</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center font-mono font-black text-lg text-emerald-400 shadow-inner">
                {currentGear}
              </div>
            </div>

            {/* Scroll Cue / Progress */}
            <div className="w-1/3 sm:w-1/2 max-w-md flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <ArrowDown className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                  <span className="hidden sm:inline">SCROLL TO DRIVE</span>
                </span>
                <span className="text-emerald-400 font-bold">{progressPct}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-800/80 overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-lime-400 transition-all duration-75 rounded-full"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
