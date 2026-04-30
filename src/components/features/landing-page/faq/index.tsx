'use client';

import { useRef, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { animateFAQ } from '@/lib/utils/gsap/faq';
import { cn } from '@/lib/utils/tailwind-merge';
import { FAQ_ITEMS } from '@/lib/constants/faq';

export default function FaqSection() {
  const container = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      animateFAQ(container.current);
    },
    { scope: container }
  );

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={container}
      className="relative w-full bg-black  px-4 overflow-hidden"
      id="faq"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="faq-header flex flex-col items-center text-center gap-6 mb-16">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white">
            لديك أسئلة؟
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            اكتشف لماذا يثق المستخدمون في منصتنا لتوفير حماية مستمرة، وصول سهل، وضمان كامل لحقوقهم المالية.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="faq-items-container flex flex-col gap-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={cn(
                  "faq-item border border-white/10 rounded-2xl transition-all duration-300 overflow-hidden",
                  isOpen ? "bg-white/5 border-white/20" : "bg-white/2 hover:border-white/15"
                )}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between p-6 text-right gap-4 group"
                >
                  <span className={cn(
                    "text-lg font-medium transition-colors",
                    isOpen ? "text-white" : "text-gray-300 group-hover:text-white"
                  )}>
                    {item.question}
                  </span>
                  <div className={cn(
                    "shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all",
                    isOpen ? "bg-white text-black border-white" : "text-gray-400"
                  )}>
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </div>
                </button>
                
                <div 
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed text-base">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative background blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
}
