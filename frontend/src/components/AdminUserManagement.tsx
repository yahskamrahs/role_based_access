import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllUsers, deleteUser, updateUserRole } from '../api/auth';
import { Role } from '../types';
import { useAuth } from '../context/AuthContext';

const AdminUserManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setSuccessMsg('User deleted successfully.');
      setTimeout(() => setSuccessMsg(null), 3000);
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }: { id: number; role: Role }) => updateUserRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setSuccessMsg('User role updated successfully.');
      setTimeout(() => setSuccessMsg(null), 3000);
    },
  });

  if (isLoading) return <div className="mt-8 p-4 bg-white rounded-md shadow-sm">Loading users...</div>;
  if (isError) {
    const errorMsg = (error as any)?.response?.data?.message || (error as any)?.message;
    return <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-md shadow-sm">Error loading users. {errorMsg}</div>;
  }

  return (
    <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">User Management</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">View and manage all registered users.</p>
        </div>
        {successMsg && <div className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded">{successMsg}</div>}
      </div>
      <div className="border-t border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((u: any) => (
              <tr key={u.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select 
                    value={u.role}
                    onChange={(e) => updateRoleMutation.mutate({ id: u.id, role: e.target.value as Role })}
                    disabled={u.email === user?.email}
                    className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="USER">USER</option>
                    <option value="MODERATOR">MODERATOR</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => {
                        if (window.confirm('Are you sure you want to delete this user?')) {
                            deleteMutation.mutate(u.id);
                        }
                    }}
                    disabled={u.email === user?.email}
                    className={`text-red-600 hover:text-red-900 ${u.email === user?.email ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserManagement;
