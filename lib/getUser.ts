import { getSession } from './auth';
import User from '@/models/userModel';
import { connectToMongoDB } from './db';

export async function getUser() {
  const session = await getSession();
  
  if (!session || !session.userId) {
    return null;
  }

  try {
    await connectToMongoDB();
    const user = await User.findById(session.userId).select('-password');
    
    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    return null;
  }
}

