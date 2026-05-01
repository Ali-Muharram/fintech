'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ShieldAlert, MessageSquare, ArrowLeft, User, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AdminDisputesPage() {
  const { data: disputes, isLoading } = useQuery({
    queryKey: ['admin-disputes'],
    queryFn: async () => {
      const response = await fetch('/api/admin/disputes');
      if (!response.ok) throw new Error('Failed to fetch admin disputes');
      return response.json();
    }
  });

  if (isLoading) return <Skeleton className="h-[600px] w-full rounded-2xl" />;

  return (
    <div className="flex flex-col gap-8 text-right">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3 justify-end">
          إدارة النزاعات العامة
          <ShieldAlert className="size-8 text-red-600" />
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">مراجعة والتدخل في حل النزاعات بين المستخدمين.</p>
      </div>

      <div className="grid gap-4">
        {!disputes || disputes.length === 0 ? (
          <Card className="border-dashed border-muted/50">
            <CardContent className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <MessageSquare className="size-12 mb-4 opacity-20" />
              <p>لا توجد نزاعات نشطة في المنصة حالياً.</p>
            </CardContent>
          </Card>
        ) : (
          disputes.map((dispute: any) => (
            <Link key={dispute._id} href={`/admin/disputes/${dispute._id}`}>
              <Card className="hover:border-red-500/50 transition-all border-muted/20 shadow-sm group">
                <CardContent className="p-0">
                  <div className="flex items-stretch h-32">
                    {/* Left Action (Now Right because RTL) */}
                    <div className="w-12 bg-muted/20 flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
                      <ExternalLink className="size-5 text-muted-foreground group-hover:text-red-500" />
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <span className="text-xs text-muted-foreground">بتاريخ: {new Date(dispute.createdAt).toLocaleDateString('ar-EG')}</span>
                           <Badge variant={dispute.status === 'Open' ? 'destructive' : 'default'} className="rounded-full px-4 h-6 text-[10px]">
                            {dispute.status === 'Open' ? 'نزاع نشط' : 'تم الحل'}
                          </Badge>
                        </div>
                        <h3 className="font-black text-xl text-slate-800">{dispute.projectName}</h3>
                      </div>
                      
                      <div className="flex items-center gap-6 justify-end text-sm">
                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                          <span className="font-bold text-slate-700">{dispute.freelancerName}</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">المستقل</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                          <span className="font-bold text-slate-700">{dispute.clientName}</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">العميل</span>
                        </div>
                      </div>
                    </div>

                    {/* Left Icon (RTL) */}
                    <div className="w-2 bg-red-600" />
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
