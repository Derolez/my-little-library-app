'use client';

import {
    UserGroupIcon,
    HomeIcon,
    ArrowRightStartOnRectangleIcon,
    BookOpenIcon,
  } from '@heroicons/react/24/outline';

  import Link from 'next/link';
  import { usePathname } from 'next/navigation';
  import clsx from 'clsx';
  import { clashGrotesk } from "@/app/ui/fonts"

  // Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    { name: 'Books', href: '/dashboard/books', icon: BookOpenIcon },
    {
      name: 'Members',
      href: '/dashboard/members',
      icon: UserGroupIcon
    },
    { name: 'Loans', href: '/dashboard/loans', icon: ArrowRightStartOnRectangleIcon },
  ];
  export default function NavLinks() {
    const pathname = usePathname();
    return (
      <>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium transition-colors hover:bg-amber-100 hover:text-yellow-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-amber-50 text-yellow-500': pathname === link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className={`${clashGrotesk.className} antialiased text-base hidden md:block`}>{link.name}</p>
            </Link>
          );
        })}
      </>
    );
  }
