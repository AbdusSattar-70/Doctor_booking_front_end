import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table, Button, Container, Row, Col,
} from 'react-bootstrap';
import { fetchAppointments, deleteAppointment } from '../../features/appointmentSlice';
import NavBar from '../navbar/Navbar';

// Define formatLocation function
function formatLocation(location) {
  return `${location.street}, ${location.state}, ${location.city}, ${location.zip_code}`;
}

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

function MyAppointments() {
  const dispatch = useDispatch();
  const {
    status, error, appointments, patients, doctors,
  } = useSelector((state) => state.appointments);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div>
        <NavBar />
        <h1>
          loading....
        </h1>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <h1>
        loading....
      </h1>
    );
  }

  if (status === 'failed') {
    return (
      <Container>
        <Row>
          <Col md={2} className="mb-4">
            <NavBar />
          </Col>
          <Col md={10}>
            <h1>
              No appointment found.
              {error}
            </h1>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!appointments || appointments.length === 0) {
    return (
      <Container>
        <Row>
          <Col md={2} className="mb-4">
            <NavBar />
          </Col>
          <Col md={10}>
            <h1>No appointment found.</h1>
          </Col>
        </Row>
      </Container>
    );
  }

  const handleDeleteAppointment = (appointmentId) => {
    dispatch(deleteAppointment(appointmentId));
  };

  return (
    <Container fluid className="px-0">
      <Row>
        <Col md={2}>
          <NavBar />
        </Col>
        <Col md={10}>
          <h2>My Appointments List</h2>
          <div className="scrollable">
            <Table striped bordered hover>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Appointment Date</th>
                    <th>Patient Name</th>
                    <th>Doctor Name</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => {
                    const patient = patients.find((p) => p.id === appointment.patient_id);
                    const doctor = doctors.find((d) => d.id === appointment.doctor_id);
                    return (
                      <tr key={appointment.id}>
                        <td>{formatDateAndTime(appointment.appointment_date)}</td>
                        <td>{patient ? patient.name : 'Unknown'}</td>
                        <td>{doctor ? doctor.name : 'Unknown'}</td>
                        <td>{formatLocation(appointment.location)}</td>
                        <td>Active</td>
                        <Button variant="danger" onClick={() => handleDeleteAppointment(appointment.id)}>
                          Cancel
                        </Button>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>

  );
}

export default MyAppointments;
