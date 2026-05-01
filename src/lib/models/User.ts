import mongoose, { Schema, Document, models } from 'mongoose';

export interface IUser extends Document {
  name?: string;
  email: string;
  password?: string;
  userrole: 'Client' | 'Freelancer';
  avatarColor?: string;
  image?: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    userrole: {
      type: String,
      enum: ['Client', 'Freelancer'],
      required: true,
    },
    avatarColor: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
