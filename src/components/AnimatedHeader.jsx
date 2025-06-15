"use client";

import { motion } from "framer-motion";

const AnimatedHeader = ({
    subtitle,
    title,
    description,
    subtitleColor = "text-indigo-600 dark:text-indigo-400",
    titleColor = "text-gray-900 dark:text-white",
    descriptionColor = "text-gray-500 dark:text-gray-400",
    className = ""
}) => {
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
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={`lg:text-center ${className}`}
        >
            {subtitle && (
                <motion.h2
                    variants={itemVariants}
                    className={`text-base font-semibold tracking-wide uppercase ${subtitleColor}`}
                >
                    {subtitle}
                </motion.h2>
            )}
            {title && (
                <motion.p
                    variants={itemVariants}
                    className={`mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl ${titleColor}`}
                >
                    {title}
                </motion.p>
            )}
            {description && (
                <motion.p
                    variants={itemVariants}
                    className={`mt-4 max-w-2xl text-xl lg:mx-auto ${descriptionColor}`}
                >
                    {description}
                </motion.p>
            )}
        </motion.div>
    );
};

export default AnimatedHeader; 