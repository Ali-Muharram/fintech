import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/utils/mongoose';
import Dispute from '@/lib/models/Dispute';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const dispute = await Dispute.findById(id).lean();
    
    if (!dispute) {
      return NextResponse.json({ message: 'Dispute not found' }, { status: 404 });
    }

    // التحقق من الصلاحية (العميل أو الفريلانسر أو الأدمن)
 
    if (
      dispute.clientId !== session.user.id && 
      dispute.freelancerId !== session.user.id 
     
    ) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(dispute);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching dispute' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { content } = await request.json();
    if (!content) {
      return NextResponse.json({ message: 'Content is required' }, { status: 400 });
    }

    await connectDB();
    const dispute = await Dispute.findById(id);
    if (!dispute) {
      return NextResponse.json({ message: 'Dispute not found' }, { status: 404 });
    }

    // إضافة الرسالة
    dispute.messages.push({
      senderId: session.user.id,
      senderName: (session.user.userrole as string) === 'Admin' ? 'الإدارة (Admin)' : (session.user.name || 'مستخدم'),
      senderRole: session.user.userrole as any,
      content,
    });

    await dispute.save();
    return NextResponse.json(dispute);
  } catch (error) {
    return NextResponse.json({ message: 'Error sending message' }, { status: 500 });
  }
}
