'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      alert(response.data.message);
      localStorage.setItem('userId', response.data.userId);
      router.push('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed.');
    }
    router.push('/dashboard');
  };

  const navigateToSignup = () => {
    router.push('/signup');
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Login</h1>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>
      </div>
      <button
        onClick={navigateToSignup}
        className="bg-gray-500 text-white px-4 py-2 rounded-lg w-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        Register
      </button>
    </div>
  );
}
