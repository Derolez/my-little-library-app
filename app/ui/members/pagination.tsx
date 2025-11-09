import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Pagination({
  totalPages,
  currentPage,
  query,
}: {
  totalPages: number;
  currentPage: number;
  query: string;
}) {
  const createPageURL = (page: number) => {
    const params = new URLSearchParams();
    if (query) {
      params.set('query', query);
    }
    params.set('page', page.toString());
    return `/dashboard/members?${params.toString()}`;
  };

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div className="mt-5 flex w-full justify-center">
      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={prevPage ? createPageURL(prevPage) : undefined}
          isDisabled={!prevPage}
        />
        <div className="flex -space-x-px">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <PaginationNumber
                  key={page}
                  href={createPageURL(page)}
                  page={page}
                  isActive={currentPage === page}
                />
              );
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return <span key={page} className="px-3 py-2 text-gray-500">...</span>;
            }
            return null;
          })}
        </div>
        <PaginationArrow
          direction="right"
          href={nextPage ? createPageURL(nextPage) : undefined}
          isDisabled={!nextPage}
        />
      </div>
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
}: {
  page: number | string;
  href: string;
  isActive: boolean;
}) {
  const className = isActive
    ? 'z-10 bg-blue-600 border-blue-600 text-white'
    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50';

  return (
    <Link
      href={href}
      className={`${className} relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20`}
    >
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string | undefined;
  direction: 'left' | 'right';
  isDisabled: boolean;
}) {
  const className = isDisabled
    ? 'pointer-events-none text-gray-300'
    : 'text-gray-500 hover:bg-gray-50';

  const icon = direction === 'left' ? (
    <ArrowLeftIcon className="w-5" />
  ) : (
    <ArrowRightIcon className="w-5" />
  );

  return isDisabled ? (
    <div className={`${className} relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium`}>
      {icon}
    </div>
  ) : (
    <Link
      href={href!}
      className={`${className} relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium hover:bg-gray-50 focus:z-20`}
    >
      {icon}
    </Link>
  );
}

