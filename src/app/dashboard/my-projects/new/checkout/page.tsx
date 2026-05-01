'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateProject } from '@/app/dashboard/my-projects/_hooks/use-projects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { 
  Loader2, 
  CreditCard, 
  Lock, 
  Hash, 
  CheckCircle2,
  Apple,
  X
} from 'lucide-react';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const router = useRouter();
  const createMutation = useCreateProject();
  const [projectData, setProjectData] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes countdown
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem('pendingProject');
    if (!data) {
      router.push('/dashboard/my-projects/new');
      return;
    }
    setProjectData(JSON.parse(data));

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePay = async () => {
    if (!projectData) return;
    
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    createMutation.mutate(projectData, {
      onSuccess: () => {
        sessionStorage.removeItem('pendingProject');
        toast.success('تم إنشاء المشروع وحجز المبلغ بنجاح!');
        router.push('/dashboard/my-projects');
      },
      onError: () => {
        setIsProcessing(false);
        toast.error('حدث خطأ أثناء إنشاء المشروع');
      }
    });
  };

  if (!projectData) return null;

  const vat = projectData.price * 0.20;
  const total = projectData.price + vat;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 lg:p-8 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden relative border border-slate-100">
        
        {/* Close Button */}
        <button 
          onClick={() => router.back()}
          className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 transition-colors bg-slate-50 p-2 rounded-xl"
        >
          <X className="size-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Main Payment Content */}
          <div className="lg:col-span-8 p-8 lg:p-16 space-y-12">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-200">
                  <CreditCard className="text-white size-6" />
                </div>
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">AceCoin<span className="text-slate-400 font-medium">Pay</span></h1>
              </div>
              
              {/* Timer */}
              <div className="flex gap-1.5">
                {formatTime(timeLeft).split('').map((char, i) => (
                  char === ':' ? (
                    <span key={i} className="text-xl font-bold text-slate-800 py-2">:</span>
                  ) : (
                    <div key={i} className="bg-slate-800 text-white w-9 h-12 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                      {char}
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="space-y-10 max-w-lg">
              
              {/* Card Number */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-lg font-bold text-slate-800">رقم البطاقة</Label>
                    <p className="text-slate-400 text-xs">أدخل الـ 16 رقماً الموجودة على البطاقة</p>
                  </div>
                  <Button variant="ghost" className="text-blue-600 font-bold text-sm gap-2 hover:bg-blue-50">
                    <Lock className="size-4" /> تعديل
                  </Button>
                </div>
                
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-2">
                    <div className="w-8 h-5 bg-orange-500 rounded-sm opacity-80" />
                    <div className="w-8 h-5 bg-yellow-500 rounded-sm -ml-4 opacity-80" />
                  </div>
                  <Input 
                    placeholder="2412 - 7512 - 3412 - 3456" 
                    className="h-16 pl-20 pr-12 text-lg font-mono tracking-[0.2em] border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl bg-slate-50/30"
                  />
                  <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 size-6" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* CVV */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label className="text-lg font-bold text-slate-800">رقم CVV</Label>
                    <p className="text-slate-400 text-xs">الـ 3 أو 4 أرقام خلف البطاقة</p>
                  </div>
                  <div className="relative">
                    <Input 
                      placeholder="327" 
                      className="h-16 text-center text-lg font-bold border-slate-200 focus:border-blue-500 rounded-2xl"
                    />
                    <Hash className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 size-5" />
                  </div>
                </div>

                {/* Expiry */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label className="text-lg font-bold text-slate-800">تاريخ الانتهاء</Label>
                    <p className="text-slate-400 text-xs">أدخل تاريخ انتهاء صلاحية البطاقة</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Input placeholder="09" className="h-16 text-center text-lg font-bold rounded-2xl" />
                    <span className="text-2xl font-light text-slate-300">/</span>
                    <Input placeholder="22" className="h-16 text-center text-lg font-bold rounded-2xl border-blue-500 ring-2 ring-blue-500/10" />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-lg font-bold text-slate-800">كلمة المرور</Label>
                  <p className="text-slate-400 text-xs">أدخل كلمة المرور الديناميكية</p>
                </div>
                <div className="relative">
                  <Input 
                    type="password"
                    placeholder="••••••••" 
                    className="h-16 text-lg font-bold tracking-widest border-slate-200 focus:border-blue-500 rounded-2xl"
                  />
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 size-5" />
                </div>
              </div>

              {/* Pay Button */}
              <Button 
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full h-20 rounded-[24px] bg-blue-600 hover:bg-blue-700 text-xl font-black text-white shadow-2xl shadow-blue-200 transition-all active:scale-95 disabled:opacity-70"
              >
                {isProcessing ? (
                  <Loader2 className="size-8 animate-spin" />
                ) : (
                  "ادفع الآن"
                )}
              </Button>

            </div>
          </div>

          {/* Sidebar / Summary */}
          <div className="lg:col-span-4 bg-slate-50/50 p-8 lg:p-12 flex flex-col justify-between border-l border-slate-100">
            
            <div className="space-y-12">
              {/* Floating Card Mockup */}
              <div className="relative h-64 flex items-center justify-center">
                <div className="absolute top-0 w-16 h-1 bg-blue-500 rounded-full blur-sm" />
                <div className="w-full max-w-[280px] aspect-[1.6/1] bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 flex flex-col justify-between border border-white relative z-10 overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-50 rounded-full opacity-50" />
                  <div className="flex justify-between items-start">
                    <div className="bg-slate-100 w-10 h-8 rounded-md" />
                    <div className="text-slate-400"><Hash className="size-5" /></div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-slate-800 font-bold text-sm">Jonathan Michael</p>
                      <p className="text-slate-400 font-mono text-xs">•••• 3456</p>
                    </div>
                    <div className="flex justify-between items-end">
                       <p className="text-slate-800 font-bold text-xs">09 / 22</p>
                       <div className="flex gap-1">
                        <div className="size-6 bg-orange-500 rounded-full opacity-80" />
                        <div className="size-6 bg-yellow-500 rounded-full -ml-3 opacity-80" />
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details List */}
              <div className="space-y-6 pt-8">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-medium">الشركة</span>
                  <div className="flex items-center gap-2 text-slate-800 font-bold">
                    <div className="bg-slate-800 rounded-full p-0.5 text-white"><Apple className="size-3" /></div>
                    Fintich
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-medium">رقم الطلب</span>
                  <span className="text-slate-800 font-bold">1266201</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-medium">المشروع</span>
                  <span className="text-slate-800 font-bold truncate max-w-[150px]">{projectData.title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-medium">الضريبة (20%)</span>
                  <span className="text-slate-800 font-bold">${vat.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Total Footer */}
            <div className="bg-slate-100/50 rounded-[32px] p-8 space-y-2 border border-slate-100 mt-12">
              <p className="text-slate-400 text-sm font-medium">المبلغ الإجمالي للدفع</p>
              <div className="flex items-baseline justify-between">
                <h2 className="text-3xl font-black text-slate-800 tracking-tighter">
                  {total.toLocaleString()} <span className="text-sm font-bold text-slate-400">USD</span>
                </h2>
                <div className="bg-white p-2 rounded-xl shadow-sm">
                   <CheckCircle2 className="size-5 text-slate-400" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
