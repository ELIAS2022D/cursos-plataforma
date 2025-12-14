'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await api.post('/users/login', {
      email,
      password,
    });

    localStorage.setItem('token', res.data.token);
    router.push('/dashboard');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-20 space-y-4"
    >
      <h1 className="text-2xl font-bold">Login</h1>

      <input
        className="w-full border p-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full border p-2"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="w-full bg-black text-white py-2">
        Entrar
      </button>
    </form>
  );
}
