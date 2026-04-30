import * as z from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(2, { message: 'الاسم يجب أن يكون أكثر من حرفين' }),
    email: z.string().email({ message: 'بريد إلكتروني غير صحيح' }),
    password: z
      .string()
      .min(8, { message: 'كلمة السر يجب أن تكون 8 أحرف على الأقل' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'كلمات السر غير متطابقة',
    path: ['confirmPassword'],
  });

export type RegisterValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email({ message: 'بريد إلكتروني غير صحيح' }),
  password: z.string().min(1, { message: 'كلمة السر مطلوبة' }),
});

export type LoginValues = z.infer<typeof loginSchema>;
