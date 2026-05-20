'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function DashboardPage() {

  const router = useRouter();

  const [role, setRole] =
    useState('');

  const [users, setUsers] =
    useState<any[]>([]);

  const [requests, setRequests] =
    useState<any[]>([]);

  const [skillForm, setSkillForm] =
    useState({
      title: '',
      description: '',
      level: '',
      phone: '',
    });

  // HANDLE INPUT
  const handleChange = (
    e: any,
  ) => {

    setSkillForm({
      ...skillForm,
      [e.target.name]:
        e.target.value,
    });
  };

  // ADD SKILL
  const addSkill = async () => {

    try {

      const token =
        localStorage.getItem(
          'token',
        );

      await api.post(

        '/skills',

        skillForm,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        },
      );

      alert(
        'Skill Added Successfully',
      );

      setSkillForm({
        title: '',
        description: '',
        level: '',
        phone: '',
      });

      fetchRequests();

    } catch (error) {

      console.log(error);

      alert(
        'Failed to add skill',
      );
    }
  };

  // FETCH USERS
  const fetchUsers = async () => {

    try {

      const token =
        localStorage.getItem(
          'token',
        );

      const res =
        await api.get(

          '/users',

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          },
        );

      setUsers(
        res.data,
      );

    } catch (error) {

      console.log(error);
    }
  };

  // FETCH REQUESTS
  const fetchRequests = async () => {

    try {

      const token =
        localStorage.getItem(
          'token',
        );

      const userId = Number(
        localStorage.getItem(
          'userId',
        ),
      );

      const userRole =
        localStorage.getItem(
          'role',
        );

      const res =
        await api.get(

          '/requests',

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          },
        );

      const allRequests =
        res.data;

      // STUDENT
      if (
        userRole === 'student'
      ) {

        const myRequests =
          allRequests.filter(
            (req: any) =>

              Number(
                req.learner?.id,
              ) ===
              Number(userId),
          );

        setRequests(
          myRequests,
        );
      }

      // MENTOR
      else if (
        userRole === 'mentor'
      ) {

        const mentorRequests =
          allRequests.filter(
            (req: any) => {

              const creatorId =

                typeof req.skill
                  ?.createdBy ===
                'object'

                  ? req.skill
                      ?.createdBy?.id

                  : req.skill
                      ?.createdBy;

              return (
                Number(
                  creatorId,
                ) ===
                Number(userId)
              );
            },
          );

        setRequests(
          mentorRequests,
        );
      }

    } catch (error) {

      console.log(error);

      alert(
        'Failed to fetch requests',
      );
    }
  };

  // UPDATE REQUEST
  const updateRequestStatus =
    async (
      id: number,
      status: string,
    ) => {

      try {

        const token =
          localStorage.getItem(
            'token',
          );

        await api.patch(

          `/requests/${id}`,

          {
            status,
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          },
        );

        alert(
          `Request ${status}`,
        );

        fetchRequests();

      } catch (error) {

        console.log(error);

        alert(
          'Failed to update request',
        );
      }
    };

  // APPROVE USER
  const approveUser = async (
    id: number,
  ) => {

    try {

      const token =
        localStorage.getItem(
          'token',
        );

      await api.patch(

        `/users/approve/${id}`,

        {},

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        },
      );

      alert(
        'User Approved',
      );

      fetchUsers();

    } catch (error) {

      console.log(error);

      alert(
        'Approval Failed',
      );
    }
  };

  // USE EFFECT
  useEffect(() => {

    const userRole =
      localStorage.getItem(
        'role',
      );

    const userStatus =
      localStorage.getItem(
        'status',
      );

    if (!userRole) {

      router.push(
        '/login',
      );

      return;
    }

    if (
      userStatus ===
      'pending'
    ) {

      alert(
        'Wait for admin approval',
      );

      localStorage.clear();

      router.push(
        '/login',
      );

      return;
    }

    setRole(
      userRole,
    );

    if (
      userRole ===
      'admin'
    ) {

      fetchUsers();
    }

    if (
      userRole ===
        'mentor' ||
      userRole ===
        'student'
    ) {

      fetchRequests();
    }

  }, []);

  // LOGOUT
  const logout = () => {

    localStorage.clear();

    router.push(
      '/login',
    );
  };

  return (

    <div className="min-h-screen bg-black/70 text-white">

      {/* NAVBAR */}

      <div className="flex justify-between items-center px-10 py-5 border-b border-gray-700">

        <Link href="/">

          <h1 className="text-2xl font-bold text-purple-500 cursor-pointer">

            SkillBridge

          </h1>

        </Link>

        <div className="flex gap-4">

          <Link href="/dashboard">

            <button className="border border-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300">

              Dashboard

            </button>

          </Link>

          <Link href="/skills">

            <button className="border border-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300">

              Skills

            </button>

          </Link>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 transition duration-300 px-4 py-2 rounded"
          >

            Logout

          </button>

        </div>

      </div>

      {/* MAIN */}

      <div className="p-10">

        <h2 className="text-4xl font-bold mb-6">

          Welcome {role}

        </h2>

        {/* ADMIN */}

        {role === 'admin' && (

          <div className="border border-white p-6 rounded bg-black/60 mb-8">

            <h3 className="text-2xl mb-6">

              Pending User Approvals

            </h3>

            {users.filter(
              (user: any) =>
                user.status === 'pending',
            ).length === 0 && (

              <p className="text-gray-400">

                No pending users

              </p>
            )}

            {users
              .filter(
                (user: any) =>
                  user.status === 'pending',
              )
              .map(
                (user: any) => (

                  <div
                    key={user.id}
                    className="border border-gray-700 p-4 rounded mb-4 flex justify-between items-center"
                  >

                    <div>

                      <p>

                        <strong>
                          Name:
                        </strong>{' '}

                        {user.fullName}

                      </p>

                      <p>

                        <strong>
                          Email:
                        </strong>{' '}

                        {user.email}

                      </p>

                      <p>

                        <strong>
                          Role:
                        </strong>{' '}

                        {user.role}

                      </p>

                    </div>

                    <button
                      onClick={() =>
                        approveUser(
                          user.id,
                        )
                      }
                      className="bg-green-600 hover:bg-green-700 transition duration-300 px-4 py-2 rounded"
                    >

                      Approve

                    </button>

                  </div>
                ),
              )}

          </div>

        )}

        {/* STUDENT */}

        {role === 'student' && (

          <div className="border border-white p-6 rounded bg-black/60 mb-8">

            <h3 className="text-2xl mb-3">

              Student Dashboard

            </h3>

            <p className="mb-6">

              Browse skills and send learning requests.

            </p>

            <div className="border border-white p-4 rounded">

              <div className="flex justify-between items-center mb-4">

                <h3 className="text-2xl">

                  My Learning Requests

                </h3>

                <button
                  onClick={() => {

                    fetchRequests();

                    alert(
                      'Requests Refreshed',
                    );
                  }}
                  className="bg-blue-600 hover:bg-blue-700 transition duration-300 px-4 py-2 rounded"
                >

                  Refresh

                </button>

              </div>

              {requests.length === 0 && (

                <p className="text-gray-400">

                  No learning requests yet

                </p>
              )}

              {requests.map(
                (request: any) => (

                  <div
                    key={request.id}
                    className="border border-gray-700 p-3 rounded mb-3"
                  >

                    <p>

                      <strong>
                        Skill:
                      </strong>{' '}

                      {
                        request.skill
                          ?.title
                      }

                    </p>

                    <p>

                      <strong>
                        Status:
                      </strong>{' '}

                      <span
                        className={`font-bold ${
                          request.status ===
                          'accepted'

                            ? 'text-green-400'

                            : request.status ===
                              'rejected'

                            ? 'text-red-400'

                            : 'text-yellow-400'
                        }`}
                      >

                        {request.status}

                      </span>

                    </p>

                    <p>

                      <strong>
                        Mentor Phone:
                      </strong>{' '}

                      {request.status ===
                      'accepted'

                        ? request.skill
                            ?.phone

                        : '*****'}

                    </p>

                  </div>
                ),
              )}

            </div>

          </div>

        )}

        {/* MENTOR */}

        {role === 'mentor' && (

          <>

            <div className="border border-white p-6 rounded bg-black/60 mb-8">

              <h3 className="text-2xl mb-3">

                Mentor Dashboard

              </h3>

              <p className="mb-6">

                Create skills and manage mentorship sessions.

              </p>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">

                <input
                  type="text"
                  name="title"
                  placeholder="Skill Title"
                  value={skillForm.title}
                  onChange={handleChange}
                  className="border border-white bg-black text-white p-3 rounded"
                />

                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={skillForm.description}
                  onChange={handleChange}
                  className="border border-white bg-black text-white p-3 rounded"
                />

                <input
                  type="text"
                  name="level"
                  placeholder="Level"
                  value={skillForm.level}
                  onChange={handleChange}
                  className="border border-white bg-black text-white p-3 rounded"
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={skillForm.phone}
                  onChange={handleChange}
                  className="border border-white bg-black text-white p-3 rounded"
                />

                <button
                  onClick={addSkill}
                  className="bg-purple-600 hover:bg-purple-700 transition duration-300 px-4 py-3 rounded"
                >

                  Add Skill

                </button>

              </div>

            </div>

            <div className="border border-white p-6 rounded bg-black/60">

              <div className="flex justify-between items-center mb-6">

                <h3 className="text-2xl">

                  Student Requests

                </h3>

                <button
                  onClick={() => {

                    fetchRequests();

                    alert(
                      'Requests Refreshed',
                    );
                  }}
                  className="bg-blue-600 hover:bg-blue-700 transition duration-300 px-4 py-2 rounded"
                >

                  Refresh

                </button>

              </div>

              {requests.length === 0 && (

                <p className="text-gray-400">

                  No requests found

                </p>
              )}

              {requests.map(
                (request: any) => (

                  <div
                    key={request.id}
                    className="border border-gray-700 p-4 rounded mb-4"
                  >

                    <p>

                      <strong>
                        Student:
                      </strong>{' '}

                      {
                        request.learner
                          ?.fullName
                      }

                    </p>

                    <p>

                      <strong>
                        Skill:
                      </strong>{' '}

                      {
                        request.skill
                          ?.title
                      }

                    </p>

                    <p>

                      <strong>
                        Status:
                      </strong>{' '}

                      {request.status}

                    </p>

                    {request.status ===
                      'pending' && (

                      <div className="flex gap-3 mt-4">

                        <button
                          onClick={() =>
                            updateRequestStatus(
                              request.id,
                              'accepted',
                            )
                          }
                          className="bg-green-600 hover:bg-green-700 transition duration-300 px-4 py-2 rounded"
                        >

                          Accept

                        </button>

                        <button
                          onClick={() =>
                            updateRequestStatus(
                              request.id,
                              'rejected',
                            )
                          }
                          className="bg-red-600 hover:bg-red-700 transition duration-300 px-4 py-2 rounded"
                        >

                          Reject

                        </button>

                      </div>
                    )}

                  </div>
                ),
              )}

            </div>

          </>

        )}

      </div>

    </div>
  );
}