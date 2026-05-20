'use client';

import {
  useState,
} from 'react';

import {
  useRouter,
} from 'next/navigation';

import api from '@/lib/api';

export default function ForgotPasswordPage() {

  const router =
    useRouter();

  const [form, setForm] =
    useState({
      email: '',
      password: '',
    });

  const handleChange = (
    e: any,
  ) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const resetPassword =
    async () => {

      try {

        await api.patch(

          'http://localhost:3001/auth/forgot-password',

          form,
        );

        alert(
          'Password Updated Successfully',
        );

        router.push('/login');

      } catch (error) {

        console.log(error);

        alert(
          'Failed to update password',
        );
      }
    };

  return (

    <div className="min-h-screen bg-black text-white flex justify-center items-center">

      <div className="border border-white p-10 rounded w-[400px]">

        <h1 className="text-4xl font-bold text-center mb-8">

          Forgot Password

        </h1>

        <input
          type="email"
          name="email"
          autoComplete="new-email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border border-white bg-black p-3 rounded mb-4"
        />

        <input
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="New Password"
          onChange={handleChange}
          className="w-full border border-white bg-black p-3 rounded mb-6"
        />

        <button
          onClick={resetPassword}
          className="w-full bg-purple-600 p-3 rounded"
        >
          Update Password
        </button>

      </div>

    </div>
  );
}