import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../../features/doctorSlice';

function DoctorList() {
  const dispatch = useDispatch();
  const { status, error, doctors } = useSelector((state) => state.doctors);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

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

  return (
    <div>
      <h2>Doctors List</h2>
      {doctors.length === 0 ? (
        <div>No doctors found.</div>
      ) : (
        <ul>
          {doctors.map((doctor) => (
            <li key={doctor.id}>
              <h3>{doctor.name}</h3>
              <p>
                Age:
                {' '}
                {doctor.age}
              </p>
              <p>
                Email:
                {' '}
                {doctor.email}
              </p>
              <p>
                Photo:
                <img src={doctor.photo} alt="" />

              </p>
              <p>
                Qualification:
                {' '}
                {doctor.qualification}
              </p>
              <p>
                Description:
                {' '}
                {doctor.description}
              </p>
              <p>
                Experiences:
                {' '}
                {doctor.experiences}
              </p>
              <p>
                Available From:
                {' '}
                {doctor.available_from}
              </p>
              <p>
                Available To:
                {' '}
                {doctor.available_to}
              </p>
              <p>
                Consultation Fee:
                {' '}
                {doctor.consultation_fee}
              </p>
              <p>
                Rating:
                {' '}
                {doctor.rating}
              </p>
              <p>
                Specialization:
                {' '}
                {doctor.specialization}
              </p>
              <p>Address:</p>
              <ul>
                <li>
                  Street:
                  {' '}
                  {doctor.address.street}
                </li>
                <li>
                  City:
                  {' '}
                  {doctor.address.city}
                </li>
                <li>
                  State:
                  {' '}
                  {doctor.address.state}
                </li>
                <li>
                  ZIP Code:
                  {' '}
                  {doctor.address.zip_code}
                </li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DoctorList;
