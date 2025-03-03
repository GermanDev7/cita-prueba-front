import { useState } from 'react';
import { updateAppointment } from '../services/appointmentsAPI';

interface UseUpdateAppointmentReturn {
    update: (id: number, date: string, time: string) => Promise<void>;
}

export default function useUpdateAppointment(): UseUpdateAppointmentReturn {
    const update = async (id: number, date: string, time: string) => {

        try {
            const dateTime = new Date(`${date}T${time}:00`);
            const adjustedDateTime = new Date(dateTime.getTime() - (5 * 60 * 60 * 1000));
            await updateAppointment(id, adjustedDateTime);
            alert('Cita actualizada exitosamenute');
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    return {

        update,
    };
}
