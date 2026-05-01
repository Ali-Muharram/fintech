'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ShieldAlert } from 'lucide-react';

interface OpenDisputeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: { title: string; reason: string }) => void;
  isLoading: boolean;
  projectName: string;
}

export function OpenDisputeDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  isLoading,
  projectName,
}: OpenDisputeDialogProps) {
  const [title, setTitle] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !reason.trim()) return;
    onConfirm({ title, reason });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] text-right" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 justify-end text-red-600">
            فتح نزاع جديد
            <ShieldAlert className="size-5" />
          </DialogTitle>
          <DialogDescription className="text-right">
            أنت بصدد فتح نزاع للمشروع: <span className="font-bold text-foreground">{projectName}</span>. يرجى تزويدنا بالتفاصيل لمراجعتها من قبل الإدارة.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-bold">عنوان النزاع</Label>
            <Input
              id="title"
              placeholder="مثال: تأخر في التسليم، جودة العمل غير مرضية..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-right"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-sm font-bold">وصف المشكلة (بالتفصيل)</Label>
            <Textarea
              id="reason"
              placeholder="اشرح المشكلة بالتفصيل لمساعدة الإدارة في اتخاذ القرار الصحيح..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[120px] text-right"
              required
            />
          </div>
          
          <DialogFooter className="flex-row-reverse gap-2">
            <Button
              type="submit"
              variant="destructive"
              className="px-8 font-bold"
              disabled={isLoading || !title.trim() || !reason.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="ml-2 size-4 animate-spin" />
                  جاري الفتح...
                </>
              ) : (
                'تأكيد فتح النزاع'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              إلغاء
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
