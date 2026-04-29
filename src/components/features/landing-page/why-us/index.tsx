'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Globe, Percent, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { animateWhyUs } from '@/lib/utils/gsap/why-us';

export default function WhyUs() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      animateWhyUs(container.current);
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="overflow-hidden bg-black px-4 "
      dir="rtl"
    >
      <div className="mx-auto max-w-6xl">
        <div className="section-title mb-12 text-right">
          <div className="mb-4 flex items-center gap-2">
             <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 border border-white/20">
                <CheckCircle2 className="h-4 w-4 text-white" />
             </div>
             <span className="text-[0.625rem] font-bold tracking-[0.2em] text-gray-400 uppercase">
                لماذا نحن
             </span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
            لماذا يختارنا <br /> المستقلون وأصحاب الأعمال؟
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Right Column (Large Tall Card) */}
          <div className="card-right relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-10 lg:order-last">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 z-0 h-64 w-64 bg-indigo-500/10 blur-[6.25rem]"></div>

            <div className="relative z-10 text-right">
              <h3 className="text-foreground mb-5 text-2xl leading-tight font-bold">
                حلول مالية <br /> بلا حدود
              </h3>
              <p className="mb-8 text-[0.8125rem] leading-relaxed text-gray-400">
                نحن لا نوفر فقط الأمان، بل نوفر الحرية المالية للمستقلين عبر
                تذليل عقبات الدفع والتحويل في المنطقة العربية.
              </p>

              <ul className="mb-10 space-y-4">
                {[
                  {
                    text: 'دعم وسائل الدفع المحلية',
                    icon: <CheckCircle2 className="h-4 w-4 text-indigo-400" />,
                  },
                  {
                    text: 'نظام تسوية النزاعات العادل',
                    icon: <Lock className="h-4 w-4 text-indigo-400" />,
                  },
                  {
                    text: 'مراجعة يدوية للملفات قبل الصرف',
                    icon: <CheckCircle2 className="h-4 w-4 text-indigo-400" />,
                  },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="text-foreground/90 flex items-center gap-3 text-[0.8125rem] font-medium"
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10">
              <button className="h-12 w-full rounded-2xl bg-foreground text-sm font-bold text-black shadow-[0_0_1.25rem_rgba(255,255,255,0.1)] transition-colors hover:bg-gray-200 active:scale-95">
                ابدأ رحلتك الآن
              </button>
            </div>
          </div>

          {/* Left Column (Stack of two rows) */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {/* Top Card: Escrow Protection */}
            <div className="card-top group relative flex min-h-80 flex-col items-center gap-8 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-transparent p-8 md:flex-row md:p-12">
              {/* Text Content */}
              <div className="w-full text-right md:w-1/2">
                <h3 className="text-foreground mb-3 text-xl font-bold md:text-2xl">
                  حماية الضمان الذكي
                </h3>
                <p className="mb-5 text-[0.8125rem] leading-relaxed text-gray-400">
                  نظام حجز الأموال يضمن حقك كصاحب عمل ومستقل. لا يتم صرف
                  الميزانية إلا بعد موافقتك التامة على جودة العمل المسلم.
                </p>
                <Link
                  href="/services"
                  className="text-foreground inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
                >
                  عرض الخطط <ArrowRight className="h-4 w-4 rotate-180" />
                </Link>
              </div>
              {/* Animated Black Visa Card Visual */}
              <div className="relative z-10 flex w-full justify-center md:w-1/2">
                <div className="animate-float-card relative drop-shadow-[0_1.25rem_3.125rem_rgba(0,0,0,0.5)] filter">
                  <img
                    src="/images/black-card.png"
                    alt="Orvis Black Card"
                    className="w-48 rounded-2xl border md:w-56"
                  />
                  {/* Subtle Glow behind the card */}
                  <div className="absolute -inset-4 -z-10 rounded-full bg-indigo-500/20 blur-3xl"></div>
                </div>
              </div>
            </div>

            {/* Bottom Row (Two small cards) */}
            <div className="card-bottom-container grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Global Access */}
              <div className="card-bottom group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-8 text-right">
                <div className="relative z-10">
                  <h4 className="text-foreground mb-2 text-lg font-bold">
                    وصول عالمي
                  </h4>
                  <p className="text-muted-foreground text-[0.8125rem]">
                    ادفع واستلم مستحقاتك من أي مكان في الوطن العربي.
                  </p>
                </div>
                <div className="relative mt-6 flex justify-center">
                  <div className="absolute h-32 w-32 animate-pulse rounded-full bg-indigo-500/20 blur-3xl"></div>
                  <Globe className="text-foreground/20 group-hover:text-foreground/40 h-20 w-20 transition-colors duration-500" />
                </div>
              </div>

              {/* Commission Card */}
              <div className="card-bottom group flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-zinc-950 p-8 text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/5 transition-transform group-hover:scale-110">
                  <Percent className="text-foreground h-7 w-7" />
                </div>
                <div className="text-foreground mb-2 text-3xl font-bold">
                  1% فقط
                </div>
                <p className="text-muted-foreground text-[0.8125rem]">
                  أقل عمولة في السوق لضمان أعلى ربحية للمستقلين.
                </p>
                <div className="mt-4 text-[0.5625rem] font-bold tracking-widest text-gray-600 uppercase">
                  Flat Fee Structure
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
