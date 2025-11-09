// Importing mongoose library along with Document and Model types from it
import mongoose, { Document, Model } from "mongoose";

// Defining the structure of a book item using TypeScript interfaces
export interface IBook {
  title: string;
  author: string;
  editionName: string;
  yearOfPublication: Date;
  ean13: number;
  copyNum: number;
  loanableStatus: string;
  summary: string;
  coverURL: string;
  genre?: mongoose.Types.ObjectId;
}

// Merging IBook interface with mongoose's Document interface to create 
// a new interface that represents a book document in MongoDB
export interface IBookDocument extends IBook, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Defining a mongoose schema for the book document, specifying the types 
// and constraints
const bookSchema = new mongoose.Schema<IBookDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    editionName: {
      type: String,
      required: true,
    },
    yearOfPublication: {
      type: Date,
      required: false,
    },
    ean13: {
      type: Number,
      required: true,
    },
    copyNum: {
      type: Number,
      required: true,
    },
    loanableStatus: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: false,
    },
    coverURL: {
      type: String,
      required: false,
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'genre',
      required: false,
    },
  },
  {
    // Automatically add 'createdAt' and 'updatedAt' fields to the document
    timestamps: true,
  }
);

//or
//const bookSchema = toMongooseSchema(BookEntity);

// Creating a mongoose model for the book document
const Book: Model<IBookDocument> =
  mongoose.models?.Book || mongoose.model("Book", bookSchema);

export default Book;