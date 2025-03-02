// src/pages/Patient/CreateAppointmentPage.tsx
import React, { useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createAppointment } from '../../services/appointmentsAPI';
import './CreateAppointmentPage.css';

interface CreateFormInputs {
  date: string;
  time: string;
  appointmentType: string;
  doctorId: number;
}

const CreateAppointmentPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateFormInputs>();

  const onSubmit: SubmitHandler<CreateFormInputs> = useCallback(async (data) => {
    try {
      // Combinar fecha y hora
      const dateTime = new Date(`${data.date}T${data.time}:00`);
      // Obtener userId de localStorage
      const userDataStr = localStorage.getItem('userData');
      const userId = userDataStr ? JSON.parse(userDataStr).userId : null;
      if (!userId) throw new Error('No se encontró el userId en localStorage');

      const payload = {
        dateTime,
        appointmentType: data.appointmentType,
        doctorId: data.doctorId,
        userId
      };
      await createAppointment(payload);
      alert('Cita creada exitosamente');
      
     //navigate('/patient/appointments');
    } catch (error) {
      console.error('Error al crear cita:', error);
      alert('Error al crear la cita');
    }
  }, []);

  return (
    <div className="create-appointment-page">
      <h1 className="create-appointment-page__title">Crear Nueva Cita</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="create-appointment-page__form">
        <div className="create-appointment-page__group">
          <label>Fecha:</label>
          <input
            type="date"
            {...register('date', { required: 'La fecha es obligatoria' })}
          />
          {errors.date && <p className="create-appointment-page__error">{errors.date.message}</p>}
        </div>

        <div className="create-appointment-page__group">
          <label>Hora:</label>
          <input
            type="time"
            {...register('time', { required: 'La hora es obligatoria' })}
          />
          {errors.time && <p className="create-appointment-page__error">{errors.time.message}</p>}
        </div>

        <div className="create-appointment-page__group">
          <label>Tipo de Cita:</label>
          <input
            type="text"
            {...register('appointmentType', { required: 'El tipo de cita es obligatorio' })}
          />
          {errors.appointmentType && (
            <p className="create-appointment-page__error">{errors.appointmentType.message}</p>
          )}
        </div>

        <div className="create-appointment-page__group">
          <label>ID del Doctor:</label>
          <input
            type="number"
            {...register('doctorId', { required: 'El doctor es obligatorio' })}
          />
          {errors.doctorId && (
            <p className="create-appointment-page__error">{errors.doctorId.message}</p>
          )}
        </div>

        <button type="submit" className="create-appointment-page__submit-button">
          Crear Cita
        </button>
      </form>
    </div>
  );
};

export default CreateAppointmentPage;
