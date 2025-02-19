import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  summary: {
    totalDeposits: 0,
    totalWithdrawals: 0,
    netBalance: 0,
  },
  deposits: [],
  withdrawals: [],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
    addDeposit: (state, action) => {
      state.deposits.push(action.payload);
      // Update summary (naively)
      state.summary.totalDeposits += action.payload.amount;
      state.summary.netBalance += action.payload.amount;
    },
    addWithdrawal: (state, action) => {
      state.withdrawals.push(action.payload);
      // Update summary (naively)
      state.summary.totalWithdrawals += action.payload.amount;
      state.summary.netBalance -= action.payload.amount;
    },
    setDeposits: (state, action) => {
      state.deposits = action.payload;
    },
    setWithdrawals: (state, action) => {
      state.withdrawals = action.payload;
    },
  },
});

export const {
  setSummary,
  addDeposit,
  addWithdrawal,
  setDeposits,
  setWithdrawals,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
