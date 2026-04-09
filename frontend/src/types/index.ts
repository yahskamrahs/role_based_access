export type Role = 'USER' | 'ADMIN' | 'MODERATOR';

export interface User {
  id?: number;
  name: string;
  email: string;
  role: Role;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password?: string;
  role: Role;
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  name: string;
  email: string;
  role: Role;
}
