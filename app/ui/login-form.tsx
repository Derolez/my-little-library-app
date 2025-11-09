'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authenticate } from '@/lib/actions';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function LoginForm() {
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  return (
    <form
      ref={ref}
      action={async (formData: FormData) => {
        setError(null);
        setFieldErrors({});
        const result = await authenticate(formData);
        if (result.success) {
          router.push('/dashboard');
          router.refresh();
        } else {
          setError(result.error);
          if (result.fieldErrors) {
            setFieldErrors(result.fieldErrors);
          }
        }
      }}
      className="space-y-3"
    >
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Please log in to continue.</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {fieldErrors?.email && (
              <div className="mt-2 text-sm text-red-500">
                {fieldErrors.email[0]}
              </div>
            )}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {fieldErrors?.password && (
              <div className="mt-2 text-sm text-red-500">
                {fieldErrors.password[0]}
              </div>
            )}
          </div>
        </div>
        {error && (
          <div className="mt-4 text-sm text-red-500">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-saumonLight px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-black/55 hover:text-white"
        >
          Log in
        </button>
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Don&apos;t have an account? </span>
          <Link href="/signup" className="text-blue-500 hover:text-blue-400">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
}

