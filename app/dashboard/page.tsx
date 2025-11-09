import { fetchBooksCount, fetchLoansCount, fetchMembersCount } from '@/lib/data';
import { BookOpenIcon, UserGroupIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

export default async function Page() {
    const [booksCount, loansCount, membersCount] = await Promise.all([
      fetchBooksCount(),
      fetchLoansCount(),
      fetchMembersCount(),
    ]);

    return (
      <main>
        <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
          {/* Books Card */}
          <div className="rounded-xl bg-gray-50 p-6 shadow-sm">
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <BookOpenIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Livres</p>
                <p className="text-2xl font-bold">{booksCount}</p>
              </div>
            </div>
          </div>

          {/* Loans Card */}
          <div className="rounded-xl bg-gray-50 p-6 shadow-sm">
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <ClipboardDocumentListIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Prêts</p>
                <p className="text-2xl font-bold">{loansCount}</p>
              </div>
            </div>
          </div>

          {/* Members Card */}
          <div className="rounded-xl bg-gray-50 p-6 shadow-sm">
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <UserGroupIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Membres</p>
                <p className="text-2xl font-bold">{membersCount}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }