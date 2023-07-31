import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/homePage/HomePage';
import SignUpPage from './components/signUpInOut/SignUpForm';
import SignInPage from './components/signUpInOut/SignInForm';
import AddDoctor from './components/doctorInfo/AddDoctor';
import DoctorList from './components/doctorInfo/DoctorList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign_up" element={<SignUpPage />} />
        <Route path="/sign_in" element={<SignInPage />} />
        <Route path="/add_doctor" element={<AddDoctor />} />
        <Route path="/doctors" element={<DoctorList />} />
      </Routes>
    </Router>
  );
}

export default App;
