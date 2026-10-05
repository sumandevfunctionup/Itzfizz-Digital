"use client";

import React, { useState } from "react";
import {
  Cpu,
  Layers,
  Zap,
  RotateCcw,
  Sparkles,
  CheckCircle,
  ExternalLink,
  Code2,
  Sliders,
  Terminal,
} from "lucide-react";

export const FeatureShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"architecture" | "benchmark">("architecture");

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative z-30 py-24 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRODUCTION-GRADE MOTION ENGINEERING</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
          Architected for 60FPS Fluidity & Sub-Millisecond Precision
        </h2>
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
          Inspired by the original reference, this implementation leverages modern React 19,
          Next.js App Router, and GSAP ScrollTrigger hardware acceleration to eliminate
          layout thrashing and deliver an unforgettable interactive experience.
        </p>

        {/* Action Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={scrollToHero}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-400 text-black font-bold text-sm hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-400/20 hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Hero Experience</span>
          </button>
          <a
            href="https://paraschaturvedi.github.io/car-scroll-animation/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full glass-panel text-white font-medium text-sm hover:bg-white/10 transition-all border border-white/10"
          >
            <span>View Original Reference</span>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center p-1.5 rounded-2xl glass-panel">
          <button
            onClick={() => setActiveTab("architecture")}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "architecture"
                ? "bg-white text-black shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Core Architecture Pillars
          </button>
          <button
            onClick={() => setActiveTab("benchmark")}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "benchmark"
                ? "bg-white text-black shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Reference vs. Elevated Matrix
          </button>
        </div>
      </div>

      {activeTab === "architecture" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl glass-panel relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Transform-Only Scrubbing
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              All dynamic offsets utilize GPU-promoted <code className="text-emerald-400 bg-emerald-950/40 px-1 py-0.5 rounded text-xs font-mono">translateX</code> and <code className="text-emerald-400 bg-emerald-950/40 px-1 py-0.5 rounded text-xs font-mono">opacity</code> properties, preventing expensive DOM reflows on high-frequency scroll events.
            </p>
            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-gray-500">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero layout recalculations</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl glass-panel relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Dynamic Collision Detection
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Letters compute their relative horizontal coordinates seamlessly on mount and window resize. When the vehicle’s leading front bumper reaches each character, instant activation occurs without frame drops.
            </p>
            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-gray-500">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Debounced resize observer</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl glass-panel relative overflow-hidden group hover:border-yellow-500/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Vercel & Next.js 16 Ready
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Engineered with modern Next.js App Router, SSR safety checks, strict TypeScript interfaces, and zero-bundle CSS using Tailwind CSS v4 for lightning-fast Edge deployments.
            </p>
            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-gray-500">
              <CheckCircle className="w-3.5 h-3.5 text-yellow-400" />
              <span>100% Turbopack compatible</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl glass-panel overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-4 sm:p-5 font-semibold text-gray-300">Feature</th>
                  <th className="p-4 sm:p-5 font-semibold text-gray-400">Reference Demo</th>
                  <th className="p-4 sm:p-5 font-semibold text-emerald-400">ITZFIZZ Next.js Production</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300 font-mono text-xs sm:text-sm">
                <tr>
                  <td className="p-4 sm:p-5 font-sans font-medium text-white">Scroll Scrubbing</td>
                  <td className="p-4 sm:p-5 text-gray-400">Standard scrub: true</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-semibold">scrub: 1 (Kinetic momentum smoothing)</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-sans font-medium text-white">Initial Load Animation</td>
                  <td className="p-4 sm:p-5 text-gray-400">Static until scrolled</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-semibold">Staggered intro timeline + car roll-in</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-sans font-medium text-white">Telemetry & HUD</td>
                  <td className="p-4 sm:p-5 text-gray-400">None</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-semibold">Live MPH, Dynamic Gearbox, Progress Bar</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-sans font-medium text-white">Audio Synthesis</td>
                  <td className="p-4 sm:p-5 text-gray-400">None</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-semibold">Web Audio API Supercar throttle pitch</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-sans font-medium text-white">Deployment Pipeline</td>
                  <td className="p-4 sm:p-5 text-gray-400">Vanilla GitHub Pages</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-semibold">1-Click Vercel / Next.js CI/CD Edge Ready</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};
