'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import api from '@/lib/api';

export default function SkillsPage() {

  const [skills, setSkills] =
    useState([]);

  const [role, setRole] =
    useState('');

  const [requests, setRequests] =
    useState([]);

  const [currentUser, setCurrentUser] =
    useState<any>(null);

  useEffect(() => {

    fetchSkills();

    fetchRequests();

    const userRole =
      localStorage.getItem(
        'role',
      );

    const userId =
      localStorage.getItem(
        'userId',
      );

    setRole(
      userRole || '',
    );

    setCurrentUser(
      userId,
    );

  }, []);

  // FETCH SKILLS
  const fetchSkills = async () => {

    try {

      const res = await api.get(
        '/skills',
      );

      setSkills(
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

      const res = await api.get(

        '/requests',

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        },
      );

      setRequests(
        res.data,
      );

    } catch (error) {

      console.log(error);
    }
  };

  // REQUEST LEARNING
  const requestLearning = async (
    skillId: number,
  ) => {

    try {

      const token =
        localStorage.getItem(
          'token',
        );

      await api.post(

  '/requests',

  {
    message:
      'I want to learn this skill',

    phone:
      '01700000000',

    skill:
      skillId,

    userId:
      Number(currentUser),
  },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        },
      );

      alert(
        'Request Sent Successfully',
      );

      fetchRequests();

    } catch (error) {

      console.log(error);

      alert(
        'Failed to send request',
      );
    }
  };

  // DELETE SKILL
  const deleteSkill = async (
    id: number,
  ) => {

    try {

      const token =
        localStorage.getItem(
          'token',
        );

      await api.delete(

        `/skills/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        },
      );

      alert(
        'Skill Deleted',
      );

      fetchSkills();

    } catch (error) {

      console.log(error);

      alert(
        'Delete Failed',
      );
    }
  };

  // EDIT SKILL
  const editSkill = async (
    skill: any,
  ) => {

    const title =
      prompt(
        'Enter new title',
        skill.title,
      );

    const description =
      prompt(
        'Enter new description',
        skill.description,
      );

    const level =
      prompt(
        'Enter new level',
        skill.level,
      );

    const phone =
      prompt(
        'Enter phone number',
        skill.phone,
      );

    if (
      !title ||
      !description ||
      !level ||
      !phone
    ) {

      return;
    }

    try {

      const token =
        localStorage.getItem(
          'token',
        );

      await api.patch(

        `/skills/${skill.id}`,

        {
          title,
          description,
          level,
          phone,
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        },
      );

      alert(
        'Skill Updated',
      );

      fetchSkills();

    } catch (error) {

      console.log(error);

      alert(
        'Update Failed',
      );
    }
  };

  return (

    <div className="min-h-screen bg-black text-white">

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

        </div>

      </div>

      {/* SKILLS */}

      <div className="p-10">

        <h1 className="text-5xl font-bold mb-10">

          Skills

        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {skills.map((skill: any) => {

            const acceptedRequest: any =
              requests.find(
                (request: any) =>

                  Number(
                    request.skill?.id,
                  ) ===
                    Number(skill.id)

                  &&

                  Number(
                    request.learner?.id,
                  ) ===
                    Number(
                      currentUser,
                    )

                  &&

                  request.status ===
                    'accepted',
              );

            const alreadyRequested: any =
              requests.find(
                (request: any) =>

                  Number(
                    request.skill?.id,
                  ) ===
                    Number(skill.id)

                  &&

                  Number(
                    request.learner?.id,
                  ) ===
                    Number(
                      currentUser,
                    ),
              );

            return (

              <div
                key={skill.id}
                className="border border-white p-6 rounded"
              >

                <h2 className="text-3xl font-bold mb-3">

                  {skill.title}

                </h2>

                <p className="mb-3">

                  {skill.description}

                </p>

                <p className="mb-3 text-gray-300">

                  Level: {skill.level}

                </p>

                <p className="text-purple-400 mb-2">

                  Mentor:{' '}

                  {
                    skill.createdBy
                      ?.fullName
                  }

                </p>

                {/* PHONE */}

                <p className="text-green-400 mb-4">

                  Mentor Contact:{' '}

                  {acceptedRequest
                    ? skill.phone
                    : '*****'}

                </p>

                {/* STUDENT */}

                {role === 'student' && (

                  <div>

                    {alreadyRequested ? (

                      <button
                        disabled
                        className={`px-4 py-2 rounded text-white ${
                          alreadyRequested.status ===
                          'accepted'

                            ? 'bg-green-600'

                            : alreadyRequested.status ===
                              'rejected'

                            ? 'bg-red-600'

                            : 'bg-yellow-600'
                        }`}
                      >

                        {alreadyRequested.status ===
                        'accepted'

                          ? 'Approved'

                          : alreadyRequested.status ===
                            'rejected'

                          ? 'Rejected'

                          : 'Request Sent'}

                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          requestLearning(
                            skill.id,
                          )
                        }
                        className="bg-blue-600 hover:bg-blue-700 transition duration-300 px-4 py-2 rounded"
                      >

                        Request Learning

                      </button>

                    )}

                  </div>

                )}

                {/* MENTOR */}

                {role === 'mentor' &&

                Number(
                  skill.createdBy?.id,
                ) ===
                  Number(
                    currentUser,
                  ) && (

                  <div className="flex gap-3 mt-4">

                    <button
                      onClick={() =>
                        editSkill(
                          skill,
                        )
                      }
                      className="bg-yellow-600 hover:bg-yellow-700 transition duration-300 px-4 py-2 rounded"
                    >

                      Edit

                    </button>

                    <button
                      onClick={() =>
                        deleteSkill(
                          skill.id,
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 transition duration-300 px-4 py-2 rounded"
                    >

                      Delete

                    </button>

                  </div>

                )}

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}