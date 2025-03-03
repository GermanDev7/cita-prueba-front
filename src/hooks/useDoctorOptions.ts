import { useEffect, useState } from 'react';
import { getDoctors } from '../services/doctorAPI';
import { GenericOptionsSelect } from '../Interfaces/GenericOptionsSelect';

export function useDoctorOptions(): { doctorOptions: GenericOptionsSelect[] } {
    const [doctorOptions, setDoctorOptions] = useState<GenericOptionsSelect[]>([]);

    useEffect(() => {
        getDoctors()
            .then((doctors) => {
                const options = doctors.map((doc) => ({
                    value: doc.doctorId,
                    label: doc.doctorName,
                }));
                setDoctorOptions(options);
            })
            .catch((err) => {
                console.error('Error al cargar doctores:', err);
                setDoctorOptions([]);
            });
    }, []);

    return { doctorOptions };
}