import Breadcrumbs from '@/app/ui/members/breadcrumbs';
import Search from '@/app/ui/search';
import { CreateMember } from '@/app/ui/members/buttons';
import Table from '@/app/ui/members/table';
import Pagination from '@/app/ui/members/pagination';
import { fetchMembersPages } from '@/lib/data';

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
    totalPages = await fetchMembersPages(query);
  } catch (error) {
    console.error('Error fetching members pages:', error);
  }

    return (
    <div className="w-full">
      <Breadcrumbs
                breadcrumbs={[
                    {label: 'Members', href: '/dashboard/members', },  
                ]}
            />
      <div className="mt-4 items-center justify-between gap-2 md:mt-8">
        <div className="relative flex flex-1 flex-shrink-0 gap-2">
            <Search placeholder="Search members..."/>
            <CreateMember />
        </div>
        <Table query={query} currentPage={currentPage} />
        <Pagination totalPages={totalPages} currentPage={currentPage} query={query} />
      </div>
    </div>

    );
  }
