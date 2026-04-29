export default function Loading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* Background glow — top center */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-150 w-150 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,transparent_70%)] animate-pulse" />

      {/* Background glow — bottom right */}
      <div className="pointer-events-none absolute right-[10%] bottom-[10%] h-75 w-75 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Animated Loader */}
        <div className="relative h-20 w-20">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-white/5" />
          {/* Spinning gradient ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]" />
          
          {/* Center pulse */}
          <div className="absolute inset-4 animate-pulse rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-50 blur-sm" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className="animate-pulse text-xl font-bold tracking-tight text-white">
            جاري التحميل
          </h2>
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-500 [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-pink-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
