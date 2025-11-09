import Form from '@/app/ui/books/create-form';
import Breadcrumbs from '@/app/ui/books/breadcrumbs';
import { fetchGenre } from '@/lib/data';

export default async function Page() {
    const genre = await fetchGenre();
    
    // Ensure genre is always an array
    const genreArray = Array.isArray(genre) ? genre : [];
    
    console.log('Page Server Component - genreArray length:', genreArray.length);
    console.log('Page Server Component - genreArray:', JSON.stringify(genreArray, null, 2));

    return(
        <main>
            {/* <div className="mt-6 flex justify-end gap-4">
                <Link href='#' className='mb-2 rounded-md border p-2 bg-neutral-400 hover:bg-neutral-300'>
                    <span className="sr-only">scan IBAN</span>
                    <Image
                        src="/barcodeScanner.png"
                        width={30}
                        height={30}
                        alt="Picture Of Barcode scanner"
                        />
                </Link>
            </div> */}
            <Breadcrumbs
                breadcrumbs={[
                    {label: 'Books', href: '/dashboard/books' },
                    {
                        label: 'Create Book',
                        href: '/dashboard/books/create',
                        active: true,
                    },
                ]}
            />
            <Form genre={genreArray} />
        </main>
    );
}