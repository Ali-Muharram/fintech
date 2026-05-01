import { z } from 'zod';

export const milestoneSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1, 'يجب إدخال اسم المرحلة'),
  amount: z.coerce.number().min(0, 'المبلغ يجب أن يكون 0 أو أكثر'),
  processUrl: z.string().url('رابط غير صحيح').optional().or(z.literal('')),
  previewUrl: z.string().url('رابط غير صحيح').optional().or(z.literal('')),
});

export const projectSchema = z.object({
  title: z.string().min(5, 'العنوان يجب أن يكون 5 أحرف على الأقل'),
  description: z.string().min(10, 'الوصف يجب أن يكون 10 أحرف على الأقل'),
  freelancerId: z.string().min(1, 'يجب إدخال معرف المستقل (Freelancer ID)'),
  price: z.coerce.number().min(1, 'يجب إدخال سعر المشروع الإجمالي'),
  milestones: z.array(milestoneSchema).min(1, 'يجب إضافة مرحلة واحدة على الأقل'),
  reviewUrl: z.string().url('رابط غير صحيح').optional().or(z.literal('')),
  projectUrl: z.string().url('رابط غير صحيح').optional().or(z.literal('')),
}).refine((data) => {
  if (data.milestones && data.milestones.length > 0) {
    const totalMilestonesAmount = data.milestones.reduce((sum, m) => sum + m.amount, 0);
    return totalMilestonesAmount === data.price;
  }
  return true;
}, {
  message: 'مجموع مبالغ المراحل يجب أن يساوي سعر المشروع الإجمالي',
  path: ['milestones'],
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
