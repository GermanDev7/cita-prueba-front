import { useEffect, useState } from "react";
import { Appointment } from "../Interfaces/Appointment";
import { getGenericAppointments } from "../services/appointmentsAPI";

const useFetchAppointments = () => {

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const data = await getGenericAppointments();
            setAppointments(data);
        } catch (error) {
            console.error('Error al obtener citas del paciente:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return { appointments, loading, fetchAppointments }
}


export default useFetchAppointments