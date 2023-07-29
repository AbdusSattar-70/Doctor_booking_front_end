import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDoctor } from '../../features/doctorSlice';

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
  address: {
    street: '',
    city: '',
    state: '',
    zip_code: '',
  },
};

const AddDoctor = () => {
  const [formData, setFormData] = useState({ ...initialFormData });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDoctor(formData));
    setFormData({ ...initialFormData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Enter your name"
      />

      <input
        type="number"
        id="age"
        name="age"
        value={formData.age}
        onChange={handleChange}
        required
        placeholder="Enter your age"
      />

      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="Enter your email"
      />

      <input
        type="text"
        id="photo"
        name="photo"
        value={formData.photo}
        onChange={handleChange}
        required
        placeholder="Enter your photo URL"
      />

      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        placeholder="Enter your password"
      />

      <input
        type="password"
        id="password_confirmation"
        name="password_confirmation"
        value={formData.password_confirmation}
        onChange={handleChange}
        required
        placeholder="Confirm your password"
      />

      <input
        type="text"
        id="qualification"
        name="qualification"
        value={formData.qualification}
        onChange={handleChange}
        required
        placeholder="Enter your qualification"
      />

      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        placeholder="Enter a brief description"
      />

      <input
        type="number"
        id="experiences"
        name="experiences"
        value={formData.experiences}
        onChange={handleChange}
        required
        placeholder="Enter your experiences"
      />

      <input
        type="datetime-local"
        id="available_from"
        name="available_from"
        value={formData.available_from}
        onChange={handleChange}
        required
        placeholder="Select available from date and time"
      />

      <input
        type="datetime-local"
        id="available_to"
        name="available_to"
        value={formData.available_to}
        onChange={handleChange}
        required
        placeholder="Select available to date and time"
      />

      <input
        type="number"
        id="consultation_fee"
        name="consultation_fee"
        value={formData.consultation_fee}
        onChange={handleChange}
        required
        placeholder="Enter consultation fee"
      />

      <input
        type="number"
        id="rating"
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        required
        placeholder="Enter your rating"
      />

      <input
        type="text"
        id="specialization"
        name="specialization"
        value={formData.specialization}
        onChange={handleChange}
        required
        placeholder="Enter your specialization"
      />

      <input
        type="text"
        id="street"
        name="street"
        value={formData.address.street}
        onChange={handleChange}
        required
        placeholder="Enter your street address"
      />

      <input
        type="text"
        id="city"
        name="city"
        value={formData.address.city}
        onChange={handleChange}
        required
        placeholder="Enter your city"
      />

      <input
        type="text"
        id="state"
        name="state"
        value={formData.address.state}
        onChange={handleChange}
        required
        placeholder="Enter your state"
      />

      <input
        type="text"
        id="zip_code"
        name="zip_code"
        value={formData.address.zip_code}
        onChange={handleChange}
        required
        placeholder="Enter your ZIP code"
      />

      <button type="submit">Submit</button>
    </form>

  );
};

export default AddDoctor;
