import { useCallback, useState } from 'react';
import { updateAppointment } from '../services/appointmentsAPI';

interface UseUpdateAppointmentReturn {
    update: (id: number, date: string, time: string) => Promise<void>;
    errorUpdate: string;
}

export default function useUpdateAppointment(): UseUpdateAppointmentReturn {
    const [errorUpdate, setErrorUpdate] = useState('');
    const update = useCallback(async (id: number, date: string, time: string) => {
        try {
            const dateTime = new Date(`${date}T${time}:00`);
            const adjustedDateTime = new Date(dateTime.getTime() - 5 * 60 * 60 * 1000);
            await updateAppointment(id, adjustedDateTime);
        } catch (error: any) {
            setErrorUpdate(error.response?.data?.error || 'Error al actualizar la cita');
        }
    }, []);

    return {
        update,
        errorUpdate
    };
}
