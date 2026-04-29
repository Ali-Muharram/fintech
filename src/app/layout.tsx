import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { AppProvider } from '@/components/providers/app-provider';
import Header from '@/components/features/header';
import './globals.css';

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'ORVIS - fintech app',
  description: 'ORVIS - fintech app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} font-(family-name:--font-cairo) antialiased`}
      >
        <Header />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
