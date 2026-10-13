import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAuthHeaders = () => {
 const userToken = localStorage.getItem("userToken");
 return userToken ? { Authorization: `Bearer ${userToken}` } : {};
};

const getErrorMessage = (error) => {
 if (error.response?.status === 401) {
  return "Your session is no longer valid. Please sign out and sign in again.";
 }

 return error.response?.data?.message || error.message || "Request failed";
};

// fetch all users (admin only)
export const fetchUsers = createAsyncThunk(
 "admin/fetchUsers",
 async(_, { rejectWithValue }) => {
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
    { headers: getAuthHeaders() }
   );
   return response.data;
  } catch (error) {
   return rejectWithValue({ message: getErrorMessage(error) });
  }
 }
);

// Add the create user Action
export const addUser = createAsyncThunk(
 "admin/addUser",
 async(userData, { rejectWithValue }) => {
  try {
   const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
    userData,
    { headers: getAuthHeaders() }
   );
   return response.data;
  } catch (error) {
   return rejectWithValue({ message: getErrorMessage(error) });
  }
 }
);

// Update user information
export const updateUser = createAsyncThunk(
 "admin/updateUser",
 async({ id, name, email, role }, { rejectWithValue }) => {
  try {
   const response = await axios.put(
    `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
    { name, email, role },
    { headers: getAuthHeaders() }
   );
   return response.data.user;
  } catch (error) {
   return rejectWithValue({ message: getErrorMessage(error) });
  }
 }
);

// Delete a user
export const deleteUser = createAsyncThunk(
 "admin/deleteUser",
 async(id, { rejectWithValue }) => {
  try {
   await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
    { headers: getAuthHeaders() }
   );
   return id;
  } catch (error) {
   return rejectWithValue({ message: getErrorMessage(error) });
  }
 }
);

const adminSlice = createSlice({
 name: "admin",
 initialState: {
  users: [],
  loading: false,
  error: null,
 },
 reducers: {},
 extraReducers: (builder) => {
  builder
  .addCase(fetchUsers.pending, (state) => {
   state.loading = true;
   state.error = null;
  })
  .addCase(fetchUsers.fulfilled, (state, action) => {
   state.loading = false;
   state.users = action.payload;
  })
  .addCase(fetchUsers.rejected, (state, action) => {
   state.loading = false;
   state.error = action.payload?.message || action.error.message;
  })
  .addCase(updateUser.fulfilled, (state, action) => {
   const updatedUser = action.payload;
   const userIndex = state.users.findIndex(
    (user) => user._id === updatedUser._id
   );
   if (userIndex !== -1) {
    state.users[userIndex] = updatedUser;
   }
  })
  .addCase(updateUser.rejected, (state, action) => {
   state.error = action.payload?.message || action.error.message;
  })
  .addCase(deleteUser.pending, (state) => {
   state.loading = true;
   state.error = null;
  })
  .addCase(deleteUser.fulfilled, (state, action) => {
   state.loading = false;
   state.error = null;
   state.users = state.users.filter(
    (user) => String(user._id) !== String(action.payload)
   );
  })
  .addCase(deleteUser.rejected, (state, action) => {
   state.loading = false;
   state.error = action.payload?.message || action.error.message;
  })
  .addCase(addUser.pending, (state) => {
   state.loading = true;
   state.error = null;
  })
  .addCase(addUser.fulfilled, (state, action) => {
   state.loading = false;
   state.users.push(action.payload.user);
  })
  .addCase(addUser.rejected, (state, action) => {
   state.loading = false;
   state.error = action.payload?.message || action.error.message;
  });
 }
});

export default adminSlice.reducer;
