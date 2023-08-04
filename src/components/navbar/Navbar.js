import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { Nav, NavDropdown, Button } from 'react-bootstrap';
import {
  FaFacebookF, FaGooglePlusG, FaGoogleDrive, FaTwitter, FaLinkedinIn, FaRibbon, FaLandmark,
} from 'react-icons/fa6';
import { signOut } from '../../features/authSlice';
import AddDoctor from '../doctorInfo/AddDoctor';

function NavBar() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const { userRole } = useSelector((state) => state.auth);
  const isAdmin = () => userRole === 'admin';
  const isSuperAdmin = () => userRole === 'super_admin';
  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
  };
  const handleOpenSignUpModal = () => {
    setShowSignUpModal(true);
  };
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
    window.location.href = '/';
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <>
      <div className="d-flex flex-column justify-content-between border-end custom_nav" style={{ height: '100vh' }}>
        <div className="d-flex align-items-center justify-content-between p-3">
          <div className="d-flex align-items-center">
            <span><FaLandmark /></span>
            <h1 className="m-0 ms-2">Squa</h1>
            <span><FaRibbon /></span>
          </div>
        </div>
        <div className="d-flex flex-column gap-3 p-3">
          <Button
            onClick={handleOpenSignUpModal}
            disabled={!isAdmin()}
            className={` add_doctor_btn nav-link ${isActiveLink('/add_doctor') ? 'active' : ''}`}
          >
            Add Doctor
          </Button>
          {isAdmin() || isSuperAdmin() ? (
            <NavLink to="/delete_doctor" activeClassName="active" isActive={() => isActiveLink('/delete_doctor')}>
              Delete Doctor
            </NavLink>
          ) : (
            <Button
              className={` add_doctor_btn nav-link ${isActiveLink('/add_doctor') ? 'active' : ''}`}
              disabled={!isAdmin()}
            >
              Delete Doctor
            </Button>
          )}
          <NavLink to="/doctors" activeClassName="active" isActive={() => isActiveLink('/doctors')}>
            Doctors
          </NavLink>
          <NavLink to="/appointment" activeClassName="active" isActive={() => isActiveLink('/appointment')}>
            Appointment
          </NavLink>
          <NavLink to="/my_appointments" activeClassName="active" isActive={() => isActiveLink('/my_appointments')}>
            My Appointments
          </NavLink>
          <NavDropdown.Item as="button" onClick={handleSignOut}>
            Sign Out
          </NavDropdown.Item>
          { isSuperAdmin() ? (
            <NavDropdown title="For Super Admin" id="nav-dropdown">
              <NavDropdown.Item href="/user_list">User Lists</NavDropdown.Item>
              <NavDropdown.Item href="/appointment_list">Appointments Lists</NavDropdown.Item>
              <NavDropdown.Item href="/patients">Patient Lists</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          ) : (
            <Button
              className={` add_doctor_btn nav-link ${isActiveLink('/add_doctor') ? 'active' : ''}`}
              disabled={!isAdmin()}
            >
              For Super Admin
            </Button>
          )}
        </div>
        <div className="d-flex align-items-center justify-content-between p-3 social_media">
          <Nav.Link href="https://www.facebook.com/your_facebook_profile_url" target="_blank">
            <FaFacebookF />
          </Nav.Link>
          <Nav.Link href="https://www.google.com/your_google_plus_profile_url" target="_blank">
            <FaGooglePlusG />
          </Nav.Link>
          <Nav.Link href="https://www.linkedin.com/your_linkedin_profile_url" target="_blank">
            <FaLinkedinIn />
          </Nav.Link>
          <Nav.Link href="https://www.google.com/your_google_drive_url" target="_blank">
            <FaGoogleDrive />
          </Nav.Link>
          <Nav.Link href="https://www.twitter.com/your_twitter_profile_url" target="_blank">
            <FaTwitter />
          </Nav.Link>
        </div>
      </div>
      <AddDoctor
        showSignUpModal={showSignUpModal}
        handleCloseSignUpModal={handleCloseSignUpModal}
        handleOpenSignUpModal={handleOpenSignUpModal}
      />
    </>
  );
}

export default NavBar;
