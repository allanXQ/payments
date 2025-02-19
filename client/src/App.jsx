import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import DepositsHistory from "./pages/DepositsHistory";
import WithdrawalsHistory from "./pages/WithdrawalsHistory";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Payments Dashboard
          </h1>
          <div>
            <Link className="mx-2 text-gray-600 hover:text-blue-500" to="/">
              Dashboard
            </Link>
            <Link
              className="mx-2 text-gray-600 hover:text-blue-500"
              to="/deposits"
            >
              Deposits History
            </Link>
            <Link
              className="mx-2 text-gray-600 hover:text-blue-500"
              to="/withdrawals"
            >
              Withdrawals History
            </Link>
            <Link
              className="mx-2 text-gray-600 hover:text-blue-500"
              to="/deposit"
            >
              Deposit
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/deposits" element={<DepositsHistory />} />
          <Route path="/withdrawals" element={<WithdrawalsHistory />} />
          <Route path="/deposit" element={<Deposit />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
