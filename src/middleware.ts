import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose/jwt/verify";

// Define which routes should be protected and which should be public
const protectedRoutes = ["/dummy"];
const publicRoutes = ["/dashboard/login", "/dashboard/register", "/"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // First check if the route is in public routes
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Then check if it's a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Get the token from the cookies
    const accessToken = request.cookies.get("accessToken")?.value;
    console.log("fetched access token: ", accessToken);

    if (!accessToken) {
      // If there's no token, redirect to login page
      const loginUrl = new URL("/dashboard/login", request.url);
      // Add the current path as a redirect parameter
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Verify the JWT token
      await jwtVerify(
        accessToken,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY)
      );

      // If token is valid, allow the request to proceed
      console.log("Token is valid");
      return NextResponse.next();
    } catch (error) {
      console.log(error)
      // If token is invalid, redirect to login
      console.error("Token is invalid");
      const loginUrl = new URL("/dashboard/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // For non-protected routes, allow the request to proceed
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    // Match all dashboard routes
    "/dashboard/:path*",
  ],
};
