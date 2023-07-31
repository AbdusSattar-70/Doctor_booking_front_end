import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../../features/doctorSlice';

function HomeDoctors() {
  const dispatch = useDispatch();
  const { status, error, doctors } = useSelector((state) => state.doctors);

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

  return (
    <div className="d-flex justify-content-between align-items-center m-0 p-0">
      <button
        type="button"
        className="btn btn-primary rounded-end-pill"
        onClick={handlePrevGroup}
        disabled={currentGroupIndex === 0}
      >
        Prev
      </button>
      <div className="card-group">
        {doctors
          .slice(currentGroupIndex * groupSize, (currentGroupIndex + 1) * groupSize)
          .map((doctor) => (
            <div key={doctor.id} className="card">
              <img src={doctor.photo} alt={doctor.name} className=" doctor-photo rounded-circle" />
              <div className="card-body">
                <h5 className="card-title">{doctor.name}</h5>
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
  );
}

export default HomeDoctors;
