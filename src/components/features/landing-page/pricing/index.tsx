'use client';

import { useRef } from 'react';
import { Check, ShieldCheck, FileText } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { animatePricing } from '@/lib/utils/gsap/pricing';
import { cn } from '@/lib/utils/tailwind-merge';
import { PRICING_PLANS } from '@/lib/constants/pricing';

export default function PricingSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      animatePricing(container.current);
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative w-full bg-black  px-4 overflow-hidden"
      id="pricing"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="pricing-header flex flex-col items-center text-center gap-10 mb-16">
          <div className="flex flex-col items-center gap-6 max-w-4xl">
            <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md">
              <FileText className="h-4 w-4 text-gray-400" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase">
                نظام العمولة الثابتة
              </span>
            </div>
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.1] text-white">
              شفافية مطلقة وعمولة واحدة بسيطة
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-2">
              <div className="flex items-baseline gap-1">
                <span className="text-6xl font-black text-white">1%</span>
                <span className="text-gray-400 font-medium">فقط</span>
              </div>
              <div className="hidden sm:block h-12 w-px bg-white/10" />
              <p className="text-gray-400 text-base max-w-md leading-relaxed">
                لا توجد اشتراكات شهرية، ولا توجد رسوم خفية. نحن لا نربح إلا عندما تنجز أنت عملك بنجاح وتستلم مستحقاتك.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 border-t border-white/5 pt-8 w-full">
            <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
              نحن هنا لحماية الطرفين؛ نضمن للمستقل أتعابه ولصاحب العمل جودة التنفيذ عبر نظام حجز أموال ذكي يحفظ الحقوق ويمنع التلاعب.
            </p>
            <div className="flex items-center gap-3 text-gray-200 font-semibold bg-white/5 px-6 py-3 rounded-xl border border-white/10">
              <ShieldCheck className="h-6 w-6 text-indigo-400" />
              <span>نظام حماية متكامل وموثوق للطرفين</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-cards-container grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PRICING_PLANS.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "pricing-card relative flex flex-col p-8 rounded-2xl border transition-all duration-500",
                plan.isPopular 
                  ? "bg-linear-to-b from-white/10 to-transparent border-white/20 scale-105 z-20 shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]" 
                  : "bg-white/2 border-white/5 hover:border-white/10"
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-8 left-8">
                  <span className="text-[10px] font-bold bg-white/10 border border-white/10 text-gray-300 px-3 py-1 rounded uppercase tracking-wider">
                    الأكثر طلباً
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-6">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 font-medium">عمولة</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed min-h-12">
                  {plan.description}
                </p>
              </div>

              <div className="h-px w-full bg-white/10 mb-8" />

              <ul className="flex flex-col gap-4 mb-10 grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="h-4 w-4 text-white shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
