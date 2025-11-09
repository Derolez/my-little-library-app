// Importing mongoose library along with Document and Model types from it
import mongoose, { Document, Model } from "mongoose";

// Defining the structure of a user item using TypeScript interfaces
export interface IUser {
  name: string;
  email: string;
  password: string;
}

// Merging IUser interface with mongoose's Document interface to create 
// a new interface that represents a user document in MongoDB
export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Defining a mongoose schema for the user document, specifying the types 
// and constraints
const userSchema = new mongoose.Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // Automatically add 'createdAt' and 'updatedAt' fields to the document
    timestamps: true,
  }
);

// Creating a mongoose model for the user document
const User: Model<IUserDocument> =
  mongoose.models?.User || mongoose.model("User", userSchema);

export default User;

