import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/utils/mongoose';
import Dispute from '@/lib/models/Dispute';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const disputes = await Dispute.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(disputes);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching all disputes' }, { status: 500 });
  }
}
