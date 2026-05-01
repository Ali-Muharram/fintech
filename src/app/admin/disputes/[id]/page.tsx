'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Send, ArrowRight, ShieldAlert, User, Shield, CheckCircle2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export default function AdminDisputeChatPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: dispute, isLoading } = useQuery({
    queryKey: ['admin-dispute', id],
    queryFn: async () => {
      const response = await fetch(`/api/disputes/${id}`);
      if (!response.ok) throw new Error('Failed to fetch dispute');
      return response.json();
    },
    refetchInterval: 3000,
  });

  const messageMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await fetch(`/api/disputes/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) throw new Error('Failed to send message');
      return response.json();
    },
    onSuccess: () => {
      setNewMessage('');
      queryClient.invalidateQueries({ queryKey: ['admin-dispute', id] });
    },
    onError: () => toast.error('فشل إرسال الرسالة'),
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [dispute?.messages]);

  if (isLoading) return <Skeleton className="h-screen w-full rounded-2xl" />;
  if (!dispute) return <div className="text-center py-20 font-bold">النزاع غير موجود</div>;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || messageMutation.isPending) return;
    messageMutation.mutate(newMessage);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] gap-6 text-right">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowRight className="size-4" />
          رجوع للقائمة
        </Button>
        <div className="flex items-center gap-4">
          <Badge variant="destructive" className="h-8 px-4 font-black tracking-widest uppercase text-[10px]">الإدارة والتحكيم</Badge>
          <div className="text-right">
            <h1 className="text-2xl font-black text-slate-800">{dispute.projectName}</h1>
            <p className="text-muted-foreground text-xs font-medium">مراجعة الخلاف الرقمي #{id?.slice(-6)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full overflow-hidden">
        <Card className="lg:col-span-3 flex flex-col h-full overflow-hidden border-red-500/20 shadow-2xl shadow-red-500/5">
          <CardHeader className="border-b bg-red-500/[0.02] py-4">
            <CardTitle className="text-sm font-black flex items-center justify-end gap-3 text-red-600 uppercase tracking-tighter">
              قناة التحكيم المباشرة
              <div className="size-2.5 bg-red-600 rounded-full animate-ping" />
            </CardTitle>
          </CardHeader>
          
          <CardContent ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-[url('/grid.svg')] bg-repeat">
            {dispute.messages.map((msg: any, i: number) => {
              const isAdmin = msg.senderRole === 'Admin';
              const isClient = msg.senderRole === 'Client';

              return (
                <div key={i} className={`flex flex-col ${isAdmin ? 'items-center' : isClient ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 mb-1.5 px-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">{msg.senderName}</span>
                    <Badge variant={isAdmin ? 'destructive' : 'outline'} className="text-[8px] h-4 font-black uppercase">
                      {msg.senderRole}
                    </Badge>
                  </div>
                  <div className={`max-w-[75%] rounded-[24px] p-5 text-[13px] leading-relaxed shadow-xl border ${
                    isAdmin 
                      ? 'bg-red-600 text-white border-red-700 shadow-red-200' 
                      : isClient 
                        ? 'bg-white text-slate-800 rounded-tr-none border-slate-100' 
                        : 'bg-teal-600 text-white rounded-tl-none border-teal-700 shadow-teal-100'
                  }`}>
                    {msg.content}
                    <div className="text-[9px] mt-2 opacity-50 font-bold uppercase tracking-widest">
                      {new Date(msg.createdAt).toLocaleTimeString('ar-EG')}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>

          <CardFooter className="border-t p-6 bg-slate-50/50">
            <form onSubmit={handleSend} className="flex w-full gap-4">
              <Button type="submit" size="lg" className="rounded-2xl px-8 bg-red-600 hover:bg-red-700 font-black tracking-widest uppercase transition-all active:scale-95" disabled={messageMutation.isPending}>
                {messageMutation.isPending ? <Skeleton className="size-5" /> : 'إرسال قرار الإدارة'}
              </Button>
              <Input 
                placeholder="اكتب رسالة التحكيم أو القرار النهائي هنا..." 
                className="h-14 rounded-2xl bg-white border-slate-200 text-right font-medium shadow-inner"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </form>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card className="border-red-500/10 shadow-lg">
            <CardHeader className="pb-2 border-b bg-slate-50/50">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">أدوات التحكم</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
               <div className="space-y-4">
                 <Button className="w-full h-12 rounded-xl bg-teal-600 hover:bg-teal-700 gap-2 font-bold text-xs" onClick={() => toast.info('جاري تطوير ميزة حل النزاع')}>
                   <CheckCircle2 className="size-4" />
                   إغلاق وحل النزاع
                 </Button>
                 <Button variant="outline" className="w-full h-12 rounded-xl border-red-200 text-red-600 hover:bg-red-50 gap-2 font-bold text-xs">
                   <ShieldAlert className="size-4" />
                   تحذير الأطراف
                 </Button>
               </div>

               <div className="pt-6 border-t space-y-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase">الميزانية المتنازع عليها</span>
                    <div className="text-2xl font-black text-red-600">${dispute.projectId?.price || '0.00'}</div>
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
