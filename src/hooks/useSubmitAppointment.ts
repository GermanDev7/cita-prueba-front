import { CreateAppointmentPayload } from "../Interfaces/CreateAppointmentPayload";
import { createAppointment } from "../services/appointmentsAPI";

const useSubmitAppointment = () => {

    const submitAppointment = async (selectedDoctor, selectedSpecialty, data) => {
        console.log(selectedDoctor, selectedSpecialty, data)
        try {
            if (!selectedDoctor) {
                throw new Error('Debes seleccionar un doctor');
            }

            const dateTime = new Date(`${data.date}T${data.time}:00`);
            const userDataStr = localStorage.getItem('userData');
            const userId = userDataStr ? JSON.parse(userDataStr).userId : null;
            if (!userId) {
                throw new Error('No se encontró el userId en localStorage');
            }


            const payload: CreateAppointmentPayload = {
                dateTime,
                appointmentType: selectedSpecialty.value,
                doctorId: parseInt(selectedDoctor.value),
                userId,
            };

            await createAppointment(payload);
            alert('Cita creada exitosamente');
            // navigate('/patient/appointments'); // si quieres redirigir
        } catch (error) {
            console.error('Error al crear la cita:', error);
            alert('Error al crear la cita');
        }
    }
    return { submitAppointment };

}

export default useSubmitAppointment