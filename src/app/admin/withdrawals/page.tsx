'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Banknote, CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminWithdrawalsPage() {
  const queryClient = useQueryClient();
  const { data: withdrawals, isLoading } = useQuery({
    queryKey: ['admin-withdrawals'],
    queryFn: async () => {
      const response = await fetch('/api/admin/withdrawals');
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    }
  });

  const processMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await fetch('/api/admin/withdrawals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ withdrawalId: id, status }),
      });
      if (!response.ok) throw new Error('Failed to process');
      return response.json();
    },
    onSuccess: () => {
      toast.success('تمت معالجة الطلب بنجاح');
      queryClient.invalidateQueries({ queryKey: ['admin-withdrawals'] });
    },
    onError: () => toast.error('فشل معالجة الطلب'),
  });

  if (isLoading) return <Skeleton className="h-[600px] w-full rounded-2xl" />;

  return (
    <div className="flex flex-col gap-8 text-right">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">إدارة طلبات السحب</h1>
        <p className="text-muted-foreground mt-1 text-sm">مراجعة والموافقة على طلبات سحب الأموال من المستقلين.</p>
      </div>

      <div className="grid gap-4">
        {!withdrawals || withdrawals.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">لا توجد طلبات سحب حالياً.</div>
        ) : (
          withdrawals.map((w: any) => (
            <Card key={w._id} className="border-muted/20">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {w.status === 'Pending' ? (
                    <>
                      <Button 
                        size="sm" 
                        className="bg-teal-600 hover:bg-teal-700"
                        onClick={() => processMutation.mutate({ id: w._id, status: 'Approved' })}
                        disabled={processMutation.isPending}
                      >
                        <CheckCircle className="ml-2 size-4" /> موافقة
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => processMutation.mutate({ id: w._id, status: 'Rejected' })}
                        disabled={processMutation.isPending}
                      >
                        <XCircle className="ml-2 size-4" /> رفض
                      </Button>
                    </>
                  ) : (
                    <Badge variant={w.status === 'Approved' ? 'default' : 'destructive'}>
                      {w.status === 'Approved' ? 'تمت الموافقة' : 'مرفوض'}
                    </Badge>
                  )}
                </div>

                <div className="flex flex-col gap-1 items-end">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-indigo-600">${w.amount}</span>
                    <span className="font-bold">{w.freelancerName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="size-3" />
                    <span>تاريخ الطلب: {new Date(w.requestedAt).toLocaleString('ar-EG')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
