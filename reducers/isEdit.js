import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
  name: "isEdit",
  initialState: {
    value: {
      identity: false,
      location: false,
      services: false,
      type: false,
    },
  },
  reducers: {
    setIsEdited: (state, { payload }) => {
      state.value = {
        ...state.value,
        [payload]: true,
      };
    },
  },
});

export default editSlice.reducer;
export const { setIsEdited } = editSlice.actions;
