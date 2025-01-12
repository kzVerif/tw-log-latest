// app/Transactions.js (Next.js 13+)
import { formatDate, getAll } from "@/utils/actions";

interface Transaction {
  amount: number;
  event_type: string;
  received_time: string;
  sender_mobile: string;
}

interface WebhookData {
  trans: Transaction[];
}

export default async function Transactions() {
  const transactions = await getAll();

  if (!transactions || !transactions.trans || transactions.trans.length === 0) {
    return <p>No transactions yet.</p>;
  }

  return (
    <div className="mx-auto p-4">
      <form action="">
        <div className="items-center ">
          <p className="inline font-semibold text-3xl">LOG TRUE-WALLET</p>
          <button
            className="ease-in-out duration-300 m-4 bg-blue-500 hover:bg-blue-700 px-4 py-2 text-white rounded-lg shadow "
            type="submit"
          >
            Reload
          </button>
        </div>
        {transactions.trans.map((item: any, index: any) => (
          <div
            className="bg-white rounded-lg border shadow-md mb-4 p-6 transition duration-300 hover:scale-105 cursor-pointer"
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
              <span className="text-lg text-gray-700">
                {formatDate(item.received_time)}
              </span>
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
              <span className="text-lg text-gray-700">
                {item.sender_mobile}
              </span>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
}
