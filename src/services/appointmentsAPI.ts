import { Appointment } from '../Interfaces/Appointment';
import { CreateAppointmentPayload } from '../Interfaces/CreateAppointmentPayload';
import api from './api';




export const getGenericAppointments = async (): Promise<Appointment[]> => {
    const response = await api.get<Appointment[]>('/appointments');
    return response.data;
};

export const getAppointmentById = async (id: number): Promise<Appointment> => {
    const response = await api.get<Appointment>(`/appointments/${id}`);
    return response.data;
};


export const createAppointment = async (data: CreateAppointmentPayload): Promise<Appointment> => {
    const response = await api.post<Appointment>('/appointments', data);
    return response.data;
};

export const updateAppointment = async (appointmentId: number, date: Date): Promise<Appointment> => {
    const response = await api.patch<Appointment>(`/appointments/${appointmentId}`, { dateTime: date });
    return response.data;
};
export const reassignDoctor = async (appointmentId: number, doctorId: number): Promise<string> => {
    const response = await api.patch<string>(`/appointments/${appointmentId}/reassign`, { newDoctorId: doctorId });
    return response.data;
};

export const cancelAppointment = async (appointmentId: number): Promise<void> => {
    await api.patch(`/appointments/${appointmentId}/cancel`);
};