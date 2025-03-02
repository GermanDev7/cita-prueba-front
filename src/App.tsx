//import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './App.css'
import PrivateRoute from './routes/PrivateRoute'
import LoginPage from './pages/LoginPage'
import DashboardLayout from './components/DashBoardLayout'

import AdminAppointmentsPage from './pages/Admin/AdminAppointmentsPage'
import DoctorAppointmentsPage from './pages/Doctor/DoctorAppointmentsPage'
import PatientAppointmentsPage from './pages/Patient/PatientAppointmentsPage'

function App() {


  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<LoginPage />} />

        {/* Rutas protegidas */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute requiredRole="admin">
              <DashboardLayout>
                <AdminAppointmentsPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/doctor/*"
          element={
            <PrivateRoute requiredRole="doctor">
              <DashboardLayout>
                <DoctorAppointmentsPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/patient/*"
          element={
            <PrivateRoute requiredRole="patient">
              <DashboardLayout>
                <PatientAppointmentsPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        {/* En caso de ruta no encontrada */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
