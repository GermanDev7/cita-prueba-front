
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
import { Alert, AlertColor, Box, Button, FormControl, FormHelperText, InputLabel, Snackbar, SnackbarOrigin, TextField } from '@mui/material';
import { useDoctorOptions } from '../../hooks/useDoctorOptions';
import { useReassignDoctor } from '../../hooks/useReassingDoctor';

interface State extends SnackbarOrigin {
  open: boolean;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ state, role }) => {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateFormInputs>();
  const { doctorOptions } = useDoctorOptions()
  const [selectedSpecialty, setSelectedSpecialty] = useState<GenericOptionsSelect>({ label: "", value: "" });
  const [selectedDoctor, setSelectedDoctor] = useState<GenericOptionsSelect>({ label: "", value: "" });
  const { appointmentData } = useLoadAppointmentData({ state, id });
  const { submitAppointment, error, resetError } = useSubmitAppointment();
  const { update } = useUpdateAppointment()
  const { reassign } = useReassignDoctor()
  const [stateAlert, setStateAlert] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const [severityLabel, setSeverityLabel] = useState<AlertColor>('success')
  const { vertical, horizontal, open } = stateAlert;
  const handleClose = () => {
    setStateAlert({ ...stateAlert, open: false });
  };

  const handleDoctorChange = useCallback((option: GenericOptionsSelect) => {
    setSelectedDoctor(option);
  }, []);

  useEffect(() => {
    if (!appointmentData) return;

    const dateObj = new Date(appointmentData.dateTime);
    const adjustedDateObj = new Date(dateObj.getTime() + 5 * 60 * 60 * 1000);
    const formattedDate = adjustedDateObj.toISOString().split('T')[0];
    const formattedTime = adjustedDateObj.toTimeString().slice(0, 5);

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
    resetError();
    setStateAlert({
      open: false,
      vertical: 'top',
      horizontal: 'right',
    })
    if (state == "create") {
      try {
        submitAppointment(data, selectedDoctor, selectedSpecialty)
        setSeverityLabel('success')
        setStateAlert({
          open: true,
          vertical: 'top',
          horizontal: 'right',
        })
      } catch (error) {
        setSeverityLabel('error')
      }

    } else {
      if (role == "patient") {
        update(appointmentData.appointmentId, data.date, data.time)
      } else {
        console.log(data)
        console.log(appointmentData)
        reassign(appointmentData.appointmentId, selectedDoctor.value)
      }
    }
  }

  useEffect(() => {
    if (error != "") {
      setSeverityLabel('error')
      setStateAlert({
        open: true,
        vertical: 'top',
        horizontal: 'right',
      })
    }

  }, [error])

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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severityLabel}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error != '' ? error : `La cita ha sido ${state === 'create' ? 'creada' : 'actualizada'}  correctamente!`}
        </Alert>
      </Snackbar>
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


      <Box >
        <div className="appointment-form__buttons-container">
          <Button
            variant="outlined"
            onClick={goBack}
            className="appointment-form__button_goback"
          >
            Volver
          </Button>
          <Button
            type="submit"
            variant="contained"
            className="appointment-form__button_submit"
          >
            {state === 'create' ? 'Guardar' : 'Actualizar'}
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default AppointmentForm;
