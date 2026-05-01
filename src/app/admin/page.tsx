'use client';

import { useSession } from 'next-auth/react';
import { useAdminStats } from './_hooks/use-admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, UserCheck, FolderKanban, ShieldAlert, TrendingUp } from 'lucide-react';
import { DataTable } from '../dashboard/_components/data-table';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const { data, isLoading } = useAdminStats();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-[400px] w-full rounded-2xl" />
      </div>
    );
  }

  const formattedProjects = data?.recentProjects?.map((project: any) => ({
    id: project._id,
    name: project.title,
    client: project.clientName,
    status: project.status,
    price: `$${project.price}`,
    createdAt: new Date(project.createdAt).toLocaleDateString('ar-EG'),
  })) || [];

  return (
    <div className="flex flex-col gap-8 text-right">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">لوحة تحكم المدير</h1>
        <p className="text-muted-foreground mt-1 text-sm">مرحباً بك في وحدة التحكم المركزية للمنصة.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Profit Card */}
        <Card className="bg-amber-500/5 border-amber-500/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-amber-600">أرباح الموقع (1%)</CardTitle>
            <TrendingUp className="size-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-amber-600">
              ${data?.stats?.siteProfit?.toLocaleString() || '0.00'}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-500/5 border-blue-500/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-blue-600">إجمالي العملاء</CardTitle>
            <Users className="size-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-blue-600">{data?.stats?.totalClients}</div>
          </CardContent>
        </Card>

        <Card className="bg-teal-500/5 border-teal-500/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-teal-600">إجمالي المستقلين</CardTitle>
            <UserCheck className="size-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-teal-600">{data?.stats?.totalFreelancers}</div>
          </CardContent>
        </Card>

        <Card className="bg-indigo-500/5 border-indigo-500/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-indigo-600">إجمالي المشاريع</CardTitle>
            <FolderKanban className="size-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-indigo-600">{data?.stats?.totalProjects}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects Table */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <Button variant="outline" size="sm" >
            <Link href="/admin/projects">عرض كافة المشاريع</Link>
          </Button>
          <h2 className="text-xl font-bold tracking-tight">أحدث المشاريع في المنصة</h2>
        </div>
        <DataTable data={formattedProjects} />
      </div>
    </div>
  );
}
