
import { GenericOptionsSelect } from '../Interfaces/GenericOptionsSelect';
import api from './api';

export const getDoctorsBySpecialty = async (specialty: string): Promise<GenericOptionsSelect[]> => {
    const response = await api.get<GenericOptionsSelect[]>('/doctors', {
      params: { specialty },
    });
    return response.data;
  };