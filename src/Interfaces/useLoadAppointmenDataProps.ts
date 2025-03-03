import { CreateFormInputs } from "./CreateFormInputs";

export interface UseLoadAppointmentDataProps {
  state: 'create' | 'update';
  id?: string;
  setValue: (name: keyof CreateFormInputs, value: any) => void;
}