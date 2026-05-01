'use client';

import {
  useProject,
  useFreelancerUpdateProject,
} from '@/app/dashboard/my-projects/_hooks/use-projects';
import { useParams, useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Loader2,
  ArrowRight,
  Save,
  Link as LinkIcon,
  ExternalLink,
  GitBranch,
  DollarSign,
  Calendar,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface FormValues {
  projectUrl: string;
  reviewUrl: string;
  milestones: {
    processUrl: string;
    previewUrl: string;
  }[];
}

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: project, isLoading, refetch } = useProject(id as string);
  const updateMutation = useFreelancerUpdateProject();
  const [savingIndex, setSavingIndex] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      projectUrl: '',
      reviewUrl: '',
      milestones: [],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'milestones',
  });

  useEffect(() => {
    if (project) {
      reset({
        projectUrl: project.projectUrl || '',
        reviewUrl: project.reviewUrl || '',
        milestones: project.milestones?.map((m: any) => ({
          processUrl: m.processUrl || '',
          previewUrl: m.previewUrl || '',
        })) || [],
      });
    }
  }, [project, reset]);

  const onSubmit = (data: FormValues) => {
    updateMutation.mutate({ id: id as string, data }, {
      onSettled: () => refetch()
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-teal-500" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">المشروع غير موجود</p>
        <Button variant="outline">
          <Link href="/dashboard/projects">العودة للمشاريع</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-4 text-right lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Link href="/dashboard/projects">
              <ArrowRight className="size-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">تفاصيل المشروع</h1>
        </div>
        <Badge
          className="bg-teal-500/10 px-4 py-1 text-sm font-bold text-teal-500 hover:bg-teal-500/20"
          variant="secondary"
        >
          {project.status === 'Active'
            ? 'نشط'
            : project.status === 'Cancelled'
              ? 'ملغي'
              : project.status === 'Completed'
                ? 'مكتمل'
                : project.status}
        </Badge>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Main Section (Right Side) */}
        <div className="order-1 flex flex-col gap-8 lg:order-1 lg:col-span-8">
          {/* Project Info Card */}
          <Card className="border-muted/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="space-y-8 pt-8">
              <div className="grid gap-3">
                <Label className="flex items-center gap-2 text-sm font-bold text-teal-500">
                  <FileText className="size-4" />
                  عنوان المشروع
                </Label>
                <div className="bg-background/50 border-muted flex h-14 items-center rounded-md border px-4 font-semibold">
                  {project.title}
                </div>
              </div>

              <div className="grid gap-3">
                <Label className="text-sm font-bold text-teal-500">
                  وصف المشروع
                </Label>
                <div className="bg-background/50 border-muted text-foreground min-h-[150px] rounded-md border p-4 leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Milestones Card */}
          <Card className="border-muted/20 bg-card/50 backdrop-blur-sm">
            <CardHeader className="border-muted/20 border-b pb-6">
              <div className="flex items-center gap-2">
                <GitBranch className="size-5 text-teal-500" />
                <CardTitle className="text-xl">
                  مراحل التنفيذ (Milestones)
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-8">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="bg-background/40 border-muted/10 flex flex-col gap-6 rounded-2xl border p-6 transition-all hover:bg-background/60"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex size-10 items-center justify-center rounded-full bg-teal-500/10 text-sm font-bold text-teal-500">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold">{project.milestones?.[index]?.label}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={project.milestones?.[index]?.status === 'Completed' ? 'default' : 'outline'}
                            className={project.milestones?.[index]?.status === 'Completed' ? 'bg-teal-500 text-[10px]' : 'text-[10px]'}
                          >
                            {project.milestones?.[index]?.status === 'Completed' ? 'تم الدفع' : 'قيد الانتظار'}
                          </Badge>
                          {project.milestones?.[index]?.paidAt && project.milestones[index].paidAt! > 0 && (
                            <span className="text-[10px] text-muted-foreground">
                              بتاريخ: {new Date(project.milestones[index].paidAt! * 1000).toLocaleDateString('ar-EG')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <span className="text-lg font-black text-teal-600">
                        ${project.milestones?.[index]?.amount}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 border-t border-muted/10 pt-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label className="text-[10px] font-bold uppercase text-muted-foreground">رابط المعالجة (Process)</Label>
                      <div className="relative">
                        <Input 
                          {...register(`milestones.${index}.processUrl`)}
                          placeholder="https://..."
                          disabled={project.milestones?.[index]?.status === 'Completed'}
                          className="bg-background/50 h-10 pl-9 text-left text-xs disabled:opacity-70"
                        />
                        <LinkIcon className="absolute top-3 left-3 size-3.5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-muted-foreground text-[10px] font-bold uppercase">رابط المعاينة (Preview)</Label>
                      <div className="relative">
                        <Input 
                          {...register(`milestones.${index}.previewUrl`)}
                          placeholder="https://..."
                          disabled={project.milestones?.[index]?.status === 'Completed'}
                          className="bg-background/50 h-10 pl-9 text-left text-xs disabled:opacity-70"
                        />
                        <ExternalLink className="text-muted-foreground absolute top-3 left-3 size-3.5" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    {project.milestones?.[index]?.status === 'Completed' ? (
                      <div className="flex items-center gap-2 text-teal-600 font-bold text-xs bg-teal-500/5 px-4 py-2 rounded-lg border border-teal-500/20">
                        <ShieldCheck className="size-4" />
                        تم تأمين الدفع للمرحلة - الروابط الآن رسمية
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-2 border-teal-500/20 text-teal-600 hover:bg-teal-500/10"
                        onClick={() => {
                          const currentMilestones = getValues('milestones');
                          setSavingIndex(index);
                          updateMutation.mutate({ 
                            id: id as string, 
                            data: { milestones: currentMilestones } 
                          }, {
                            onSettled: () => {
                              setSavingIndex(null);
                              refetch();
                            }
                          });
                        }}
                        disabled={updateMutation.isPending}
                      >
                        {updateMutation.isPending && savingIndex === index ? (
                          <Loader2 className="size-3 animate-spin" />
                        ) : (
                          <>
                            <Save className="size-3" />
                            حفظ روابط المرحلة
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Section (Left Side) */}
        <div className="order-2 flex flex-col gap-6 lg:order-2 lg:col-span-4">
          {/* Security & Summary */}
          <Card className="bg-card/80 overflow-hidden border-teal-500/10 backdrop-blur-md">
            <CardContent className="p-0">
              <div className="flex gap-4 border-b border-teal-500/10 bg-teal-500/5 p-6">
                <ShieldCheck className="size-8 shrink-0 text-teal-500" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-teal-500">
                    حماية المستقل
                  </h4>
                  <p className="text-muted-foreground text-[10px] leading-relaxed">
                    يتم الاحتفاظ بالأموال في حساب وسيط حتى تقوم بتسليم العمل
                    وتأكيده.
                  </p>
                </div>
              </div>

              <div className="space-y-6 p-8">
                <div className="space-y-2 text-center">
                  <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                    إجمالي مستحقاتك
                  </span>
                  <div className="flex items-center justify-center gap-1 text-5xl font-black text-teal-500">
                    <span className="text-2xl font-bold opacity-50">$</span>
                    {project.price}
                  </div>
                </div>

                <div className="border-muted/20 space-y-4 border-t pt-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="size-4" />
                      <span>تاريخ البدء</span>
                    </div>
                    <span className="font-bold">
                      {new Date(project.createdAt).toLocaleDateString('ar-EG')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-muted-foreground flex items-center gap-2">
                      <GitBranch className="size-4" />
                      <span>عدد المراحل</span>
                    </div>
                    <span className="font-bold">
                      {project.milestones?.length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
