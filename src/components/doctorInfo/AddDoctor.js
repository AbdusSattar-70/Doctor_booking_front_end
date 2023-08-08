import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FaXmark } from 'react-icons/fa6';
import {
  Form, Button, Row, Col, Modal,
} from 'react-bootstrap';
import { addDoctor } from '../../features/doctorSlice';

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
  role: 'doctor',
  password: '',
  password_confirmation: '',
  qualification: '',
  description: '',
  experiences: '',
  available_from: '',
  available_to: '',
  consultation_fee: '',
  rating: '',
  specialization: '',
  address: { ...initialAddressData },
};

const AddDoctor = ({ showSignUpModal, handleCloseSignUpModal, handleOpenSignUpModal }) => {
  const [formData, setFormData] = useState({ ...initialFormData });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDoctor(formData));
  };

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

  return (
    <Modal show={showSignUpModal} onHide={handleOpenSignUpModal} dialogClassName="custom-modal">
      <Modal.Header>
        <FaXmark onClick={handleCloseSignUpModal} style={{ cursor: 'pointer' }} />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter Doctor's name" />
            </Form.Group>

            <Form.Group as={Col} controlId="age">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" name="age" value={formData.age} onChange={handleChange} required placeholder="Enter Doctor's age" />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter Doctor's email" />
            </Form.Group>

            <Form.Group as={Col} controlId="photo">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control type="text" name="photo" value={formData.photo} onChange={handleChange} required placeholder="Enter Doctor's photo URL" />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Enter New password" />
            </Form.Group>

            <Form.Group as={Col} controlId="password_confirmation">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required placeholder="Confirm Password" />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="qualification">
              <Form.Label>Qualification</Form.Label>
              <Form.Control type="text" name="qualification" value={formData.qualification} onChange={handleChange} required placeholder="Enter Doctor's qualification" />
            </Form.Group>

            <Form.Group as={Col} controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required placeholder="Enter Doctor's brief description" />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="experiences">
              <Form.Label>Experiences</Form.Label>
              <Form.Control type="number" name="experiences" value={formData.experiences} onChange={handleChange} required placeholder="Enter Doctor's experiences" />
            </Form.Group>

            <Form.Group as={Col} controlId="available_from">
              <Form.Label>Available From</Form.Label>
              <Form.Control type="datetime-local" name="available_from" value={formData.available_from} onChange={handleChange} required placeholder="Select available from date and time" />
            </Form.Group>

            <Form.Group as={Col} controlId="available_to">
              <Form.Label>Available To</Form.Label>
              <Form.Control type="datetime-local" name="available_to" value={formData.available_to} onChange={handleChange} required placeholder="Select available to date and time" />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="consultation_fee">
              <Form.Label>Consultation Fee</Form.Label>
              <Form.Control type="number" name="consultation_fee" value={formData.consultation_fee} onChange={handleChange} required placeholder="Enter Doctor's consultation fee" />
            </Form.Group>

            <Form.Group as={Col} controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control type="number" name="rating" value={formData.rating} onChange={handleChange} required placeholder="Enter Doctor's rating" />
            </Form.Group>

            <Form.Group as={Col} controlId="specialization">
              <Form.Label>Specialization</Form.Label>
              <Form.Control type="text" name="specialization" value={formData.specialization} onChange={handleChange} required placeholder="Enter Doctor's specialization" />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="street">
              <Form.Label>Street Address</Form.Label>
              <Form.Control type="text" name="address.street" value={formData.street} onChange={handleChange} required placeholder="Enter Doctor's street address" />
            </Form.Group>

            <Form.Group as={Col} controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="address.city" value={formData.city} onChange={handleChange} required placeholder="Enter Doctor's city" />
            </Form.Group>

            <Form.Group as={Col} controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" name="address.state" value={formData.state} onChange={handleChange} required placeholder="Enter Doctor's state" />
            </Form.Group>

            <Form.Group as={Col} controlId="zip_code">
              <Form.Label>ZIP Code</Form.Label>
              <Form.Control type="text" name="address.zip_code" value={formData.zip_code} onChange={handleChange} required placeholder="Enter Doctor's ZIP code" />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit" onClick={handleCloseSignUpModal}>
            Add Doctor
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

AddDoctor.propTypes = {
  showSignUpModal: PropTypes.bool.isRequired,
  handleCloseSignUpModal: PropTypes.func.isRequired,
  handleOpenSignUpModal: PropTypes.func.isRequired,
};

export default AddDoctor;
