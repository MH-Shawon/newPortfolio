"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/data/auth";

export default function AdminLogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Perform logout
    logout();

    // Redirect to login page
    router.push("/admin/login");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Logging out...
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          You are being redirected to the login page.
        </p>
      </div>
    </div>
  );
}
