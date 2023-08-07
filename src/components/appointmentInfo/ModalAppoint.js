import React, { useState } from 'react';
import {
  Container, Row, Col, Form, Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import NavBar from '../navbar/Navbar';
import { addAppointment } from '../../features/appointmentSlice';
import './appointment.css';

const ModalAppoint = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { userName, userID } = useSelector((state) => state.auth);

  const initialFormData = {
    appointment_date: '',
    patient_id: userID,
    doctor_id: id,
    status: {
      active: true,
      expire: false,
      cancel: false,
    },
    location: {
      street: '',
      state: '',
      city: '',
      zip_code: 520,
    },
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addAppointment(formData));
    setFormData({ ...initialFormData });
    window.location.href = '/my_appointments';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      if (name.startsWith('location.')) {
        const location = name.split('.')[1];
        return {
          ...prevFormData,
          location: {
            ...prevFormData.location,
            [location]: value,
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
    <>
      <Container fluid>
        <Row className=" appointmentBg">
          <Col md={2} className="px-0">
            <NavBar />
          </Col>
          <Col md={10} className="p-4">
            <Form onSubmit={handleSubmit} className="boxshadowAppoint p-4">
              <Form.Group controlId="patientName">
                <Form.Label>Patient Name</Form.Label>
                <Form.Control
                  type="text"
                  name="patientName"
                  value={userName}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="appointmentDate">
                <Form.Label>Appointment Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="appointment_date"
                  value={formData.appointment_date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="location.street">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  as="select"
                  name="location.street"
                  value={formData.location.street}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select street...</option>
                  <option value="524, Bhidan street">524, Bhidan street</option>
                  <option value="7895, Molla Hata street">7895, Molla Hata street</option>
                  <option value="9863, Dulhan street">9863, Dulhan street</option>
                  <option value="1545, Kabiry street">1545, Kabiry street</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="location.state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  as="select"
                  name="location.state"
                  value={formData.location.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select state...</option>
                  <option value="Mymensignh">Mymensignh</option>
                  <option value="RBT">RBT</option>
                  <option value="NYC">NYC</option>
                  <option value="KTH">KTH</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="location.city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  as="select"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select city...</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chattagram">Chattagram</option>
                  <option value="Bhola">Bhola</option>
                  <option value="Jamalpur">Jamalpur</option>
                </Form.Control>
              </Form.Group>

              <Button className="mt-2 w-100" variant="primary" type="submit">
                Add Appointment
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ModalAppoint;
