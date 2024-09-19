import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    setItems(state, action) {
      /* const actionPayload = [
      {
        itemId: "2428",
        itemQuantity: "1",
        itemSize: "33"
      },
      {
        itemId: "2429",
        itemQuantity: "1",
        itemSize: "33"
      }
    ]; */
      state.items = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
