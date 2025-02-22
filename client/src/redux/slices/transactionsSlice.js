import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";

const server_url = config.server_url;
// Async thunk to fetch the summary data
export const fetchSummary = createAsyncThunk(
  "transactions/fetchSummary",
  async () => {
    const response = await fetch(`${server_url}/app/summary`);
    return response.json();
  }
);

// Async thunk to fetch deposits data
export const fetchDeposits = createAsyncThunk(
  "transactions/fetchDeposits",
  async () => {
    const response = await fetch(`${server_url}/app/deposits`);
    return response.json();
  }
);

// Async thunk to fetch withdrawals data
export const fetchWithdrawals = createAsyncThunk(
  "transactions/fetchWithdrawals",
  async () => {
    const response = await fetch(`${server_url}/app/withdrawals`);
    return response.json();
  }
);

const initialState = {
  summary: {
    totalDeposits: 0,
    totalWithdrawals: 0,
    netBalance: 0,
  },
  deposits: [],
  withdrawals: [],
  status: "idle",
  error: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    // These can still be used to update the state locally (e.g., after a successful deposit)
    addDeposit: (state, action) => {
      state.deposits.push(action.payload);
      state.summary.totalDeposits += action.payload.amount;
      state.summary.netBalance += action.payload.amount;
    },
    addWithdrawal: (state, action) => {
      state.withdrawals.push(action.payload);
      state.summary.totalWithdrawals += action.payload.amount;
      state.summary.netBalance -= action.payload.amount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      })
      .addCase(fetchDeposits.fulfilled, (state, action) => {
        state.deposits = action.payload;
      })
      .addCase(fetchWithdrawals.fulfilled, (state, action) => {
        state.withdrawals = action.payload;
      });
  },
});

export const { addDeposit, addWithdrawal } = transactionsSlice.actions;
export default transactionsSlice.reducer;
