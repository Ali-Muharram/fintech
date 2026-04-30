import mongoose, { Schema, Document, models } from 'mongoose';

export interface IUser extends Document {
  name?: string;
  email: string;
  password?: string;
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
    avatarColor: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
