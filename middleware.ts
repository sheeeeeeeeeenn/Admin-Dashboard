import { NextResponse } from 'next/server';
import { authMiddleware } from "@clerk/nextjs";

// Custom function to set CORS headers
function setCORSHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', '*'); // Adjust according to your needs
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

// Wrap the authMiddleware to include CORS handling
const customMiddleware = (request) => {
  const response = NextResponse.next();
  // Set CORS headers
  const corsResponse = setCORSHeaders(response);

  // Now proceed with Clerk's auth middleware
  return authMiddleware({
    publicRoutes: ["/api/:path*"],
    ignoredRoutes: ['/no-auth-in-this-route'],
  })(request, corsResponse);
};

export default customMiddleware;

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
