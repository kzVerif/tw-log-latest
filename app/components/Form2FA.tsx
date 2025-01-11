"use client";
import { getToken } from "@/utils/actions";
import React, { useState, useRef } from "react";

export default function Form2FA() {
  const [inputValue, setInputValue] = useState("");
  const [result, setresult] = useState("");
  const resultRef = useRef<HTMLParagraphElement>(null); // useRef สำหรับ p element

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (inputValue === "") {
      alert("กรุณากรอก Token");
      return;
    }

    try {
      const token = await getToken(inputValue);

      if (token) {
        setresult(token);
      } else {
        setresult("เกิดข้อผิดพลาดในการรับ OTP");
        alert("เกิดข้อผิดพลาดในการรับ OTP");
      }
    } catch (error: any) {
      console.error("Error fetching 2FA:", error);
      alert(`เกิดข้อผิดพลาดในการรับ OTP: ${error.message}`);
      setresult("เกิดข้อผิดพลาด");
    }
  };

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleCopyClick = async () => {
    if (result && resultRef.current) {
      try {
        await navigator.clipboard.writeText(result);
        alert("คัดลอก OTP แล้ว!"); // แสดง alert เมื่อคัดลอกสำเร็จ
      } catch (err) {
        console.error("Failed to copy text: ", err);
        alert("เกิดข้อผิดพลาดในการคัดลอก OTP");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          รับ 2FA OTP
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="token"
              className="block text-gray-700 font-medium mb-2"
            >
              Token ที่ต้องการรับ OTP:
            </label>
            <input
              type="text"
              id="token"
              placeholder="กรอก Token"
              value={inputValue}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="flex-col items-center">
            {" "}
            {/* จัด p และ button ให้อยู่ในบรรทัดเดียวกัน */}
            <label
              htmlFor="result"
              className="block text-gray-700 font-medium mb-2 mr-2"
            >
              2FA OTP ของคุณ:
            </label>{" "}
            {/* เพิ่ม margin ขวา */}
            <div className="flex ">
              <p
                id="result"
                ref={resultRef}
                className="text-lg font-medium text-blue-500 flex-grow"
              >
                {result}
              </p>{" "}
              {/* เพิ่ม flex-grow เพื่อให้ p ยืดหยุ่น */}
              <button
                type="button" // เปลี่ยนเป็น type="button" เพื่อป้องกันการ submit form
                onClick={handleCopyClick}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-1 px-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Copy
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            รับ OTP
          </button>
        </form>
      </div>
    </div>
  );
}
