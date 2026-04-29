'use client';

import { useEffect } from 'react';
import { Cairo } from 'next/font/google';
import Link from 'next/link';

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} font-(family-name:--font-cairo) antialiased`}
      >
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
          {/* Background glow — top center */}
          <div className="pointer-events-none absolute top-1/4 left-1/2 h-150 w-150 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.07)_0%,transparent_70%)]" />

          {/* Background glow — bottom right */}
          <div className="pointer-events-none absolute right-[10%] bottom-[10%] h-75 w-75 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.05)_0%,transparent_70%)]" />

          <div className="relative z-10 px-8 text-center">
            {/* Error Icon */}
            <div className="justify-content-center mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-red-500/20 bg-linear-to-br from-red-500/15 to-orange-500/15 text-3xl">
              ⚠️
            </div>

            {/* 500 Number */}

            {/* Divider */}
            <div className="mx-auto my-5 h-0.5 w-20 rounded-full bg-linear-to-r from-red-500 to-orange-500" />

            <h2 className="mb-3 text-2xl font-semibold tracking-tight text-gray-200">
              حدث خطأ ما
            </h2>

            <p className="mx-auto mb-6 max-w-sm leading-relaxed text-gray-500">
              حدث خطأ غير متوقع. تم إشعار فريقنا وهو يعمل على إصلاح المشكلة.
            </p>

            {/* Error message */}
            {error.message && (
              <div className="mx-auto mb-4 max-w-lg rounded-xl border border-red-500/15 bg-red-500/5 px-5 py-3 text-right">
                <p className="mb-1 text-xs font-semibold tracking-widest text-red-400/70 uppercase">
                  رسالة الخطأ
                </p>
                <p className="font-mono text-sm break-all text-red-300">
                  {error.message}
                </p>
              </div>
            )}

            {/* Error digest */}
            {error.digest && (
              <p className="mx-auto mb-8 inline-block rounded-lg border border-white/5 bg-white/3 px-4 py-2 font-mono text-xs text-gray-600">
                معرّف الخطأ: {error.digest}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-br from-red-500 to-orange-500 px-8 py-3 text-sm font-semibold text-white shadow-[0_0_1.875rem_rgba(239,68,68,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:opacity-85"
              >
                ↺ حاول مجدداً
              </button>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-8 py-3 text-sm font-medium text-gray-400 transition-all duration-200 hover:border-white/20 hover:text-gray-200"
              >
                العودة للرئيسية →
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
