'use client';

import Link from 'next/link';
import {
  FacebookIcon,
  XIcon,
  InstagramIcon,
  LinkedinIcon,
} from '@/components/ui/social-icons';

import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 w-full border-t border-white/5 bg-black px-4 pt-20 pb-10">
      <div className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
        {/* Brand Section */}
        <div className="col-span-1 flex flex-col gap-6 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
              <ShieldCheck className="h-6 w-6 text-black" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white uppercase">
              ORVIS
            </span>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-gray-400">
            المنصة العربية الأولى لتأمين التعاملات المالية بين المستقلين وأصحاب
            العمل. نحمي حقوقك ونضمن لك بيئة عمل خالية من الاحتيال.
          </p>
        </div>

        {/* Pages Links */}
        <div className="flex flex-col gap-6">
          <h4 className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase">
            // الصفحات
          </h4>
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href="/"
                className="text-gray-300 transition-colors hover:text-white"
              >
                الرئيسية
              </Link>
            </li>
            <li>
              <Link
                href="/#why-us"
                className="text-gray-300 transition-colors hover:text-white"
              >
                لماذا نحن؟
              </Link>
            </li>
            <li>
              <Link
                href="/#services"
                className="text-gray-300 transition-colors hover:text-white"
              >
                خدماتنا
              </Link>
            </li>
            <li>
              <Link
                href="/#pricing"
                className="text-gray-300 transition-colors hover:text-white"
              >
                الأسعار
              </Link>
            </li>
            <li>
              <Link
                href="/#faq"
                className="text-gray-300 transition-colors hover:text-white"
              >
                الأسئلة الشائعة
              </Link>
            </li>
            <li>
              <Link
                href="/#reviews"
                className="text-gray-300 transition-colors hover:text-white"
              >
                التقييمات
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-6">
          <h4 className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase">
            // التواصل الاجتماعي
          </h4>
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 text-gray-300 transition-colors hover:text-white"
              >
                <FacebookIcon size={18} />
                <span>فيسبوك</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 text-gray-300 transition-colors hover:text-white"
              >
                <XIcon size={18} />
                <span>إكس (تويتر)</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 text-gray-300 transition-colors hover:text-white"
              >
                <InstagramIcon size={18} />
                <span>إنستغرام</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 text-gray-300 transition-colors hover:text-white"
              >
                <LinkedinIcon size={18} />
                <span>لينكد إن</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
        <p className="text-sm text-gray-500">
          جميع الحقوق محفوظة © {currentYear} فينتك
        </p>
        <p className="flex items-center gap-2 text-sm text-gray-500">
          صمم بواسطة{' '}
          <span className="font-medium text-gray-300">cookie's code</span>
        </p>
      </div>
    </footer>
  );
}
