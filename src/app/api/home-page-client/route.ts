import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import mongoose from 'mongoose';
import Project from '@/lib/models/Project';
import Dispute from '@/lib/models/Dispute';
import connectDB from '@/lib/utils/mongoose';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: 'غير مصرح' }, { status: 401 });
    }

    await connectDB();
    const userId = session.user.id;
    const userRole = session.user.userrole;

    if (userRole === 'Client') {
      // منطق العميل الأصلي مع إضافة عدد النزاعات
      const projects = await Project.find({ clientId: userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();

      const totalProjects = await Project.countDocuments({ clientId: userId });
      
      const spentResult = await Project.aggregate([
        { $match: { clientId: new mongoose.Types.ObjectId(userId) } },
        { $group: { _id: null, total: { $sum: '$price' } } }
      ]);
      const totalSpent = spentResult[0]?.total || 0;

      const activeDisputes = await Dispute.countDocuments({ clientId: userId, status: 'Open' });

      return NextResponse.json({
        projects,
        stats: {
          totalProjects,
          totalSpent,
          activeDisputes
        }
      });
    } else {
      // منطق الفريلانسر
      const projects = await Project.find({ freelancerId: userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();

      const totalProjects = await Project.countDocuments({ freelancerId: userId });
      const activeDisputes = await Dispute.countDocuments({ freelancerId: userId, status: 'Open' });

      // جلب معرفات المشاريع التي عليها نزاعات نشطة
      const disputedProjectIds = await Dispute.find({ status: 'Open' }).distinct('projectId');

      // حساب الأموال المتوقفة والقابلة للسحب
      const allProjects = await Project.find({ freelancerId: userId }).lean();
      
      let pendingBalance = 0;
      let withdrawableBalance = 0;
      const nowInSeconds = Math.floor(Date.now() / 1000);
      const twentyFourHoursInSeconds = 24 * 60 * 60;

      allProjects.forEach((proj: any) => {
        if (proj.status === 'Cancelled') return;

        const isDisputed = disputedProjectIds.some(id => id.toString() === proj._id.toString());

        proj.milestones.forEach((m: any) => {
          if (m.isWithdrawn) return;

          // الأموال المتوقفة: كل الأقسام التي لم تُسحب بعد
          pendingBalance += m.amount;

          // الأموال القابلة للسحب
          if (
            !isDisputed && 
            m.status === 'Completed' && 
            m.paidAt > 0 && 
            (nowInSeconds - m.paidAt) >= twentyFourHoursInSeconds
          ) {
            withdrawableBalance += m.amount;
          }
        });
      });

      return NextResponse.json({
        projects,
        stats: {
          totalProjects,
          activeDisputes,
          pendingBalance,
          withdrawableBalance
        }
      });
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ message: 'فشل جلب البيانات' }, { status: 500 });
  }
}
