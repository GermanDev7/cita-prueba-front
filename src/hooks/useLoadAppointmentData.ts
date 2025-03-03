import { useEffect, useState } from "react";
import { getAppointmentById } from "../services/appointmentsAPI";
import { UseLoadAppointmentDataProps } from "../Interfaces/useLoadAppointmenDataProps";
import { CreateFormInputs } from "../Interfaces/CreateFormInputs";

const useLoadAppointmentData = ({ state, id, setValue }: UseLoadAppointmentDataProps) => {
    const [appointmentData, setAppointmentData] = useState<CreateFormInputs>({
        date: "",
        time: "",
        appointmentType: "",
        doctorId: 0,
        userId: 0,
    });

    const loadAppointmentData = async () => {
        if (state === 'update' && id) {
            try {
                const data: CreateFormInputs = await getAppointmentById(Number(id));
                setAppointmentData(data);
                // Poblar los campos del formulario con los datos obtenidos
                setValue('date', data.date);
                setValue('time', data.time);
                setValue('appointmentType', data.appointmentType);
            } catch (error) {
                console.error('Error al cargar la cita:', error);
            }
        }
    };

    useEffect(() => {
        loadAppointmentData();
    }, []);

    return { appointmentData };
};

export default useLoadAppointmentData;