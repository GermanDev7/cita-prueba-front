
export interface CreateFormInputs {
    appointmentId:number;
    dateTime: Date;
    date: string;
    time: string;
    appointmentType: string;
    doctorId: number;
    userId?: number;
}
