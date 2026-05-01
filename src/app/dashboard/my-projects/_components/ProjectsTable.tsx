'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, XCircle, Loader2, ShieldAlert } from 'lucide-react';
import { Project } from '@/lib/types/project';
import { useCancelProject } from '@/app/dashboard/my-projects/_hooks/use-projects';
import { OpenDisputeDialog } from './OpenDisputeDialog';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CancelProjectDialog } from './CancelProjectDialog';

interface ProjectsTableProps {
  projects: Project[] | undefined;
  isLoading: boolean;
}

export function ProjectsTable({ projects, isLoading }: ProjectsTableProps) {
  const cancelMutation = useCancelProject();
  const [projectToCancel, setProjectToCancel] = useState<string | null>(null);
  const [disputeProject, setDisputeProject] = useState<Project | null>(null);
  const router = useRouter();

  const disputeMutation = useMutation({
    mutationFn: async ({ projectId, title, reason }: { projectId: string; title: string; reason: string }) => {
      const response = await fetch('/api/disputes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, title, reason }),
      });
      if (!response.ok) throw new Error('Failed to open dispute');
      return response.json();
    },
    onSuccess: (data) => {
      toast.success('تم فتح النزاع بنجاح');
      router.push(`/dashboard/disputes/${data._id}`);
    },
    onError: () => {
      toast.error('فشل فتح النزاع');
    }
  });

  const handleCancelConfirm = () => {
    if (projectToCancel) {
      cancelMutation.mutate(projectToCancel, {
        onSuccess: () => setProjectToCancel(null),
      });
    }
  };

  const handleDisputeConfirm = ({ title, reason }: { title: string; reason: string }) => {
    if (disputeProject) {
      disputeMutation.mutate({ projectId: disputeProject._id, title, reason });
    }
  };

  return (
    <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="text-right">عنوان المشروع</TableHead>
            <TableHead className="text-right">المستقل</TableHead>
            <TableHead className="text-center">الحالة</TableHead>
            <TableHead className="text-right">السعر</TableHead>
            <TableHead className="text-right">تاريخ البدء</TableHead>
            <TableHead className="text-center">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                <Loader2 className="mx-auto size-6 animate-spin" />
              </TableCell>
            </TableRow>
          ) : projects?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-muted-foreground h-24 text-center"
              >
                لا توجد مشاريع مطابقة للبحث.
              </TableCell>
            </TableRow>
          ) : (
            projects?.map((project) => (
              <TableRow key={project._id}>
                <TableCell className="font-semibold">
                  <Link
                    href={`/dashboard/my-projects/${project._id}`}
                    className="hover:text-teal-500 hover:underline transition-colors"
                  >
                    {project.title}
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground font-mono text-xs">
                  {project.freelancerName}
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
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    {project.status !== 'Cancelled' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                        title="فتح نزاع"
                        onClick={() => setDisputeProject(project)}
                        disabled={disputeMutation.isPending}
                      >
                        <ShieldAlert className="size-4" />
                      </Button>
                    )}
                    {project.status !== 'Cancelled' && (() => {
                      const allMilestonesPaid = project.milestones.length > 0 && 
                        project.milestones.every((m: any) => m.status === 'Completed');
                      
                      if (allMilestonesPaid) return (
                        <span className="text-[10px] text-teal-600 font-bold bg-teal-50 px-2 py-1 rounded border border-teal-100">
                          مشروع مؤمن بالكامل
                        </span>
                      );

                      return (
                        <>
                          <Button variant="ghost" size="icon">
                            <Link
                              href={`/dashboard/my-projects/${project._id}/edit`}
                            >
                              <Edit className="size-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => setProjectToCancel(project._id)}
                          >
                            <XCircle className="size-4" />
                          </Button>
                        </>
                      );
                    })()}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <CancelProjectDialog
        isOpen={!!projectToCancel}
        onOpenChange={(open) => !open && setProjectToCancel(null)}
        onConfirm={handleCancelConfirm}
        isLoading={cancelMutation.isPending}
      />

      <OpenDisputeDialog
        isOpen={!!disputeProject}
        onOpenChange={(open) => !open && setDisputeProject(null)}
        onConfirm={handleDisputeConfirm}
        isLoading={disputeMutation.isPending}
        projectName={disputeProject?.title || ''}
      />
    </div>
  );
}
