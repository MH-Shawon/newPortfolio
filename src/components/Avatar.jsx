import React from "react";

const Avatar = ({
  name,
  size = "md",
  color = "indigo",
}) => {
  // Get initials from name
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  // Size classes
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
  };

  // Color classes
  const colorClasses = {
    indigo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    purple: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    pink: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    gray: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full font-medium ${sizeClasses[size] || sizeClasses.md
        } ${colorClasses[color] || colorClasses.indigo}`}
    >
      {initials}
    </div>
  );
};

export default Avatar;
