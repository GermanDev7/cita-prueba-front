import { Appointment } from '../Interfaces/Appointment';
import { CreateAppointmentPayload } from '../Interfaces/CreateAppointmentPayload';
import api from './api';




export const getPatientAppointments = async (): Promise<Appointment[]> => {
    const response = await api.get<Appointment[]>('/appointments');
    return response.data;
};


export const createAppointment = async (data: CreateAppointmentPayload): Promise<Appointment> => {
    const response = await api.post<Appointment>('/appointments', data);
    return response.data;
};

export const cancelAppointment = async (appointmentId: number): Promise<void> => {
    await api.patch(`/appointments/${appointmentId}/cancel`);
};