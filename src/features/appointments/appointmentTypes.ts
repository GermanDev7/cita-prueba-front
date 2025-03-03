export interface Appointment {
  appointmentId: number;
  dateTime: Date;
  date: string;
  time: string;
  appointmentType: string;
  doctorId: number;
  doctorName: string;
  patientId: number;
  patientName: string;
  status: 'scheduled' | 'canceled' | 'completed';
}

export interface CreateFormInputs {
  date: string;
  time: string;
  appointmentType: string;
  doctorId: number;
  userId: number;
}

export interface DoctorOption {
  value: number;
  label: string;
}
