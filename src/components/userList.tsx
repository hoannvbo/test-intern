import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Pagination from './Pagination';

type User = {
    login: { username: string };
    name: { title: string; first: string; last: string };
    picture: { thumbnail: string };
};

const fetchUsers = async (page: number) => {
    const response = await axios.get(`https://randomuser.me/api/?page=${page}&results=10`);
    return response.data.results;
};

const UserList: React.FC = () => {
    const [page, setPage] = useState(1);
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users', page],
        queryFn: () => fetchUsers(page),
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thumbnail</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user: User) => (
                        <tr key={user.login.username}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {user.name.title} {user.name.first} {user.name.last}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.login.username}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <img src={user.picture.thumbnail} alt={user.login.username} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
        </div>
    );
};

export default UserList;
