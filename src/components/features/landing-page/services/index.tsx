'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { animateServices } from '@/lib/utils/gsap/services';
import { ShieldCheck } from 'lucide-react';

const SERVICES_DATA = [
  {
    title: 'حماية الهوية الرقمية',
    description: 'نحافظ على سرية هويتك ومعاملاتك مع أدوات تمنع التتبع وتحمي بياناتك المالية بالكامل.',
    image: '/images/service1.webp',
  },
  {
    title: 'تشفير العمليات المالية',
    description: 'اتصالاتك مشفرة بالكامل، مما يضمن سلامة عمليات التحويل والسحب دون مخاطر تسريب البيانات.',
    image: '/images/service2.webp',
  },
  {
    title: 'بوابة دفع عالمية',
    description: 'ارتبط بالأسواق العالمية واحصل على مستحقاتك من أي مكان، بغض النظر عن القيود البنكية المحلية.',
    image: '/images/service3.webp',
  },
];

export default function Services() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      animateServices(container.current);
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="bg-black px-4 overflow-hidden"
      dir="rtl"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="services-header mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2">
               <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 border border-white/20">
                  <ShieldCheck className="h-4 w-4 text-white" />
               </div>
               <span className="text-[0.625rem] font-bold tracking-[0.2em] text-gray-400 uppercase">
                  مميزات المنصة
               </span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
              اختبر الأمان المالي <br /> بأقصى درجات الخصوصية والتحكم
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-gray-400 lg:mb-2">
            نحن نوفر لك بيئة مالية آمنة تضمن حقوقك وتمنحك تحكماً كاملاً في معاملاتك الدولية والمحلية عبر نظامنا الذكي.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 gap-3 md:grid-cols-3">
          {SERVICES_DATA.map((service, index) => (
            <div
              key={index}
              className="service-card group relative flex min-h-[320px] md:min-h-[400px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-6 md:p-8 transition-all hover:border-white/20"
            >
              {/* Text Content */}
              <div className="relative z-20">
                <h3 className="mb-3 text-lg font-bold text-white md:mb-4 md:text-xl lg:text-2xl">
                  {service.title}
                </h3>
                <p className="text-xs leading-relaxed text-gray-400 md:text-sm">
                  {service.description}
                </p>
              </div>

              {/* Background Image/Visual */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-zinc-950/80 to-transparent z-10" />
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60"
                />
              </div>

              {/* Hover Effect Glow */}
              <div className="absolute -bottom-1/2 -right-1/2 h-64 w-64 rounded-full bg-indigo-500/10 blur-[100px] transition-opacity opacity-0 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
