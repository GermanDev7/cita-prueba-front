// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PatientAppointmentsPage from './pages/Patient/PatientAppointmentsPage';
import CreateAppointmentPage from './pages/Patient/CreateAppointmentPage';
import DashboardLayout from './components/DashboardLayout/DashBoardLayout';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/patient/appointments"
          element={
            <PrivateRoute requiredRole="patient">
              <DashboardLayout>
                <PatientAppointmentsPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/patient/create"
          element={
            <PrivateRoute requiredRole="patient">
              <DashboardLayout>
                <CreateAppointmentPage />
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
