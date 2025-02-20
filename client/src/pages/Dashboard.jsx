import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSummary } from "../redux/slices/transactionsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const summary = useSelector((state) => state.transactions.summary);
  console.log(summary);
  const deposits =
    (Array.isArray(summary.summary) &&
      summary.summary.find((item) => item._id === "Deposit")
        .totalFundedDeposits) ||
    0;

  const withdrawals = Array.isArray(summary.summary)
    ? summary.summary.find((item) => item._id === "Withdrawal")
        .totalFundedWithdrawals
    : 0;

  const pendingDeposits = Array.isArray(summary.summary)
    ? summary.summary.find((item) => item._id === "Deposit")
        .totalPendingDeposits
    : 0;

  const totalPendingWithdrawals = Array.isArray(summary.summary)
    ? summary.summary.find((item) => item._id === "Withdrawal")
        .totalPendingWithdrawals
    : 0;

  const netBalance = deposits - withdrawals;
  useEffect(() => {
    dispatch(fetchSummary());
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-lg font-semibold text-gray-600">
            Total Deposits
          </h3>
          <p className="text-2xl font-bold text-green-600">${deposits}</p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-lg font-semibold text-gray-600">
            Total Withdrawals
          </h3>
          <p className="text-2xl font-bold text-red-600">${withdrawals}</p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-lg font-semibold text-gray-600">
            Pending Deposits
          </h3>
          <p className="text-2xl font-bold text-yellow-600">
            ${pendingDeposits}
          </p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-lg font-semibold text-gray-600">
            Pending Withdrawals
          </h3>
          <p className="text-2xl font-bold text-yellow-600">
            ${totalPendingWithdrawals}
          </p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-lg font-semibold text-gray-600">Net Balance</h3>
          <p className="text-2xl font-bold text-blue-600">${netBalance}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
