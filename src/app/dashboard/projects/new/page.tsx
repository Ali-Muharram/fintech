'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, ProjectFormValues } from '@/lib/schemes/project';
import { useCreateProject } from '@/app/dashboard/my-projects/_hooks/use-projects';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Plus,
  Trash2,
  Loader2,
  ArrowRight,
  UserPlus,
  ShieldCheck,
  GitBranch,
  DollarSign,
} from 'lucide-react';
import Link from 'next/link';

export default function NewProjectPage() {
  const router = useRouter();
  const createMutation = useCreateProject();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      price: 0,
      milestones: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'milestones',
  });

  const milestones = watch('milestones') || [];
  const totalPrice = watch('price') || 0;

  const onSubmit = (data: ProjectFormValues) => {
    createMutation.mutate(data, {
      onSuccess: () => router.push('/dashboard/projects'),
    });
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-4 text-right lg:p-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Link href="/dashboard/projects">
            <ArrowRight className="size-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">إنشاء طلب جديد</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-8 lg:grid-cols-12"
      >
        {/* Main Section (Right Side) */}
        <div className="order-1 flex flex-col gap-8 lg:order-1 lg:col-span-8">
          {/* Project Info Card */}
          <Card className="border-muted/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="space-y-8 pt-8">
              <div className="grid gap-3">
                <Label
                  htmlFor="title"
                  className="text-sm font-bold text-teal-500"
                >
                  عنوان المشروع
                </Label>
                <Input
                  id="title"
                  placeholder="مثال: تطوير متجر إلكتروني متكامل"
                  {...register('title')}
                  className="bg-background/50 border-muted h-14 focus:border-teal-500/50 focus:ring-teal-500/20"
                />
                {errors.title && (
                  <span className="text-destructive text-xs">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="grid gap-3">
                <Label
                  htmlFor="description"
                  className="text-sm font-bold text-teal-500"
                >
                  وصف مختصر
                </Label>
                <Textarea
                  id="description"
                  placeholder="أضف تفاصيل بسيطة حول نطاق العمل..."
                  {...register('description')}
                  className="bg-background/50 border-muted min-h-[150px] focus:border-teal-500/50 focus:ring-teal-500/20"
                />
                {errors.description && (
                  <span className="text-destructive text-xs">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Milestones Card */}
          <Card className="border-muted/20 bg-card/50 backdrop-blur-sm">
            <CardHeader className="border-muted/20 flex flex-row items-center justify-between border-b pb-6">
              <div className="flex items-center gap-2">
                <GitBranch className="size-5 text-teal-500" />
                <CardTitle className="text-xl">
                  تقسيم المبالغ (المراحل)
                </CardTitle>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="gap-1 font-bold text-teal-500 hover:text-teal-400"
                onClick={() => append({ label: '', amount: 0 })}
              >
                <Plus className="size-4" /> إضافة مرحلة جديدة
              </Button>
            </CardHeader>
            <CardContent className="space-y-6 pt-8">
              {fields.length === 0 && (
                <div className="text-muted-foreground rounded-xl border-2 border-dashed py-8 text-center">
                  المراحل اختيارية، يمكنك إضافة مراحل لتقسيم الدفعات.
                </div>
              )}

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="bg-background/40 border-muted/10 group relative flex flex-col gap-4 rounded-2xl border p-5"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label className="text-muted-foreground px-1 text-[10px] font-bold uppercase">
                        اسم المرحلة
                      </Label>
                      <Input
                        placeholder="مثال: تحليل وتصميم الواجهات"
                        {...register(`milestones.${index}.label`)}
                        className="bg-card ring-muted/20 border-none ring-1 focus:ring-teal-500/50"
                      />
                    </div>
                    <div className="relative grid gap-2">
                      <Label className="text-muted-foreground px-1 text-[10px] font-bold uppercase">
                        المبلغ ($)
                      </Label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="0.00"
                          {...register(`milestones.${index}.amount`, {
                            valueAsNumber: true,
                          })}
                          className="bg-card ring-muted/20 border-none pr-8 ring-1 focus:ring-teal-500/50"
                        />
                        <DollarSign className="text-muted-foreground absolute top-2.5 right-2.5 size-4" />
                      </div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="bg-background text-destructive absolute -top-3 -left-3 h-8 w-8 rounded-full border opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Section (Left Side) */}
        <div className="order-2 flex flex-col gap-6 lg:order-2 lg:col-span-4">
          {/* Freelancer ID */}
          <Card className="border-muted/20">
            <CardHeader className="pb-3">
              <Label className="text-muted-foreground text-xs font-bold uppercase">
                المستقل (Freelancer)
              </Label>
            </CardHeader>
            <CardContent>
              <div className="group relative">
                <div className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-teal-500/10 p-2 text-teal-500 transition-colors group-focus-within:bg-teal-500 group-focus-within:text-white">
                  <UserPlus className="size-5" />
                </div>
                <Input
                  id="freelancerId"
                  placeholder="أدخل معرف المستقل (Freelancer ID)"
                  {...register('freelancerId')}
                  className="bg-muted/20 border-muted h-16 pl-14 text-right focus:border-teal-500/50 focus:ring-teal-500/20"
                />
              </div>
              <p className="text-muted-foreground mt-2 px-1 text-[10px]">
                تأكد من إدخال المعرف الصحيح للمستقل لضمان وصول الدعوة له.
              </p>
              {errors.freelancerId && (
                <span className="text-destructive mt-2 block text-xs">
                  {errors.freelancerId.message}
                </span>
              )}
            </CardContent>
          </Card>

          {/* Security Box */}
          <Card className="border-teal-500/20 bg-teal-500/5">
            <CardContent className="flex gap-4 pt-6">
              <ShieldCheck className="size-8 shrink-0 text-teal-500" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-teal-500">
                  ضمان EscrowSafe
                </h4>
                <p className="text-muted-foreground text-[10px] leading-relaxed">
                  تتم حماية كافة المدفوعات في حساب وسيط مؤمن حتى يتم تأكيد
                  استلام العمل من قبلك ومن قبل العميل.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Summary Box */}
          <Card className="bg-card/80 sticky top-8 overflow-hidden border-teal-500/10 shadow-2xl backdrop-blur-md">
            <CardContent className="space-y-8 pt-8">
              <div className="space-y-4 text-center">
                <span className="rounded-full bg-teal-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-teal-500 uppercase">
                  إجمالي مبلغ المشروع
                </span>
                <div className="group relative mt-5">
                  <span className="absolute top-1/2 left-6 -translate-y-1/2 text-4xl font-black text-teal-500/20 transition-colors group-focus-within:text-teal-500">
                    $
                  </span>
                  <Input
                    type="number"
                    {...register('price', { valueAsNumber: true })}
                    className="border-none py-10 text-center text-6xl font-black transition-all hover:scale-105 focus:ring-0"
                  />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-muted-foreground text-[10px] font-medium">
                    رسوم الخدمة (2.5%) غير شاملة
                  </p>
                  <div className="h-1 w-12 rounded-full bg-teal-500/30" />
                </div>
              </div>

              <div className="border-muted/20 space-y-3 border-t pt-6">
                <div className="group flex items-center justify-between text-sm">
                  <div className="text-muted-foreground group-hover:text-foreground flex items-center gap-2 transition-colors">
                    <GitBranch className="size-3.5" />
                    <span>عدد المراحل</span>
                  </div>
                  <span className="rounded-md bg-teal-500/10 px-2 py-0.5 font-bold text-teal-500">
                    {fields.length}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                className="h-16 w-full rounded-2xl bg-teal-500 text-lg font-bold text-white shadow-[0_0_20px_rgba(20,184,166,0.2)] transition-all hover:scale-[1.02] hover:bg-teal-600 hover:shadow-[0_0_25px_rgba(20,184,166,0.4)] active:scale-[0.98]"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? (
                  <Loader2 className="size-6 animate-spin" />
                ) : (
                  <div className="flex items-center gap-2">
                    <span>إنشاء المشروع وحجز الأموال</span>
                    <ArrowRight className="size-5 rotate-180" />
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
