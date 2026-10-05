"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ScrollHero } from "@/components/ScrollHero";
import { Footer } from "@/components/Footer";
import { engineSound } from "@/utils/engineAudio";

export default function Home() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleSound = () => {
    if (!soundEnabled) {
      engineSound.init();
      setSoundEnabled(true);
    } else {
      engineSound.stop();
      setSoundEnabled(false);
    }
  };

  useEffect(() => {
    return () => {
      engineSound.stop();
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0a0c10] text-white selection:bg-emerald-400 selection:text-black">
      {/* Fixed Navigation Header */}
      <Navbar
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        scrollProgress={scrollProgress}
      />

      {/* Primary Scroll-Driven Hero Animation Section */}
      <ScrollHero
        soundEnabled={soundEnabled}
        onScrollProgressUpdate={setScrollProgress}
      />

      {/* Footer */}
      <Footer />
    </main>
  );
}
