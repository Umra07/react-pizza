import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartSliceState } from './types';



const initialState: CartSliceState = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((item) => item.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push(action.payload);
      }

      state.totalCount++;
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((item) => item.id === action.payload);

      if (findItem) {
        findItem.count--;
        state.totalPrice = state.totalPrice - findItem.price;
        state.totalCount--;
      }

    },
    removeItem(state, action: PayloadAction<{id: string; count: number; price: number}>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalCount = state.totalCount - action.payload.count;
      state.totalPrice = state.totalPrice - action.payload.count * action.payload.price;
    },
    clearCart(state) {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});


export const { addItem, minusItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;