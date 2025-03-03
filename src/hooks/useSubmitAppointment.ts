import { CreateAppointmentPayload } from "../Interfaces/CreateAppointmentPayload";
import { createAppointment } from "../services/appointmentsAPI";

const useSubmitAppointment = () => {

    const submitAppointment = async (data, selectedDoctor, selectedSpecialty) => {
       
        try {
            if (!selectedDoctor) {
                throw new Error('Debes seleccionar un doctor');
            }
            console.log(data.time)
            const dateTime = new Date(`${data.date}T${data.time}:00`);
            const adjustedDateTime = new Date(dateTime.getTime() - (5 * 60 * 60 * 1000));
            const userDataStr = localStorage.getItem('userData');
            const userId = userDataStr ? JSON.parse(userDataStr).userId : null;
            if (!userId) {
                throw new Error('No se encontró el userId en localStorage');
            }


            const payload: CreateAppointmentPayload = {
                dateTime: adjustedDateTime,
                appointmentType: selectedSpecialty.value,
                doctorId: parseInt(selectedDoctor.value),
                userId,
            };
            console.log("payload", payload);

            await createAppointment(payload);
            alert('Cita creada exitosamente');
        } catch (error) {
            alert(error.response.data.error);
        }
    }
    return { submitAppointment };

}

export default useSubmitAppointment