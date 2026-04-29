'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants/navigation';

export default function Header() {
  // حالة التحكم في فتح وإغلاق قائمة الموبايل
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-6 left-1/2 z-50 w-full max-w-6xl -translate-x-1/2 px-4">
      {/* الحاوية الرئيسية للـ Nav */}
      <nav className="flex flex-row-reverse items-center justify-between rounded-2xl border border-white/10 bg-black/60 px-6 py-3 shadow-2xl backdrop-blur-xl">
        {/* قسم الشعار (Logo) */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 transition-colors group-hover:bg-indigo-500/20">
            <Shield className="h-5 w-5 fill-indigo-500 text-indigo-500" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            ORVIS
          </span>
        </Link>

        {/* روابط التنقل - تظهر في الشاشات الكبيرة فقط */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* أزرار الإجراءات (تسجيل الدخول / إنشاء حساب) - الشاشات الكبيرة */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className="text-xs font-semibold text-white transition-colors hover:text-indigo-400"
          >
            تسجيل الدخول
          </Link>
          <Link
            href="/register"
            className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:bg-gray-200 active:scale-95"
          >
            إنشاء حساب
          </Link>
        </div>

        {/* زر القائمة للموبايل - يظهر في الشاشات الصغيرة فقط */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* القائمة المنسدلة للموبايل (Mobile Menu) */}
      {isMenuOpen && (
        <div className="animate-in fade-in slide-in-from-top-4 mt-4 flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/80 p-6 backdrop-blur-2xl duration-300 lg:hidden">
          {/* روابط القائمة للموبايل */}
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-medium text-gray-300 hover:text-white"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* أزرار الإجراءات في قائمة الموبايل */}
          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
            <Link
              href="/login"
              className="flex h-10 items-center justify-center rounded-xl border border-white/10 text-xs text-white"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/register"
              className="flex h-10 items-center justify-center rounded-xl bg-white text-xs font-bold text-black"
            >
              إنشاء حساب
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
