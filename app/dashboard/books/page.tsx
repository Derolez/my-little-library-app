import Breadcrumbs from '@/app/ui/books/breadcrumbs';
import Search from '@/app/ui/search';
import { CreateBook } from '@/app/ui/books/buttons';
import Table from '@/app/ui/books/table';
import Pagination from '@/app/ui/books/pagination';
import { fetchBooksPages } from '@/lib/data';

export default async function Page(props:{
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  let totalPages = 1;
  try {
    totalPages = await fetchBooksPages(query);
  } catch (error) {
    console.error('Error fetching books pages:', error);
  }

    return (
    <div className="w-full">
      <Breadcrumbs
                breadcrumbs={[
                    {label: 'Books', href: '/dashboard/books', },  
                ]}
            />
      <div className="mt-4 items-center justify-between gap-2 md:mt-8">
        <div className="relative flex flex-1 flex-shrink-0 gap-2">
            <Search placeholder="Search books..."/>
            <CreateBook />
        </div>
        <Table query={query} currentPage={currentPage} />
        <Pagination totalPages={totalPages} currentPage={currentPage} query={query} />
      </div>
    </div>

    );
  }
