import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/utils/mongoose';
import Withdrawal from '@/lib/models/Withdrawal';
import Project from '@/lib/models/Project';
import Dispute from '@/lib/models/Dispute';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const withdrawals = await Withdrawal.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(withdrawals);
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { withdrawalId, status } = await request.json(); // status: 'Approved' | 'Rejected'
    
    await connectDB();
    const withdrawal = await Withdrawal.findById(withdrawalId);
    if (!withdrawal || withdrawal.status !== 'Pending') {
      return NextResponse.json({ message: 'طلب غير موجود أو تمت معالجته' }, { status: 404 });
    }

    if (status === 'Approved') {
      // منطق تصفير الأموال: وضع isWithdrawn = true لكل الأقسام القابلة للسحب حالياً لهذا الفريلانسر
      const userId = withdrawal.freelancerId;
      const disputedProjectIds = await Dispute.find({ status: 'Open' }).distinct('projectId');
      const allProjects = await Project.find({ freelancerId: userId });
      
      const nowInSeconds = Math.floor(Date.now() / 1000);
      const twentyFourHoursInSeconds = 24 * 60 * 60;

      for (const proj of allProjects) {
        if (proj.status === 'Cancelled') continue;
        const isDisputed = disputedProjectIds.some(id => id.toString() === proj._id.toString());

        let modified = false;
        proj.milestones.forEach((m: any) => {
          if (m.isWithdrawn || m.status !== 'Completed') return;
          if (!isDisputed && m.paidAt > 0 && (nowInSeconds - m.paidAt) >= twentyFourHoursInSeconds) {
            m.isWithdrawn = true;
            modified = true;
          }
        });

        if (modified) {
          await proj.save();
        }
      }

      withdrawal.status = 'Approved';
      withdrawal.processedAt = new Date();
    } else {
      withdrawal.status = 'Rejected';
      withdrawal.processedAt = new Date();
    }

    await withdrawal.save();
    return NextResponse.json(withdrawal);
  } catch (error) {
    console.error('Error processing withdrawal:', error);
    return NextResponse.json({ message: 'Error processing withdrawal' }, { status: 500 });
  }
}
