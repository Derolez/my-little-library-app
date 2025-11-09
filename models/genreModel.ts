// Importing mongoose library along with Document and Model types from it
import mongoose, { Document, Model } from "mongoose";

// Defining the structure of a genre item using TypeScript interfaces
export interface IGenre {
  category: string;
  name: string;
}

// Merging IGenre interface with mongoose's Document interface to create 
// a new interface that represents a genre document in MongoDB
export interface IGenreDocument extends IGenre, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Defining a mongoose schema for the genre document, specifying the types 
// and constraints
const genreSchema = new mongoose.Schema<IGenreDocument>(
  {
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    // Automatically add 'createdAt' and 'updatedAt' fields to the document
    timestamps: true,
    // Explicitly set collection name to match MongoDB collection
    collection: 'genre',
  }
);

//or
//const bookSchema = toMongooseSchema(BookEntity);

// Creating a mongoose model for the book document
// Use lowercase "genre" to match collection name, but check both cases
const Genre: Model<IGenreDocument> =
  mongoose.models?.genre || mongoose.models?.Genre || mongoose.model("genre", genreSchema);

export default Genre;