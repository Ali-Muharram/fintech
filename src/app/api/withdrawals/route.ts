import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import connectDB from '@/lib/utils/mongoose';
import Withdrawal from '@/lib/models/Withdrawal';
import Project from '@/lib/models/Project';
import Dispute from '@/lib/models/Dispute';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.userrole !== 'Freelancer') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const withdrawals = await Withdrawal.find({ freelancerId: session.user.id }).sort({ createdAt: -1 }).lean();
    return NextResponse.json(withdrawals);
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.userrole !== 'Freelancer') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const userId = session.user.id;

    // حساب المبلغ القابل للسحب حالياً (نفس منطق الـ Stats)
    const disputedProjectIds = await Dispute.find({ status: 'Open' }).distinct('projectId');
    const allProjects = await Project.find({ freelancerId: userId }).lean();
    
    let withdrawableBalance = 0;
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const twentyFourHoursInSeconds = 24 * 60 * 60;

    allProjects.forEach((proj: any) => {
      if (proj.status === 'Cancelled') return;
      const isDisputed = disputedProjectIds.some(id => id.toString() === proj._id.toString());

      proj.milestones.forEach((m: any) => {
        if (m.isWithdrawn || m.status !== 'Completed') return;
        if (!isDisputed && m.paidAt > 0 && (nowInSeconds - m.paidAt) >= twentyFourHoursInSeconds) {
          withdrawableBalance += m.amount;
        }
      });
    });

    if (withdrawableBalance <= 0) {
      return NextResponse.json({ message: 'لا يوجد رصيد قابل للسحب حالياً' }, { status: 400 });
    }

    // إنشاء طلب السحب
    const newWithdrawal = new Withdrawal({
      freelancerId: userId,
      freelancerName: session.user.name,
      amount: withdrawableBalance,
      status: 'Pending',
    });

    await newWithdrawal.save();
    return NextResponse.json(newWithdrawal, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
