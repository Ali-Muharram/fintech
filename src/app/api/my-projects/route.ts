import { NextResponse } from 'next/server';
import connectDB from '@/lib/utils/mongoose';
import Project from '@/lib/models/Project';
import User from '@/lib/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'غير مصرح لك' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';

    const query: any = { clientId: session.user.id };
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      Project.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Project.countDocuments(query),
    ]);

    return NextResponse.json({ data: projects, total });
  } catch (error) {
    return NextResponse.json({ message: 'فشل جلب المشاريع' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'غير مصرح لك' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const { freelancerId } = body;

    if (!freelancerId) {
      return NextResponse.json(
        { message: 'معرف المستقل مطلوب' },
        { status: 400 }
      );
    }

    // التحقق من وجود المستقل ونوع حسابه
    const freelancer = await User.findOne({
      _id: freelancerId,
      userrole: 'Freelancer',
    });

    console.log({ freelancer });
    if (!freelancer) {
      return NextResponse.json(
        {
          message: 'المستقل غير موجود أو أن نوع الحساب ليس Freelancer',
        },
        { status: 400 }
      );
    }

    // التحقق من أن مجموع مبالغ المراحل يساوي سعر المشروع
    if (body.milestones && body.milestones.length > 0) {
      const totalMilestonesAmount = body.milestones.reduce(
        (sum: number, m: any) => sum + (m.amount || 0),
        0
      );
      if (totalMilestonesAmount !== body.price) {
        return NextResponse.json(
          {
            message: 'مجموع مبالغ المراحل يجب أن يساوي سعر المشروع الإجمالي',
          },
          { status: 400 }
        );
      }
    }

    // تحضير المراحل مع روابط فارغة وتاريخ دفع فارغ
    const milestones = (body.milestones || []).map((m: any) => ({
      ...m,
      processUrl: '',
      previewUrl: '',
      paidAt: 0,
    }));

    // إضافة clientId من الجلسة الحالية واسم المستقل واسم العميل
    const newProject = await Project.create({
      ...body,
      milestones,
      clientId: session.user.id,
      clientName: session.user.name || 'عميل',
      freelancerName: freelancer.name || 'مستقل',
      projectUrl: '',
      reviewUrl: '',
      paidAt: 0,
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Create Project Error:', error);
    return NextResponse.json({ message: 'فشل إنشاء المشروع' }, { status: 500 });
  }
}
