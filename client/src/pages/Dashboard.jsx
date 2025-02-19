import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const summary = useSelector((state) => state.transactions.summary);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-lg font-semibold text-gray-600">
            Total Deposits
          </h3>
          <p className="text-2xl font-bold text-green-600">
            ${summary.totalDeposits}
          </p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-lg font-semibold text-gray-600">
            Total Withdrawals
          </h3>
          <p className="text-2xl font-bold text-red-600">
            ${summary.totalWithdrawals}
          </p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-lg font-semibold text-gray-600">Net Balance</h3>
          <p className="text-2xl font-bold text-blue-600">
            ${summary.netBalance}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
