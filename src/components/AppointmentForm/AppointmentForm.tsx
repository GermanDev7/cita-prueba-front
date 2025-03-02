import React, { useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './AppointmentForm.css';

export interface AppointmentFormInputs {
  date: string;
  time: string;
  appointmentType: string;
  doctorId: number;
}

interface AppointmentFormProps {
  onSubmitForm: (data: AppointmentFormInputs) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmitForm }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AppointmentFormInputs>();

  const onSubmit: SubmitHandler<AppointmentFormInputs> = useCallback((data) => {
    onSubmitForm(data);
  }, [onSubmitForm]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="appointment-form">
      <div className="appointment-form__group">
        <label>Fecha:</label>
        <input type="date" {...register('date', { required: 'La fecha es obligatoria' })} />
        {errors.date && <p className="appointment-form__error">{errors.date.message}</p>}
      </div>

      <div className="appointment-form__group">
        <label>Hora:</label>
        <input type="time" {...register('time', { required: 'La hora es obligatoria' })} />
        {errors.time && <p className="appointment-form__error">{errors.time.message}</p>}
      </div>

      <div className="appointment-form__group">
        <label>Tipo de Cita:</label>
        <input type="text" {...register('appointmentType', { required: 'El tipo es obligatorio' })} />
        {errors.appointmentType && <p className="appointment-form__error">{errors.appointmentType.message}</p>}
      </div>

      <div className="appointment-form__group">
        <label>ID del Doctor:</label>
        <input type="number" {...register('doctorId', { required: 'El doctor es obligatorio' })} />
        {errors.doctorId && <p className="appointment-form__error">{errors.doctorId.message}</p>}
      </div>

      <button type="submit" className="appointment-form__submit-button">
        Crear Cita
      </button>
    </form>
  );
};

export default AppointmentForm;
