import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import doctorSlice from './doctorSlice';
import appointmentSlice from './appointmentSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  doctors: doctorSlice,
  appointments: appointmentSlice,
});

export default rootReducer;
