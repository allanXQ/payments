import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./slices/transactionsSlice";

export default configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});
