import React from "react";

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
}

const Avatar: React.FC<AvatarProps> = ({
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
    md: "h-12 w-12 text-sm",
    lg: "h-16 w-16 text-lg",
    xl: "h-24 w-24 text-xl",
  };

  // Color classes
  const colorClasses = {
    indigo: "bg-indigo-600 text-white",
    blue: "bg-blue-600 text-white",
    green: "bg-green-600 text-white",
    red: "bg-red-600 text-white",
    purple: "bg-purple-600 text-white",
    pink: "bg-pink-600 text-white",
    yellow: "bg-yellow-500 text-white",
    gray: "bg-gray-600 text-white",
  };

  return (
    <div
      className={`${sizeClasses[size]} ${
        colorClasses[color as keyof typeof colorClasses]
      } rounded-full flex items-center justify-center font-medium`}
      aria-label={`Avatar for ${name}`}
    >
      {initials}
    </div>
  );
};

export default Avatar;
