'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LayoutGrid, Wallet, ShieldAlert, Banknote, Hourglass } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface StatsCardsProps {
  stats?: any;
  isLoading?: boolean;
}

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  const { data: session } = useSession();
  const isFreelancer = session?.user?.userrole === 'Freelancer';

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
              <Skeleton className="mt-2 h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid gap-4 md:grid-cols-2 ${isFreelancer ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
      {/* Total Projects Card */}
      <Card className="border-teal-500/10 bg-teal-500/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
            إجمالي المشاريع
          </CardTitle>
          <div className="rounded-full bg-teal-500/10 p-2 text-teal-600">
            <LayoutGrid className="size-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-black tracking-tight text-teal-600">
            {stats?.totalProjects || 0}
          </div>
          <div className="mt-3 flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
            <span>مشاريع في حسابك</span>
          </div>
        </CardContent>
      </Card>

      {/* Disputes Card */}
      <Card className="border-amber-500/10 bg-amber-500/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
            النزاعات النشطة
          </CardTitle>
          <div className="rounded-full bg-amber-500/10 p-2 text-amber-600">
            <ShieldAlert className="size-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-black tracking-tight text-amber-600">
            {stats?.activeDisputes || 0}
          </div>
          <p className="mt-3 text-[10px] text-muted-foreground font-medium">
            بانتظار مراجعة الإدارة
          </p>
        </CardContent>
      </Card>

      {!isFreelancer ? (
        /* Client: Total Spent */
        <Card className="border-blue-500/10 bg-blue-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
              الأموال المنفقة
            </CardTitle>
            <div className="rounded-full bg-blue-500/10 p-2 text-blue-600">
              <Wallet className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tight text-blue-600">
              ${stats?.totalSpent?.toLocaleString() || '0.00'}
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground font-medium">
              إجمالي مبالغ المشاريع
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Freelancer: Pending Balance */}
          <Card className="border-blue-500/10 bg-blue-500/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
                الأموال المتوقفة
              </CardTitle>
              <div className="rounded-full bg-blue-500/10 p-2 text-blue-600">
                <Hourglass className="size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black tracking-tight text-blue-600">
                ${stats?.pendingBalance?.toLocaleString() || '0.00'}
              </div>
              <p className="mt-3 text-[10px] text-muted-foreground font-medium">
                بانتظار الإتمام أو مرور 24 ساعة
              </p>
            </CardContent>
          </Card>

          {/* Freelancer: Withdrawable Balance */}
          <Card className="border-indigo-500/10 bg-indigo-500/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
                قابلة للسحب
              </CardTitle>
              <div className="rounded-full bg-indigo-500/10 p-2 text-indigo-600">
                <Banknote className="size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black tracking-tight text-indigo-600">
                ${stats?.withdrawableBalance?.toLocaleString() || '0.00'}
              </div>
              <p className="mt-3 text-[10px] text-muted-foreground font-medium">
                متاحة للتحويل إلى حسابك
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
