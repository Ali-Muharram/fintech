import { NextResponse } from 'next/server';
import connectDB from '@/lib/utils/mongoose';
import Project from '@/lib/models/Project';
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

    // البحث عن المشاريع التي يكون فيها المستخدم الحالي هو المستقل
    const query: any = { freelancerId: session.user.id };
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
    console.error('Fetch Freelancer Projects Error:', error);
    return NextResponse.json({ message: 'فشل جلب مشاريع المستقل' }, { status: 500 });
  }
}
