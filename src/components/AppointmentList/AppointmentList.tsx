import React, { memo } from 'react';
import AppointmentCard from '../AppointmentCard/AppointmentCard';
import './AppointmentList.css';
import useFetchAppointments from '../../hooks/useFetchAppintments';
import { cancelAppointment } from '../../services/appointmentsAPI';
import { useNavigate } from 'react-router-dom';
import { AppointmentListProps } from '../../Interfaces/AppointmentListProps';
import { Alert, Button, Snackbar, SnackbarOrigin } from '@mui/material';

interface State extends SnackbarOrigin {
  open: boolean;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ role }) => {
  const { appointments, fetchAppointments } = useFetchAppointments();
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;
  const navigate = useNavigate();

  const handleCancelAppointment = async (appointmentId: number) => {
    try {
      await cancelAppointment(appointmentId).then(() => { setState({ open: true, vertical: 'top', horizontal: 'right' }) });
      await fetchAppointments();
    } catch (error) {
      console.error('Error al cancelar cita:', error);
    }
  };

  const handleEditAppointment = (appointmentId: number) => {
    if (role == "patient") {
      navigate(`/patient/update/${appointmentId}`)
    } else {
      navigate(`/admin/update/${appointmentId}`)
    }
    ;
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <div className="appointment-list">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          La cita ha sido cancelada correctamente!
        </Alert>
      </Snackbar>
      {appointments.map((appt) => (
        <AppointmentCard
          key={appt.appointmentId}
          appointment={appt}
          onCancel={handleCancelAppointment}
          onEdit={handleEditAppointment}
          role={role}
        />
      ))}
    </div>
  );
};

export default memo(AppointmentList);
