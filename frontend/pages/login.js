import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

export default function Login() {
  const [form, setForm] = useState({ email:'', password:''});
  const [msg, setMsg] = useState(null);

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', form);
      setMsg('Login success. Token: ' + res.data.token.slice(0,20) + '...');
      // Save token to localStorage in real app
    } catch (err) {
      setMsg('Error: ' + (err.response?.data?.error || err.message));
    }
  }

  return (
    <div>
      <Header />
      <div className="container mt-6">
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={submit} className="mt-4 max-w-md">
          <label className="block mb-2">Email<input className="w-full p-2 border rounded" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></label>
          <label className="block mb-2">Password<input type="password" className="w-full p-2 border rounded" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /></label>
          <button className="bg-red-600 text-white px-4 py-2 rounded" type="submit">Login</button>
        </form>
        {msg && <div className="mt-4">{msg}</div>}
      </div>
    </div>
  );
}
