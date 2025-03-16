"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { isLoggedIn } from "@/data/auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is logged in
    setIsUserLoggedIn(isLoggedIn());
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname.startsWith(path);
  };

  const linkStyles = (path) => {
    const baseStyles = "transition-colors";
    const desktopStyles = isActive(path)
      ? "text-indigo-600 dark:text-indigo-400 font-semibold"
      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white";
    return `${baseStyles} ${desktopStyles}`;
  };

  const mobileLinkStyles = (path) => {
    const baseStyles = "block px-3 py-2 rounded-md text-base font-medium transition-colors";
    const mobileStyles = isActive(path)
      ? "text-indigo-600 dark:text-indigo-400 bg-gray-50 dark:bg-gray-800 font-semibold"
      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800";
    return `${baseStyles} ${mobileStyles}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              MH.
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={linkStyles("/")}>
              Home
            </Link>
            <Link href="/about" className={linkStyles("/about")}>
              About
            </Link>
            <Link href="/skills" className={linkStyles("/skills")}>
              Skills
            </Link>
            <Link href="/projects" className={linkStyles("/projects")}>
              Projects
            </Link>
            <Link href="/resume" className={linkStyles("/resume")}>
              Resume
            </Link>
            <Link href="/contact" className={linkStyles("/contact")}>
              Contact
            </Link>
            {isUserLoggedIn ? (
              <Link href="/admin" className={linkStyles("/admin")}>
                Admin
              </Link>
            ) : (
              <Link href="/admin/login" className={linkStyles("/admin/login")}>
                
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-black">
            <Link href="/" className={mobileLinkStyles("/")}>
              Home
            </Link>
            <Link href="/about" className={mobileLinkStyles("/about")}>
              About
            </Link>
            <Link href="/skills" className={mobileLinkStyles("/skills")}>
              Skills
            </Link>
            <Link href="/projects" className={mobileLinkStyles("/projects")}>
              Projects
            </Link>
            <Link href="/resume" className={mobileLinkStyles("/resume")}>
              Resume
            </Link>
            <Link href="/contact" className={mobileLinkStyles("/contact")}>
              Contact
            </Link>
            {isUserLoggedIn ? (
              <Link href="/admin" className={mobileLinkStyles("/admin")}>
                Admin
              </Link>
            ) : (
              <Link href="/admin/login" className={mobileLinkStyles("/admin/login")}>
                
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
