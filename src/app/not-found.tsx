import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background glow — top center (animated pulse) */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 h-150 w-150 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,transparent_70%)]"
        style={{ animation: 'glowPulse 4s ease-in-out infinite' }}
      />

      {/* Background glow — bottom right */}
      <div className="pointer-events-none absolute right-[10%] bottom-[10%] h-75 w-75 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 px-8 text-center">
        {/* 404 Number — fade in down + floating */}
        <h1
          className="m-0 text-[clamp(6rem,20vw,12rem)] leading-none font-extrabold tracking-tighter text-red-500"
          style={{
            animation:
              'fadeInDown 0.8s cubic-bezier(0.22,1,0.36,1) both, float 4s ease-in-out 0.8s infinite',
          }}
        >
          404
        </h1>

        {/* Divider — width expand */}
        <div
          className="mx-auto my-6 h-0.5 rounded-full bg-linear-to-r from-red-500 to-purple-500"
          style={{ animation: 'widthExpand 0.6s ease 0.5s both' }}
        />

        {/* Title — fade in up */}
        <h2
          className="mb-3 text-2xl font-semibold tracking-tight"
          style={{ animation: 'fadeInUp 0.7s ease 0.6s both' }}
        >
          الصفحة غير موجودة
        </h2>

        {/* Description — fade in up */}
        <p
          className="text-foreground/70 mx-auto mb-10 max-w-sm leading-relaxed"
          style={{ animation: 'fadeInUp 0.7s ease 0.75s both' }}
        >
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان آخر.
        </p>

        {/* Button — fade in up */}
        <div style={{ animation: 'fadeInUp 0.7s ease 0.9s both' }}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border px-8 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:opacity-85"
          >
            العودة للرئيسية →
          </Link>
        </div>
      </div>
    </main>
  );
}
