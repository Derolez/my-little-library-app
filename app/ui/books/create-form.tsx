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
//import { Button } from '@/app/ui/button';
import SubmitButton from './SubmitButton';
import { createBooks } from '@/lib/actions';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ErrorMessage from './error-message';

interface Genre {
    _id?: string;
    id?: string;
    category: string;
    name: string;
}

interface FormProps {
    genre: Genre[];
}

export default function Form({ genre }: FormProps){
    const ref = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
    
    // Ensure genre is an array
    const genreList = Array.isArray(genre) ? genre : [];
    
    // Debug: Check what we received
    console.log('Form component - genre prop type:', typeof genre);
    console.log('Form component - genre is array:', Array.isArray(genre));
    console.log('Form component - genre length:', genre?.length);
    console.log('Form component - genre value:', JSON.stringify(genre, null, 2));
    console.log('Form component - genreList length:', genreList.length);
    
    if (genreList.length === 0) {
        console.warn('No genres received in Form component. Genre prop:', genre);
    }
    
    return (
        <form
          ref={ref}
          action={async (formData: FormData) => {
            setError(null);
            setFieldErrors({});
            const result = await createBooks(formData);
            if (result.success) {
              ref.current?.reset();
              router.push('/dashboard/books');
              router.refresh();
            } else {
              setError(result.error);
              if (result.fieldErrors) {
                setFieldErrors(result.fieldErrors);
              }
            }
          }}
          className="flex flex-col"
        >
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {error && (
                  <div className="mb-4 rounded-md bg-red-50 p-4 text-red-800" role="alert">
                    {error}
                  </div>
                )}
                {/* Book Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="mb-2 block text-sm font-medium">
                        Book title
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input 
                            id="title"
                            name="title"
                            type="string"
                            placeholder="Entrer le titre du livre"
                            className={`peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${
                              fieldErrors.title ? 'border-red-500' : 'border-gray-200'
                            }`}
                            aria-invalid={!!fieldErrors.title}
                            aria-describedby={fieldErrors.title ? 'title-error' : undefined}
                            />
                            <MinusIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {fieldErrors.title && (
                          <ErrorMessage message={fieldErrors.title[0]} />
                        )}
                    </div>
                </div>
                {/* Author Name */}
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
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                {/* EAN13 */}
                <div className="mb-4">
                    <label htmlFor="ean13" className="mb-2 block text-sm font-medium">
                        Bar code number (EAN13)
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input 
                            id="ean13"
                            name="ean13"
                            type="number"
                            placeholder="Entrer le numéro de code bar"
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
                        <legend className="mb-2 block text-sm font-medium">
                            Set the loanable status
                        </legend>
                        <div className='rounded-md border border-gray-200 bg-white px-[14px] py-3'>
                            <div className='flex gap-4'>
                                <div className='flex items-center'>
                                    <input
                                    id="availableOnSite"
                                    name="loanableStatus"
                                    type="radio"
                                    value="available on site"
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
                                    className="h-3.5 w-3.5 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                    />
                                    <label
                                    htmlFor='loanable'
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                                    >
                                        loanable <CheckIcon className='h-4 w-4' />
                                    </label>
                                </div>
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
            <div className="mt-6 flex justify-end gap-4">
                <Link
                href="/dashboard/books"
                className="flex h-10 items-center rounded-lg bg-red-500 px-4 text-sm font-medium text-white transition-colors hover:bg-red-400"
                >
                    Cancel
                </Link>
                <SubmitButton/>
            </div>
        </form>
    )
}