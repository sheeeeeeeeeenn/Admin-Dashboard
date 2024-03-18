import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authMiddleware } from "@clerk/nextjs";

function handleCORS(request: NextRequest) {
  // Create a response object to manipulate headers for CORS
  const response = NextResponse.next();

  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*'); // Adjust according to your needs
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // If it's an OPTIONS request, respond early with the CORS headers
  if (request.method === 'OPTIONS') {
    return response;
  }

  // For non-OPTIONS requests, return null to indicate no early response is needed
  return null;
}

export function middleware(request: NextRequest) {
  // First, handle CORS
  const corsResult = handleCORS(request);
  if (corsResult) return corsResult;

  // Proceed with Clerk's auth middleware for authentication handling
  // Note: You don't call Clerk's middleware here directly; it's configured elsewhere (e.g., in _middleware.ts)
  // This example assumes that authMiddleware is correctly configured as per Clerk documentation

  // If no early response was needed from CORS handling, proceed as usual
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
