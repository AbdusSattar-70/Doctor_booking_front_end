import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import HomeDoctors from './HomeDoctors';
import SignUpForm from '../signUpInOut/SignUpForm';
import { signIn } from '../../features/authSlice';
import './homepage.css';

function HomePage() {
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    const response = await dispatch(signIn(name, email, password));

    // Handle error messages from the server
    if (response && response.payload && response.payload.error) {
      const errorMessage = response.payload.error.message;
      setErrorMessage(errorMessage);
    }
  };

  const getErrorMessage = () => {
    switch (errorMessage) {
      case 'Invalid email':
        return 'Please enter a valid email address.';
      case 'Invalid name or password':
        return 'Invalid name or password. Please check your credentials.';
      case 'Invalid password':
        return 'Invalid password. Please check your password.';
      case 'Invalid name':
        return 'Invalid name. Please check your name.';
      default:
        return errorMessage;
    }
  };

  useEffect(() => {
    setErrorMessage(error);
    if (isAuthenticated) {
      window.location.href = '/doctors';
    }
  }, [error, isAuthenticated]);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
  };
  const handleOpenSignUpModal = () => {
    setShowSignUpModal(true);
  };

  return (
    <div className="container-fluid backgroundImg">
      <div className="row">
        <div className="col-12 text-center mt-4">
          <h1 className="animate-jump">Welcome Back!</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="d-flex justify-content-center align-items-center">
            <div className="boxshadow">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name" className="mb-2">
                  <Form.Control type="text" name="name" placeholder="Name" required autoComplete="name" />
                </Form.Group>
                <Form.Group controlId="email" className="mb-2">
                  <Form.Control type="email" name="email" placeholder="Email" required />
                </Form.Group>
                <Form.Group controlId="password" className="mb-2">
                  <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>
                <Button variant="primary" type="submit" className="mb-2 w-100">
                  Sign In
                </Button>
                <p>{getErrorMessage()}</p>
              </Form>
              <p className="text-center">No Account?</p>
              <Button variant="primary" onClick={handleOpenSignUpModal} className="mb-2 w-100">
                Sign up
              </Button>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="boxshadow">
            <HomeDoctors />
          </div>
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
