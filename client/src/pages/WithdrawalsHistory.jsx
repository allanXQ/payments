import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWithdrawals } from "../redux/slices/transactionsSlice";

const WithdrawalsHistory = () => {
  const dispatch = useDispatch();
  const withdrawals = useSelector((state) => state.transactions.withdrawals);

  useEffect(() => {
    dispatch(fetchWithdrawals());
  }, [dispatch]);

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
            {Array.isArray(withdrawals.withdrawals) &&
              withdrawals.withdrawals.map((withdrawal, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {withdrawal.PhoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${withdrawal.Amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {withdrawal.Status}
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
