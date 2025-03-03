import React, { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createAppointment } from '../../services/appointmentsAPI';
import { CreateFormInputs,DoctorOption } from '../../features/appointments/appointmentTypes';
import SpecialtySelect, { SpecialtyOption } from '../../components/Selects/SpecialtySelect';
import Select, { SingleValue } from 'react-select';
import './CreateAppointmentPage.css';




const CreateAppointmentPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateFormInputs>();
  const [selectedSpecialty, setSelectedSpecialty] = useState<SpecialtyOption | null>(null);
  const [doctorOptions, setDoctorOptions] = useState<DoctorOption[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorOption | null>(null);
  
  const getDoctorsBySpecialty = async (specialty: string): Promise<DoctorOption[]> => {
    
    //return simulatedDoctors;
  };

  const handleSpecialtyChange = useCallback(async (option: SingleValue<SpecialtyOption>) => {
    setSelectedSpecialty(option);
    if (option) {
      // Consulta la API para obtener los doctores de esa especialidad
      const doctors = await getDoctorsBySpecialty(option.value);
      setDoctorOptions(doctors);
      setSelectedDoctor(null); // Reinicia selección de doctor
    } else {
      setDoctorOptions([]);
      setSelectedDoctor(null);
    }
  }, []);


  const onSubmit: SubmitHandler<CreateFormInputs> = useCallback(async (data) => {
    try {
      const dateTime = new Date(`${data.date}T${data.time}:00`);
      const userDataStr = localStorage.getItem('userData');
      const userId = userDataStr ? JSON.parse(userDataStr).userId : null;
      if (!userId) throw new Error('No se encontró el userId en localStorage');

      const payload = {
        dateTime: dateTime,
        appointmentType: data.appointmentType,
        doctorId: data.doctorId,
        userId
      };

      await createAppointment(payload);
      alert('Cita creada exitosamente');
    } catch (error) {
      console.error('Error al crear cita:', error);
      alert('Error al crear la cita');
    }
  }, [selectedDoctor]);

  return (
    <div className="create-appointment-page">
      <h1 className="create-appointment-page__title">Crear Nueva Cita</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="create-appointment-page__form">
        <div className="create-appointment-page__group">
          <label>Fecha:</label>
          <input type="date" {...register('date', { required: 'La fecha es obligatoria' })} />
          {errors.date && <p className="create-appointment-page__error">{errors.date.message}</p>}
        </div>

        <div className="create-appointment-page__group">
          <label>Hora:</label>
          <input type="time" {...register('time', { required: 'La hora es obligatoria' })} />
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
          <label>Especialidad:</label>
          <SpecialtySelect onChange={handleSpecialtyChange} />
        </div>

        {doctorOptions.length > 0 && (
          <div className="create-appointment-page__group">
            <label>Doctor:</label>
            <Select
              options={doctorOptions}
              onChange={handleDoctorChange}
              placeholder="Seleccione un doctor..."
              isClearable
            />
          </div>
        )}

        <button type="submit" className="create-appointment-page__submit-button">
          Crear Cita
        </button>
      </form>
    </div>
  );
};

export default CreateAppointmentPage;
