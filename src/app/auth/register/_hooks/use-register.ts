import { useMutation } from '@tanstack/react-query';
import { RegisterValues } from '@/lib/schemes/auth';

interface RegisterResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string | null;
    email: string | null;
    avatarColor: string | null;
  };
  errors?: Record<string, string[]>;
}

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterValues>({
    mutationFn: async (data: RegisterValues) => {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'حدث خطأ أثناء إنشاء الحساب');
      }

      return result;
    },
  });
};
