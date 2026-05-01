'use client';

import { useParams, useRouter } from 'next/navigation';
import { useProject } from '@/app/dashboard/my-projects/_hooks/use-projects';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Calendar,
  DollarSign,
  User,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

export default function AdminProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: project, isLoading } = useProject(id as string);

  if (isLoading) return <Skeleton className="h-screen w-full rounded-2xl" />;
  if (!project) return <div>المشروع غير موجود</div>;

  return (
    <div className="flex flex-col gap-8 text-right">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowRight className="size-4" />
          رجوع
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            عرض تفاصيل المشروع من منظور الإدارة.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Project Info */}
        <div className="space-y-8 lg:col-span-2">
          <Card className="border-muted/20 bg-card/50">
            <CardHeader>
              <CardTitle>وصف المشروع</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </CardContent>
          </Card>

          <Card className="border-muted/20">
            <CardHeader>
              <CardTitle>المراحل والدفعات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.milestones.map((milestone: any, index: number) => (
                <div
                  key={index}
                  className="bg-background/50 flex flex-col gap-3 rounded-xl border p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left font-bold text-teal-600">
                      ${milestone.amount}
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={
                          milestone.status === 'Completed'
                            ? 'default'
                            : 'outline'
                        }
                      >
                        {milestone.status === 'Completed'
                          ? 'تم الدفع'
                          : 'قيد الانتظار'}
                      </Badge>
                      <span className="font-bold">{milestone.label}</span>
                    </div>
                  </div>
                  {(milestone.previewUrl || milestone.processUrl) && (
                    <div className="flex flex-wrap items-center justify-end gap-4 border-t border-dashed pt-2">
                      {milestone.previewUrl && (
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto gap-2 p-0 font-bold text-blue-600"
                        >
                          <a
                            href={milestone.previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="size-3" />
                            رابط المعاينة
                          </a>
                        </Button>
                      )}
                      {milestone.processUrl && (
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto gap-2 p-0 font-bold text-orange-600"
                        >
                          <a
                            href={milestone.processUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="size-3" />
                            رابط المعالجة
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="border-teal-500/20 bg-teal-500/5">
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-teal-600">
                  ${project.price}
                </span>
                <span className="text-muted-foreground text-xs font-bold uppercase">
                  إجمالي المبلغ
                </span>
              </div>
              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold">{project.clientName}</span>
                  <span className="text-muted-foreground">العميل</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold">{project.freelancerName}</span>
                  <span className="text-muted-foreground">المستقل</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold">
                    {new Date(project.createdAt).toLocaleDateString('ar-EG')}
                  </span>
                  <span className="text-muted-foreground">تاريخ الإنشاء</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {(project.reviewUrl || project.projectUrl) && (
            <Card className="border-indigo-500/20 bg-indigo-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
                  الروابط النهائية للمشروع
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.reviewUrl && (
                  <Button
                    variant="outline"
                    className="h-10 w-full justify-between border-indigo-200 text-xs font-bold text-indigo-700 hover:bg-indigo-100"
                  >
                    <a
                      href={project.reviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>رابط مراجعة العمل</span>
                      <ExternalLink className="size-4" />
                    </a>
                  </Button>
                )}
                {project.projectUrl && (
                  <Button
                    variant="default"
                    className="h-10 w-full justify-between bg-indigo-600 text-xs font-bold hover:bg-indigo-700"
                  >
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>رابط المشروع النهائي</span>
                      <ExternalLink className="size-4" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardContent className="space-y-2 pt-6">
              <div className="flex items-center gap-2 text-sm font-bold text-blue-600">
                <ShieldCheck className="size-4" />
                حالة المشروع: {project.status}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
