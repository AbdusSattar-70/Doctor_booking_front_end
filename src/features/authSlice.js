import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  authToken: sessionStorage.getItem('authToken') || null,
  role: sessionStorage.getItem('role') || null,
  error: null,
};

// Thunk to handle signUp
export const signUp = createAsyncThunk('auth/signUp', async (userData) => {
  try {
    const response = await axios.post('http://localhost:3000/users', {
      user: {
        name: userData.name,
        age: userData.age,
        email: userData.email,
        photo: userData.photo,
        role: userData.role,
        password: userData.password,
        password_confirmation: userData.password_confirmation,
        address: {
          street: userData.address.street,
          city: userData.address.city,
          state: userData.address.state,
          zip_code: userData.address.zip_code,
        },
      },
    });

    const authToken = response.headers.authorization;
    sessionStorage.setItem('authToken', authToken);
    const { role } = response.data;
    sessionStorage.setItem('authToken', authToken);
    sessionStorage.setItem('role', role);
    return authToken;
  } catch (error) {
    throw new Error(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInSuccess(state, action) {
      console.log('signInSuccess - State:', state);
      console.log('signInSuccess - Action:', action);
      state.isAuthenticated = true;
      state.authToken = action.payload;
      state.role = action.payload;
      state.error = null;
      sessionStorage.setItem('authToken', action.payload);
      sessionStorage.setItem('role', action.payload.role);
    },
    signInError(state, action) {
      state.isAuthenticated = false;
      state.authToken = null;
      state.error = action.payload;
    },
    signOut(state) {
      state.isAuthenticated = false;
      state.authToken = null;
      state.role = null;
      state.error = null;
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('role');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.authToken = action.payload;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.authToken = null;
        state.error = action.error.message;
      });
  },
});

export const { signInSuccess, signInError, signOut } = authSlice.actions;

export const signIn = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/users/sign_in', {
      user: {
        email,
        password,
      },
    });
    const authToken = response.headers.authorization;
    const { role } = response.data.status.data;
    sessionStorage.setItem('authToken', authToken);
    sessionStorage.setItem('role', role);
    dispatch(signInSuccess(authToken, role));
  } catch (error) {
    dispatch(signInError(error.message));
  }
};

export default authSlice.reducer;
