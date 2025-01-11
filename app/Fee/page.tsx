"use client";
import React, { useState } from "react";

export default function page() {
    const [inputValue, setInputValue] = useState("");
    const [result, setresult] = useState(0);

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

        setresult(calculatedResult);
    };

    const handleChange = (e: any) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center"> {/* ปรับปรุงพื้นหลังและจัดกึ่งกลาง */}
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"> {/* ปรับปรุงขนาดและสีพื้นหลัง */}
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">คำนวณเงินที่ต้องแจ้ง</h2>{/* เพิ่มหัวข้อ */}
                <form onSubmit={handleSubmit} className="space-y-4"> {/* เพิ่ม spacing ระหว่าง element */}
                    <div>
                        <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">จำนวนเงินที่ต้องการรับ:</label> {/* เพิ่ม label */}
                        <input
                            type="number" // เปลี่ยนเป็น number เพื่อให้ขึ้น keyboard ตัวเลขในมือถือ
                            id="amount"
                            placeholder="เช่น 200"
                            value={inputValue}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" // ปรับปรุง style input
                        />
                    </div>
                    <div>
                        <label htmlFor="result" className="block text-gray-700 font-medium mb-2">เงินที่ต้องแจ้ง:</label>
                        <p id="result" className="text-lg font-medium text-blue-500">{result}</p> {/* ปรับปรุง style ผลลัพธ์ */}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300" // ปรับปรุง style ปุ่ม
                    >
                        คำนวณ
                    </button>
                </form>
            </div>
        </div>
    );
}