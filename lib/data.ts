import Book from '@/models/bookModel';
import Genre from '@/models/genreModel';
import Member from '@/models/memberModel';
import { connectToMongoDB } from './db';
import { serializeMongoDocument } from './utils';

const ITEMS_PER_PAGE = 5;

/**
 * Fetches filtered books with pagination
 */
export async function fetchFilteredBooks(
    query: string,
    currentPage: number,
){
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    await connectToMongoDB();
    
    try {
        const searchRegex = query ? new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') : /.*/;
        const books = await Book.find({ 
            $or: [ 
                {title: searchRegex},
                {author: searchRegex},
                {summary: searchRegex}
            ]
        })
        .sort({title: 1})
        .skip(offset)
        .limit(ITEMS_PER_PAGE)
        .lean(); // Convert to plain JavaScript objects for serialization
        
        // Serialize all books to ensure they're JSON-serializable
        return books.map(book => serializeMongoDocument(book));
    } catch {
        throw new Error('Failed to fetch books.');
      }
}

/**
 * Fetches the total number of pages for filtered books
 */
export async function fetchBooksPages(query: string) {
    await connectToMongoDB();
    try {
      const searchRegex = query ? new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') : /.*/;
      const count = await Book.countDocuments({ 
        $or: [ 
          {title: searchRegex},
          {author: searchRegex},
          {summary: searchRegex}
        ]
      });
  
      const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
      return totalPages;
    } catch {
      throw new Error('Failed to fetch total number of books.');
    }
  }

  /**
   * Fetches a book by its ID
   */
  export async function fetchBookById(id: string) {
    await connectToMongoDB();
    try {
        const myBook = await Book.findById(id).lean(); // Convert to plain JavaScript object
        // Serialize to ensure it's JSON-serializable
        return myBook ? serializeMongoDocument(myBook) : null;
    } catch {
      throw new Error('Failed to fetch Book by ID.');
    }
  }
  /**
   * Fetches loans for a book (placeholder - to be implemented when loan model is created)
   */
  export async function fetchLoans(_id: string) {
    await connectToMongoDB();
    // TODO: Implement when loan model is created
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    void _id;
    return [];
  }

  /**
   * Fetches all genre
   */
  export async function fetchGenre() {
    await connectToMongoDB();
    try {
      const genre = await Genre.find().sort({category: 1}).lean();
      
      console.log('Number of genres found in DB:', genre.length);
      
      if (genre.length === 0) {
        console.warn('No genres found in database!');
        return [];
      }
      
      // Directly serialize and ensure proper format - simple approach
      const serializedGenre = genre.map((genreItem: Record<string, unknown>) => {
        // With .lean(), genreItem should already be a plain object
        // But ensure _id is a string
        const _id = genreItem._id ? String(genreItem._id) : '';
        const category = genreItem.category ? String(genreItem.category) : '';
        const name = genreItem.name ? String(genreItem.name) : '';
        
        const result = { _id, category, name };
        console.log('Genre item:', result);
        return result;
      });
      
      console.log('Total serialized genres:', serializedGenre.length);
      console.log('Serialized genres array:', JSON.stringify(serializedGenre, null, 2));
      
      return serializedGenre;
  } catch (error) {
      console.error('Error fetching genre:', error);
      throw new Error('Failed to fetch genre.');
    }
  }

  /**
   * Fetches the total count of books
   */
  export async function fetchBooksCount() {
    await connectToMongoDB();
    try {
      const count = await Book.countDocuments();
      return count;
    } catch {
      throw new Error('Failed to fetch books count.');
    }
  }

  /**
   * Fetches the total count of loans
   * TODO: Implement when loan model is created
   */
  export async function fetchLoansCount() {
    await connectToMongoDB();
    try {
      // TODO: Replace with actual Loan model when created
      // const count = await Loan.countDocuments();
      // return count;
      return 0; // Placeholder until loan model is created
    } catch {
      throw new Error('Failed to fetch loans count.');
    }
  }

  /**
   * Fetches the total count of members
   */
  export async function fetchMembersCount() {
    await connectToMongoDB();
    try {
      const count = await Member.countDocuments();
      return count;
    } catch {
      throw new Error('Failed to fetch members count.');
    }
  }

  /**
   * Fetches filtered members with pagination
   */
  export async function fetchFilteredMembers(
    query: string,
    currentPage: number,
  ){
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    await connectToMongoDB();
    
    try {
      const searchRegex = query ? new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') : /.*/;
      const members = await Member.find({ 
        $or: [ 
          {name: searchRegex},
          {email: searchRegex},
          {phone: searchRegex},
          {address: searchRegex}
        ]
      })
      .sort({name: 1})
      .skip(offset)
      .limit(ITEMS_PER_PAGE)
      .lean();
      
      return members.map(member => serializeMongoDocument(member));
    } catch {
      throw new Error('Failed to fetch members.');
    }
  }

  /**
   * Fetches the total number of pages for filtered members
   */
  export async function fetchMembersPages(query: string) {
    await connectToMongoDB();
    try {
      const searchRegex = query ? new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') : /.*/;
      const count = await Member.countDocuments({ 
        $or: [ 
          {name: searchRegex},
          {email: searchRegex},
          {phone: searchRegex},
          {address: searchRegex}
        ]
      });
  
      const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
      return totalPages;
    } catch {
      throw new Error('Failed to fetch total number of members.');
    }
  }

  /**
   * Fetches a member by its ID
   */
  export async function fetchMemberById(id: string) {
    await connectToMongoDB();
    try {
      const member = await Member.findById(id).lean();
      return member ? serializeMongoDocument(member) : null;
    } catch {
      throw new Error('Failed to fetch Member by ID.');
    }
  }