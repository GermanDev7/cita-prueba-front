
import React, { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import SpecialtySelect from '../../components/Selects/SpecialtySelect';
import DoctorSelect from '../../components/Selects/DoctorSelect';
import './CreateAppointmentPage.css';
import { GenericOptionsSelect } from '../../Interfaces/GenericOptionsSelect';
import { CreateFormInputs } from '../../Interfaces/CreateFormInputs';
import useSubmitAppointment from '../../hooks/useSubmitAppointment';




const CreateAppointmentPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateFormInputs>();


  const [selectedSpecialty, setSelectedSpecialty] = useState<GenericOptionsSelect>({ label: "", value: "" });
  const [selectedDoctor, setSelectedDoctor] = useState<GenericOptionsSelect>({ label: "", value: "" });

  const { submitAppointment } = useSubmitAppointment();

  const handleSpecialtyChange = useCallback((option: GenericOptionsSelect) => {
    setSelectedSpecialty(option);
    setSelectedDoctor({ label: "", value: "" });
  }, []);


  const handleDoctorChange = useCallback((option: GenericOptionsSelect) => {
    setSelectedDoctor(option);
  }, []);

  const onSubmit: SubmitHandler<CreateFormInputs> = (data) => {
    submitAppointment(data, selectedDoctor, selectedSpecialty)
    console.log(data)
  }

  return (
    <div className="create-appointment-page">
      <div className="create-appointment-page__container">
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

          {/* Especialidad y Doctor (fila 2) */}
          <div className="create-appointment-page__group">
            <label>Especialidad:</label>
            <SpecialtySelect onChange={handleSpecialtyChange} />
          </div>
          <div className="create-appointment-page__group">
            <label>Doctor:</label>
            <DoctorSelect
              specialty={selectedSpecialty ? selectedSpecialty.value : ''}
              onChange={() => handleDoctorChange}
            />
          </div>

          {/* Botón (fila que abarca ambas columnas) */}
          <div className="create-appointment-page__buttons">
            <button type="submit" className="create-appointment-page__button create-appointment-page__button--primary">
              Crear Cita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAppointmentPage;
