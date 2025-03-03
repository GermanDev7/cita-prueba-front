import { CreateFormInputs } from "./CreateFormInputs";

export interface UseLoadAppointmentDataProps {
    state: 'create' | 'update';
    id?: string; // se obtiene de la URL, por ejemplo
    setValue: (name: keyof CreateFormInputs, value: any) => void;
  }