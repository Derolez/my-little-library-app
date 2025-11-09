'use client';

import Link from 'next/link';
import {
    MinusIcon,
    UserIcon,
    BuildingOfficeIcon,
    CalendarIcon,
    ListBulletIcon,
    DocumentTextIcon,
    CheckIcon, 
    BookOpenIcon,
    TagIcon
} from '@heroicons/react/24/outline';
// import { DeleteBook, UpdateBook } from '@/app/ui/books/buttons';
import UpdateButton from './UpdateButton';
import { updateBookById } from '@/lib/actions';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ErrorMessage from './error-message';

function formatingDate(dateValue: string | Date | undefined): string {
    if (!dateValue) return '';
    if (typeof dateValue === 'string') {
        return new Date(dateValue).toISOString().slice(0, 10);
    }
    if (dateValue instanceof Date) {
        return dateValue.toISOString().slice(0, 10);
    }
    return '';
}

interface BookData {
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
    genre?: string;
}

interface Genre {
    _id?: string;
    id?: string;
    category: string;
    name: string;
}

export default function EditBookForm(
    {
        book,
        genre = [],
    }: {
        book: BookData;
        loans?: unknown[];
        genre?: Genre[];
    }) {
        const ref = useRef<HTMLFormElement>(null);
        const router = useRouter();
        const [error, setError] = useState<string | null>(null);
        const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
        const updateBookWithId = updateBookById.bind(null, String(book._id));
        const date4Form = formatingDate(book.yearOfPublication);
        
        // Ensure genre is an array
        const genreList = Array.isArray(genre) ? genre : [];

        return (
            <form ref={ref} 
                  action={async (formData: FormData) => {
                       setError(null);
                       setFieldErrors({});
                       const result = await updateBookWithId(formData);
                       if (result.success) {
                         router.push('/dashboard/books');
                         router.refresh();
                       } else {
                         setError(result.error);
                         if (result.fieldErrors) {
                           setFieldErrors(result.fieldErrors);
                         }
                       }
                      }}>
                <div className='rounded-md bg-gray-50 p-4 md:p-6'>
                    {error && (
                      <div className="mb-4 rounded-md bg-red-50 p-4 text-red-800" role="alert">
                        {error}
                      </div>
                    )}
                    {/* Book Title */}
                    <div className='mb-4'>
                        <label htmlFor="title" className='mb-2 block text-sm font-medium'>
                            Book Title
                        </label>
                        <div className='relative mt-2 rounded-md'>
                            <div className='relative'>
                                <input
                                id='title'
                                name='title'
                                type='string'
                                placeholder='Entrer le titre du livre'
                                defaultValue={book.title}
                                className={`peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${
                                  fieldErrors.title ? 'border-red-500' : 'border-gray-200'
                                }`}
                                aria-invalid={!!fieldErrors.title}
                                aria-describedby={fieldErrors.title ? 'title-error' : undefined}
                                />
                                <MinusIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
                            </div>
                            {fieldErrors.title && (
                              <ErrorMessage message={fieldErrors.title[0]} />
                            )}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="author" className="mb-2 block text-sm font-medium">
                            Author
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input 
                                id="author"
                                name="author"
                                type="string"
                                placeholder="Entrer le nom de l'auteur"
                                defaultValue={book.author}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                    </div>
                    {/* publisher Name */}
                    <div className="mb-4">
                        <label htmlFor="editionName" className="mb-2 block text-sm font-medium">
                            Editor
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input 
                                id="editionName"
                                name="editionName"
                                type="string"
                                placeholder="Entrer le nom de la maison d'édition"
                                defaultValue={book.editionName}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                                <BuildingOfficeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                    </div>
                    {/* publication date */}
                    <div className="mb-4">
                        <label htmlFor="yearOfPublication" className="mb-2 block text-sm font-medium">
                            Publication date
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input 
                                id="yearOfPublication"
                                name="yearOfPublication"
                                type="date"
                                placeholder="selectionner la date de publication"
                                defaultValue = {date4Form}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                    </div>
                    {/* EAN13 */}
                    <div className="mb-4">
                        <label htmlFor="ean13" className="mb-2 block text-sm font-medium">
                            Bar code number  <span className="text-xs" >( EAN13 )</span>
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input 
                                id="ean13"
                                name="ean13"
                                type="number"
                                placeholder="Entrer le numéro de code bar"
                                defaultValue={book.ean13}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                                <ListBulletIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                    </div>
                    {/* copy number */}
                    <div className="mb-4">
                        <label htmlFor="copyNum" className="mb-2 block text-sm font-medium">
                            Copy number
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input 
                                id="copyNum"
                                name="copyNum"
                                type="number"
                                placeholder="Entrer le numéro de la copie"
                                defaultValue={book.copyNum}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 .arrow-hide"
                                />
                                <ListBulletIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                    </div>
                    {/* can be loaned? RadioButtonGroup*/}
                    <div className="mb-4">
                        <label htmlFor="loanableStatus" className="mb-2 block text-sm font-medium">
                            Status of Loanability
                        </label>
                        <fieldset>
                            <div className='rounded-md border border-gray-200 bg-white px-[14px] py-3'>
                                <div className='flex gap-4'>
                                    <div className='flex items-center'>
                                        <input
                                        id="availableOnSite"
                                        name="loanableStatus"
                                        type="radio"
                                        value="available on site"
                                        defaultChecked={book.loanableStatus === 'available on site'}
                                        className="h-3.5 w-3.5 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                        />
                                        <label
                                        htmlFor='availableOnSite'
                                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                                        >
                                            available on site <BookOpenIcon className='h-4 w-4' />
                                        </label>
                                    </div>
                                    <div className='flex items-center'>
                                        <input
                                        id="loanable"
                                        name="loanableStatus"
                                        type="radio"
                                        value="loanable"
                                        defaultChecked={book.loanableStatus === 'loanable'}
                                        className="h-3.5 w-3.5 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                        />
                                        <label
                                        htmlFor='loanable'
                                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                                        >
                                            loanable <CheckIcon className='h-4 w-4' />
                                        </label>
                                    </div>
                                    {/* {book.loanableStatus} */}
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    {/* summary */}
                    <div className="mb-4">
                        <label htmlFor="summary" className="mb-2 block text-sm font-medium">
                            Summary
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <textarea
                                id="summary"
                                name="summary"
                                rows={15}
                                placeholder="Entrer le résumé du livre"
                                defaultValue={book.summary}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                                <DocumentTextIcon className="pointer-events-none absolute top-2 left-3 h-[18px] w-[18px] -translate-y+1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                    </div>
                    {/* Genre */}
                    <div className="mb-4">
                        <label htmlFor="genre" className="mb-2 block text-sm font-medium">
                            Genre
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <select
                                id="genre"
                                name="genre"
                                defaultValue={book.genre || ''}
                                className={`peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 ${
                                  fieldErrors.genre ? 'border-red-500' : 'border-gray-200'
                                }`}
                                aria-invalid={!!fieldErrors.genre}
                                aria-describedby={fieldErrors.genre ? 'genre-error' : undefined}
                                >
                                    <option value="">Sélectionner un genre</option>
                                    {genreList.length > 0 ? (
                                        genreList.map((genreItem) => {
                                            const genreId = genreItem._id || genreItem.id || '';
                                            const category = genreItem.category || '';
                                            const name = genreItem.name || '';
                                            if (!genreId || !category || !name) return null;
                                            return (
                                                <option key={genreId} value={genreId}>
                                                    {category} - {name}
                                                </option>
                                            );
                                        }).filter(Boolean)
                                    ) : (
                                        <option value="" disabled>Aucun genre disponible</option>
                                    )}
                                </select>
                                <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                            {fieldErrors.genre && (
                              <ErrorMessage message={fieldErrors.genre[0]} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="mt-6 flex justify-start gap-4">
                        {/* <DeleteBook id={book.id} /> */}
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <Link
                        href="/dashboard/books"
                        className="flex h-10 items-center rounded-lg bg-red-500 px-4 text-sm font-medium text-white transition-colors hover:bg-red-400"
                        >
                            Cancel
                        </Link>
                        <UpdateButton/>
                    </div>
                </div>
            </form>
    )
}