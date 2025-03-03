import React, { memo, useCallback } from 'react';
import AppointmentCard from '../AppointmentCard/AppointmentCard';
import './AppointmentList.css';
import useFetchAppointments from '../../hooks/useFetchAppintments';
import { cancelAppointment } from '../../services/appointmentsAPI';
import { useNavigate } from 'react-router-dom';
import { AppointmentListProps } from '../../Interfaces/AppointmentListProps';

const AppointmentList: React.FC<AppointmentListProps> = ({ role }) => {
  const { appointments, fetchAppointments } = useFetchAppointments();
  const navigate = useNavigate();

  const handleCancelAppointment = async (appointmentId: number) => {
    try {
      await cancelAppointment(appointmentId);
      await fetchAppointments();
    } catch (error) {
      console.error('Error al cancelar cita:', error);
    }
  };

  const handleEditAppointment = useCallback((appointmentId: number) => {
    navigate(`/patient/create/${appointmentId}`);
  }, [navigate]);
  return (
    <div className="appointment-list">
      <h2> Mis citas</h2>
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
