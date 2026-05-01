'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  useProjects,
} from '@/app/dashboard/my-projects/_hooks/use-projects';
import { ProjectsTable } from '@/app/dashboard/my-projects/_components/ProjectsTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
} from 'lucide-react';

export default function ProjectsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 20;

  const { data, isLoading } = useProjects({ page, limit, search });

  return (
    <div className="flex flex-col gap-6 p-4 text-right lg:p-8">
      <div className="flex items-center justify-between gap-2">
        <Button variant={'outline'} className="gap-2">
          <Link
            href="/dashboard/my-projects/new"
            className="flex items-center gap-2"
          >
            مشروع جديد
            <Plus className="size-4" />
          </Link>
        </Button>

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

      <ProjectsTable
        projects={data?.data}
        isLoading={isLoading}
      />

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
