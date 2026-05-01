'use client';

import {
  useProject,
  useUpdateProject,
} from '@/app/dashboard/my-projects/_hooks/use-projects';
import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Loader2,
  ArrowRight,
  ExternalLink,
  GitBranch,
  DollarSign,
  Calendar,
  ShieldCheck,
  FileText,
  CheckCircle2,
  AlertCircle,
  Eye,
  ShieldAlert,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ClientProjectDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: project, isLoading, refetch } = useProject(id as string);
  const updateMutation = useUpdateProject();
  const [showFinalLink, setShowFinalLink] = useState(false);

  const disputeMutation = useMutation({
    mutationFn: async (reason: string) => {
      const response = await fetch('/api/disputes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: id, reason }),
      });
      if (!response.ok) throw new Error('Failed to open dispute');
      return response.json();
    },
    onSuccess: (data) => {
      toast.success('تم فتح النزاع بنجاح');
      router.push(`/dashboard/disputes/${data._id}`);
    },
    onError: () => toast.error('فشل فتح النزاع'),
  });

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
          <Link href="/dashboard/my-projects">العودة للمشاريع</Link>
        </Button>
      </div>
    );
  }

  const handleReviewOk = () => {
    setShowFinalLink(true);
    toast.success(
      'تمت مراجعة العمل بنجاح! يمكنك الآن الوصول لرابط المشروع النهائي.'
    );
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-4 text-right lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Link href="/dashboard/my-projects">
              <ArrowRight className="size-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">تفاصيل مشروعي</h1>
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

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Main Section (Right Side) */}
        <div className="order-1 flex flex-col gap-8 lg:order-1 lg:col-span-8">
          {/* Project Info Card */}
          <Card className="border-muted/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="space-y-8 pt-8">
              <div className="grid gap-3">
                <LabelItem
                  label="عنوان المشروع"
                  icon={<FileText className="size-4" />}
                />
                <div className="bg-background/50 border-muted flex h-14 items-center rounded-md border px-4 font-semibold">
                  {project.title}
                </div>
              </div>

              <div className="grid gap-3">
                <LabelItem label="وصف المشروع" />
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
                  مراحل التنفيذ ومراوابط المعاينة
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-8">
              {project.milestones?.map((milestone: any, index: number) => (
                <div
                  key={index}
                  className="bg-background/40 border-muted/10 hover:bg-background/60 flex flex-col gap-4 rounded-2xl border p-5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex size-10 items-center justify-center rounded-full bg-teal-500/10 text-sm font-bold text-teal-500">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold">{milestone.label}</h4>
                        <p className="text-muted-foreground text-xs">
                          المبلغ: ${milestone.amount}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge
                        variant={
                          milestone.status === 'Completed' ? 'default' : 'outline'
                        }
                      >
                        {milestone.status === 'Completed' ? 'تم الدفع' : 'قيد الانتظار'}
                      </Badge>
                      {milestone.paidAt > 0 && (
                        <span className="text-[10px] text-muted-foreground font-medium">
                          تم الدفع في: {new Date(milestone.paidAt * 1000).toLocaleDateString('ar-EG')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="border-muted/10 grid grid-cols-1 gap-4 border-t pt-4 md:grid-cols-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-muted-foreground text-[10px] font-bold uppercase">
                        رابط المعالجة
                      </span>
                      {milestone.status === 'Completed' ? (
                        milestone.processUrl ? (
                          <a
                            href={milestone.processUrl}
                            target="_blank"
                            className="flex items-center gap-2 text-sm font-medium text-teal-600 hover:underline"
                          >
                            <Eye className="size-3.5" /> مشاهدة المعالجة
                          </a>
                        ) : (
                          <span className="text-muted-foreground text-xs italic">
                            لم يتم إضافة رابط المعالجة بعد
                          </span>
                        )
                      ) : (
                        <div className="flex flex-col gap-2">
                          {milestone.processUrl ? (
                            <>
                              <span className="text-muted-foreground flex items-center gap-1 text-[10px] italic">
                                <ShieldCheck className="size-3" />
                                يظهر الرابط بعد إتمام الدفع
                              </span>
                              <Button
                                size="sm"
                                className="h-8 w-fit bg-teal-500 text-[10px] font-bold hover:bg-teal-600"
                                onClick={() => {
                                  const timestampInSeconds = Math.floor(Date.now() / 1000);
                                  const updatedMilestones = project.milestones.map((m: any, i: number) => 
                                    i === index ? { ...m, status: 'Completed', paidAt: timestampInSeconds } : m
                                  );
                                  
                                  const allPaid = updatedMilestones.every((m: any) => m.status === 'Completed');
                                  const updateData: any = { milestones: updatedMilestones };
                                  
                                  if (allPaid) {
                                    updateData.status = 'Completed';
                                    updateData.paidAt = timestampInSeconds;
                                  }

                                  updateMutation.mutate({ 
                                    id: id as string, 
                                    data: updateData 
                                  }, {
                                    onSuccess: () => {
                                      toast.success(`تم دفع مرحلة ${milestone.label} بنجاح`);
                                      if (allPaid) {
                                        toast.success('🎉 تم اكتمال المشروع بالكامل بنجاح!');
                                      }
                                      refetch();
                                    }
                                  });
                                }}
                                disabled={updateMutation.isPending}
                              >
                                {updateMutation.isPending ? (
                                  <Loader2 className="size-3 animate-spin" />
                                ) : (
                                  'إتمام دفع المرحلة وإظهار المعالجة'
                                )}
                              </Button>
                            </>
                          ) : (
                            <div className="bg-muted/20 rounded-md p-2 border border-dashed flex items-center gap-2">
                              <AlertCircle className="size-3 text-muted-foreground" />
                              <span className="text-muted-foreground text-[10px] italic">
                                في انتظار رفع رابط المعالجة من المستقل
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-muted-foreground text-[10px] font-bold uppercase">
                        رابط المعاينة
                      </span>
                      {milestone.previewUrl ? (
                        <a
                          href={milestone.previewUrl}
                          target="_blank"
                          className="flex items-center gap-2 text-sm font-medium text-teal-600 hover:underline"
                        >
                          <ExternalLink className="size-3.5" /> معاينة النتيجة
                        </a>
                      ) : (
                        <span className="text-muted-foreground text-xs italic">
                          لم يتم الإضافة بعد
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Section (Left Side) */}
        <div className="order-2 flex flex-col gap-6 lg:order-2 lg:col-span-4">
          {/* Review & Delivery Card */}
          <Card className="overflow-hidden border-teal-500/20 bg-teal-500/5 shadow-sm">
            <CardHeader className="bg-teal-500/10 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg text-teal-600">
                <CheckCircle2 className="size-5" />
                مراجعة وتسليم المشروع
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-teal-600 uppercase">
                    رابط مراجعة المشروع العام
                  </span>
                  {project.reviewUrl ? (
                    <Button
                      variant="outline"
                      className="w-full gap-2 border-teal-500/20 bg-white text-teal-700"
                    >
                      <a href={project.reviewUrl} target="_blank">
                        <Eye className="size-4" /> مشاهدة المراجعة النهائية
                      </a>
                    </Button>
                  ) : (
                    <div className="bg-muted/30 text-muted-foreground rounded-lg border border-dashed p-4 text-center text-sm">
                      <AlertCircle className="mx-auto mb-2 size-4 opacity-50" />
                      المستقل لم يضف رابط المراجعة بعد
                    </div>
                  )}
                </div>

                {project.reviewUrl && !showFinalLink && (
                  <Button
                    onClick={() => {
                      const timestampInSeconds = Math.floor(Date.now() / 1000);
                      updateMutation.mutate({
                        id: id as string,
                        data: { paidAt: timestampInSeconds, status: 'Completed' }
                      }, {
                        onSuccess: () => {
                          setShowFinalLink(true);
                          toast.success('تمت مراجعة العمل بنجاح! يمكنك الآن الوصول لرابط المشروع النهائي.');
                          refetch();
                        }
                      });
                    }}
                    disabled={updateMutation.isPending}
                    className="h-14 w-full rounded-xl bg-teal-500 font-bold text-white shadow-lg transition-transform hover:bg-teal-600 active:scale-95"
                  >
                    {updateMutation.isPending ? <Loader2 className="size-5 animate-spin mx-auto" /> : "رابط المشاهدة تمام"}
                  </Button>
                )}

                {(showFinalLink || project.status === 'Completed') &&
                  project.projectUrl && (
                    <div className="animate-in fade-in slide-in-from-top-4 space-y-3 duration-500">
                      <span className="text-xs font-bold text-teal-600 uppercase">
                        رابط المشروع النهائي (التحميل)
                      </span>
                      <Button
                        variant="default"
                        className="h-14 w-full gap-2 rounded-xl bg-indigo-600 font-bold text-white shadow-xl hover:bg-indigo-700"
                      >
                        <a href={project.projectUrl} target="_blank">
                          <ExternalLink className="size-5" /> الحصول على المشروع
                        </a>
                      </Button>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>

          {/* Security & Summary */}
          <Card className="bg-card/80 overflow-hidden border-teal-500/10 backdrop-blur-md">
            <CardContent className="p-0">
              <div className="flex gap-4 border-b border-teal-500/10 bg-teal-500/5 p-6">
                <ShieldCheck className="size-8 shrink-0 text-teal-500" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-teal-500">
                    ضمان EscrowSafe
                  </h4>
                  <p className="text-muted-foreground text-[10px] leading-relaxed">
                    لا تقم بالموافقة على رابط المشاهدة إلا إذا كنت راضياً تماماً
                    عن النتيجة. الموافقة تعني جهوزيتك لاستلام الملفات النهائية.
                  </p>
                </div>
              </div>

              <div className="space-y-6 p-8">
                <div className="space-y-2 text-center">
                  <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                    إجمالي السعر المودع
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
                      <span>تاريخ التعاقد</span>
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

                {project.status !== 'Completed' && (
                  <Button
                    variant="ghost"
                    className="w-full text-red-500 hover:bg-red-50 hover:text-red-600 gap-2 font-bold text-xs"
                    onClick={() => {
                      const reason = window.prompt('يرجى إدخال سبب النزاع:');
                      if (reason) disputeMutation.mutate(reason);
                    }}
                    disabled={disputeMutation.isPending}
                  >
                    <ShieldAlert className="size-4" />
                    {disputeMutation.isPending ? 'جاري فتح النزاع...' : 'فتح نزاع على هذا المشروع'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function LabelItem({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return (
    <label className="flex items-center gap-2 text-sm font-bold text-teal-500">
      {icon}
      {label}
    </label>
  );
}
