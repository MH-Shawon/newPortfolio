"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getProfile } from "@/data/profile";
import AnimatedHeader from "./AnimatedHeader";
import { motion } from "framer-motion";

const About = () => {
  const [profile, setProfile] = useState(getProfile());

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedHeader
          subtitle="About Me"
          title="Who I Am"
          description={profile.bio}
        />

        <motion.div
          className="mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <motion.div
              className="relative"
              variants={itemVariants}
            >
              <div className="relative lg:h-80 h-64 rounded-lg shadow-xl overflow-hidden">
                <Image
                  src={profile.image}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
            <motion.div
              className="mt-10 lg:mt-0"
              variants={itemVariants}
            >
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
              <motion.div
                className="mt-8"
                variants={itemVariants}
              >
                <div className="flex items-center">
                  <h4 className="flex-shrink-0 pr-4 text-sm tracking-wider font-semibold uppercase text-indigo-600 dark:text-indigo-400">
                    What I bring to the table
                  </h4>
                  <div className="flex-1 border-t-2 border-gray-200 dark:border-gray-700"></div>
                </div>
                <ul className="mt-4 space-y-3">
                  {[
                    "Creative problem-solving skills",
                    "Strong attention to detail",
                    "Passion for clean, efficient code"
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      variants={itemVariants}
                    >
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
                        {item}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
