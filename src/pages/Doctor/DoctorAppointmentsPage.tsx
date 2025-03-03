import React from 'react';
import AppointmentList from '../../components/AppointmentList/AppointmentList';
import './DoctorAppointmentsPage.css';
import { AppointmentListProps } from '../../Interfaces/AppointmentListProps';

const DoctorAppointmentsPage: React.FC<AppointmentListProps> = ({ role }) => {

  return (
    <div className="doctor-page">
      <h1 className="doctor-page__title">Mis Citas</h1>
      <AppointmentList role={role} />
    </div>
  );
};

export default DoctorAppointmentsPage;
