// src/components/AppointmentCard/AppointmentCard.tsx
import React from 'react';
import { Appointment } from '../../features/appointments/appointmentTypes';
import './AppointmentCard.css';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel: (id: number) => void;
  onEdit: (id: number) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onCancel, onEdit }) => {
  return (
    <div className="appointment-card">
      <div className="appointment-card__info">
        <p className="appointment-card__date">Fecha: {appointment.date} - {appointment.time}</p>
        <p className="appointment-card__doctor">Doctor: {appointment.doctorName}</p>
        <p className="appointment-card__type">Tipo: {appointment.appointmentType}</p>
        <p className="appointment-card__patient">Paciente: {appointment.patientName}</p>
        <p className="appointment-card__status">Estado: {appointment.status}</p>
      </div>
      <div className="appointment-card__actions">
        <button 
          className="appointment-card__button appointment-card__button--edit" 
          onClick={() => onEdit(appointment.appointmentId)}
        >
          Editar
        </button>
        <button 
          className="appointment-card__button appointment-card__button--cancel" 
          onClick={() => onCancel(appointment.appointmentId)}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
