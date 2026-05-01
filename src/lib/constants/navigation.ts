/**
 * Navigation links for the Header component
 */
export const NAV_LINKS = [
  { name: 'لماذا نحن؟', href: '/#why-us' },
  { name: 'خدماتنا', href: '/#services' },
  { name: 'الأسعار', href: '/#pricing' },
  { name: 'الأسئلة الشائعة', href: '/#faq' },
  { name: 'التقييمات', href: '/#reviews' },
] as const;

export const ROUTE_NAMES: Record<string, string> = {
  "/dashboard": "الرئيسية",
  "/dashboard/projects": "المشاريع",
  "/dashboard/clients": "العملاء",
  "/dashboard/disputes": "النزاعات",
  "/dashboard/settings": "الإعدادات",
  "/dashboard/withdrawals": "سحب الأموال",
};

