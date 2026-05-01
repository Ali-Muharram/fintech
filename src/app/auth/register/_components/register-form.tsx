'use client';

import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils/tailwind-merge';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { registerSchema, type RegisterValues } from '@/lib/schemes/auth';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useRegister } from '../_hooks/use-register';
import { zodResolver } from '@hookform/resolvers/zod';

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterValues) => {
    registerMutation.mutate(data, {
      onSuccess: async () => {
        // Automatically sign in after registration
        const loginResult = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (loginResult?.ok) {
          alert('تم إنشاء الحساب وتسجيل الدخول بنجاح!');
          router.push('/');
        } else {
          alert('تم إنشاء الحساب، يرجى تسجيل الدخول يدوياً.');
          router.push('/auth/login');
        }
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  const isPending = registerMutation.isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">إنشاء حساب جديد</h1>
          <p className="text-muted-foreground text-sm text-balance">
            أدخل معلوماتك لإنشاء حسابك في Orvis
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="name">الاسم الكامل</FieldLabel>
          <Input id="name" placeholder="ادخل اسمك" {...register('name')} />
          <FieldError errors={[errors.name]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">البريد الإلكتروني</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register('email')}
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">كلمة السر</FieldLabel>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="pe-10"
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <FieldError errors={[errors.password]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="confirmPassword">تأكيد كلمة السر</FieldLabel>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              className="pe-10"
              {...register('confirmPassword')}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-white"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <FieldError errors={[errors.confirmPassword]} />
        </Field>

        <Field>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'جاري الإنشاء...' : 'إنشاء الحساب'}
          </Button>
          <FieldDescription className="text-center">
            لديك حساب بالفعل؟{' '}
            <Link href="/auth/login" className="underline underline-offset-4">
              تسجيل الدخول
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
