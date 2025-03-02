import api from './api';

export interface LoginResponse {
    token: string,
    role: 'admin' | 'doctor' | 'patient'| null;
    userData: Partial<Userdata>
}

export interface Userdata {
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    role: string
}

export interface LoginRequest {
    email: string;
    password: string;
}

export const loginAPI = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data
}