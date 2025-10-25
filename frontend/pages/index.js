import { useEffect, useState } from 'react';
import Header from '../components/Header';
import BankCard from '../components/BankCard';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

export default function Home() {
  const [banks, setBanks] = useState([]);
  const [q, setQ] = useState('');
  const [city, setCity] = useState('');
  const [blood, setBlood] = useState('');

  useEffect(() => {
    fetchBanks();
  }, []);

  async function fetchBanks() {
    const params = {};
    if (q) params.q = q;
    if (city) params.city = city;
    if (blood) params.blood = blood;
    const res = await axios.get('http://localhost:4000/api/banks', { params });
    setBanks(res.data);
  }

  return (
    <div>
      <Header />
      <main className="container mt-6">
        <h1 className="text-2xl font-bold mb-4">Find blood near you</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <SearchBar onChange={(v)=>setQ(v)} placeholder="Search bank or address" />
          </div>
          <div>
            <SearchBar onChange={(v)=>setCity(v)} placeholder="City" />
          </div>
          <div>
            <select className="w-full p-2 border rounded" onChange={e=>setBlood(e.target.value)}>
              <option value="">Any blood group</option>
              {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <button onClick={fetchBanks} className="bg-red-600 text-white px-4 py-2 rounded">Search</button>
        </div>

        <div>
          {banks.map(b => <BankCard key={b.id} bank={b} />)}
        </div>
      </main>
    </div>
  );
}
