import mongoose, { Schema, Document, models } from 'mongoose';

export interface IMilestone {
  label: string;
  amount: number;
  status: 'Pending' | 'Completed' | 'Released';
  processUrl?: string; // رابط للمعالجة
  previewUrl?: string; // رابط للمشروع/المعاينة للمرحلة
  paidAt?: number; // تاريخ الدفع للمرحلة (بالثواني)
  isWithdrawn?: boolean; // هل تم سحب المبلغ؟
}


export interface IProject extends Document {
  title: string;
  description: string;
  freelancerId: string;
  freelancerName: string;
  clientId: mongoose.Types.ObjectId; // صاحب المشروع (المسجل حالياً)
  clientName: string;
  price: number;
  status: 'Active' | 'Completed' | 'Cancelled' | 'OnHold';
  milestones: IMilestone[];
  reviewUrl?: string;  // رابط للمراجعة
  projectUrl?: string; // رابط للمشروع
  paidAt?: number; // تاريخ دفع المشروع بالكامل (بالثواني)
  createdAt: Date;
  updatedAt: Date;
}

const MilestoneSchema = new Schema<IMilestone>({
  label: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Released'], default: 'Pending' },
  processUrl: { type: String },
  previewUrl: { type: String },
  paidAt: { type: Number, required: true },
  isWithdrawn: { type: Boolean, default: false }
});

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    freelancerId: { type: String, required: true },
    freelancerName: { type: String, required: true },
    clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    clientName: { type: String, required: true },
    price: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ['Active', 'Completed', 'Cancelled', 'OnHold'], 
      default: 'Active' 
    },
    milestones: [MilestoneSchema],
    reviewUrl: { type: String },
    projectUrl: { type: String },
    paidAt: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Project = models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
