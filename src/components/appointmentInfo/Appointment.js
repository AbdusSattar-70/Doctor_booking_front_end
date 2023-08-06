import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Form, Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../navbar/Navbar';
import { addAppointment } from '../../features/appointmentSlice';
import { fetchDoctors } from '../../features/doctorSlice';

function formatDateAndTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const formattedDate = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });

  return `${formattedDate}, ${formattedTime}`;
}

const Appointment = () => {
  const dispatch = useDispatch();
  const { userName, userID } = useSelector((state) => state.auth);
  const doctors = useSelector((state) => state.doctors.doctors);
  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const initialFormData = {
    appointment_date: '',
    patient_id: userID,
    doctor_id: '',
    status: {
      active: true,
      expire: false,
      cancel: false,
    },
    location: {
      street: '',
      state: '',
      city: '',
      zip_code: '',
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
        <Row>
          <Col md={2} className="p-0 min-vh-100">
            <NavBar />
          </Col>
          <Col md={10} className="pt-4 min-vh-100" style={{ background: '#f7f7f7' }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="patientName">
                <Form.Label>Patient Name</Form.Label>
                <Form.Control
                  type="text"
                  name="patientName"
                  value={userName}
                  readOnly
                />
              </Form.Group>

              <Form.Group controlId="doctorId">
                <Form.Label>Select Doctor</Form.Label>
                <Form.Control
                  as="select"
                  name="doctor_id"
                  value={formData.doctor_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a doctor...</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                      {' '}
                      -
                      {' '}
                      {doctor.specialization}
                      {' '}
                      <p>Availability:</p>
                      {' '}
                      {'From: '}
                      {formatDateAndTime(doctor.available_from)}
                      {' '}
                      {'To: '}
                      {formatDateAndTime(doctor.available_to)}
                    </option>
                  ))}
                </Form.Control>
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
                  type="text"
                  name="location.street"
                  value={formData.location.street}
                  onChange={handleChange}
                  required
                  placeholder="Enter the Street Name here"
                />
              </Form.Group>

              <Form.Group controlId="location.state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="location.state"
                  value={formData.location.state}
                  onChange={handleChange}
                  required
                  placeholder="Enter the State Name here"
                />
              </Form.Group>

              <Form.Group controlId="location.city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleChange}
                  required
                  placeholder="Enter the City Name here"
                />
              </Form.Group>

              <Form.Group controlId="location.zipCode">
                <Form.Label>ZIP Code</Form.Label>
                <Form.Control
                  type="text"
                  name="location.zip_code"
                  value={formData.location.zip_code}
                  onChange={handleChange}
                  required
                  placeholder="Enter ZIP Code here"
                />
              </Form.Group>

              <Button className="ml-2" variant="primary" type="submit">
                Add Appointment
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Appointment;
