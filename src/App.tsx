import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import PrivateRoute from './routes/PrivateRoute';

import PatientAppointmentsPage from './pages/Patient/PatientAppointmentsPage';
import CreateAppointmentPage from './pages/Patient/CreateAppointmentPage';
import DoctorAppointmentsPage from './pages/Doctor/DoctorAppointmentsPage';
import AdminAppointmentsPage from './pages/Admin/AdminAppointmentsPage';
import Header from './components/Header/Header';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

function App() {
  const { token } = useSelector((state: RootState) => state.auth);
  return (
    <BrowserRouter>
      {token && (
        <Header />
      )}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/patient/*"
          element={
            <PrivateRoute requiredRole="patient">
              <DashboardLayout>
                <Routes>
                  <Route
                    path="appointments"
                    element={<PatientAppointmentsPage role='patient' />}
                  />
                  <Route
                    path="create"
                    element={<CreateAppointmentPage state='create' role="patient" />}
                  />
                  <Route
                    path="update/:id"
                    element={<CreateAppointmentPage state='update' role="patient" />}
                  />
                  <Route path="*" element={<Navigate to="appointments" replace />} />
                </Routes>
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/doctor/*"
          element={
            <PrivateRoute requiredRole="doctor">
              <DashboardLayout>
                <Routes>
                  <Route
                    path="appointments"
                    element={<DoctorAppointmentsPage role="doctor" />}
                  />
                  <Route path="*" element={<Navigate to="appointments" replace />} />
                </Routes>
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/*"
          element={
            <PrivateRoute requiredRole="admin">
              <DashboardLayout>
                <Routes>
                  <Route
                    path="appointments"
                    element={<AdminAppointmentsPage role="admin" />}
                  />
                  <Route
                    path="update/:id"
                    element={<CreateAppointmentPage state='update' role="admin" />}
                  />
                  <Route path="*" element={<Navigate to="appointments" replace />} />
                </Routes>
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
