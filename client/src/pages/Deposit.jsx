import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDeposit } from "../redux/slices/transactionsSlice";

const Deposit = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Simulate an API call to the Daraja API
    setTimeout(() => {
      const newDeposit = {
        date: new Date().toLocaleString(),
        amount: parseFloat(amount),
        status: "Pending",
      };

      dispatch(addDeposit(newDeposit));
      setMessage("Deposit request submitted successfully!");
      setLoading(false);
      setAmount("");
      setPhone("");
    }, 1500);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Make a Deposit</h2>
      <form
        onSubmit={handleDeposit}
        className="bg-white shadow rounded p-6 max-w-md"
      >
        {message && <div className="mb-4 text-green-600">{message}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter phone number"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter amount"
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
