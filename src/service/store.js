import { configureStore } from "@reduxjs/toolkit";
import { bookSlice } from "./slice";
const store = configureStore({
  reducer: {
    book: bookSlice.reducer,
  },
});

export default store;
