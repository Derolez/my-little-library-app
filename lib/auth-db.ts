import User from '@/models/userModel';
import { connectToMongoDB } from './db';
import bcrypt from 'bcryptjs';

export async function login(email: string, password: string) {
  await connectToMongoDB();
  
  const user = await User.findOne({ email });
  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
  };
}

