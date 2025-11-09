import { CheckIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function bookAvailability({ pStatus }: { pStatus: string }) {
    return (
        <span
            className={clsx(
               'inline-flex items-center rounded-full px-2 py-1 text-xs',
               {
                'bg-gray-100 text-gray-500': pStatus === 'available on site',
                'bg-green-500 text-white': pStatus === 'loanable',
               },
            )}
        >
            {pStatus === 'available on site' ? (
                <>
                    available on site
                    <LockClosedIcon className='ml-1 w-4 text-gray-500'/>
                </>
            ) : null}
            {pStatus === 'loanable' ? (
                <>
                    Loanable
                    <CheckIcon className='ml-1 w-4 text-white' />
                </>
            ) : null}
        </span>
    );
}