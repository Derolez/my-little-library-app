'use client';

import Link from 'next/link';
import {
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';
import SubmitButton from './SubmitButton';
import { createMember } from '@/lib/actions';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ErrorMessage from './error-message';

export default function Form(){
    const ref = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
    
    return (
        <form
          ref={ref}
          // @ts-expect-error - Next.js 15 supports async functions in action prop
          action={async (formData: FormData) => {
            setError(null);
            setFieldErrors({});
            const result = await createMember(formData);
            if (result.success) {
              ref.current?.reset();
              router.push('/dashboard/members');
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
                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input 
                            id="name"
                            name="name"
                            type="string"
                            placeholder="Enter member name"
                            className={`peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${
                              fieldErrors.name ? 'border-red-500' : 'border-gray-200'
                            }`}
                            aria-invalid={!!fieldErrors.name}
                            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                            />
                            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {fieldErrors.name && (
                          <ErrorMessage message={fieldErrors.name[0]} />
                        )}
                    </div>
                </div>
                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Email
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input 
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter email address"
                            className={`peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${
                              fieldErrors.email ? 'border-red-500' : 'border-gray-200'
                            }`}
                            aria-invalid={!!fieldErrors.email}
                            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                            />
                            <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {fieldErrors.email && (
                          <ErrorMessage message={fieldErrors.email[0]} />
                        )}
                    </div>
                </div>
                {/* Phone */}
                <div className="mb-4">
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                        Phone
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input 
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Enter phone number"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                {/* Address */}
                <div className="mb-4">
                    <label htmlFor="address" className="mb-2 block text-sm font-medium">
                        Address
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input 
                            id="address"
                            name="address"
                            type="string"
                            placeholder="Enter address"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                href="/dashboard/members"
                className="flex h-10 items-center rounded-lg bg-red-500 px-4 text-sm font-medium text-white transition-colors hover:bg-red-400"
                >
                    Cancel
                </Link>
                <SubmitButton/>
            </div>
        </form>
    )
}

