'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, email, password }),
      });

      if (response.ok) {
        alert('Signup successful!');
        router.push('/login');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'An unexpected error occurred'}`);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred while signing up. Please try again later.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Sign Up</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSignup}
          className="bg-green-500 text-white px-4 py-2 rounded-lg w-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
