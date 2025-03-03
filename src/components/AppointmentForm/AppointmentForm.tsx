
import React, { useCallback, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import SpecialtySelect from '../../components/Selects/SpecialtySelect';
import DoctorSelect from '../../components/Selects/DoctorSelect';
import './AppointmentForm.css';
import { GenericOptionsSelect } from '../../Interfaces/GenericOptionsSelect';
import { CreateFormInputs } from '../../Interfaces/CreateFormInputs';
import useSubmitAppointment from '../../hooks/useSubmitAppointment';
import { AppointmentFormProps } from '../../Interfaces/AppointmentFormProps';
import { useNavigate, useParams } from 'react-router-dom';
import useLoadAppointmentData from '../../hooks/useLoadAppointmentData';
import useUpdateAppointment from '../../hooks/useUpdateAppointment';
import { Box, Button, FormControl, FormHelperText, InputLabel, TextField } from '@mui/material';
import { useDoctorOptions } from '../../hooks/useDoctorOptions';
import { useReassignDoctor } from '../../hooks/useReassingDoctor';




const AppointmentForm: React.FC<AppointmentFormProps> = ({ state, role }) => {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateFormInputs>();
  const { doctorOptions } = useDoctorOptions()
  const [selectedSpecialty, setSelectedSpecialty] = useState<GenericOptionsSelect>({ label: "", value: "" });
  const [selectedDoctor, setSelectedDoctor] = useState<GenericOptionsSelect>({ label: "", value: "" });
  const { appointmentData } = useLoadAppointmentData({ state, id });
  const { submitAppointment } = useSubmitAppointment();
  const { update } = useUpdateAppointment()
  const { reassign } = useReassignDoctor()

  const handleDoctorChange = useCallback((option: GenericOptionsSelect) => {
    setSelectedDoctor(option);
  }, []);

  useEffect(() => {
    if (!appointmentData) return;

    const dateObj = new Date(appointmentData.dateTime);
    const formattedDate = dateObj.toISOString().split('T')[0];
    const formattedTime = dateObj.toTimeString().slice(0, 5);

    setValue('date', formattedDate);
    setValue('time', formattedTime);
    setValue('doctorId', appointmentData.doctorId);
    setValue('appointmentType', appointmentData.appointmentType);

    setSelectedDoctor({
      label: appointmentData.doctorName,
      value: appointmentData.doctorId.toString(),
    });

    setSelectedSpecialty({
      label: appointmentData.appointmentType,
      value: appointmentData.appointmentType,
    });
  }, [appointmentData, setValue]);

  const onSubmit: SubmitHandler<CreateFormInputs> = (data) => {
    if (state == "create") {
      submitAppointment(data, selectedDoctor, selectedSpecialty)
    } else {
      if (role == "patient") {
        update(appointmentData.appointmentId, data.date, data.time)
      } else {
        reassign(appointmentData.appointmentId, data.doctorId)
      }
    }
  }

  const goBack = () => {
    if (role == 'patient') {
      navigate(`/patient/appointments`);
    } else {
      navigate(`/admin/appointments`);
    }

  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="appointment-form"
      noValidate
    >
      <Box className="appointment-form__row">
        <Box className="appointment-form__field">
          <TextField
            label="Fecha"
            type="date"
            fullWidth
            error={!!errors.date}
            helperText={errors.date?.message || ''}

            {...register('date', { required: 'La fecha es obligatoria' })}
          />
        </Box>

        <Box className="appointment-form__field">
          <TextField
            label="Hora"
            type="time"
            fullWidth
            error={!!errors.time}
            helperText={errors.time?.message || ''}
            {...register('time', { required: 'La hora es obligatoria' })}
          />
        </Box>
      </Box>

      <Box className="appointment-form__row">
        <Box className="appointment-form__field">
          <FormControl fullWidth error={!!errors.doctorId}>
            <InputLabel shrink id="doctor-label">
              Doctor
            </InputLabel>
            <DoctorSelect
              value={selectedDoctor}
              options={doctorOptions}
              onChange={handleDoctorChange}
            />
            {errors.doctorId && (
              <FormHelperText>{errors.doctorId.message}</FormHelperText>
            )}
          </FormControl>
        </Box>

        <Box className="appointment-form__field">
          <FormControl fullWidth error={!!errors.appointmentType}>
            <InputLabel shrink id="specialty-label">
              Cita
            </InputLabel>
            <SpecialtySelect
              value={selectedSpecialty}
              onChange={(option) => setSelectedSpecialty(option)}
            />
            {errors.appointmentType && (
              <FormHelperText>{errors.appointmentType.message}</FormHelperText>
            )}
          </FormControl>
        </Box>
      </Box>


      <Box className="appointment-form__buttons">
        <Button
          variant="outlined"
          color="primary"
          onClick={goBack}
          className="appointment-form__button"
        >
          Volver
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="appointment-form__button"
        >
          {state === 'create' ? 'Crear Cita' : 'Actualizar Cita'}
        </Button>
      </Box>
    </Box>
  );
};

export default AppointmentForm;
