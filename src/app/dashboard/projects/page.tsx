'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  useFreelancerProjects,
} from '@/app/dashboard/my-projects/_hooks/use-projects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ProjectsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 20;

  const { data, isLoading } = useFreelancerProjects({ page, limit, search });

  return (
    <div className="flex flex-col gap-6 p-4 text-right lg:p-8">
      <div className="flex items-center justify-between gap-2">
        <div className="ml-auto flex flex-1 items-center gap-2">
          <div className="relative w-full">
            <Search className="text-muted-foreground absolute top-2.5 right-3 size-4" />
            <Input
              placeholder="بحث في المشاريع..."
              className="pr-9"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="text-right">عنوان المشروع</TableHead>
              <TableHead className="text-right">العميل</TableHead>
              <TableHead className="text-center">الحالة</TableHead>
              <TableHead className="text-right">السعر</TableHead>
              <TableHead className="text-right">تاريخ البدء</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <Loader2 className="mx-auto size-6 animate-spin" />
                </TableCell>
              </TableRow>
            ) : data?.data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-muted-foreground h-24 text-center"
                >
                  لا توجد مشاريع مطابقة للبحث.
                </TableCell>
              </TableRow>
            ) : (
              data?.data.map((project) => (
                <TableRow key={project._id}>
                  <TableCell className="font-semibold">
                    <Link
                      href={`/dashboard/projects/${project._id}`}
                      className="hover:text-teal-500 hover:underline transition-colors"
                    >
                      {project.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {project.clientName}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        project.status === 'Cancelled'
                          ? 'destructive'
                          : project.status === 'Active' ||
                              project.status === 'In Progress'
                            ? 'default'
                            : 'secondary'
                      }
                    >
                      {project.status === 'Pending'
                        ? 'معلق'
                        : project.status === 'Active' ||
                            project.status === 'In Progress'
                          ? 'نشط'
                          : project.status === 'Cancelled'
                            ? 'ملغي'
                            : project.status === 'OnHold'
                              ? 'قيد الانتظار'
                              : 'مكتمل'}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold text-indigo-600">
                    ${project.price}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {new Date(project.createdAt).toLocaleDateString('ar-EG')}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="text-muted-foreground text-sm">
          إجمالي المشاريع: {data?.total || 0}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronRight className="ml-1 size-4" /> السابق
          </Button>
          <span className="text-sm font-medium">صفحة {page}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={!data || data.data.length < limit}
          >
            التالي <ChevronLeft className="mr-1 size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
