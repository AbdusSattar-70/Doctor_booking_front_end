import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table, Button, Container, Row, Col,
} from 'react-bootstrap';
import NavBar from '../navbar/Navbar';
import { fetchDoctors, deleteDoctor } from '../../features/doctorSlice';

function DeleteDoctor() {
  const dispatch = useDispatch();
  const {
    status, error, doctors, references,
  } = useSelector((state) => state.doctors);
  const totalCount = references ? references
    .reduce((count, appointments) => count + appointments.length, 0) : 0;
  useEffect(() => {
    dispatch(fetchDoctors());
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

  if (status === 'failed') {
    return (
      <Container>
        <Row>
          <Col md={2} className="mb-4">
            <NavBar />
          </Col>
          <Col md={10}>
            <h1>{error || 'An error occurred'}</h1>
            {totalCount > 0 && (
              <div>
                <h2>Because it has</h2>
                <span>
                  {totalCount}
                  {' '}
                  appointment
                  {totalCount !== 1 ? 's' : ''}
                  {' '}
                  with patient
                </span>
                <span>please Cancel appointment first before deleting the doctor</span>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }

  if (!doctors || doctors.length === 0) {
    return (
      <Container>
        <Row>
          <Col md={2} className="mb-4">
            <NavBar />
          </Col>
          <Col md={10}>
            <h1>No Doctor found.</h1>
          </Col>
        </Row>
      </Container>
    );
  }

  const handleDeleteDoctor = (doctorId) => {
    dispatch(deleteDoctor(doctorId));
  };

  return (
    <Container fluid className="px-0">
      <Row>
        <Col md={2}>
          <NavBar />
        </Col>
        <Col md={10}>
          <h2>Doctor List</h2>
          <div className="scrollable">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor ? doctor.name : 'Unknown'}</td>
                    <td>Active</td>
                    <td>
                      <Button variant="danger" onClick={() => handleDeleteDoctor(doctor.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DeleteDoctor;
