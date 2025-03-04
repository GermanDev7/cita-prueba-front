import { useState } from "react";
import { CreateAppointmentPayload } from "../Interfaces/CreateAppointmentPayload";
import { createAppointment } from "../services/appointmentsAPI";

const useSubmitAppointment = () => {

    const [error, setError] = useState("")

    const submitAppointment = async (data, selectedDoctor, selectedSpecialty) => {
        try {
            if (!selectedDoctor) {
                setError('Debes seleccionar un doctor');
                return;
            }
            const dateTime = new Date(`${data.date}T${data.time}:00`);
            const adjustedDateTime = new Date(dateTime.getTime() - (5 * 60 * 60 * 1000));
            const userDataStr = localStorage.getItem('userData');
            const userId = userDataStr ? JSON.parse(userDataStr).userId : null;
            if (!userId) {
                setError('No se encontró el userId en localStorage');
                return;
            }


            const payload: CreateAppointmentPayload = {
                dateTime: adjustedDateTime,
                appointmentType: selectedSpecialty.value,
                doctorId: parseInt(selectedDoctor.value),
                userId,
            };

            await createAppointment(payload);

        } catch (error) {
            setError(error.response.data.error);

        }

    }
    const resetError = () => {
        setError("");
    };

    return { submitAppointment, error, resetError };

}

export default useSubmitAppointment