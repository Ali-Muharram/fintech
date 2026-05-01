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

    const project = await Project.findOne({ _id: id, freelancerId: session.user.id });
    
    if (!project) {
      return NextResponse.json(
        { message: 'المشروع غير موجود أو لا تملك صلاحية تعديله كمستقل' },
        { status: 404 }
      );
    }

    if (project.status === 'Cancelled') {
      return NextResponse.json(
        { message: 'لا يمكن تعديل مشروع ملغي' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (body.projectUrl !== undefined) updateData.projectUrl = body.projectUrl;
    if (body.reviewUrl !== undefined) updateData.reviewUrl = body.reviewUrl;

    // السماح بتعديل روابط المراحل إذا أرسلت
    if (body.milestones && Array.isArray(body.milestones)) {
      updateData.milestones = project.milestones.map((m: any, index: number) => {
        const updateM = body.milestones[index];
        // تحويل الموديل إلى كائن عادي لتجنب مشاكل Mongoose
        const milestoneObj = m.toObject ? m.toObject() : m;
        
        if (updateM) {
          return {
            ...milestoneObj,
            processUrl: updateM.processUrl !== undefined ? updateM.processUrl : milestoneObj.processUrl,
            previewUrl: updateM.previewUrl !== undefined ? updateM.previewUrl : milestoneObj.previewUrl,
          };
        }
        return milestoneObj;
      });
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: id, freelancerId: session.user.id }, 
      { $set: updateData },
      { new: true }
    );

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Freelancer Update Error:', error);
    return NextResponse.json({ message: 'فشل تحديث روابط المشروع' }, { status: 500 });
  }
}
