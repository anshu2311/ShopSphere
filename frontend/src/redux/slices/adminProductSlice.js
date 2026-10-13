import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
const getAuthHeaders = () => {
 const token = localStorage.getItem("userToken");
 return token ? { Authorization: `Bearer ${token}` } : {};
};

//async thunk to fetch admin products 
export const fetchAdminProducts = createAsyncThunk(
 "adminProducts/fetchAdminProducts" ,
 async() => {
  const response = await axios.get(`${API_URL}/api/admin/products`,
  {
   headers: getAuthHeaders(),
  }
  );
  return response.data;
 }
);

// async function to create a new product 
export const createProduct = createAsyncThunk(
 "adminProducts/createProduct",
 async(productData) =>{
  const response = await axios.post(
   `${API_URL}/api/admin/products`,
   productData,
   {
    headers: getAuthHeaders(),
   }
  );
  return response.data;
 }
);

// Async thunk to update an existing product
export const updateProduct = createAsyncThunk(
 "adminProducts/updateProduct",
 async({id, productData}) => {
  const response = await axios.put(
   `${API_URL}/api/admin/products/${id}`,
   productData,
   {
    headers: getAuthHeaders(),
   }
  );
  return response.dats;
 }
);

//Assync thunk to delete th eproduct 
export const deleteProduct = createAsyncThunk(
 "adminProducts/deleteProduct",
 async(id, { rejectWithValue }) => {
  try {
   await axios.delete(
    `${API_URL}/api/products/${id}`,
    {
     headers: getAuthHeaders(),
    }
   );
   return id;
  } catch (error) {
   return rejectWithValue(error.response?.data?.message || error.message);
  }
 }
);

const adminProductSlice = createSlice({
 name: "adminProduct",
 initialState: {
  products: [],
  loading: false,
  error: null,
 },
 reducers: {},
 extraReducers: (builder) => {
  builder
  .addCase(fetchAdminProducts.pending, (state) => {
   state.loading = true;
   state.error = null;
  })
  .addCase(fetchAdminProducts.fulfilled, (state, action) => {
   state.loading = false;
   state.products = action.payload;
  })
  .addCase(fetchAdminProducts.rejected, (state, action) => {
   state.loading = false;
   state.error = action.error.message;
  })
  // Create Product
  .addCase(createProduct.fulfilled, (state, action) => {
   state.products.push(action.payload);
  })
  //Update product
  .addCase(updateProduct.fulfilled, (state, action) => {
   const index = state.products.findIndex(
    (product) => product._id === action.payload._id
   );
   if( index !== -1 ) {
     state.products[index] = action.payload;
   }
  })
  //Delete product
  .addCase(deleteProduct.pending, (state) => {
   state.loading = true;
   state.error = null;
  })
  .addCase(deleteProduct.fulfilled, (state, action) => {
   state.loading = false;
   state.products = state.products.filter(
    (product) => product._id !== action.payload
   );
  })
  .addCase(deleteProduct.rejected, (state, action) => {
   state.loading = false;
   state.error = action.payload || action.error.message;
  });
 },
});

export default adminProductSlice.reducer;