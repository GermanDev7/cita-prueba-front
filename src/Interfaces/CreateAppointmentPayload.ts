export interface CreateAppointmentPayload {
    dateTime: Date;
    appointmentType: string;
    doctorId: number;
    userId: number;
    
}