"use client";

import React from "react";
import { Sparkles, Volume2, VolumeX, ArrowDownRight, Compass } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

interface NavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  scrollProgress: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  soundEnabled,
  onToggleSound,
  scrollProgress,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-lime-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-black font-extrabold text-xl tracking-tighter">
            IF
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-wider text-white">
                ITZFIZZ
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-mono hidden sm:block">
              Scroll-Driven Kinetic Experience
            </p>
          </div>
        </div>


        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? "Mute engine audio" : "Enable engine audio"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium glass-pill hover:bg-white/10 transition-all text-gray-200 border border-white/10"
            title="Toggle Engine SFX"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="hidden sm:inline text-emerald-300">SFX ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-gray-400" />
                <span className="hidden sm:inline text-gray-400">SFX OFF</span>
              </>
            )}
          </button>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/sumandevfunctionup/Itzfizz-Digital"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white text-black hover:bg-gray-200 transition-all shadow-md shadow-white/10"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-semibold">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
