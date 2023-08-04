import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { signIn } from '../../features/authSlice';

function SignInForm() {
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

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

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Control type="text" name="name" placeholder="Name" required autoComplete="name" />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Control type="email" name="email" placeholder="Email" required />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Control type="password" name="password" placeholder="Password" required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign In
        </Button>
        <p>{getErrorMessage()}</p>
      </Form>
    </div>
  );
}

export default SignInForm;
