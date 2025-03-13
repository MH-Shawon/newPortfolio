import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === "/admin/login";

  // Check if the path starts with /admin and is not a public path
  const isAdminPath = path.startsWith("/admin") && !isPublicPath;

  // Note: We can't check localStorage here since middleware runs on the server
  // Client-side auth will be handled by the components themselves
  // This middleware will just handle redirects for unauthenticated requests to protected routes

  // If it's an admin path and not the login page, proceed to the requested page
  // The actual auth check will happen in the client components
  if (isAdminPath) {
    // Allow the request to proceed, but the client-side auth will handle protection
    return NextResponse.next();
  }

  // For non-admin paths or public paths, just proceed normally
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*"],
};
