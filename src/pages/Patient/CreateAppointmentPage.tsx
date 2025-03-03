
import React from 'react';
import './CreateAppointmentPage.css';
import AppointmentForm from '../../components/AppointmentForm/AppointmentForm';
import { PageGenericFormatProps } from '../../Interfaces/PageGenericFormatProp';


const CreateAppointmentPage: React.FC<PageGenericFormatProps> = ({ state }) => {

  return (
    <div className="create-appointment-page">
      <div className="create-appointment-page__container">
        {state === "create" ? (
          <h2 className="create-appointment-page__header">Crear Cita</h2>
        ) : (
          <h2 className="create-appointment-page__header">Actualizar Cita</h2>
        )}
        <AppointmentForm state={state} />
      </div>
    </div>
  );
};

export default CreateAppointmentPage;
