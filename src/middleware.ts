import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware function to handle authentication and authorization
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define public paths
    const isPublicPath = ["/login", "/signup", "/", "/about", "/services", "/contact"].includes(path);

    // Extract token and role from cookies
    const token = request.cookies.get("token")?.value || "";
    const role = request.cookies.get("role")?.value || "";

    // Handle authenticated users accessing public paths
    if (isPublicPath && token) {
        if (role === "admin") {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        } else if (role === "pantry") {
            return NextResponse.redirect(new URL('/dashboard/pantry', request.url));
        } else if (role === "delivery") {
            return NextResponse.redirect(new URL('/dashboard/delivery', request.url));
        } else {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Handle unauthenticated access to private paths
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Role-based access control for private paths
    if (path.startsWith("/dashboard") && role !== "admin" && path === "/dashboard") {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    if (path.startsWith("/dashboard/pantry") && role !== "pantry") {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    if (path.startsWith("/dashboard/delivery") && role !== "delivery") {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Allow access if all checks pass
    return NextResponse.next();
}

// Middleware configuration
export const config = {
    matcher: [
        "/",
        "/login",
        "/signup",
        "/dashboard",
        "/dashboard/pantry",
        "/dashboard/delivery",
        "/about",
        "/services",
        "/contact",
    ],
};
