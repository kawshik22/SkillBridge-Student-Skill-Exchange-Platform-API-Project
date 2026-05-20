'use client';

import Link from 'next/link';

export default function HomePage() {

  return (

    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">

      <h1 className="text-7xl font-bold text-purple-500 mb-6">

        SkillBridge

      </h1>

      <p className="text-xl text-gray-300 mb-10">

        Student Skill Exchange Platform

      </p>

      <div className="flex gap-6">

        <Link href="/register">

          <button className="bg-purple-600 px-8 py-3 rounded text-lg hover:bg-purple-700">

            Register

          </button>

        </Link>

        <Link href="/login">

          <button className="border border-white px-8 py-3 rounded text-lg hover:bg-white hover:text-black">

            Login

          </button>

        </Link>

      </div>

    </div>
  );
}