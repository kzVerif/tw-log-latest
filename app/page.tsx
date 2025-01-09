"use client";
// import { getAll } from "@/utils/actions";
import { useState, useEffect } from "react";

interface Transaction {
  amount: number;
  event_type: string;
  received_time: string;
  sender_mobile: string;
}

interface WebhookData {
  trans: Transaction[]; // trans is now an array of Transaction objects
}

export default function Home() {
  const [data, setData] = useState<WebhookData | null>(null); // State holds the entire object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newData: WebhookData = await response.json(); // Type the response
      setData(newData);
    } catch (err: any) {
      console.error("Error fetching webhook data:", err);
      setError(err.message || "An error occurred fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    let previousData: WebhookData | null = null;
    const interval = setInterval(async () => {
      try {
        const response = await fetch("http://localhost:3000/api");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newData: WebhookData = await response.json();

        if (JSON.stringify(newData) !== JSON.stringify(previousData)) {
          setData(newData);
          previousData = newData;
        }
      } catch (err: any) {
        console.error("Error during polling:", err);
        setError(err.message || "An error occurred during polling.");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading data...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  if (!data || !data.trans || data.trans.length === 0) {
    // Check if data and data.trans exist
    return (
      <div className="text-center text-gray-500 py-4">No transactions yet.</div>
    );
  }

  return (
    <div className="mx-auto p-4">
      <p className="font-semibold text-3xl mb-2">LOG TRUE-WALLET</p>
      {data.trans.map((item, index) => (
        <div
          className="bg-white rounded-lg border shadow-md mb-4 p-6 transition duration-300 hover:scale-105"
          key={index}
        >
          <div className="flex items-center mb-2">
            <span className="font-bold text-lg mr-2">Event Type:</span>
            <span className="text-lg font-medium text-blue-600">
              {item.event_type}
            </span>
          </div>
          <div className="mb-2">
            <span className="font-bold text-lg mr-2">Received Time:</span>
            <span className="text-lg text-gray-700">{item.received_time}</span>
          </div>
          <div className="mb-2">
            <span className="font-bold text-lg mr-2">Amount:</span>
            <span className="text-lg text-green-600 font-medium">
              {new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
              }).format(item.amount / 100)}
            </span>
          </div>
          <div>
            <span className="font-bold text-lg mr-2">Sender Mobile:</span>
            <span className="text-lg text-gray-700">{item.sender_mobile}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
