'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { REVIEWS_DATA } from '@/lib/constants/reviews';
import { animateReviews } from '@/lib/utils/gsap/reviews';
import { Star, MessageSquare } from 'lucide-react';

export default function Reviews() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      animateReviews(container.current);
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="overflow-hidden bg-black px-4"
      dir="rtl"
      id="reviews"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="reviews-header mb-16 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
              <MessageSquare className="h-4 w-4 text-indigo-400" />
              <span className="text-[0.625rem] font-bold tracking-[0.2em] text-gray-300 uppercase">
                تقييمات العملاء
              </span>
            </div>
          </div>
          <h2 className="mb-6 text-3xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
            موثوقون من قبل المئات <br /> من المستقلين الطموحين
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-400">
            اكتشف لماذا يثق المستخدمون في منصتنا لإتمام معاملاتهم المالية بأمان
            وسرعة وبأقل تكلفة في السوق العربي.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-container grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {REVIEWS_DATA.slice(0, 3).map((review, index) => (
              <div
                key={index}
                className="review-card flex w-[280px] flex-col justify-between rounded-3xl border border-white/10 bg-zinc-950 p-6 transition-all hover:border-white/20 md:w-[350px] md:p-8"
              >
                <div>
                  {/* Stars */}
                  <div className="mb-6 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-white text-white" />
                    ))}
                  </div>
                  {/* Content */}
                  <p className="text-sm leading-relaxed text-gray-300 md:text-base">
                    "{review.content}"
                  </p>
                </div>

                {/* User Info */}
                <div className="mt-8 flex items-center gap-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="h-10 w-10 rounded-full border border-white/10 grayscale md:h-12 md:w-12"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white md:text-base">
                      {review.name}
                    </h4>
                    <p className="text-xs text-gray-500">{review.role}</p>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}
