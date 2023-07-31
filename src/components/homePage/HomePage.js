import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import HomeDoctors from './HomeDoctors';
import SignInForm from '../signUpInOut/SignInForm';
import SignUpForm from '../signUpInOut/SignUpForm';

function HomePage() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
  };
  const handleOpenSignUpModal = () => {
    setShowSignUpModal(true);
  };
  return (
    <div className="container" style={{ height: '100vh', backgroundColor: '#fff' }}>
      <div className="row" style={{ height: '100%', overflowY: 'auto' }}>
        <div className="col-6 m-0 p-0 d-flex justify-content-center align-items-center">
          <HomeDoctors />
        </div>
        <div className="col-6 m-0 p-0 d-flex flex-column justify-content-center align-items-center" style={{ boxShadow: '5px 3px 10px rgba(0, 0, 0, 0.1)' }}>
          <SignInForm />
          <p>Need to Create a new Account?</p>
          <Button variant="primary" onClick={handleOpenSignUpModal}>
            Sign up
          </Button>
        </div>
      </div>
      <SignUpForm
        showSignUpModal={showSignUpModal}
        handleCloseSignUpModal={handleCloseSignUpModal}
        handleOpenSignUpModal={handleOpenSignUpModal}
      />
    </div>
  );
}

export default HomePage;
