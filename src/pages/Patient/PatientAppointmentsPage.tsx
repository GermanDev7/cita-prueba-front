import React from 'react';
import AppointmentList from '../../components/AppointmentList/AppointmentList';
import './PatientAppointmentsPage.css';
import { AppointmentListProps } from '../../Interfaces/AppointmentListProps';

const PatientAppointmentsPage: React.FC<AppointmentListProps> = ({ role }) => {

  return (
    <div className="patient-page">
      <h1 className="patient-page__title">Mis Citas</h1>
      <AppointmentList role={role} />
    </div>
  );
};

export default PatientAppointmentsPage;
