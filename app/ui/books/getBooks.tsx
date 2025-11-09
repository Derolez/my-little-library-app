import Book from "@/models/bookModel";
import React from "react";
import { clashGrotesk } from "@/app/ui/fonts";
import { serializeMongoDocument } from "@/lib/utils";

export default async function GetBooksUI() {
    try {
        const books = await Book.find().sort({title: 'asc'}).lean(); // Convert to plain JavaScript objects
        const serializedBooks = books.map(book => serializeMongoDocument(book));
        if (serializedBooks.length === 0) {
            return <h1 className={`${clashGrotesk.className} antialiased text-red-500 font-bold text-xl`}>There are currently no books in the database!</h1>;
        }else { 
            return (
                <div className="rounded-md bg-gray-50 p-4 md:p-6">
                    <div className="flex flex-col">
                        {serializedBooks.map((book) => (
                            <div key={String(book._id)} className="flex flex-col items-start gap-1 p-2 border-blue-400 border-2 rounded mb-2">
                                <div className="flex flex-row gap-2">
                                    <div className="basic-1/2 selection:text-lg font-medium">{book.title as string}</div>
                                    <div className="basic-1/4 text-base"> by {book.author as string}</div>
                                    <p className="basic-1/4">{book.editionName as string}</p>
                                </div>
                            </div>
                        
                        ))}
                    </div>
                </div>
            )
        }
    } catch {
        return <h1 className={`${clashGrotesk.className} antialiased text-red-500 font-bold text-xl`}>Error loading books</h1>;
    }
}