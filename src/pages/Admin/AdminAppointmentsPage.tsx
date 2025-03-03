import React from 'react';
import AppointmentList from '../../components/AppointmentList/AppointmentList';
import './AdminAppointmentsPage.css';
import { AppointmentListProps } from '../../Interfaces/AppointmentListProps';

const AdminAppointmentsPage: React.FC<AppointmentListProps> = ({ role }) => {

  return (
    <div className="admin-page">
      <h1 className="admin-page__title">Mis Citas</h1>
      <AppointmentList role={role} />
    </div>
  );
};

export default AdminAppointmentsPage;
