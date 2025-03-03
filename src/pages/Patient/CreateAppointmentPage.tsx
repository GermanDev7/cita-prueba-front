import React from 'react';
import './CreateAppointmentPage.css';
import AppointmentForm from '../../components/AppointmentForm/AppointmentForm';
import { PageGenericFormatProps } from '../../Interfaces/PageGenericFormatProp';
import { Alert, Snackbar, SnackbarOrigin } from '@mui/material';
interface State extends SnackbarOrigin {
  open: boolean;
}
const CreateAppointmentPage: React.FC<PageGenericFormatProps> = ({ state,role }) => {
    const [stateAlert, setStateAlert] = React.useState<State>({
      open: false,
      vertical: 'top',
      horizontal: 'right',
    });
    const { vertical, horizontal, open } = stateAlert;
   const handleClose = () => {
    setStateAlert({ ...stateAlert, open: false });
  };
  return (
    <div className="create-appointment-page">
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
      <div className="create-appointment-page__container">
        <h2 className="create-appointment-page__header">
          {state === 'create' ? 'CREAR CITA' : 'ACTUALIZAR CITA'}
        </h2>
        <AppointmentForm state={state}  role={role}/>
      </div>
    </div>
  );
};

export default CreateAppointmentPage;
