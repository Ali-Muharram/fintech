import mongoose, { Schema, Document, models } from 'mongoose';

export interface IMessage {
  senderId: string;
  senderName: string;
  senderRole: 'Client' | 'Freelancer' | 'Admin';
  content: string;
  createdAt: Date;
}

export interface IDispute extends Document {
  projectId: mongoose.Types.ObjectId;
  projectName: string;
  clientId: string;
  clientName: string;
  freelancerId: string;
  freelancerName: string;
  title: string;
  status: 'Open' | 'Resolved' | 'Closed';
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  senderId: { type: String, required: true },
  senderName: { type: String, required: true },
  senderRole: { type: String, enum: ['Client', 'Freelancer', 'Admin'], required: true },
  content: { type: String, required: true },
}, { timestamps: { createdAt: true, updatedAt: false } });

const DisputeSchema = new Schema<IDispute>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    projectName: { type: String, required: true },
    clientId: { type: String, required: true },
    clientName: { type: String, required: true },
    freelancerId: { type: String, required: true },
    freelancerName: { type: String, required: true },
    title: { type: String, required: true },
    status: { type: String, enum: ['Open', 'Resolved', 'Closed'], default: 'Open' },
    messages: [MessageSchema],
  },
  {
    timestamps: true,
  }
);

const Dispute = models.Dispute || mongoose.model<IDispute>('Dispute', DisputeSchema);

export default Dispute;
