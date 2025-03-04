import React from 'react';
import './CreateAppointmentPage.css';
import AppointmentForm from '../../components/AppointmentForm/AppointmentForm';
import { PageGenericFormatProps } from '../../Interfaces/PageGenericFormatProp';

const CreateAppointmentPage: React.FC<PageGenericFormatProps> = ({ state,role }) => {
  return (
    <div className="create-appointment-page">
      
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
