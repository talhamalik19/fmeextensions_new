import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
  },
  reducers: {
    setItems(state, action) {
      /* const actionPayload=[
        {
          itemId: "2438",
          itemSize: null
        }
      ]; */
      state.items = action.payload;
    },
  },
});

export const wishlistActions = wishlistSlice.actions;

export default wishlistSlice.reducer;
