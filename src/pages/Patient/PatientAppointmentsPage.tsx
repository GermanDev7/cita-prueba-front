import React, { useCallback } from 'react';

import { cancelAppointment } from '../../services/appointmentsAPI';
import AppointmentList from '../../components/AppointmentList/AppointmentList';
import { useNavigate } from 'react-router-dom';
import './PatientAppointmentsPage.css';
import useFetchAppointments from '../../hooks/useFetchAppintments';

const PatientAppointmentsPage: React.FC = () => {
  const { appointments, loading, fetchAppointments } = useFetchAppointments();
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
    navigate(`/patient/edit/${appointmentId}`);
  }, [navigate]);

  return (
    <div className="patient-page">
      <h1 className="patient-page__title">Citas</h1>
      {loading ? (
        <p className="patient-page__loading">Cargando citas...</p>
      ) : (
        <AppointmentList
          appointments={appointments}
          onCancel={handleCancelAppointment}
          onEdit={handleEditAppointment}
        />
      )}
    </div>
  );
};

export default PatientAppointmentsPage;
