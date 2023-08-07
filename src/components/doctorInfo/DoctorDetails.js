import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaCaretLeft } from 'react-icons/fa6';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import NavBar from '../navbar/Navbar';
import './doctor.css';

const DoctorDetails = () => {
  const API_BASE_URL = 'http://localhost:3000/users';
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [nextDoctorId, setNextDoctorId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get(`${API_BASE_URL}/doctors/${id}`),
      axios.get(`${API_BASE_URL}?role=doctor`),
    ])
      .then(([doctorResponse, doctorsResponse]) => {
        setDoctor(doctorResponse.data);
        const doctors = doctorsResponse.data;
        setNextDoctorId(doctors);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Failed to fetch doctor details.${error}`);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{ width: 200, height: 200 }}>
        loading...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Error:
        {' '}
        {error}
      </div>
    );
  }

  const handleNextDoctor = () => {
    const currentDoctorIndex = nextDoctorId.findIndex((d) => d.id === parseInt(id, 10));
    if (currentDoctorIndex !== -1 && currentDoctorIndex < nextDoctorId.length - 1) {
      const nextDoctor = nextDoctorId[currentDoctorIndex + 1];
      window.location.href = `/doctor_details/${nextDoctor.id}`;
    }
  };

  const scaledRating = (doctor.rating / 100) * 20;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2 col-md-2 col-12 mx-0 px-0">
          <NavBar />
        </div>
        <div className="col-lg-6 col-md-6 col-12 d-flex flex-column mx-0 px-0 text-center doctor_details_bg">
          <div>
            <img src={doctor.photo} alt={doctor.name} className="img-fluid rounded-circle" />
            <h2>{doctor.name}</h2>
            <p>{doctor.specialization}</p>
          </div>
          <button type="button" onClick={handleNextDoctor} className="nextBtn rounded-end-pill">
            <FaCaretLeft />
          </button>
        </div>

        <div className="col-lg-4 col-md-4 col-12">
          <h4>Doctor Details</h4>
          <table className="table">
            <tbody>
              <tr>
                <td>Age:</td>
                <td>{doctor.age}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{doctor.email}</td>
              </tr>
              <tr>
                <td>Qualification:</td>
                <td>{doctor.qualification}</td>
              </tr>
              <tr>
                <td>Experiences:</td>
                <td>{doctor.experiences}</td>
              </tr>
              <tr>
                <td>Consultation Fee:</td>
                <td>
                  $
                  {doctor.consultation_fee}
                </td>
              </tr>
              <tr>
                <td>Available From:</td>
                <td>{doctor.available_from}</td>
              </tr>
              <tr>
                <td>Available To:</td>
                <td>{doctor.available_to}</td>
              </tr>
              <tr>
                <td>Rating:</td>
                <td>
                  <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbarWithChildren value={scaledRating * 100}>
                      <div style={{ fontSize: 20, fontWeight: 'bold' }}>{scaledRating.toFixed(1)}</div>
                    </CircularProgressbarWithChildren>
                  </div>

                </td>
              </tr>
            </tbody>
          </table>
          <button type="button" className="appointBtn">
            <Link to={`/appointment/${doctor.id}`}>Make an Appointment</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
