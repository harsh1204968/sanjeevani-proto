import Link from 'next/link';

export default function BankCard({ bank }) {
  return (
    <div className="card mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{bank.name}</h3>
          <div className="text-sm text-gray-600">{bank.address}, {bank.city}</div>
          <div className="text-sm">Phone: {bank.phone}</div>
        </div>
        <div className="text-right">
          <Link href={`/banks/${bank.id}`}><a className="bg-red-500 text-white px-3 py-1 rounded">View</a></Link>
        </div>
      </div>
      <div className="mt-3">
        <strong>Inventory:</strong>
        <div className="flex flex-wrap gap-2 mt-2">
          {Object.entries(bank.inventory || {}).map(([bg, qty]) => (
            <div key={bg} className="px-2 py-1 border rounded text-sm">
              {bg}: {qty}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
