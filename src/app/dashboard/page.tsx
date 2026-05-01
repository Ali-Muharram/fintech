'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTable } from './_components/data-table';
import { StatsCards } from './_components/stats-cards';
import { WithdrawalSection } from './_components/withdrawal-section';

import { useRecentProjects } from '@/app/dashboard/my-projects/_hooks/use-projects';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { data, isLoading: projectsLoading } = useRecentProjects();
  const isFreelancer = session?.user?.userrole === 'Freelancer';

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success('تم نسخ المعرف بنجاح');
  };

  if (status === 'loading') {
    return (
      <div className="flex flex-col gap-6 p-4 lg:p-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-64" />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[140px]" />
          ))}
        </div>
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  // تنسيق البيانات لتناسب الجدول
  const formattedProjects = data?.projects?.map((project: any) => ({
    id: project._id,
    name: project.title,
    client: project.clientName,
    status: project.status,
    price: `$${project.price}`,
    createdAt: new Date(project.createdAt).toLocaleDateString('ar-EG'),
  })) || [];

  return (
    <div className="flex flex-col gap-8 p-4 lg:p-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-right">نظرة عامة</h1>
          <p className="text-muted-foreground mt-1 text-sm text-right">
            أهلاً بك، {session?.user?.name}. إليك ملخص سريع لمشاريعك.
          </p>
        </div>

        <div className="bg-card flex w-fit items-center gap-2 rounded-lg border p-1 shadow-sm">
          <div className="flex flex-col px-3 text-right">
            <span className="text-muted-foreground text-[10px] font-bold uppercase">
              المعرف الخاص بك
            </span>
            <span className="font-mono text-sm font-medium">
              {session?.user?.id?.slice(0, 12)}...
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => copyToClipboard(session?.user?.id || '')}
          >
            <Copy className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Stats Cards Section */}
      <StatsCards stats={data?.stats} isLoading={projectsLoading} />

      {/* Withdrawal Section for Freelancers */}
      {isFreelancer && !projectsLoading && (
        <WithdrawalSection withdrawableBalance={data?.stats?.withdrawableBalance || 0} />
      )}

      {/* Simplified Projects Table */}
      <div className="mt-2 flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold tracking-tight">أحدث المشاريع</h2>
            <p className="text-muted-foreground text-xs">
              قائمة تتبع حالة المشاريع الحالية وقيمتها.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-xl px-4 text-xs font-semibold"
          >
            <Link href="/dashboard/my-projects">عرض الكل</Link>
          </Button>
        </div>
        
        {projectsLoading ? (
          <Skeleton className="h-[300px] w-full rounded-xl" />
        ) : (
          <DataTable data={formattedProjects} />
        )}
      </div>
    </div>
  );
}
