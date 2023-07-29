import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  authToken: sessionStorage.getItem('authToken') || null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInSuccess(state, action) {
      state.isAuthenticated = true;
      state.authToken = action.payload;
      state.error = null;
      sessionStorage.setItem('authToken', action.payload); // Set the auth token in session storage
    },
    signInError(state, action) {
      state.isAuthenticated = false;
      state.authToken = null;
      state.error = action.payload;
    },
    signOut(state) {
      state.isAuthenticated = false;
      state.authToken = null;
      state.error = null;
      sessionStorage.removeItem('authToken'); // Remove the auth token from session storage on sign out
    },
  },
});

export const { signInSuccess, signInError, signOut } = authSlice.actions;

export const signIn = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('https://booking-doctor-api.onrender.com/users/sign_in', {
      user: {
        email,
        password,
      },
    });
    const authToken = response.headers.authorization;
    sessionStorage.setItem('authToken', authToken); // Set the auth token in session storage
    dispatch(signInSuccess(authToken));
  } catch (error) {
    dispatch(signInError(error.message));
  }
};

export const signUp = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('https://booking-doctor-api.onrender.com/users', {
      user: {
        email,
        password,
      },
    });

    const authToken = response.headers.authorization;
    sessionStorage.setItem('authToken', authToken); // Set the auth token in session storage
    dispatch(signInSuccess(authToken));
  } catch (error) {
    dispatch(signInError(error.message));
  }
};

export default authSlice.reducer;
