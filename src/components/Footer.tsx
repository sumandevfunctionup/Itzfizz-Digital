import React from "react";
import { Heart, Sparkles, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-30 border-t border-white/10 bg-[#090b0e] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-400">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-400 flex items-center justify-center text-black font-extrabold text-sm">
            IF
          </div>
          <div>
            <div className="font-bold text-white tracking-wide">
              ITZFIZZ Digital
            </div>
            <p className="text-xs text-gray-500">
              Scroll-Driven Hero Section Animation Assignment
            </p>
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
            Next.js 16 (App Router)
          </span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
            React 19
          </span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            GSAP ScrollTrigger
          </span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
            Tailwind CSS v4
          </span>
        </div>

        {/* Action Link */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/sumandevfunctionup/Itzfizz-Digital"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
