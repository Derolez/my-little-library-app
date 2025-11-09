import Form from '@/app/ui/books/edit-form';
import Breadcrumbs from '@/app/ui/books/breadcrumbs';
import { fetchBookById, fetchLoans, fetchGenre } from '@/lib/data';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
    const id = params.id;
    const [theBook, isLoans, genre] = await Promise.all([
        fetchBookById(id),
        fetchLoans(id),
        fetchGenre(),
    ]);

    if(!theBook){
        // TODO: Implement notFound() when book is not found
        return <div>Book not found</div>;
    }
    // Book is already serialized from fetchBookById, ensure _id is a string
    const dataBook = {
        ...theBook,
        _id: String(theBook._id),
        loanableStatus: theBook.loanableStatus as 'available on site' | 'loanable',
        genre: theBook.genre ? String(theBook.genre) : undefined,
    };
    
    // Ensure genre is always an array
    const genreArray = Array.isArray(genre) ? genre : [];
    
    return (
        <div>
            <Breadcrumbs
        breadcrumbs={[
          { label: 'Books', href: '/dashboard/books' },
          {
            label: 'Edit Book',
            href: `/dashboard/books/${id}/edit`,
            active: true,
          },
        ]}
      />
        <Form book={dataBook} loans={isLoans} genre={genreArray} />
        </div>
    )
}