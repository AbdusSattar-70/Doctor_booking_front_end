import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../features/authSlice';

function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    // Dispatch the signOut action to log the user out
    dispatch(signOut());
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/">Home</NavLink>
        </li>
        {!isAuthenticated ? (
          <>
            <li>
              <NavLink exact to="/sign_up">Register</NavLink>
            </li>
            <li>
              <NavLink to="/sign_in">Sign In</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/add_doctor">Add Doctor</NavLink>
            </li>
            <li>
              <NavLink to="/delete_doctor">Delete Doctor</NavLink>
            </li>
            <li>
              <NavLink to="/doctors">Doctors</NavLink>
            </li>
            <li>
              <NavLink to="/patients">Patients</NavLink>
            </li>
            <li>
              <NavLink to="/appointments">Appointments</NavLink>
            </li>
            <li>
              <NavLink to="/my_appointments">My Appointments</NavLink>
            </li>
            <li>
              <button type="button" onClick={handleSignOut}>Sign Out</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
