import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { signIn } from '../../features/authSlice';

function SignInForm() {
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector((state) => state.auth);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    dispatch(signIn(email, password));
  };

  useEffect(() => {
    setShowErrorMessage(!!error);
    if (isAuthenticated) {
      window.location.href = '/doctors';
    }
  }, [error, isAuthenticated]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Control type="text" name="name" placeholder="Name" />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Control type="email" name="email" placeholder="Email" />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Control type="password" name="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign In
        </Button>
        {showErrorMessage && (
        <>
          <p> Opps! Something Went Wrong.</p>
          {' '}
          <p>Recheck Your Name,Email Or Password</p>
        </>
        )}
      </Form>
    </div>
  );
}

export default SignInForm;
