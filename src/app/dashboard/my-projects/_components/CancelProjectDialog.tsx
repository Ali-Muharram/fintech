'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface CancelProjectDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function CancelProjectDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  isLoading,
}: CancelProjectDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[400px] text-right" dir="rtl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-destructive text-center">
            إلغاء المشروع
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground pt-2 text-sm leading-relaxed text-center">
            هل أنت متأكد من رغبتك في إلغاء هذا المشروع؟ هذا الإجراء لا يمكن التراجع عنه وسيتم إشعار الأطراف المعنية.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 flex flex-row-reverse items-center gap-3">
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-destructive hover:bg-destructive/90 h-11 flex-1 rounded-xl font-bold text-white shadow-lg transition-all"
          >
            {isLoading ? 'جاري الإلغاء...' : 'نعم، إلغاء المشروع'}
          </AlertDialogAction>
          <AlertDialogCancel className="h-11 flex-1 rounded-xl border-none bg-muted/50 font-bold hover:bg-muted/70 transition-all">
            تراجع
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
