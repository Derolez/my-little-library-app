'use client';
import Breadcrumbs from '@/app/ui/books/breadcrumbs';
import React from 'react';
import Autocomplete from '@/app/components/Autocomplete';

const Page = () => {
  return (
    <div>
      <Breadcrumbs
              breadcrumbs={[
                { label: 'Loans', href: '/dashboard/loans' },
                
              ]}
            />
      <h1>Welcome to the Enchanted World!</h1>
      <Autocomplete />
      {/* Rest of the homepage content */}
    </div>
  );
};

export default Page;