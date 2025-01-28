// app/page.js หรือ pages/index.js
// Import Server Component

import Transactions from "./components/Transactions";

export default function Home() {
    return (
        <div className="mx-auto p-4">
            
            <Transactions /> {/* เรียกใช้ Server Component ตรงนี้ */}
        </div>
    );
}