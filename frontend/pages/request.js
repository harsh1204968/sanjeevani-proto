import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

export default function Request() {
  const [form, setForm] = useState({ name:'', email:'', bank_id:'', blood_group:'O+', units:1, phone:'' });
  const [msg, setMsg] = useState(null);

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/requests', form);
      setMsg('Request submitted. ID: ' + res.data.id);
    } catch (err) {
      setMsg('Error: ' + (err.response?.data?.error || err.message));
    }
  }

  return (
    <div>
      <Header />
      <div className="container mt-6">
        <h1 className="text-2xl font-bold">Request Blood</h1>
        <form onSubmit={submit} className="mt-4 max-w-md">
          <label className="block mb-2">Name<input className="w-full p-2 border rounded" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></label>
          <label className="block mb-2">Email<input className="w-full p-2 border rounded" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></label>
          <label className="block mb-2">Bank ID (optional)<input className="w-full p-2 border rounded" value={form.bank_id} onChange={e=>setForm({...form,bank_id:e.target.value})} /></label>
          <label className="block mb-2">Blood Group
            <select className="w-full p-2 border rounded" value={form.blood_group} onChange={e=>setForm({...form,blood_group:e.target.value})}>
              {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(bg=> <option key={bg} value={bg}>{bg}</option>)}
            </select>
          </label>
          <label className="block mb-2">Units<input type="number" className="w-full p-2 border rounded" value={form.units} onChange={e=>setForm({...form,units:Number(e.target.value)})} /></label>

          <button className="bg-red-600 text-white px-4 py-2 rounded" type="submit">Submit Request</button>
        </form>
        {msg && <div className="mt-4">{msg}</div>}
      </div>
    </div>
  );
}
