import Form from '@/app/ui/members/edit-form';
import Breadcrumbs from '@/app/ui/members/breadcrumbs';
import { fetchMemberById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
    const id = params.id;
    const member = await fetchMemberById(id);

    if(!member){
        notFound();
    }
    
    const dataMember = {
        ...member,
        _id: String(member._id),
    };
    
    return (
        <div>
            <Breadcrumbs
        breadcrumbs={[
          { label: 'Members', href: '/dashboard/members' },
          {
            label: 'Edit Member',
            href: `/dashboard/members/${id}/edit`,
            active: true,
          },
        ]}
      />
        <Form member={dataMember} />
        </div>
    )
}

