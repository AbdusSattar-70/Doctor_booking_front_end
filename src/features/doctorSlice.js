import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  error: null,
  doctors: [], // To store the fetched doctor data
  authToken: sessionStorage.getItem('authToken') || null, // To store the authentication token from session storage
};

// Async Thunk for adding a doctor
export const addDoctor = createAsyncThunk('doctors/addDoctor', async (doctorData) => {
  try {
    const response = await axios.post('https://booking-doctor-api.onrender.com/users', {
      user: {
        name: doctorData.name,
        age: doctorData.age,
        email: doctorData.email,
        photo: doctorData.photo,
        role: 'doctor',
        password: doctorData.password,
        password_confirmation: doctorData.password_confirmation,
        qualification: doctorData.qualification,
        description: doctorData.description,
        experiences: doctorData.experiences,
        available_from: doctorData.available_from,
        available_to: doctorData.available_to,
        consultation_fee: doctorData.consultation_fee,
        rating: doctorData.rating,
        specialization: doctorData.specialization,
        address: {
          street: doctorData.address.street,
          city: doctorData.address.city,
          state: doctorData.address.state,
          zip_code: doctorData.address.zip_code,
        },
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

// Async Thunk for fetching doctors
export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async () => {
  try {
    const response = await axios.get('https://booking-doctor-api.onrender.com/users?role=doctor', {
      headers: {
        Authorization: sessionStorage.getItem('authToken'),
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    setAuthToken(state, action) {
      state.authToken = action.payload;
    },
    // Other synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDoctor.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addDoctor.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchDoctors.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.doctors = action.payload; // Update the doctors array with fetched data
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setAuthToken } = doctorsSlice.actions;

export default doctorsSlice.reducer;
