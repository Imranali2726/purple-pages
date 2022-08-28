import { createSlice } from "@reduxjs/toolkit";

const filterSearch = createSlice({
  name: "filterSearch",
  initialState: { value: [] },
  reducers: {
    setFilterData: (state, { payload }) => {
      state.value = [...state.value, { [payload.name]: payload.id }];
    },
  },
});

export default filterSearch.reducer;
export const { setFilterData } = filterSearch.actions;
