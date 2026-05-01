import mongoose, { Schema, Document } from 'mongoose';

export interface IWithdrawal extends Document {
  freelancerId: string;
  freelancerName: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  requestedAt: Date;
  processedAt?: Date;
}

const WithdrawalSchema = new Schema<IWithdrawal>(
  {
    freelancerId: { type: String, required: true },
    freelancerName: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    requestedAt: { type: Date, default: Date.now },
    processedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Withdrawal || mongoose.model<IWithdrawal>('Withdrawal', WithdrawalSchema);
