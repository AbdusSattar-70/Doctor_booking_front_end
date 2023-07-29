import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import doctorSlice from './doctorSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  doctors: doctorSlice,
});

export default rootReducer;
