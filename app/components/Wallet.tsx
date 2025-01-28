"use client"
import { truewalletTopup } from '@/utils/actions';
import React, { useState } from 'react';

export default function Wallet() {
  const [token, setToken] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token.trim()) {
      setResult('กรุณาใส่ลิงก์ซองอั่งเปา');
      return;
    }
    const response = await truewalletTopup(token);
    setResult(response);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          รับซองอั่งเปาวอลเลท
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="token"
              className="block text-gray-700 font-medium mb-2"
            >
              ลิงก์ซองอั่งเปา
            </label>
            <input
              type="text"
              id="token"
              placeholder="วางลิงก์ซองอั่งเปา"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            รับเงิน!
          </button>
        </form>
        {result && (
          <div className="mt-4 text-center text-gray-700 font-medium">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
            //   <div className="flex-col items-center">
            //     {" "}
            //     {/* จัด p และ button ให้อยู่ในบรรทัดเดียวกัน */}
            //     <label
            //       htmlFor="result"
            //       className="block text-gray-700 font-medium mb-2 mr-2"
            //     >
            //       2FA OTP ของคุณ:
            //     </label>{" "}
            //     {/* เพิ่ม margin ขวา */}
            //     <div className="flex ">
            //       <p
            //         id="result"
            //         className="text-lg font-medium text-blue-500 flex-grow"
            //       >
            //         {}
            //       </p>{" "}
            //       {/* เพิ่ม flex-grow เพื่อให้ p ยืดหยุ่น */}
            //       <button
            //         type="button" // เปลี่ยนเป็น type="button" เพื่อป้องกันการ submit form
            //         className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-1 px-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            //       >
            //         Copy
            //       </button>
            //     </div>
            //   </div>
