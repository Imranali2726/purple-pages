import { createSlice } from "@reduxjs/toolkit";

// const initialState = { value: {} };
const filterSearch = createSlice({
  name: "filterSearch",
  initialState: { value: {} },
  reducers: {
    setFilterData: (state, { payload }) => {
      if (state.value[payload.name]?.length) {
        state.value[payload.name] = [
          ...state.value[payload?.name],
          payload.value,
        ];
      } else {
        state.value[payload.name] = [payload.value];
      }
    },
    removeFilterData: (state, { payload }) => {
      const { name, value } = payload;
      // state.value = state.value[name]?.filter((item) => item !== value);
      if (state.value[name].length <= 1) {
        delete state.value[name];
        return;
      }
      state.value[name] = state.value[name]?.filter((item) => item !== value);
    },
    resetFilterData: (state) => {
      state.value = {};
    },
    loadOnPageReload: (state, { payload }) => {
      const a = payload && Object.keys(payload);
      const b = payload;
      a.forEach((item) => {
        if (!Array.isArray(b[item])) {
          b[item] = [b[item]];
        }
      });
      state.value = b;
    },
  },
});

export default filterSearch.reducer;
export const {
  setFilterData,
  removeFilterData,
  loadOnPageReload,
  resetFilterData,
} = filterSearch.actions;
