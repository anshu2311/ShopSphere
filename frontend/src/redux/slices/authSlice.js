import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Retrieves the user data from local storage if avaiilable
const userFormStorage = localStorage.getItem('userInfo')
 ? JSON.parse(localStorage.getItem('userInfo'))
 : null;

// Check for an existing guest ID in the localStorage
const InitialGuestId = localStorage.getItem('guestId') || `guest_${new Date().getTime()}`;
localStorage.setItem('guestId', InitialGuestId);

// Initial state for the auth slice
const initialState = {
  userInfo: userFormStorage,
  guestId: InitialGuestId,
  loading: false,
  error: null,
};

// Create an async thunk for user login
export const loginUser = createAsyncThunk(
 "auth/loginUser", 
 async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/login`, 
    userData
    );
    localStorage.setItem('userInfo', JSON.stringify(response.data.user));
    localStorage.setItem('userToken', response.data.token);

    return response.data.user; //Return the user data from the response
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Create an async thunk for user Registration
export const registerUser = createAsyncThunk(
 "auth/registerUser",
 async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
      userData
    );
    localStorage.setItem('userInfo', JSON.stringify(response.data.user));
    localStorage.setItem('userToken', response.data.token);

    return response.data.user; // Return the user data from the response
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.guestId = `guest_${new Date().getTime()}`; //Reset the guest ID on logout
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userToken');
      localStorage.setItem('guestId', state.guestId); //Set new guest ID in local storage 
    },
    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem('guestId', state.guestId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Login failed. Please try again.';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Registration failed. Please try again.';
      });
   },
});

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;