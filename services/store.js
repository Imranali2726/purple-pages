import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../reducers/search";
import isEditReducer from "../reducers/isEdit";
import filterSearchReducer from "../reducers/filterSearch";

const store = configureStore({
  reducer: {
    search: searchReducer,
    isEdit: isEditReducer,
    filterSearch: filterSearchReducer,
  },
});

export default store;
