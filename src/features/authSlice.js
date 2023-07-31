import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  authToken: null,
  userName: null,
  userRole: null,
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

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const signIn = createAsyncThunk('auth/signIn', async ({ email, password }) => {
  try {
    const response = await axios.post('http://localhost:3000/users/sign_in', {
      user: { email, password },
    });
    const authToken = response.headers.authorization;
    const { name: userName, role: userRole } = response.data.status.data;
    return { authToken, userName, userRole };
  } catch (error) {
    throw new Error(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInSuccess(state, action) {
      const { authToken, userName, userRole } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        authToken,
        userName,
        userRole,
        error: null,
      };
    },
    signInError(state, action) {
      const { payload } = action;
      state.isAuthenticated = false;
      state.authToken = null;
      state.error = payload;
    },
    signOut(state) {
      state.isAuthenticated = false;
      state.authToken = null;
      state.userName = null;
      state.userRole = null;
      state.error = null;
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
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const { authToken, userName, userRole } = action.payload;
        state.isAuthenticated = true;
        state.authToken = authToken;
        state.userName = userName;
        state.userRole = userRole;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.authToken = null;
        state.error = action.error.message;
      });
  },
});

export const { signInSuccess, signInError, signOut } = authSlice.actions;
export default authSlice.reducer;
