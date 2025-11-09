import { fetchFilteredMembers } from '@/lib/data';
import { UpdateMember, DeleteMember } from '@/app/ui/members/buttons';
import { getIdFromMongoId } from '@/lib/utils';

interface MemberRecord {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    [key: string]: unknown;
}

export default async function MembersTable({
    query,
    currentPage,   
}: {
    query: string;
    currentPage: number;
}) {
    let members: MemberRecord[] = [];
    let hasError = false;
    try {
        const fetchedMembers = await fetchFilteredMembers(query, currentPage);
        members = fetchedMembers as unknown as MemberRecord[];
    } catch (error) {
        console.error('Error fetching members:', error);
        hasError = true;
    }
    
    if (hasError) {
        return (
            <div className="mt-6 flow-root">
                <div className="rounded-lg bg-red-50 p-4 md:p-6">
                    <p className="text-center text-red-600 font-medium">Unable to connect to database.</p>
                    <p className="text-center text-red-500 text-sm mt-2">Please check your MongoDB connection settings in .env.local file</p>
                </div>
            </div>
        );
    }
    
    if (members.length === 0) {
        return (
            <div className="mt-6 flow-root">
                <div className="rounded-lg bg-gray-50 p-4 md:p-6">
                    <p className="text-center text-gray-500">No members found. Try adjusting your search.</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {members?.map((member) => {
                            const memberId = getIdFromMongoId(member);
                            return (
                            <div
                            key={memberId}
                            className="mb-2 w-full rounded-md bg-white p-4"
                          >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center">
                                            <p>{member.name}</p>
                                        </div>
                                        <p className="text-sm text-gray-500">{String(member.email || '')}</p>
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p className="text-sm text-gray-500">{String(member.phone || 'No phone')}</p>
                                        <p className="text-sm text-gray-500">{String(member.address || 'No address')}</p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <UpdateMember id={memberId} />
                                        <DeleteMember id={memberId} />
                                    </div>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Name
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Email
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Phone
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Address
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {members?.map((member) => {
                                const memberId = getIdFromMongoId(member);
                                return (
                                <tr
                                    key={memberId}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <p>{String(member.name)}</p>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {String(member.email || '')}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {String(member.phone || '-')}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {String(member.address || '-')}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                        <UpdateMember id={memberId} />
                                        <DeleteMember id={memberId} />
                                        </div>
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

