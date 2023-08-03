import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  error: null,
  appointments: [],
  patients: [],
  doctors: [],
  authToken: sessionStorage.getItem('authToken') || null,
};

export const addAppointment = createAsyncThunk('appointments/addAppointment', async (formData) => {
  try {
    const response = await axios.post('http://localhost:3000/appointments', {
      appointment: formData,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const fetchAppointments = createAsyncThunk('appointments/fetchAppointments', async () => {
  try {
    const [appointmentsResponse, patientsResponse, doctorsResponse] = await Promise.all([
      axios.get('http://localhost:3000/appointments', {
        headers: {
          Authorization: sessionStorage.getItem('authToken'),
        },
      }),
      axios.get('http://localhost:3000/users?role=patient'),
      axios.get('http://localhost:3000/users?role=doctor'),
    ]);

    const appointments = appointmentsResponse.data;
    const patients = patientsResponse.data;
    const doctors = doctorsResponse.data;

    return { appointments, patients, doctors };
  } catch (error) {
    throw new Error(error.message);
  }
});

export const deleteAppointment = createAsyncThunk('appointments/deleteAppointment', async (appointmentId) => {
  try {
    await axios.delete(`http://localhost:3000/appointments/${appointmentId}`, {
      headers: {
        Authorization: sessionStorage.getItem('authToken'),
      },
    });
    return appointmentId;
  } catch (error) {
    throw new Error(error.message);
  }
});

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAuthToken(state, action) {
      state.authToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAppointment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addAppointment.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload.appointments;
        state.patients = action.payload.patients;
        state.doctors = action.payload.doctors;
      })

      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteAppointment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = state.appointments.filter(
          (appointment) => appointment.id !== action.payload,
        );
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setAuthToken } = appointmentSlice.actions;

export default appointmentSlice.reducer;
