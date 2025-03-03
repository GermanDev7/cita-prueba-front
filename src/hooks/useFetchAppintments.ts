import { useEffect, useState } from "react";
import { Appointment } from "../Interfaces/Appointment";
import { getPatientAppointments } from "../services/appointmentsAPI";

const useFetchAppointments = () => {

    const [appointments, setAppointments] = useState<Appointment[]>([]);
  

    const fetchAppointments = async () => {

      
        try {
            const data = await getPatientAppointments();
            setAppointments(data);
        } catch (error) {
            console.error('Error al obtener citas del paciente:', error);
        } 
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return { appointments, fetchAppointments }
}


export default useFetchAppointments