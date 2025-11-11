import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DeviceManagement from './pages/DeviceManagement'
import LoanManagement from './pages/LoanManagement'
import CustomerManagement from './pages/CustomerManagement'
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="devices" element={<DeviceManagement />} />
          <Route path="loans" element={<LoanManagement />} />
          <Route path="customers" element={<CustomerManagement />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
