import { useState } from 'react';
import { reassignDoctor } from '../services/appointmentsAPI';


export const useReassignDoctor = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const reassign = async (appointmentId: number, doctorId: number): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await reassignDoctor(appointmentId, doctorId);
        } catch (err) {
            setError(err.message);

        } finally {
            setLoading(false);
        }
    };

    return { reassign, loading, error };
};
