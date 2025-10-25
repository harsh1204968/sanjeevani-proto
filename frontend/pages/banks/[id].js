import axios from 'axios';
import { useRouter } from 'next/router';
import Header from '../../components/Header';

export default function BankPage() {
  const router = useRouter();
  const { id } = router.query;
  const [bank, setBank] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:4000/api/banks/${id}`).then(r => setBank(r.data));
  }, [id]);

  if (!bank) return <div><Header /><div className="container mt-6">Loading...</div></div>;

  return (
    <div>
      <Header />
      <div className="container mt-6">
        <h1 className="text-2xl font-bold">{bank.name}</h1>
        <div className="mt-2">{bank.address}, {bank.city}</div>
        <div className="mt-2">Phone: {bank.phone}</div>

        <h2 className="mt-4 font-semibold">Inventory</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
          {Object.entries(bank.inventory).map(([bg, qty]) => (
            <div key={bg} className="p-3 border rounded">
              <div className="font-semibold">{bg}</div>
              <div>{qty} units</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
