import React, { useState } from 'react';
import { Appointment } from '../../features/appointments/appointmentTypes';
import './AppointmentCard.css';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel: (id: number) => void;
  onEdit: (id: number) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onCancel, onEdit }) => {
  const [showModal, setShowModal] = useState(false);

  const dateObj = new Date(appointment.dateTime);
  const utcDate = dateObj.toLocaleDateString('es-ES', { timeZone: 'UTC' });
  const utcTime = dateObj.toLocaleTimeString('es-ES', { timeZone: 'UTC' });
  let buttonsDisabled = false;



  const handleCancelClick = () => {
    if (appointment.status === 'scheduled') {
      setShowModal(true);
    } else {
      onCancel(appointment.appointmentId);
    }
  };

  const confirmCancel = () => {
    onCancel(appointment.appointmentId);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  let statusName = '';
  let statusColor = '';
  if (appointment.status === 'scheduled') {
    statusColor = 'yellow';
    statusName = "Programado";
  } else if (appointment.status === 'canceled') {
    statusColor = 'red';
    statusName = "Cancelado";
    buttonsDisabled = true;
  } else if (appointment.status === 'completed') {
    statusColor = 'green';
    statusName = "Completado";
    buttonsDisabled = true;
  } else {
    statusColor = 'gray';
  }

  return (
    <div className="appointment-card">
      <div className="appointment-card__info">
        <p className="appointment-card__date">Fecha: {utcDate} - {utcTime}</p>
        <p className="appointment-card__doctor">Doctor: {appointment.doctorName}</p>
        <p className="appointment-card__type">Tipo: {appointment.appointmentType}</p>
        <p className="appointment-card__patient">Paciente: {appointment.patientName}</p>
        <p className="appointment-card__status">
          Estado: {appointment.status}{' '}
          <span className="status-label" style={{ backgroundColor: statusColor }}>
            {statusName}
          </span>
        </p>
      </div>
      <div className="appointment-card__actions">
        <button
          className="appointment-card__button appointment-card__button--edit"
          onClick={() => onEdit(appointment.appointmentId)}
          disabled={buttonsDisabled}
        >
          Editar
        </button>
        <button
          className="appointment-card__button appointment-card__button--cancel"
          onClick={handleCancelClick}
          disabled={buttonsDisabled}
        >
          Cancelar
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>¿Estás seguro de que deseas cancelar la cita?</p>
            <div className="modal-buttons">
              <button onClick={confirmCancel}>Sí, cancelar</button>
              <button onClick={closeModal}>No, mantener</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
