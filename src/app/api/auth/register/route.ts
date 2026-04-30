import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/services/authService';
import { registerSchema } from '@/lib/schemes/auth';
import { ZodError } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('hellow from request');
    // Validate request body against schema
    const validatedData = registerSchema.parse(body);

    // Call the auth service to register the user
    const user = await registerUser(validatedData);

    // Return success response (avoid sending back sensitive data like password)
    return NextResponse.json(
      {
        success: true,
        message: 'تم إنشاء الحساب بنجاح',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatarColor: user.avatarColor,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log('hellow from error in request');
    // Handle validation errors from Zod
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'بيانات غير صالحة',
          errors: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Handle other errors (like duplicate email from the service)
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'حدث خطأ أثناء إنشاء الحساب',
      },
      { status: 400 }
    );
  }
}
