import { fetchFilteredBooks } from '@/lib/data';
import { UpdateBook, DeleteBook, ViewBook } from '@/app/ui/books/buttons';
import BookStatus from '@/app/ui/books/status';
import { getIdFromMongoId } from '@/lib/utils';

interface BookRecord {
    _id: string;
    title: string;
    author?: string;
    editionName?: string;
    yearOfPublication?: string | Date;
    ean13?: number;
    copyNum: number;
    loanableStatus: 'available on site' | 'loanable';
    summary?: string;
    coverURL?: string;
    [key: string]: unknown;
}

export default async function BooksTable({
    query,
    currentPage,   
}: {
    query: string;
    currentPage: number;
}) {
    let books: BookRecord[] = [];
    let hasError = false;
    try {
        const fetchedBooks = await fetchFilteredBooks(query, currentPage);
        books = fetchedBooks as unknown as BookRecord[];
    } catch (error) {
        console.error('Error fetching books:', error);
        hasError = true;
    }
    
    if (hasError) {
        return (
            <div className="mt-6 flow-root">
                <div className="rounded-lg bg-red-50 p-4 md:p-6">
                    <p className="text-center text-red-600 font-medium">Unable to connect to database.</p>
                    <p className="text-center text-red-500 text-sm mt-2">Please check your MongoDB connection settings in .env.local file</p>
                </div>
            </div>
        );
    }
    
    if (books.length === 0) {
        return (
            <div className="mt-6 flow-root">
                <div className="rounded-lg bg-gray-50 p-4 md:p-6">
                    <p className="text-center text-gray-500">No books found. Try adjusting your search.</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {books?.map((book) => {
                            const bookId = getIdFromMongoId(book);
                            return (
                            <div
                            key={bookId}
                            className="mb-2 w-full rounded-md bg-white p-4"
                          >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center">
                                            <p>{book.title}</p>
                                        </div>
                                        <p className="text-sm text-gray-500">{String(book.author || '')}</p>
                                    </div>
                                    <BookStatus status={book.loanableStatus} />
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p className="text-xl font-medium">
                                        available
                                        </p>
                                        <p>Today</p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <ViewBook id={bookId} />
                                        <UpdateBook id={bookId} />
                                        <DeleteBook id={bookId} />
                                    </div>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Book Title
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Author
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Availability
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Availability Date
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {books?.map((book) => {
                                const bookId = getIdFromMongoId(book);
                                return (
                                <tr
                                    key={bookId}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <p>{String(book.title)}</p>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {String(book.author || '')}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <BookStatus status={String(book.loanableStatus) as 'available on site' | 'loanable'} />
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        Today
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                        <ViewBook id={bookId} />
                                        <UpdateBook id={bookId} />
                                        <DeleteBook id={bookId} />
                                        </div>
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}