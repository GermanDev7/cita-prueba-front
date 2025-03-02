export interface CreateAppointmentPayload {
    date: string;
    time: string;
    appointmentType: string;
    doctorId: number;
    patientId: number;  
  }