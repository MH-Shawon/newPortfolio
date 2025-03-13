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

  // For now, we'll allow all requests to proceed
  // The actual auth check will happen in the client components
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*"],
};
