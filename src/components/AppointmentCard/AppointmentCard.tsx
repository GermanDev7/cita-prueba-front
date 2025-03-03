import React, { useState } from 'react';
import './AppointmentCard.css';
import { Appointment } from '../../Interfaces/Appointment';
import { Box, Button, Card, CardActions, CardContent, Modal } from '@mui/material';

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



  return (
    <>
      <Card>
        <CardContent className='card__container'>
          <section className='card__container--bottom'>
            <span>Fecha:</span> {utcDate} - {utcTime}
            <br />
            <span>Doctor Asignado:</span>{appointment.doctorName}
            <br />
          </section>
          <section>
            <span>Tipo de cita: </span> {appointment.appointmentType}
            <br />
            <span>Paciente: </span>{appointment.patientName}
            <br />
          </section>
        </CardContent>
        <CardActions>
          {(role === 'patient') ? (
            <>
              <Button
                className="appointment-card__button appointment-card__button--cancel"
                onClick={handleCancelClick}
                disabled={buttonDisabled}
              >
                Cancelar
              </Button>
              <Button
                className="appointment-card__button appointment-card__button--edit"
                onClick={() => onEdit(appointment.appointmentId, role)}
                disabled={buttonDisabled}
              >
                Actualizar
              </Button>

            </>
          ) : role === 'admin' ? (
            <>
              <Button
                className="appointment-card__button appointment-card__button--edit"
                onClick={() => onReasign(appointment.appointmentId)}
                disabled={buttonDisabled}
              >
                Reasignar
              </Button>
              <Button
                className="appointment-card__button appointment-card__button--cancel"
                onClick={handleCancelClick}
                disabled={buttonDisabled}
              >
                Cancelar
              </Button>
            </>
          )
            : role === 'doctor' ? (
              <Button
                className="appointment-card__button appointment-card__button--check"
                onClick={() => onCheck(appointment.appointmentId)}
                disabled={buttonDisabled}
              >
                Completar
              </Button>
            ) :
              (<>
              </>)}
        </CardActions>
      </Card>

      <Modal
        open={showModal}
        onClose={() => closeModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card className="box-modal">
          <CardContent>
            <b>Cancelar Cita</b>
            <br></br>
            <p className='box__description'>¿Estás seguro de que deseas cancelar la cita de {appointment.doctorName}?</p>
          </CardContent>
          <CardActions>
            <Button onClick={closeModal}>Cancelar</Button>
            <Button onClick={confirmCancel}>Confirmar</Button>
          </CardActions>

        </Card>

      </Modal>
      {/* {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>¿Estás seguro de que deseas cancelar la cita?</p>
            <div className="modal-buttons">
             
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default AppointmentCard;
