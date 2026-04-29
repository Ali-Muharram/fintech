'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { animateHero } from '@/lib/utils/gsap/hero';

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      animateHero(container.current);
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-4 py-20 text-center md:py-32"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Moving Fluid Blobs (Color Waves) */}
        <div className="absolute top-[-20%] left-[-10%] h-150 w-150 animate-[wave_20s_linear_infinite] rounded-full bg-indigo-600/20 blur-[7.5rem] will-change-transform" />
        <div className="hide-on-mobile absolute top-[10%] right-[-10%] h-125 w-125 animate-[wave_25s_linear_infinite_reverse] rounded-full bg-teal-500/10 blur-[6.25rem] will-change-transform" />
        <div className="absolute bottom-[-20%] left-[10%] h-175 w-175 animate-[wave_30s_linear_infinite] rounded-full bg-purple-600/15 blur-[8.125rem] will-change-transform" />
        <div className="absolute top-[40%] left-[30%] h-100 w-100 animate-[pulse_15s_ease-in-out_infinite] rounded-full bg-blue-500/10 blur-[6.875rem] will-change-transform" />

        {/* Scrolling Grid Pattern */}
        <div
          className="absolute inset-0 mask-[radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-[0.12]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 0.0625rem, transparent 0.0625rem), linear-gradient(90deg, rgba(255,255,255,0.05) 0.0625rem, transparent 0.0625rem)`,
            backgroundSize: '2.5rem 2.5rem',
            animation: 'scroll 100s linear infinite',
          }}
        />

        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-[0.03] brightness-100 contrast-150" />

        {/* Bottom Fade Gradient for Seamless Transition */}
        <div className="absolute inset-x-0 bottom-0 z-10 h-64 bg-linear-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 flex max-w-5xl flex-col items-center gap-6 md:gap-10">
        {/* Top Badge */}
        <div className="hero-badge flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md md:px-4 md:py-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-indigo-400 md:h-4 md:w-4" />
          <span className="text-[0.5625rem] font-bold tracking-[0.2em] text-gray-300 uppercase md:text-[0.625rem]">
            نظام الضمان الآمن (Escrow)
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="hero-title bg-linear-to-b from-white to-gray-400 bg-clip-text px-2 text-[clamp(2rem,10vw,5.5rem)] leading-[1.15] font-black tracking-tight text-transparent">
          اضمن حقك المالي <br className="hidden sm:block" /> وانجز مشاريعك بأمان
        </h1>

        {/* Description */}
        <p className="hero-description mx-auto max-w-2xl px-4 text-base leading-relaxed text-gray-400 md:text-xl">
          المنصة العربية الأولى لمكافحة الاحتيال والعملاء الوهميين. نحمي المستقل
          وصاحب العمل عبر نظام حجز الأموال، مع دعم كامل للتحويلات المحلية وعمولة
          1% فقط.
        </p>

        {/* Action Buttons */}
        <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/register"
            className="hero-btn group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-8 font-bold text-black transition-all hover:bg-gray-200 active:scale-95 sm:w-auto"
          >
            ابدأ الآن
            <ArrowRight className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
          </Link>
          <Link
            href="/learn-more"
            className="hero-btn flex h-12 w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 font-semibold text-white transition-all hover:bg-white/10 active:scale-95 sm:w-auto"
          >
            كيف نحميك؟
          </Link>
        </div>
      </div>
    </section>
  );
}
