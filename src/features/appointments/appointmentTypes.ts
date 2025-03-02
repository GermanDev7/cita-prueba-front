export interface Appointment {
  appointmentId: number;
  date: string;   
  time: string;
  appointmentType: string;   
  doctorId: number;
  doctorName: string;
  patientId: number;
  patientName: string;
  status: 'active' | 'cancelled' | 'completed';
}
