import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0c10",
};

export const metadata: Metadata = {
  title: "ITZFIZZ — High-Velocity Scroll-Driven Hero Animation",
  description:
    "An ultra-smooth, 60fps scroll-driven hero section animation built with Next.js, React, GSAP ScrollTrigger, and Tailwind CSS.",
  keywords: [
    "Scroll Animation",
    "GSAP ScrollTrigger",
    "Next.js Hero Animation",
    "Automotive Interactive UI",
    "ITZFIZZ Digital",
  ],
  authors: [{ name: "ITZFIZZ Digital" }],
  openGraph: {
    title: "ITZFIZZ — High-Velocity Scroll-Driven Hero Animation",
    description:
      "Experience fluid, scroll-scrubbed motion physics with per-letter dynamic lighting, trail generation, and telemetry metrics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} dark`}
    >
      <body className="min-h-screen bg-[#0a0c10] text-gray-100 font-sans selection:bg-emerald-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
