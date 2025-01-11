import Link from "next/link";
import React from "react";

export default function Navigation() {
    return (
        <nav className="bg-gray-100 py-4 shadow-md sticky top-0 z-10"> {/* ปรับปรุงพื้นหลัง, เพิ่มเงา, sticky navbar */}
            <div className="container mx-auto px-4 flex justify-center"> {/* ใช้ container เพื่อจัดกึ่งกลางและ padding */}
                <div className="flex space-x-4"> {/* เพิ่ม spacing ระหว่างปุ่ม */}
                    <Link href="/">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow">
                            Home
                        </button>
                    </Link>
                    <Link href="/Fee">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow">
                            Calculate Fee
                        </button>
                    </Link>
                    <Link href="/2FA">
                        <button className="bg-orange-500 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow">
                            2FA OTP
                        </button>
                    </Link>
                    {/* เพิ่มปุ่มอื่นๆ ได้ที่นี่ */}
                </div>
            </div>
        </nav>
    );
}