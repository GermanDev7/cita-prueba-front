import { useState } from 'react';
import { reassignDoctor } from '../services/appointmentsAPI';


export const useReassignDoctor = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [errorReassign, setErrorReasign] = useState('');

    const reassign = async (appointmentId: number, doctorId: number): Promise<void> => {

        try {
            await reassignDoctor(appointmentId, doctorId);
        } catch (err) {
            setErrorReasign(err.response.data.error);

        }
    };

    return { reassign, loading, errorReassign };
};
