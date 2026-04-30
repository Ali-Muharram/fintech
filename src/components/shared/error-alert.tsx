import { Ban } from 'lucide-react';
import { cn } from '@/lib/utils/tailwind-merge';

interface ErrorAlertProps {
  title?: string;
  message: string;
  className?: string;
}

export function ErrorAlert({
  title = 'حدث خطأ',
  message,
  className,
}: ErrorAlertProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-2xl border p-3',
        className
      )}
    >
      <div className=" bg-destructive/50 border-destructive flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] text-white">
        <Ban size={26} strokeWidth={2} />
      </div>
      <div className="flex flex-col gap-0.5 text-right">
        <span className="text-base font-bold">{title}</span>
        <span className="text-muted-foreground text-sm font-medium">
          {message}
        </span>
      </div>
    </div>
  );
}
