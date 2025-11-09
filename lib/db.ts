import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;

/**
 * Establishes a connection to MongoDB with connection caching
 * @throws {Error} If MONGODB_URI is not set or connection fails
 */
export async function connectToMongoDB(): Promise<Connection> {
  // Check if MONGODB_URI is set
  if (!process.env.MONGODB_URI) {
    throw new Error(
      'MONGODB_URI environment variable is not set. Please create a .env.local file with MONGODB_URI=your_connection_string'
    );
  }

  // If a cached connection exists and is ready, return it
  if (cachedConnection && cachedConnection.readyState === 1) {
    return cachedConnection;
  }

  try {
    const cnx = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    cachedConnection = cnx.connection;
    return cachedConnection;
  } catch (error) {
    cachedConnection = null;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Provide more helpful error messages
    if (errorMessage.includes('ENOTFOUND')) {
      throw new Error(
        `Cannot connect to MongoDB server. Please check:\n` +
        `1. Your MONGODB_URI in .env.local file is correct\n` +
        `2. Your MongoDB server is running and accessible\n` +
        `3. Your network connection is working\n` +
        `4. For MongoDB Atlas, ensure your IP is whitelisted\n` +
        `Original error: ${errorMessage}`
      );
    }
    
    throw new Error(`Failed to connect to MongoDB: ${errorMessage}`);
  }
}