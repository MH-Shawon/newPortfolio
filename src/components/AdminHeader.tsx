"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md mb-8 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex space-x-4 overflow-x-auto pb-1">
            <Link
              href="/admin"
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                isActive("/admin")
                  ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
              }`}
            >
              Add Project
            </Link>
            <Link
              href="/admin/projects"
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                isActive("/admin/projects")
                  ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
              }`}
            >
              Manage Projects
            </Link>
            <Link
              href="/admin/profile"
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                isActive("/admin/profile")
                  ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
              }`}
            >
              Profile Settings
            </Link>
            <Link
              href="/admin/resume"
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                isActive("/admin/resume")
                  ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
              }`}
            >
              Resume
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-medium"
            >
              Back to Site
            </Link>
            <Link
              href="/admin/logout"
              className="px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
