
import React, { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import SpecialtySelect from '../../components/Selects/SpecialtySelect';
import DoctorSelect from '../../components/Selects/DoctorSelect';
import './AppointmentForm.css';
import { GenericOptionsSelect } from '../../Interfaces/GenericOptionsSelect';
import { CreateFormInputs } from '../../Interfaces/CreateFormInputs';
import useSubmitAppointment from '../../hooks/useSubmitAppointment';
import { AppointmentFormProps } from '../../Interfaces/AppointmentFormProps';
import { useParams } from 'react-router-dom';
import useLoadAppointmentData from '../../hooks/useLoadAppointmentData';
import useUpdateAppointment from '../../hooks/useUpdateAppointment';




const AppointmentForm: React.FC<AppointmentFormProps> = ({ state }) => {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateFormInputs>();


  const [selectedSpecialty, setSelectedSpecialty] = useState<GenericOptionsSelect>({ label: "", value: "" });
  const [selectedDoctor, setSelectedDoctor] = useState<GenericOptionsSelect>({ label: "", value: "" });


  const { appointmentData } = useLoadAppointmentData({ state, id, setValue });
  const { submitAppointment } = useSubmitAppointment();
  const { update } = useUpdateAppointment()


  const handleSpecialtyChange = useCallback((option: GenericOptionsSelect) => {
    setSelectedSpecialty(option);
    setSelectedDoctor({ label: "", value: "" });
  }, []);


  const handleDoctorChange = useCallback((option: GenericOptionsSelect) => {

    setSelectedDoctor(option);
  }, []);

  const onSubmit: SubmitHandler<CreateFormInputs> = (data) => {
    if (state == "create") {
      submitAppointment(data, selectedDoctor, selectedSpecialty)

    } else {

      update(data.appointmentId, data.date, data.time)

    }


  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="appointment-form">
      <div className="appointment-form__group">
        <label>Fecha:</label>
        <input
          type="date"
          {...register('date', { required: 'La fecha es obligatoria' })}
        />
        {errors.date && <p className="appointment-form__error">{errors.date.message}</p>}
      </div>
      <div className="appointment-form__group">
        <label>Hora:</label>
        <input
          type="time"
          {...register('time', { required: 'La hora es obligatoria' })}
        />
        {errors.time && <p className="appointment-form__error">{errors.time.message}</p>}
      </div>
      <div className="appointment-form__group">
        <label>Especialidad:</label>
        <SpecialtySelect onChange={handleSpecialtyChange} />
      </div>
      <div className="appointment-form__group">
        <label>Doctor:</label>
        <DoctorSelect
          specialty={selectedSpecialty.value || ''}
          onChange={handleDoctorChange}
        />
      </div>
      <div className="appointment-form__buttons">
        <button type="submit" className="appointment-form__button appointment-form__button--primary">
          {state === 'create' ? 'Crear Cita' : 'Actualizar Cita'}
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
