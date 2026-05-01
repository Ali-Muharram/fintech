'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Send, ArrowRight, ShieldAlert, User, Shield } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export default function DisputeChatPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: dispute, isLoading } = useQuery({
    queryKey: ['dispute', id],
    queryFn: async () => {
      const response = await fetch(`/api/disputes/${id}`);
      if (!response.ok) throw new Error('Failed to fetch dispute');
      return response.json();
    },
    refetchInterval: 5000, // Refresh every 5 seconds
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
      queryClient.invalidateQueries({ queryKey: ['dispute', id] });
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowRight className="size-4" />
          رجوع
        </Button>
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{dispute.projectName}</h1>
            <p className="text-muted-foreground text-xs">نزاع مفتوح بين {dispute.clientName} و {dispute.freelancerName}</p>
          </div>
          <div className="bg-amber-500/10 p-2.5 rounded-xl text-amber-600">
            <ShieldAlert className="size-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full overflow-hidden">
        {/* Chat Area */}
        <Card className="lg:col-span-3 flex flex-col h-full overflow-hidden border-muted/20">
          <CardHeader className="border-b bg-muted/5 py-3">
            <CardTitle className="text-sm font-bold flex items-center justify-end gap-2">
              مركز المحادثة والحلول
              <div className="size-2 bg-green-500 rounded-full animate-pulse" />
            </CardTitle>
          </CardHeader>
          
          <CardContent 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-muted"
          >
            {dispute.messages.map((msg: any, i: number) => {
              const isMe = msg.senderId === session?.user?.id;
              const isAdmin = msg.senderRole === 'Admin';

              return (
                <div 
                  key={i} 
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className={`flex items-center gap-2 mb-1 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="text-[10px] font-bold text-muted-foreground">{msg.senderName}</span>
                    {isAdmin && <Badge variant="destructive" className="text-[8px] h-4">إدارة</Badge>}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl p-4 text-sm shadow-sm ${
                    isAdmin 
                      ? 'bg-amber-100 text-amber-900 border border-amber-200' 
                      : isMe 
                        ? 'bg-teal-500 text-white rounded-tr-none' 
                        : 'bg-muted text-foreground rounded-tl-none'
                  }`}>
                    {msg.content}
                    <div className={`text-[8px] mt-1 opacity-50 ${isMe ? 'text-right' : 'text-left'}`}>
                      {new Date(msg.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>

          <CardFooter className="border-t p-4 bg-muted/5">
            <form onSubmit={handleSend} className="flex w-full gap-3">
              <Button 
                type="submit" 
                size="icon" 
                className="rounded-xl h-12 w-12 shrink-0 bg-teal-500 hover:bg-teal-600 transition-all active:scale-95"
                disabled={messageMutation.isPending}
              >
                {messageMutation.isPending ? <Skeleton className="size-4 rounded-full" /> : <Send className="size-5 rotate-180" />}
              </Button>
              <Input 
                placeholder="اكتب رسالتك هنا..." 
                className="h-12 rounded-xl bg-background border-muted/20 text-right"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </form>
          </CardFooter>
        </Card>

        {/* Sidebar Info */}
        <div className="space-y-6 overflow-y-auto">
          <Card className="border-muted/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">تفاصيل النزاع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-1 items-end">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">الحالة</span>
                <Badge variant={dispute.status === 'Open' ? 'destructive' : 'default'} className="rounded-full">
                  {dispute.status === 'Open' ? 'نشط وقيد المراجعة' : 'تم الحل'}
                </Badge>
              </div>
              <div className="flex flex-col gap-1 items-end pt-2 border-t">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">الأطراف المعنية</span>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center justify-between text-xs p-2 bg-muted/30 rounded-lg">
                    <span className="font-bold">{dispute.clientName}</span>
                    <span className="text-muted-foreground">العميل</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 bg-muted/30 rounded-lg">
                    <span className="font-bold">{dispute.freelancerName}</span>
                    <span className="text-muted-foreground">المستقل</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-500/5 border-amber-500/20">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-amber-600">
                <Shield className="size-4" />
                <span className="text-xs font-bold">نصيحة الإدارة</span>
              </div>
              <p className="text-[10px] leading-relaxed text-amber-800">
                حاول الوصول لحل ودي مع الطرف الآخر لتسريع عملية فك الحجز عن الأموال. الإدارة تراجع كافة الرسائل هنا.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
