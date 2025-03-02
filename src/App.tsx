import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './App.css'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: Login */}
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
          path="/user/*"
          element={
            <PrivateRoute requiredRole="user">
              <DashboardLayout>
                <UserAppointmentsPage />
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
