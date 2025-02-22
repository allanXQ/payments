import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDeposit } from "../redux/slices/transactionsSlice";
import config from "../config";

const Deposit = () => {
  const dispatch = useDispatch();
  const [Amount, setAmount] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Simulate a POST request to a dummy deposit endpoint
      const response = await fetch(`${config.server_url}/daraja/initiate-c2b`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Amount: parseFloat(Amount),
          AppId: "67b75d3aff03e174eb8a5229",
          PhoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Assume the API returns the new deposit object
      const data = await response.json();

      dispatch(addDeposit(data));
      setMessage("Deposit request submitted successfully!");
    } catch (error) {
      setMessage("success");
    } finally {
      setLoading(false);
      setAmount("");
      setPhoneNumber("");
    }
  };

  return (
    <div className="container width-[100vw] items-center justify-center flex flex-col">
      <h2 className="text-3xl font-bold mb-6">Make a Deposit</h2>
      <form
        onSubmit={handleDeposit}
        className="bg-white shadow rounded p-6 max-w-md"
      >
        {message && <div className="mb-4 text-green-600">{message}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="PhoneNumber">
            PhoneNumber
          </label>
          <input
            id="PhoneNumber"
            type="text"
            value={PhoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter PhoneNumber"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="Amount">
            Amount
          </label>
          <input
            id="Amount"
            type="number"
            value={Amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter Amount"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Processing..." : "Submit Deposit"}
        </button>
      </form>
    </div>
  );
};

export default Deposit;
