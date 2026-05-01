import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/utils/mongoose';
import User from '@/lib/models/User';
import Project from '@/lib/models/Project';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await connectDB();

    const totalClients = await User.countDocuments({ userrole: 'Client' });
    const totalFreelancers = await User.countDocuments({ userrole: 'Freelancer' });
    const totalProjects = await Project.countDocuments();
    
    // حساب أرباح الموقع (1% من إجمالي مبالغ المشاريع)
    const projectsResult = await Project.aggregate([
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);
    const totalVolume = projectsResult[0]?.total || 0;
    const siteProfit = totalVolume * 0.01;

    return NextResponse.json({
      totalClients,
      totalFreelancers,
      totalProjects,
      siteProfit
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
