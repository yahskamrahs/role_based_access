import axiosInstance from './axiosInstance';
import { RegisterRequest, LoginRequest, AuthResponse } from '../types';

export const registerUser = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/api/auth/register', data);
  return response.data;
};

export const loginUser = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/api/auth/login', data);
  return response.data;
};

export const getPublicContent = async (): Promise<string> => {
  const response = await axiosInstance.get('/api/public/hello');
  return response.data;
};

export const getUserContent = async (): Promise<string> => {
  const response = await axiosInstance.get('/api/user/dashboard');
  return response.data;
};

export const getAdminContent = async (): Promise<string> => {
  const response = await axiosInstance.get('/api/admin/dashboard');
  return response.data;
};

export const getAllUsers = async (): Promise<any[]> => {
  const response = await axiosInstance.get('/api/admin/users');
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/api/admin/users/${id}`);
};

export const updateUserRole = async (id: number, role: string): Promise<any> => {
  const response = await axiosInstance.put(`/api/admin/users/${id}/role`, { role });
  return response.data;
};
