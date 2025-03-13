"use client";

import { useState } from "react";

const Skills = () => {
    const [activeTab, setActiveTab] = useState("frontend");

    const skills = {
        frontend: [
            { name: "HTML5", level: 90 },
            { name: "CSS3", level: 85 },
            { name: "JavaScript", level: 90 },
            { name: "TypeScript", level: 85 },
            { name: "React", level: 90 },
            { name: "Next.js", level: 85 },
            { name: "Tailwind CSS", level: 90 },
        ],
        backend: [
            { name: "Node.js", level: 80 },
            { name: "Express", level: 75 },
            { name: "MongoDB", level: 70 },
            { name: "PostgreSQL", level: 65 },
            { name: "GraphQL", level: 60 },
            { name: "REST API", level: 85 },
        ],
        tools: [
            { name: "Git", level: 85 },
            { name: "GitHub", level: 85 },
            { name: "VS Code", level: 90 },
            { name: "Figma", level: 75 },
            { name: "Docker", level: 60 },
            { name: "Jest", level: 70 },
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
                        I&apos;ve worked with a variety of technologies and tools throughout
                        my career. Here&apos;s a snapshot of my technical skills.
                    </p>
                </div>

                <div className="mt-12">
                    {/* Tabs */}
                    <div className="flex justify-center border-b border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => setActiveTab("frontend")}
                            className={`px-6 py-3 text-base font-medium ${activeTab === "frontend"
                                    ? "border-b-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                }`}
                        >
                            Frontend
                        </button>
                        <button
                            onClick={() => setActiveTab("backend")}
                            className={`px-6 py-3 text-base font-medium ${activeTab === "backend"
                                    ? "border-b-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                }`}
                        >
                            Backend
                        </button>
                        <button
                            onClick={() => setActiveTab("tools")}
                            className={`px-6 py-3 text-base font-medium ${activeTab === "tools"
                                    ? "border-b-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                }`}
                        >
                            Tools
                        </button>
                    </div>

                    {/* Skill bars */}
                    <div className="mt-8 grid gap-6">
                        {skills[activeTab].map((skill) => (
                            <div key={skill.name}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                                        {skill.name}
                                    </span>
                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        {skill.level}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div
                                        className="bg-indigo-600 dark:bg-indigo-400 h-2.5 rounded-full"
                                        style={{ width: `${skill.level}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills; 