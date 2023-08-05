import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/homePage/HomePage';
import MyAppointments from './components/appointmentInfo/MyAppointments';
import DoctorList from './components/doctorInfo/DoctorList';
import DeleteDoctor from './components/doctorInfo/DeleteDoctor';
import PatientList from './components/forSuperUser/PatientList';
import Appointment from './components/appointmentInfo/Appointment';
import AppointmentList from './components/forSuperUser/AppointmentList';
import UserList from './components/forSuperUser/UserList';
import DoctorDetails from './components/doctorInfo/DoctorDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/doctor_details" element={<DoctorDetails />} />
        <Route path="/delete_doctor" element={<DeleteDoctor />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/my_appointments" element={<MyAppointments />} />
        <Route path="/user_list" element={<UserList />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/appointment_list" element={<AppointmentList />} />
      </Routes>
    </Router>
  );
}

export default App;
