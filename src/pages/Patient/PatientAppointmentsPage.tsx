import React, { useEffect, useState, useCallback } from 'react';
import { Appointment } from '../../features/appointments/appointmentTypes';
import { getPatientAppointments, cancelAppointment } from '../../services/appointmentsAPI';
import AppointmentList from '../../components/AppointmentList/AppointmentList';
import { useNavigate } from 'react-router-dom';
import './PatientAppointmentsPage.css';

const PatientAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPatientAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error al obtener citas del paciente:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleCancelAppointment = useCallback(async (appointmentId: number) => {
    try {
      await cancelAppointment(appointmentId);
      await fetchAppointments();
    } catch (error) {
      console.error('Error al cancelar cita:', error);
    }
  }, [fetchAppointments]);

  const handleEditAppointment = useCallback((appointmentId: number) => {
    navigate(`/patient/edit/${appointmentId}`);
  }, [navigate]);

  return (
    <div className="patient-page">
      <h1 className="patient-page__title">Mis Citas (Paciente)</h1>
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
