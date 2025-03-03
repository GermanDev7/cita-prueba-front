
import { GenericOptionsSelect } from '../Interfaces/GenericOptionsSelect';
import api from './api';

export const getDoctors = async (): Promise<GenericOptionsSelect[]> => {
  const response = await api.get<GenericOptionsSelect[]>('/doctors',);
  return response.data;
};