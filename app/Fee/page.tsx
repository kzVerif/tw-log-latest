"use client";
import React, { useState, useRef } from "react";

export default function page() {
    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState(""); // เปลี่ยน result เป็น string
    const resultRef = useRef<HTMLParagraphElement>(null); // สร้าง ref สำหรับ p tag

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (inputValue === "" || isNaN(Number(inputValue))) {
            alert("กรุณากรอกตัวเลข");
            return;
        }

        const numInput = Number(inputValue);
        let calculatedResult = numInput * 0.029;

        if (calculatedResult > 10) {
            calculatedResult = 10;
        }
        calculatedResult = Math.ceil(calculatedResult);
        calculatedResult = numInput + calculatedResult;

        const text = `✅ยอด💰✨\n🏦บช./พร้อมเพย์ ฿${inputValue}\n🧧ทรูมันนี่ ฿${calculatedResult} งับ🌟`; // ใช้ \n สำหรับขึ้นบรรทัดใหม่
        setResult(text);
    };

    const handleChange = (e: any) => {
        setInputValue(e.target.value);
    };

    const handleCopyClick = () => {
        if (resultRef.current) {
            navigator.clipboard.writeText(resultRef.current.innerText)
                .then(() => {
                    alert("คัดลอกข้อความแล้ว!");
                })
                .catch((err) => {
                    console.error("เกิดข้อผิดพลาดในการคัดลอก: ", err);
                    alert("เกิดข้อผิดพลาดในการคัดลอก โปรดลองอีกครั้ง");
                });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">คำนวณเงินที่ต้องแจ้ง</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">จำนวนเงินที่ต้องการรับ:</label>
                        <input
                            type="number"
                            id="amount"
                            placeholder="เช่น 200"
                            value={inputValue}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="result" className="block text-gray-700 font-medium mb-2">เงินที่ต้องแจ้ง:</label>
                        <p id="result" className="text-lg font-medium text-blue-500 whitespace-pre-line" ref={resultRef}>{result}</p> {/* เพิ่ม ref และ whitespace-pre-line */}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        คำนวณ
                    </button>
                    {/* ปุ่ม Copy */}
                        <button
                            type="button"
                            onClick={handleCopyClick}
                            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-green-300 mt-2"
                        >
                            คัดลอก
                        </button>
                </form>
            </div>
        </div>
    );
}