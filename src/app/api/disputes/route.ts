import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import connectDB from '@/lib/utils/mongoose';
import Dispute from '@/lib/models/Dispute';
import Project from '@/lib/models/Project';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const userId = session.user.id;
    const userRole = session.user.userrole;

    let query = {};
    if (userRole === 'Client') {
      query = { clientId: userId };
    } else {
      query = { freelancerId: userId };
    }

    const disputes = await Dispute.find(query).sort({ updatedAt: -1 }).lean();
    return NextResponse.json(disputes);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching disputes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.userrole !== 'Client') {
      return NextResponse.json({ message: 'Only clients can open disputes' }, { status: 401 });
    }

    const { projectId, title, reason } = await request.json();
    if (!projectId || !title || !reason) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    await connectDB();
    const project = await Project.findById(projectId);
    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    // التحقق من أن العميل هو صاحب المشروع
    if (project.clientId.toString() !== session.user.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const newDispute = new Dispute({
      projectId: project._id,
      projectName: project.title,
      clientId: project.clientId,
      clientName: project.clientName,
      freelancerId: project.freelancerId,
      freelancerName: project.freelancerName,
      title: title,
      messages: [{
        senderId: session.user.id,
        senderName: session.user.name,
        senderRole: 'Client',
        content: reason,
      }]
    });

    await newDispute.save();
    return NextResponse.json(newDispute, { status: 201 });
  } catch (error) {
    console.error('Error opening dispute:', error);
    return NextResponse.json({ message: 'Error opening dispute' }, { status: 500 });
  }
}
