// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import PrivateRoute from './routes/PrivateRoute';
import AppointmentList from './components/AppointmentList/AppointmentList';
import AppointmentForm from './components/AppointmentForm/AppointmentForm';

function App() {
  return (
    <BrowserRouter>
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
                    element={<AppointmentList role="patient" />}
                  />
                  <Route
                    path="create"
                    element={<AppointmentForm state='create' />}
                  />
                  <Route
                    path="update"
                    element={<AppointmentForm state='update' />}
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
                    element={<AppointmentList role="doctor" />}
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
                    element={<AppointmentList role="admin" />}
                  />
                  <Route
                    path="update"
                    element={<AppointmentForm state='update' />}
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
