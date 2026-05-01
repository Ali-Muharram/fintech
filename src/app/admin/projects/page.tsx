'use client';

import { useAdminProjects } from '../_hooks/use-admin';
import { DataTable } from '@/app/dashboard/_components/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminProjectsPage() {
  const { data: projects, isLoading } = useAdminProjects();
  const router = useRouter();

  if (isLoading) return <Skeleton className="h-[600px] w-full rounded-2xl" />;

  const formattedProjects = projects?.map((project: any) => ({
    id: project._id,
    name: (
      <Link href={`/admin/projects/${project._id}`} className="text-blue-600 hover:underline font-bold">
        {project.title}
      </Link>
    ),
    client: project.clientName,
    status: project.status,
    price: `$${project.price}`,
    createdAt: new Date(project.createdAt).toLocaleDateString('ar-EG'),
  })) || [];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="text-right">
          <h1 className="text-3xl font-bold tracking-tight">إدارة المشاريع</h1>
          <p className="text-muted-foreground mt-1 text-sm">عرض والتحكم في كافة مشاريع المنصة.</p>
        </div>
      </div>

      <DataTable data={formattedProjects} />

      
      <p className="text-xs text-muted-foreground text-center italic">
        * اضغط على المشروع في لوحة تحكم العميل/المستقل لرؤية التفاصيل الكاملة حالياً، أو سيتم توفير صفحة تفاصيل مخصصة هنا.
      </p>
    </div>
  );
}
