import React from 'react'
import useAxiosSecure from '../../../components/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FiShieldOff } from 'react-icons/fi';
import { FaUserShield } from 'react-icons/fa6';

const UsersManagement = () => {
       const axiosSecure = useAxiosSecure();
    
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    })
  return (
    <div>
        <h2 className='text-4xl'>Manage Users: {users.length} </h2>
        <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            <th>Others Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => <tr>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.photoURL}
                                                alt="users Avatar" />
                                        </div>
                                    </div>
                                    <div><div className="font-bold">{user.displayName}</div>
                                        <div className="text-sm opacity-50">United States</div>
                                    </div>
                                </div>
                                 </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                {user.role}
                            </td>
                            <td>
                                {user.role === 'admin' ?
                                    <button                              
                                        className='btn bg-red-300'>
                                        <FiShieldOff />
                                    </button> :
                                    <button
                                    className='btn bg-green-400'>
                                        <FaUserShield></FaUserShield>
                                    </button>
                                        }
                            </td>
                            <th>
                                Actions
                            </th>
                        </tr>)}
                    </tbody>
                                    </table>
            </div>

    </div>
  )
}

export default UsersManagement