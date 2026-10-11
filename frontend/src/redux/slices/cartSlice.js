import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Helper to load cart from localStorage
const loadCartFromStorage = () => {
  const storedcart = localStorage.getItem('cart');
  return storedcart ? JSON.parse(storedcart) : {products: []};
};

// Helper to save cart to localStorage
const saveCartToStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Fetch cart for a user or guest
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async ({userId, guestId}, {rejectWithValue}) => {
    try {
      const response = await axios.get(
       `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
       {
        params: {userId, guestId},
       }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Failed to fetch cart');
    }
  }
);

// Add an item to the cart for a user or guest
export const addToCart = createAsyncThunk(
 "cart/addToCart",
 async(
   {productId, quantity, size, color, guestId, userId},
   {rejectWithValue}
 ) => {
  try {
   const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
    {
     productId,
     quantity,
     size,
     color,
     guestId,
     userId,
    }
   );
   return response.data;
  } catch (error) {
   console.error(error);
   return rejectWithValue(error.response?.data || error.message);
  }
 }
);

// Update the quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk(
 "cart/updateCartItemQuantity",
 async({productId, quantity, guestId, userId, size, color}, {rejectWithValue}) => {
  try {
   const response = await axios.put(
    `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
    {
     productId,
     quantity,
     guestId,
     userId,
     size,
     color,
    }
   );
   return response.data;
  } catch (error) {
   return rejectWithValue(error.response.data);
  }
 }
);

// Remove an item from the cart 
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async({productId, guestId, userId,size, color}, {rejectWithValue}) => {
    try {
      const response = await axios({
       method: "DELETE",
       url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
       data: {productId, guestId, userId, size, color},
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Merge guest Cart into User cart
export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async({ guestId, userId}, {rejectWithValue}) => {
    try {
        const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        {guestId, userId},
        {
          headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: loadCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
    state.cart = {products: [] };
    localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchCart.pending, (state) => {
     state.loading = true;
     state.error = null;
    })
    .addCase(fetchCart.fulfilled, (state, action) => {
     state.loading = false;
     state.cart = action.payload;
     state.error = null;
     saveCartToStorage(action.payload);
    })
    .addCase(fetchCart.rejected, (state, action) => {
     state.loading = false;
     state.error = action.error.message || "Failed to fetch the cart";
    })
    .addCase(addToCart.pending, (state) => {
     state.loading = true;
     state.error = null;
    })
    .addCase(addToCart.fulfilled, (state, action) => {
     state.loading = false;
     state.cart = action.payload;
     state.error = null;
     saveCartToStorage(action.payload);
    })
    .addCase(addToCart.rejected, (state, action) => {
     state.loading = false;
     state.error = action.payload?.message || "Failed to add to cart";
    })
    .addCase(updateCartItemQuantity.pending, (state) => {
     state.loading = true;
     state.error = null;
    })
    .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
     state.loading = false;
     state.cart = action.payload;
     state.error = null;
     saveCartToStorage(action.payload);
    })
    .addCase(updateCartItemQuantity.rejected, (state, action) => {
     state.loading = false;
     state.error = action.payload?.message || "Failed to update item quantity";
    })
    .addCase(removeFromCart.pending, (state) => {
     state.loading = true;
     state.error = null;
    })
    .addCase(removeFromCart.fulfilled, (state, action) => {
     state.loading = false;
     state.cart = action.payload;
     state.error = null;
     saveCartToStorage(action.payload);
    })
    .addCase(removeFromCart.rejected, (state, action) => {
     state.loading = false;
     state.error = action.payload?.message || "Failed to remove items";
    })
    .addCase(mergeCart.pending, (state) => {
     state.loading = true;
     state.error = null;
    })
    .addCase(mergeCart.fulfilled, (state, action) => {
     state.loading = false;
     state.cart = action.payload;
     state.error = null;
     saveCartToStorage(action.payload);
    })
    .addCase(mergeCart.rejected, (state, action) => {
     state.loading = false;
     state.error = action.payload?.message || "Failed to merge cart";
    });
  }
});

export const { clearCart} = cartSlice.actions;
export default cartSlice.reducer;