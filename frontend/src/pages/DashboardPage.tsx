import React from 'react';
import Navbar from '../components/Navbar';
import ContentCard from '../components/ContentCard';
import AdminUserManagement from '../components/AdminUserManagement';
import { useQuery } from '@tanstack/react-query';
import { getPublicContent, getUserContent, getAdminContent } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const publicQuery = useQuery({
    queryKey: ['publicContent'],
    queryFn: getPublicContent
  });

  const userQuery = useQuery({
    queryKey: ['userContent'],
    queryFn: getUserContent,
    enabled: !!user,
    retry: false
  });

  const adminQuery = useQuery({
    queryKey: ['adminContent'],
    queryFn: getAdminContent,
    enabled: user?.role === 'ADMIN',
    retry: false
  });

  const getErrorMessage = (error: any) => {
    return error?.response?.data?.message || 'Access Denied / Not Found';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ContentCard 
              title="Public Endpoint"
              colorScheme="blue"
              isLoading={publicQuery.isLoading}
              error={publicQuery.isError ? getErrorMessage(publicQuery.error) : null}
              content={publicQuery.data}
            />
            
            <ContentCard 
              title="User Endpoint"
              colorScheme="green"
              isLoading={userQuery.isLoading}
              error={userQuery.isError ? getErrorMessage(userQuery.error) : null}
              content={userQuery.data}
            />
            
            <ContentCard 
              title="Admin Endpoint"
              colorScheme="red"
              isLoading={adminQuery.isLoading}
              error={adminQuery.isError ? getErrorMessage(adminQuery.error) : (user?.role !== 'ADMIN' ? 'Requires ADMIN role' : null)}
              content={adminQuery.data}
            />
          </div>

          {user?.role === 'ADMIN' && (
            <AdminUserManagement />
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
