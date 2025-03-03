import React, { useEffect, useState } from 'react';
import './AppointmentCard.css';
import { Appointment } from '../../Interfaces/Appointment';
import { StatusAppointment, StatusColor, StatusName } from '../../enums/statusAppointments';

interface AppointmentCardProps {
  role: string;
  appointment: Appointment;
  onCancel: (id: number) => void;
  onEdit: (id: number, role: string) => void;
}



const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onCancel, onEdit, role }) => {
  const [showModal, setShowModal] = useState(false);

  const dateObj = new Date(appointment.dateTime);
  const utcDate = dateObj.toLocaleDateString('es-ES', { timeZone: 'UTC' });
  const utcTime = dateObj.toLocaleTimeString('es-ES', { timeZone: 'UTC' });
  const [statusName, setStatusName] = useState('');
  const [statusColor, setStatusColor] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onCheck = (id: number) => {
    console.log(id)

  }

  const onReasign = (id: number) => {
    console.log(id)

  }
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




  const checkColorsByStatus = () => {
    switch (appointment.status) {
      case StatusAppointment.Scheduled:
        setStatusColor(StatusColor.Scheduled);
        setStatusName(StatusName.Scheduled);
        break;
      case StatusAppointment.Canceled:
        setStatusColor(StatusColor.Canceled);
        setStatusName(StatusName.Canceled);
        setButtonDisabled(true);
        break;
      case StatusAppointment.Completed:
        setStatusColor(StatusColor.Completed);
        setStatusName(StatusName.Completed);
        setButtonDisabled(true);
        break;
      default:
        setStatusColor(StatusColor.Default);
        break;
    }
  }

  useEffect(() => {
    checkColorsByStatus()
  }, [])



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
        {(role === 'patient') ? (
          <>
            <button
              className="appointment-card__button appointment-card__button--edit"
              onClick={() => onEdit(appointment.appointmentId, role)}
              disabled={buttonDisabled}
            >
              Editar
            </button>
            <button
              className="appointment-card__button appointment-card__button--cancel"
              onClick={handleCancelClick}
              disabled={buttonDisabled}
            >
              Cancelar
            </button>
          </>
        ) : role === 'admin' ? (
          <>
            <button
              className="appointment-card__button appointment-card__button--edit"
              onClick={() => onReasign(appointment.appointmentId)}
              disabled={buttonDisabled}
            >
              Reasignar
            </button>
            <button
              className="appointment-card__button appointment-card__button--cancel"
              onClick={handleCancelClick}
              disabled={buttonDisabled}
            >
              Cancelar
            </button>
          </>



        )
          : role === 'doctor' ? (
            <button
              className="appointment-card__button appointment-card__button--check"
              onClick={() => onCheck(appointment.appointmentId)}
              disabled={buttonDisabled}
            >
              Completar
            </button>
          ) :
            (<>
            </>)}

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
