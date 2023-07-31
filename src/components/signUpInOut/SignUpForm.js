/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  Form, Button, Row, Col, Modal,
} from 'react-bootstrap';
import { FaXmark } from 'react-icons/fa6';
import { signUp, signIn } from '../../features/authSlice';

const initialAddressData = {
  street: '',
  city: '',
  state: '',
  zip_code: '',
};

const initialFormData = {
  name: '',
  age: '',
  email: '',
  photo: '',
  role: '',
  password: '',
  password_confirmation: '',
  address: { ...initialAddressData },
};

const SignUpForm = ({ showSignUpModal, handleCloseSignUpModal, handleOpenSignUpModal }) => {
  const [formData, setFormData] = useState({ ...initialFormData });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      if (name.startsWith('address.')) {
        const addressField = name.split('.')[1];
        return {
          ...prevFormData,
          address: {
            ...prevFormData.address,
            [addressField]: value,
          },
        };
      }
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(formData))
      .then(() => {
        const { email, password } = formData;
        dispatch(signIn(email, password));
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <Modal show={showSignUpModal} onHide={handleOpenSignUpModal} dialogClassName="custom-modal">
      <Modal.Header>
        <FaXmark onClick={handleCloseSignUpModal} style={{ cursor: 'pointer' }} />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} controlId="role">
              <Form.Label />
              <Form.Select name="role" value={formData.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="super_admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="patient">Patient</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="name">
              <Form.Label />
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter name" />
            </Form.Group>
            <Form.Group as={Col} controlId="age">
              <Form.Label />
              <Form.Control type="number" name="age" value={formData.age} onChange={handleChange} required placeholder="Enter age" />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="email">
              <Form.Label />
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter email" />
            </Form.Group>
            <Form.Group as={Col} controlId="photo">
              <Form.Label />
              <Form.Control type="text" name="photo" value={formData.photo} onChange={handleChange} required placeholder="Enter photo URL" />
            </Form.Group>

          </Row>

          <Row>
            <Form.Group as={Col} controlId="city">
              <Form.Label />
              <Form.Control type="text" name="address.city" value={formData.city} onChange={handleChange} required placeholder="Enter  city" />
            </Form.Group>
            <Form.Group as={Col} controlId="street">
              <Form.Label />
              <Form.Control type="text" name="address.street" value={formData.street} onChange={handleChange} required placeholder="Enter street address" />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="state">
              <Form.Label />
              <Form.Control type="text" name="address.state" value={formData.state} onChange={handleChange} required placeholder="Enter state" />
            </Form.Group>

            <Form.Group as={Col} controlId="zip_code">
              <Form.Label />
              <Form.Control type="text" name="address.zip_code" value={formData.zip_code} onChange={handleChange} required placeholder="Enter ZIP code" />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="password">
              <Form.Label />
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Enter New password" />
            </Form.Group>
            <Form.Group as={Col} controlId="password_confirmation">
              <Form.Label />
              <Form.Control type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required placeholder="Confirm Password" />
            </Form.Group>
          </Row>
          <Row className="mt-3 w-25">
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

SignUpForm.propTypes = {
  showSignUpModal: PropTypes.bool,
  handleCloseSignUpModal: PropTypes.func.isRequired,
  handleOpenSignUpModal: PropTypes.func.isRequired,
};

export default SignUpForm;
