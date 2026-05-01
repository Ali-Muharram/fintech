import bcrypt from 'bcrypt';
import User from '@/lib/models/User';
import connectDB from '@/lib/utils/mongoose';
import { RegisterValues } from '@/lib/schemes/auth';

const AVATAR_COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#FFA07A',
  '#98D8C8',
  '#F06292',
  '#AED581',
  '#FFD54F',
  '#4DB6AC',
  '#7986CB',
];

export const registerUser = async (data: RegisterValues) => {
  await connectDB();

  const { name, email, password, userrole } = data;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('البريد الإلكتروني مسجل بالفعل');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Pick a random avatar color
  const avatarColor =
    AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
  console.log({ data });
  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    userrole: userrole,
    avatarColor,
  });

  return user;
};
