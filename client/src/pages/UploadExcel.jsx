import React, { useState } from "react";
import { CloudUpload, CheckCircle, XCircle } from "lucide-react"; // Using Lucide icons
import config from "../config";

const UploadExcel = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [parsedData, setParsedData] = useState([]);
  const [showData, setShowData] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage("");
      setError(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select an Excel file first.");
      setError(true);
      return;
    }

    setLoading(true);
    setMessage("");
    setError(false);
    setProgress(30); // Initial progress

    const formData = new FormData();
    formData.append("file", file);

    try {
      await fetch(`${config.server_url}/app/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setMessage("File uploaded successfully!");
          setError(false);
          setProgress(100);
          setParsedData(data.data);
          setShowData(true);
        })
        .catch((error) => {
          console.error("Error:", error);
          setMessage("Error uploading file.");
          setError(true);
          setProgress(0);
        });
    } catch (error) {
      setMessage("Failed to upload file. Server may be down.");
      setError(true);
      setProgress(0);
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 2000); // Hide progress after 2 sec
    }
  };

  const handleInitTransactions = async () => {
    setLoading(true);
    setMessage("");
    setError(false);

    try {
      const response = await fetch(
        `${config.server_url}/app/init-transactions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: parsedData.data }),
        }
      );

      if (response.ok) {
        setMessage("Transactions initiated successfully!");
        setError(false);
      } else {
        setMessage("Error initiating transactions.");
        setError(true);
      }
    } catch (error) {
      setMessage("Failed to initiate transactions. Server may be down.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return !showData ? (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Upload Excel File
      </h2>

      {/* File Upload Area */}
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <CloudUpload className="w-12 h-12 text-gray-500" />
          <p className="mb-2 text-sm text-gray-600">
            <span className="font-semibold">Click to upload</span> or drag &
            drop
          </p>
          <p className="text-xs text-gray-500">.xlsx, .xls files only</p>
        </div>
        <input
          id="file-upload"
          type="file"
          accept=".xlsx, .xls"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* Selected File Preview */}
      {file && (
        <div className="mt-4 flex items-center justify-between p-3 bg-gray-100 rounded">
          <p className="text-gray-700">{file.name}</p>
          <button
            onClick={() => setFile(null)}
            className="text-red-500 hover:text-red-700"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className={`w-full mt-5 px-4 py-3 rounded-lg font-semibold text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload File"}
      </button>

      {/* Progress Bar */}
      {progress > 0 && (
        <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-500 h-2.5 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Message Feedback */}
      {message && (
        <div
          className={`mt-4 p-3 rounded-md text-center ${
            error ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
          }`}
        >
          {error ? (
            <XCircle className="inline w-5 h-5 mr-2" />
          ) : (
            <CheckCircle className="inline w-5 h-5 mr-2" />
          )}
          {message}
        </div>
      )}
    </div>
  ) : (
    <div>
      <h2 className="text-3xl font-bold mb-6">Uploaded Transaction Details</h2>
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(parsedData) &&
              parsedData.map((detail, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.PhoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${detail.Amount}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {message && (
        <div
          className={`mt-4 p-3 rounded-md text-center ${
            error ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
          }`}
        >
          {error ? (
            <XCircle className="inline w-5 h-5 mr-2" />
          ) : (
            <CheckCircle className="inline w-5 h-5 mr-2" />
          )}
          {message}
        </div>
      )}
      <button
        onClick={handleInitTransactions}
        className={`w-full mt-5 px-4 py-3 rounded-lg font-semibold text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={loading}
      >
        {loading ? "Processing..." : "Initiate Batch Payments"}
      </button>
    </div>
  );
};

export default UploadExcel;
