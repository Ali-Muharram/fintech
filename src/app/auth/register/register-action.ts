"use server"

import { registerUser } from "@/lib/services/authService";
import { registerSchema, RegisterValues } from "@/lib/schemes/auth";

export async function handleRegister(data: RegisterValues) {
  try {
    // Validate data on server side too
    const validatedData = registerSchema.parse(data);
    const user = await registerUser(validatedData);
    return { success: true, user: { id: user.id, email: user.email } };
  } catch (error: any) {
    return { success: false, error: error.message || 'حدث خطأ ما أثناء التسجيل' };
  }
}
