'use client';

import { useEffect, useState } from 'react';

import api from '@/lib/api';

export default function AdminPage() {

  const [users, setUsers] =
    useState<any[]>([]);

  useEffect(() => {

    fetchPendingUsers();

  }, []);

  // FETCH USERS
  const fetchPendingUsers =
    async () => {

      try {

        const res =
          await api.get(
            '/admin/pending-users',
          );

        setUsers(res.data);

      } catch (error) {

        console.log(error);
      }
    };

  // APPROVE USER
  const approveUser =
    async (id: number) => {

      try {

        await api.patch(
          `/admin/approve/${id}`,
        );

        alert('User Approved');

        fetchPendingUsers();

      } catch (error) {

        console.log(error);
      }
    };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem(
      'token',
    );

    localStorage.removeItem(
      'role',
    );

    localStorage.removeItem(
      'status',
    );

    localStorage.removeItem(
      'userId',
    );

    window.location.href =
      '/login';
  };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      {/* TOP BAR */}

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold text-purple-500">

          Welcome Admin

        </h1>

        <button
          onClick={logout}
          className="bg-red-600 px-5 py-2 rounded"
        >
          Logout
        </button>

      </div>

      {/* USERS */}

      <div className="grid gap-5">

        {users.length === 0 ? (

          <div className="text-center text-gray-400 mt-10">

            No Pending Users

          </div>

        ) : (

          users.map((user: any) => (

            <div
              key={user.id}
              className="border border-white rounded p-5 flex justify-between items-center"
            >

              <div>

                <h2 className="text-2xl font-bold">

                  {user.fullName}

                </h2>

                <p>

                  {user.email}

                </p>

                <p className="text-gray-400">

                  Role: {user.role}

                </p>

                <p className="text-yellow-400">

                  Status: {user.status}

                </p>

              </div>

              <button
                onClick={() =>
                  approveUser(user.id)
                }
                className="bg-green-600 px-5 py-2 rounded hover:bg-green-700"
              >
                Approve
              </button>

            </div>

          ))

        )}

      </div>

    </div>
  );
}