'use client';

import { useState } from 'react';

import api from '@/lib/api';

import Link from 'next/link';

import { useRouter } from 'next/navigation';

export default function RegisterPage() {

  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    fullName: '',
    password: '',
    role: 'student',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >,
  ) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {

    e.preventDefault();

    try {

      const res = await api.post(
        '/auth/register',
        form,
      );

      alert(
        'Registration Successful',
      );

      router.push('/login');

    } catch (error: any) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        'Registration Failed',
      );
    }
  };

  return (

    <div className="flex justify-center items-center h-screen bg-black">

      <form
        onSubmit={handleSubmit}
        className="border border-white p-8 rounded w-96"
      >

        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Register
        </h1>

        <input
          type="email"
          name="email"
          autoComplete="off"
          placeholder="EMAIL"
          value={form.email}
          onChange={handleChange}
          className="border border-white bg-black text-white p-3 w-full mb-4 rounded"
        />

        <input
          type="text"
          name="fullName"
          autoComplete="new-name"
          placeholder="FULLNAME"
          value={form.fullName}
          onChange={handleChange}
          className="border border-white bg-black text-white p-3 w-full mb-4 rounded"
        />

        <input
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="PASSWORD"
          value={form.password}
          onChange={handleChange}
          className="border border-white bg-black text-white p-3 w-full mb-4 rounded"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border border-white bg-black text-white p-3 w-full mb-4 rounded"
        >

          <option value="student">
            STUDENT
          </option>

          <option value="mentor">
            MENTOR
          </option>

        </select>

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white w-full py-3 rounded"
        >
          Register
        </button>

        <Link href="/login">

          <button
            type="button"
            className="border border-white text-white w-full py-3 rounded mt-4"
          >
            Go To Login
          </button>

        </Link>

      </form>

    </div>
  );
}