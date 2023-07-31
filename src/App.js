import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/homePage/HomePage';
import MyAppointments from './components/appointmentInfo/MyAppointments';
import DoctorList from './components/doctorInfo/DoctorList';
import DeleteDoctor from './components/doctorInfo/DeleteDoctor';
import PatientList from './components/patientInfo/PatientList';
import Appointment from './components/appointmentInfo/Appointment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/delete_doctor" element={<DeleteDoctor />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/my_appointments" element={<MyAppointments />} />
      </Routes>
    </Router>
  );
}

export default App;
