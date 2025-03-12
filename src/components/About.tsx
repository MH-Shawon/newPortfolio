"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getProfile } from "@/data/profile";

const About = () => {
  const [profile, setProfile] = useState(getProfile());

  return (
    <section id="about" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
            About Me
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Who I Am
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            {profile.bio}
          </p>
        </div>

        <div className="mt-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative">
              <div className="relative lg:h-80 h-64 rounded-lg shadow-xl overflow-hidden">
                <Image
                  src={profile.image}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                My Journey
              </h3>
              <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
                I started my journey in web development several years ago,
                driven by a passion for creating digital experiences that are
                both beautiful and functional. With a background in design and a
                love for problem-solving, I bring a unique perspective to every
                project.
              </p>
              <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
                I specialize in building responsive, user-friendly websites and
                applications using modern technologies like React, Next.js, and
                Tailwind CSS. My goal is to create digital solutions that not
                only meet but exceed client expectations.
              </p>
              <div className="mt-8">
                <div className="flex items-center">
                  <h4 className="flex-shrink-0 pr-4 text-sm tracking-wider font-semibold uppercase text-indigo-600 dark:text-indigo-400">
                    What I bring to the table
                  </h4>
                  <div className="flex-1 border-t-2 border-gray-200 dark:border-gray-700"></div>
                </div>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-500 dark:text-gray-400">
                      Creative problem-solving skills
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-500 dark:text-gray-400">
                      Strong attention to detail
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-500 dark:text-gray-400">
                      Passion for clean, efficient code
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
