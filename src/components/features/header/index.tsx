'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Shield, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants/navigation';
import { useGSAP } from '@gsap/react';
import { animateHeader } from '@/lib/utils/gsap/header';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      animateHeader(headerRef.current);
    },
    { scope: headerRef }
  );

  return (
    <header
      ref={headerRef}
      className="fixed top-2 left-1/2 z-50 w-full max-w-6xl -translate-x-1/2 px-4"
    >
      {/* Main navigation bar container */}
      <nav className="header-nav border-foreground/10 bg-background/60 flex flex-row-reverse items-center justify-between rounded-lg border px-3 py-3 shadow-2xl backdrop-blur-xl md:px-6">
        {/* Logo Section */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight lg:text-xl">
            ORVIS
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 transition-colors group-hover:bg-indigo-500/20 lg:h-9 lg:w-9">
            <Shield className="h-4 w-4 fill-indigo-500 text-indigo-500 lg:h-5 lg:w-5" />
          </div>
        </Link>

        {/* Navigation Links - Visible on Large Screens */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Buttons - Dynamic based on Session */}
        <div className="hidden items-center gap-4 lg:flex">
          {status === 'loading' ? (
            <div className="h-8 w-24 animate-pulse rounded-xl bg-foreground/10" />
          ) : session ? (
            <Link
              href="/dashboard"
              className="bg-foreground text-background rounded-xl px-5 py-2 text-xs font-bold shadow-[0_0_1.25rem_rgba(255,255,255,0.1)] transition-all hover:opacity-90 active:scale-95"
            >
              لوحة التحكم
            </Link>
          ) : (
            <>
              {/* Animated Border Login Button */}
              <Link
                href="/auth/login"
                className="group relative flex items-center justify-center overflow-hidden rounded-xl p-0.25 transition-all hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--destructive)_0%,var(--sidebar-primary)_50%,var(--destructive)_100%)]" />
                <div className="bg-background text-foreground group-hover:bg-accent/50 relative flex h-full w-full items-center justify-center rounded-xl px-4 py-2 text-xs font-semibold transition-all">
                  تسجيل الدخول
                </div>
              </Link>

              <Link
                href="/auth/register"
                className="bg-foreground text-background rounded-xl px-4 py-2 text-xs font-bold shadow-[0_0_1.25rem_rgba(255,255,255,0.1)] transition-all hover:opacity-90 active:scale-95"
              >
                إنشاء حساب
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-foreground/5 relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-white/10 lg:hidden"
        >
          <div
            className={`transform transition-all duration-300 ${isMenuOpen ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`}
          >
            <Menu size={20} />
          </div>
          <div
            className={`absolute transform transition-all duration-300 ${isMenuOpen ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'}`}
          >
            <X size={20} />
          </div>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="animate-in fade-in slide-in-from-top-4 mt-2 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur-2xl duration-300 lg:hidden">
          {/* Mobile Navigation Links */}
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-sm font-medium text-gray-300 hover:text-white"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Action Buttons */}
          <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
            {session ? (
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="text-background bg-foreground flex items-center justify-center rounded-xl py-2.5 text-xs font-bold shadow-lg"
              >
                لوحة التحكم
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="group relative flex items-center justify-center overflow-hidden rounded-xl p-0.25 transition-all hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--destructive)_0%,var(--sidebar-primary)_50%,var(--destructive)_100%)]" />
                  <div className="bg-background group-hover:bg-accent/50 relative flex h-full w-full items-center justify-center rounded-xl px-4 py-2.5 text-xs font-semibold transition-all">
                    تسجيل الدخول
                  </div>
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-background bg-foreground flex items-center justify-center rounded-xl py-2.5 text-xs font-bold"
                >
                  إنشاء حساب
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
