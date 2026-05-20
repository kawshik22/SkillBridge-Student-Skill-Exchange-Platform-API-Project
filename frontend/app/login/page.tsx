'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import Link from 'next/link';

import api from '@/lib/api';

export default function LoginPage() {

  const router = useRouter();

  // EMPTY DEFAULT VALUES
  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const handleSubmit = async (
    e: any,
  ) => {

    e.preventDefault();

    try {

      const res =
        await api.post(
          '/auth/login',

          {
            // LOWERCASE EMAIL
            email: email.toLowerCase(),

            password,
          },
        );

      if (
        res.data.message ===
        'Account pending admin approval'
      ) {

        alert(
          'Wait for admin approval',
        );

        return;
      }

      localStorage.setItem(
        'token',
        res.data.access_token,
      );

      localStorage.setItem(
        'role',
        res.data.user.role,
      );

      localStorage.setItem(
        'status',
        res.data.user.status,
      );

      localStorage.setItem(
        'userId',
        res.data.user.id,
      );

      router.push(
        '/dashboard',
      );

    } catch (error) {

      console.log(error);

      alert(
        'Invalid credentials',
      );
    }
  };

  return (

    <div className="flex justify-center items-center h-screen bg-black/70">

      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="border border-white bg-black/70 backdrop-blur-md p-8 rounded w-96"
      >

        <h1 className="text-4xl font-bold text-white text-center mb-8">

          Login

        </h1>

        <input
          type="email"
          name="email"
          autoComplete="off"
          placeholder="EMAIL"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value,
            )
          }
          className="w-full p-3 mb-4 bg-black border border-white rounded text-white outline-none"
        />

        <input
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value,
            )
          }
          className="w-full p-3 mb-2 bg-black border border-white rounded text-white outline-none"
        />

        <Link href="/forgot-password">

          <button
            type="button"
            className="text-sm text-yellow-400 hover:text-yellow-300 transition duration-300 mb-4"
          >

            Forgot Password?

          </button>

        </Link>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-pink-600 transition duration-300 p-3 rounded mb-4 text-white"
        >

          Login

        </button>

        <button
          type="button"
          onClick={() =>
            router.push(
              '/register',
            )
          }
          className="w-full border border-white hover:bg-white hover:text-black transition duration-300 p-3 rounded text-white"
        >

          Go To Register

        </button>

      </form>

    </div>
  );
}