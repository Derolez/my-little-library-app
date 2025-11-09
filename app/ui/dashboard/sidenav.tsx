import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import MLLLogoNav from '../mll-logo-nav';
import { PowerIcon } from '@heroicons/react/24/outline';
import { logout } from '@/lib/actions';
import { getUser } from '@/lib/getUser';

export default async function SideNav() {
    const user = await getUser();
    
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
                className="mb-2 flex h-20 items-end justify-start rounded-md overflow-hidden bg-center bg-[url('/library-books.jpeg')] p-4 md:h-40"
                href="/"
            >
                <div className="text-white hidden md:block">
                    <MLLLogoNav />
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                {user && (
                    <div className="hidden md:block p-2 text-sm text-gray-600">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs">{user.email}</p>
                    </div>
                )}
                <form action={logout}>
                    <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-amber-100 hover:text-amber-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <PowerIcon className="w-6" />
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form>
            </div>
        </div>
    );
}
