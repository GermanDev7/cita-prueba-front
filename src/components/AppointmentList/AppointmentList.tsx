import React, { memo } from 'react';
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

  const handleEditAppointment = (appointmentId: number) => {
    navigate(`/patient/update/${appointmentId}`);
  };
  return (
    <div className="appointment-list">
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
