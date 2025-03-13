"use client";

// Simple client-side authentication system for admin routes
// In a real application, you would use a more secure authentication system

// Admin credentials (in a real app, these would be stored securely)
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123"; // This is just for demo purposes

// Store auth state in localStorage
const AUTH_KEY = "portfolio_auth";

// Check if user is logged in
export function isLoggedIn() {
  if (typeof window === "undefined") return false;

  const auth = localStorage.getItem(AUTH_KEY);
  if (!auth) return false;

  try {
    const { expires } = JSON.parse(auth);
    return new Date().getTime() < expires;
  } catch {
    return false;
  }
}

// Login function
export function login(email, password) {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // Set auth in localStorage with expiration (24 hours)
    const expires = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email, expires }));
    return true;
  }
  return false;
}

// Logout function
export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
}

// Get current user
export function getCurrentUser() {
  if (!isLoggedIn()) return null;

  try {
    const auth = localStorage.getItem(AUTH_KEY);
    if (!auth) return null;

    const { email } = JSON.parse(auth);
    return { email };
  } catch {
    return null;
  }
}
