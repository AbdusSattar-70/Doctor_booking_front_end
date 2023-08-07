import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa6';
import { fetchDoctors } from '../../features/doctorSlice';
import NavBar from '../navbar/Navbar';

function DoctorList() {
  const dispatch = useDispatch();
  const { status, error, doctors } = useSelector((state) => state.doctors);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

  if (status === 'loading') {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-10 col-md-10 col-12 p-0">
            <h1>Loading....</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!doctors || status === 'failed' || doctors.length === 0) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 col-md-2 col-12 p-0">
            <NavBar />
          </div>
          <div className="col-lg-10 col-md-10 col-12 p-0">
            <h1>
              No doctors found
              {error}
            </h1>
          </div>
        </div>
      </div>
    );
  }

  const groupSize = 3;
  const totalGroups = Math.ceil(doctors.length / groupSize);

  const handleNextGroup = () => {
    setCurrentGroupIndex((prevIndex) => (prevIndex + 1) % totalGroups);
  };

  const handlePrevGroup = () => {
    setCurrentGroupIndex((prevIndex) => (prevIndex - 1 + totalGroups) % totalGroups);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2 col-md-2 col-12 p-0">
          <NavBar />
        </div>

        <div className="col-lg-10 col-md-10 col-12 p-0">
          <div className="text-center mt-4">
            <h1>Meet Our Team</h1>
            <h3>Schedule An Appointment Now</h3>
          </div>
          <div className="carousel-container">
            <button
              type="button"
              className="carousel-btn prev btn btn-primary rounded-end-pill"
              onClick={handlePrevGroup}
              disabled={currentGroupIndex === 0}
            >
              <FaCaretLeft />
            </button>
            <div className="carousel-content row">
              {doctors
                .slice(currentGroupIndex * groupSize, (currentGroupIndex + 1) * groupSize)
                .map((doctor) => (
                  <Link key={doctor.id} to={`/doctor_details/${doctor.id}`} className="col-12 col-md-4">
                    <div key={doctor.id} className="carousel-item">
                      <img src={doctor.photo} alt={doctor.name} className="doctor-photo rounded-circle" />
                      <div>
                        <h5>{doctor.name}</h5>
                        <p>{doctor.specialization}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
            <button
              type="button"
              className="carousel-btn next btn btn-primary rounded-start-pill"
              onClick={handleNextGroup}
              disabled={currentGroupIndex === totalGroups - 1}
            >
              <FaCaretRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorList;
