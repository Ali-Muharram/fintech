'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Banknote, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface WithdrawalSectionProps {
  withdrawableBalance: number;
}

export function WithdrawalSection({ withdrawableBalance }: WithdrawalSectionProps) {
  const queryClient = useQueryClient();

  const withdrawMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/withdrawals', {
        method: 'POST',
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'فشل طلب السحب');
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success('تم تقديم طلب السحب بنجاح. بانتظار موافقة الإدارة.');
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  });

  if (withdrawableBalance <= 0) return null;

  return (
    <Card className="bg-indigo-600 text-white border-none shadow-xl overflow-hidden">
      <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-right">
          <div className="bg-white/20 p-3 rounded-2xl">
            <Banknote className="size-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold">لديك أموال جاهزة للسحب!</h3>
            <p className="text-indigo-100 text-sm">يمكنك الآن طلب سحب مبلغ ${withdrawableBalance.toLocaleString()}</p>
          </div>
        </div>

        <Button 
          onClick={() => withdrawMutation.mutate()}
          disabled={withdrawMutation.isPending}
          className="bg-white text-indigo-600 hover:bg-white/90 font-bold h-12 px-8 rounded-xl shadow-lg"
        >
          {withdrawMutation.isPending ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            'طلب سحب الأموال الآن'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
