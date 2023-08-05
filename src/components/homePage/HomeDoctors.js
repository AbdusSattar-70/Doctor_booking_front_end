import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { fetchDoctors } from '../../features/doctorSlice';

function HomeDoctors() {
  const dispatch = useDispatch();
  const { status, error, doctors } = useSelector((state) => state.doctors);
  const [showMessage, setShowMessage] = useState(false);

  const handleAppointmentClick = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div>
        Error:
        {' '}
        {error}
      </div>
    );
  }

  if (!doctors || doctors.length === 0) {
    return <div>No doctors found.</div>;
  }

  const groupSize = 3;
  const totalGroups = Math.ceil(doctors.length / groupSize);

  const handleNextGroup = () => {
    setCurrentGroupIndex((prevIndex) => (prevIndex + 1) % totalGroups);
  };

  const handlePrevGroup = () => {
    setCurrentGroupIndex((prevIndex) => (prevIndex - 1 + totalGroups) % totalGroups);
  };

  setTimeout(() => {
    handleNextGroup();
  }, 19000);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center m-0 p-0">
        <button
          type="button"
          className="btn btn-primary rounded-end-pill"
          onClick={handlePrevGroup}
          disabled={currentGroupIndex === 0}
        >
          Prev
        </button>
        <div className="card-group w-100">
          {doctors
            .slice(currentGroupIndex * groupSize, (currentGroupIndex + 1) * groupSize)
            .map((doctor) => (
              <div key={doctor.id} className="card d-flex align-items-center">
                <img src={doctor.photo} alt={doctor.name} className="rounded-circle" />
                <div className="card-body">
                  <p className="card-title">{doctor.name}</p>
                  <p className="card-text">{doctor.specialization}</p>
                </div>
              </div>
            ))}
        </div>

        <button
          type="button"
          className="btn btn-primary rounded-start-pill"
          onClick={handleNextGroup}
          disabled={currentGroupIndex === totalGroups - 1}
        >
          Next
        </button>
      </div>
      <div className="d-flex flex-column align-items-center">

        <Button onClick={handleAppointmentClick}>Make Appointment Now</Button>
        {showMessage && (
        <p className="mt-2">Before booking, please login or sign in.</p>
        )}
      </div>
    </>
  );
}

export default HomeDoctors;
