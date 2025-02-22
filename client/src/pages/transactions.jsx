import React, { useEffect, useState } from "react";
import config from "../config";

const Transactions = () => {
  const [ip, setIp] = useState("");

  useEffect(() => {
    // Fetch user's public IP address
    fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        setIp(data.ip);
        saveIpToServer(data.ip);
      })
      .catch((error) => console.error("Failed to get IP:", error));
  }, []);

  // Send IP to backend for logging
  const saveIpToServer = async (ipAddress) => {
    try {
      await fetch(`${config.server_url}/app/logger`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip: ipAddress }),
      });
    } catch (error) {
      console.error("Failed to log IP to server:", error);
    }
  };

  return <div className=""></div>;
};

export default Transactions;
