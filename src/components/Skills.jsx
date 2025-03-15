"use client";

import { useState } from "react";
import {
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaReact,
    FaNodeJs,
    FaGitAlt,
    FaGithub,
    FaDocker,
    FaFigma,
} from "react-icons/fa";
import {
    SiTypescript,
    SiNextdotjs,
    SiTailwindcss,
    SiExpress,
    SiMongodb,
    SiPostgresql,
    SiGraphql,
    SiVisualstudiocode,
    SiJest,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

const Skills = () => {
    const [activeTab, setActiveTab] = useState("frontend");

    const skills = {
        frontend: [
            { name: "HTML5", level: 90, icon: FaHtml5, color: "#E34F26" },
            { name: "CSS3", level: 85, icon: FaCss3Alt, color: "#1572B6" },
            { name: "JavaScript", level: 90, icon: FaJs, color: "#F7DF1E" },
            { name: "TypeScript", level: 85, icon: SiTypescript, color: "#3178C6" },
            { name: "React", level: 90, icon: FaReact, color: "#61DAFB" },
            { name: "Next.js", level: 85, icon: SiNextdotjs, color: "#000000" },
            { name: "Tailwind CSS", level: 90, icon: SiTailwindcss, color: "#06B6D4" },
        ],
        backend: [
            { name: "Node.js", level: 80, icon: FaNodeJs, color: "#339933" },
            { name: "Express", level: 75, icon: SiExpress, color: "#000000" },
            { name: "MongoDB", level: 70, icon: SiMongodb, color: "#47A248" },
            { name: "PostgreSQL", level: 65, icon: SiPostgresql, color: "#4169E1" },
            { name: "GraphQL", level: 60, icon: SiGraphql, color: "#E10098" },
            { name: "REST API", level: 85, icon: TbApi, color: "#FF6B6B" },
        ],
        tools: [
            { name: "Git", level: 85, icon: FaGitAlt, color: "#F05032" },
            { name: "GitHub", level: 85, icon: FaGithub, color: "#181717" },
            { name: "VS Code", level: 90, icon: SiVisualstudiocode, color: "#007ACC" },
            { name: "Figma", level: 75, icon: FaFigma, color: "#F24E1E" },
            { name: "Docker", level: 60, icon: FaDocker, color: "#2496ED" },
            { name: "Jest", level: 70, icon: SiJest, color: "#C21325" },
        ],
    };

    return (
        <section id="skills" className="py-16 bg-white dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
                        Skills
                    </h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        My Technical Expertise
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
                        I&apos;ve worked with a variety of technologies and tools throughout my
                        career. Here&apos;s a snapshot of my technical skills.
                    </p>
                </div>

                <div className="mt-12">
                    {/* Tabs */}
                    <div className="flex justify-center border-b border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => setActiveTab("frontend")}
                            className={`px-6 py-3 text-base font-medium ${
                                activeTab === "frontend"
                                    ? "border-b-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            }`}
                        >
                            Frontend
                        </button>
                        <button
                            onClick={() => setActiveTab("backend")}
                            className={`px-6 py-3 text-base font-medium ${
                                activeTab === "backend"
                                    ? "border-b-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            }`}
                        >
                            Backend
                        </button>
                        <button
                            onClick={() => setActiveTab("tools")}
                            className={`px-6 py-3 text-base font-medium ${
                                activeTab === "tools"
                                    ? "border-b-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            }`}
                        >
                            Tools
                        </button>
                    </div>

                    {/* Skills Grid */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skills[activeTab].map((skill) => {
                            const Icon = skill.icon;
                            if (!Icon) return null; // Add a check for undefined icons
                            return (
                                <div
                                    key={skill.name}
                                    className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                                >
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div
                                            className="p-3 rounded-lg"
                                            style={{ backgroundColor: `${skill.color}20` }}
                                        >
                                            <Icon
                                                className="w-6 h-6"
                                                style={{ color: skill.color }}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                {skill.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Proficiency: {skill.level}%
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div
                                            className="h-2 rounded-full"
                                            style={{
                                                width: `${skill.level}%`,
                                                backgroundColor: skill.color,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;