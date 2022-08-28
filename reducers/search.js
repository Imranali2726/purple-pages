import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: { value: {} },
  reducers: {
    setSearchData: (state, { payload }) => {
      state.value = {
        ...state.value,
        [payload.name]: payload.value,
      };
    },
  },
});

export default searchSlice.reducer;
export const { setSearchData } = searchSlice.actions;
