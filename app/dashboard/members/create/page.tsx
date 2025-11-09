import Form from '@/app/ui/members/create-form';
import Breadcrumbs from '@/app/ui/members/breadcrumbs';

export default async function Page() {
    return(
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {label: 'Members', href: '/dashboard/members' },
                    {
                        label: 'Create Member',
                        href: '/dashboard/members/create',
                        active: true,
                    },
                ]}
            />
            <Form />
        </main>
    );
}

