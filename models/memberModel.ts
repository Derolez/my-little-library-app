// Importing mongoose library along with Document and Model types from it
import mongoose, { Document, Model } from "mongoose";

// Defining the structure of a member item using TypeScript interfaces
export interface IMember {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

// Merging IMember interface with mongoose's Document interface to create 
// a new interface that represents a member document in MongoDB
export interface IMemberDocument extends IMember, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Defining a mongoose schema for the member document, specifying the types 
// and constraints
const memberSchema = new mongoose.Schema<IMemberDocument>(
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
    phone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
  },
  {
    // Automatically add 'createdAt' and 'updatedAt' fields to the document
    timestamps: true,
    // Explicitly set collection name to match MongoDB collection
    collection: 'members',
  }
);

// Creating a mongoose model for the member document
// Use lowercase "members" to match collection name, but check both cases
const Member: Model<IMemberDocument> =
  mongoose.models?.members || mongoose.models?.Members || mongoose.model("members", memberSchema);

export default Member;

