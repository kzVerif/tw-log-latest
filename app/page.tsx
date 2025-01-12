// app/page.js หรือ pages/index.js
// Import Server Component

import Transactions from "./components/Transaction";

export default function Home() {
    return (
        <div className="mx-auto p-4">
            <p className="font-semibold text-3xl mb-2">LOG TRUE-WALLET</p>
            <Transactions /> {/* เรียกใช้ Server Component ตรงนี้ */}
        </div>
    );
}