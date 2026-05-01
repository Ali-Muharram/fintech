'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ShieldAlert, MessageSquare, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function DisputesPage() {
  const { data: session } = useSession();
  const { data: disputes, isLoading } = useQuery({
    queryKey: ['disputes'],
    queryFn: async () => {
      const response = await fetch('/api/disputes');
      if (!response.ok) throw new Error('Failed to fetch disputes');
      return response.json();
    }
  });

  if (isLoading) return <Skeleton className="h-[400px] w-full rounded-2xl" />;

  return (
    <div className="flex flex-col gap-8 text-right">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3 justify-end">
          النزاعات المفتوحة
          <ShieldAlert className="size-8 text-amber-500" />
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">تتبع وحل المشكلات المتعلقة بمشاريعك.</p>
      </div>

      <div className="grid gap-6">
        {!disputes || disputes.length === 0 ? (
          <Card className="border-dashed border-muted/50">
            <CardContent className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <MessageSquare className="size-12 mb-4 opacity-20" />
              <p>لا توجد نزاعات حالية.</p>
            </CardContent>
          </Card>
        ) : (
          disputes.map((dispute: any) => (
            <Link key={dispute._id} href={`/dashboard/disputes/${dispute._id}`}>
              <Card className="hover:bg-muted/50 transition-colors border-muted/20">
                <CardContent className="p-6 flex items-center justify-between">
                  <ArrowLeft className="size-5 text-muted-foreground" />
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 justify-end">
                      <Badge variant={dispute.status === 'Open' ? 'destructive' : 'default'}>
                        {dispute.status === 'Open' ? 'نشط' : 'مغلق'}
                      </Badge>
                      <h3 className="font-bold text-lg">{dispute.projectName}</h3>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>آخر تحديث: {new Date(dispute.updatedAt).toLocaleDateString('ar-EG')}</span>
                      <span className="h-1 w-1 bg-muted-foreground rounded-full" />
                      <span>{session?.user?.userrole === 'Client' ? `المستقل: ${dispute.freelancerName}` : `العميل: ${dispute.clientName}`}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
