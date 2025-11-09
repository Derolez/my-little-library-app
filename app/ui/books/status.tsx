import { CheckIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function BookStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'available on site',
          'bg-green-500 text-white': status === 'loanable',
        },
      )}
    >
      {status === 'available on site' ? (
        <>
          Available on site
          <BookOpenIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'loanable' ? (
        <>
          Loanable
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
