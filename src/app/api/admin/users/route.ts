import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/utils/mongoose';
import User from '@/lib/models/User';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const users = await User.find().sort({ createdAt: -1 }).select('-password').lean();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
