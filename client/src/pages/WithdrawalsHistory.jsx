import React from "react";
import { useSelector } from "react-redux";

const WithdrawalsHistory = () => {
  const withdrawals = useSelector((state) => state.transactions.withdrawals);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Withdrawals History</h2>
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {withdrawals.map((withdrawal, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {withdrawal.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${withdrawal.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {withdrawal.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawalsHistory;
