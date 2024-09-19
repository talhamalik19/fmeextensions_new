import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    brands: [],
    categories: [],
    sort: 'default',
  },
  reducers: {
    selectBrand(state, action) {
      //const actionPayload = "American Eagle";
      state.brands.push(action.payload);
    },
    deselectBrand(state, action) {
      //const actionPayload = "American Eagle";
      state.brands = state.brands.filter((value) => value !== action.payload);
    },
    selectCategory(state, action) {
      //const actionPayload = "Hoodies";
      state.categories.push(action.payload);
    },
    deselectCategory(state, action) {
      //const actionPayload = "Hoodies";
      state.categories = state.categories.filter(
        (value) => value !== action.payload
      );
    },
    chooseSort(state, action) {
      //const actionPayload = "price_high_to_low";
      state.sort = action.payload;
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;
