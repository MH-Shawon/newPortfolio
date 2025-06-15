"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import AnimatedHeader from "./AnimatedHeader";
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
    SiJest,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

const Skills = () => {
    const [activeTab, setActiveTab] = useState("frontend");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

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
            { name: "Express.js", level: 80, icon: SiExpress, color: "#000000" },
            { name: "MongoDB", level: 75, icon: SiMongodb, color: "#47A248" },
            { name: "PostgreSQL", level: 70, icon: SiPostgresql, color: "#336791" },
            { name: "GraphQL", level: 65, icon: SiGraphql, color: "#E10098" },
            { name: "REST API", level: 80, icon: TbApi, color: "#4A90E2" },
        ],
        tools: [
            { name: "Git", level: 85, icon: FaGitAlt, color: "#F05032" },
            { name: "GitHub", level: 85, icon: FaGithub, color: "#181717" },
            { name: "VS Code", level: 90, icon: VscVscode, color: "#007ACC" },
            { name: "Figma", level: 90, icon: FaFigma, color: "#F24E1E" },
            { name: "Docker", level: 60, icon: FaDocker, color: "#2496ED" },
            { name: "Jest", level: 70, icon: SiJest, color: "#C21325" },
        ],
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const tabsVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: 0.2,
                ease: "easeOut"
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.4
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
        <section id="skills" className="py-16 bg-white dark:bg-gray-950" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={headerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <AnimatedHeader
                        subtitle="Skills"
                        title="My Technical Expertise"
                        description="I've worked with a variety of technologies and tools throughout my career. Here's a snapshot of my technical skills."
                    />
                </motion.div>

                {/* Tabs - Animated Version */}
                <motion.div
                    variants={tabsVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="mt-8 flex justify-center space-x-4 border-b border-gray-700"
                >
                    {["frontend", "backend", "tools"].map((tab) => (
                        <motion.button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            whileHover={{ scale: 1.08, color: "#818cf8" }}
                            whileTap={{ scale: 0.96 }}
                            animate={activeTab === tab ? { scale: 1.12, color: "#6366f1" } : { scale: 1, color: "#9ca3af" }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className={`px-4 py-2 rounded-none text-base font-medium transition-colors border-b-2 ${activeTab === tab
                                    ? "border-indigo-500"
                                    : "border-transparent hover:text-indigo-300"
                                }`}
                            style={{ background: "none", outline: "none", border: "none" }}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Skills Grid - Animated Version */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {skills[activeTab] && skills[activeTab].length > 0 ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                className="contents"
                            >
                                {skills[activeTab].map((skill, idx) => {
                                    const Icon = skill.icon;
                                    if (!Icon) return null;
                                    return (
                                        <motion.div
                                            key={skill.name}
                                            variants={itemVariants}
                                            className="p-6 bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                                        >
                                            <div className="flex items-center space-x-4 mb-4">
                                                <div
                                                    className="p-3 rounded-lg"
                                                    style={{ backgroundColor: `${skill.color}20` }}
                                                >
                                                    <Icon className="w-6 h-6" style={{ color: skill.color }} />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-medium text-gray-100">
                                                        {skill.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-400">
                                                        Proficiency: {skill.level}%
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <motion.div
                                                    className="h-2 rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                                                    transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                                                    style={{ backgroundColor: skill.color }}
                                                />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        ) : (
                            <div className="col-span-full text-center text-gray-400 py-8">
                                No skills found for this category.
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Skills;