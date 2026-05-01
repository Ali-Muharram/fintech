import { NextResponse } from 'next/server';
import connectDB from '@/lib/utils/mongoose';
import Project from '@/lib/models/Project';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const project = await Project.findById(id).lean();

    if (!project) {
      return NextResponse.json(
        { message: 'المشروع غير موجود' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { message: 'فشل جلب بيانات المشروع' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'غير مصرح لك' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    // التحقق من حالة المشروع الحالية
    const project = await Project.findOne({
      _id: id,
      clientId: session.user.id,
    });

    if (!project) {
      return NextResponse.json(
        { message: 'المشروع غير موجود أو لا تملك صلاحية تعديله' },
        { status: 404 }
      );
    }

    if (project.status === 'Cancelled') {
      return NextResponse.json(
        { message: 'لا يمكن تعديل مشروع ملغي' },
        { status: 400 }
      );
    }
    console.log({ body });
    const updatedProject = await Project.findOneAndUpdate(
      { _id: id, clientId: session.user.id },
      body,
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { message: 'المشروع غير موجود أو لا تملك صلاحية تعديله' },
        { status: 400 }
      );
    }

    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json({ message: 'فشل تحديث المشروع' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'غير مصرح لك' }, { status: 401 });
    }

    await connectDB();
    const deletedProject = await Project.findOneAndDelete({
      _id: id,
      clientId: session.user.id,
    });

    if (!deletedProject) {
      return NextResponse.json(
        { message: 'المشروع غير موجود أو لا تملك صلاحية حذفه' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'تم الحذف بنجاح' });
  } catch (error) {
    return NextResponse.json({ message: 'فشل حذف المشروع' }, { status: 500 });
  }
}
