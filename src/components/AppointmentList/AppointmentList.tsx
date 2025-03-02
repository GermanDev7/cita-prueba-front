// src/components/AppointmentList/AppointmentList.tsx
import React, { memo } from 'react';
import { Appointment } from '../../features/appointments/appointmentTypes';
import AppointmentCard from '../AppointmentCard/AppointmentCard';
import './AppointmentList.css';

interface AppointmentListProps {
  appointments: Appointment[];
  onCancel: (id: number) => void;
  onEdit: (id: number) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, onCancel, onEdit }) => {
  return (
    <div className="appointment-list">
      {appointments.map((appt) => (
        <AppointmentCard 
          key={appt.appointmentId} 
          appointment={appt} 
          onCancel={onCancel}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default memo(AppointmentList);
