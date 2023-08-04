import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  authToken: sessionStorage.getItem('authToken') || null,
  userName: sessionStorage.getItem('userName') || null,
  userID: sessionStorage.getItem('userID') || null,
  userRole: sessionStorage.getItem('userRole') || null,
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
    throw new Error(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInSuccess(state, action) {
      state.isAuthenticated = true;
      state.authToken = action.payload.authToken;
      state.userName = action.payload.userName;
      state.userID = action.payload.userID;
      state.userRole = action.payload.userRole;
      state.error = null;
      sessionStorage.setItem('authToken', action.payload.authToken);
      sessionStorage.setItem('userName', action.payload.userName);
      sessionStorage.setItem('userID', action.payload.userID);
      sessionStorage.setItem('userRole', action.payload.userRole);
    },
    signInError(state, action) {
      state.isAuthenticated = false;
      state.authToken = null;
      state.error = action.payload;
    },
    signOut(state) {
      state.isAuthenticated = false;
      state.authToken = null;
      state.userName = null;
      state.userID = null;
      state.userRole = null;
      state.error = null;
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('userID');
      sessionStorage.removeItem('userRole');
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

export const signIn = (name, email, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/users/sign_in', {
      user: {
        name,
        email,
        password,
      },
    });

    const authToken = response.headers.authorization;
    const userName = response.data.data.name;
    const userID = response.data.data.id;
    const userRole = response.data.data.role;

    sessionStorage.setItem('authToken', authToken);
    sessionStorage.setItem('userName', userName);
    sessionStorage.setItem('userID', userID);
    sessionStorage.setItem('userRole', userRole);
    dispatch(signInSuccess({
      authToken, userRole, userName, userID,
    }));
  } catch (error) {
    const { message } = error.response.data;
    dispatch(signInError(message));
  }
};

export default authSlice.reducer;
