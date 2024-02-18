import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export const config = {
    matcher: ["/:path*"],
  };
export default withAuth(
  function middleware(req) {
    const pathName = req.nextUrl.pathname;
    const response = NextResponse.next();

    if (!pathName.includes("/auth")) {
      if (!req.nextauth.token?.token) {
        return NextResponse.redirect(new URL("/auth", req.url));
      } 
    } else {
      if (req.nextauth.token) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    if (req.nextauth.token?.token) {
      response.cookies.set("token", req.nextauth.token.token + "");
    } else {
      response.cookies.delete("token");
    }
    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token === null) {
          return true;
        }
        return !!token;
      },
    },
    pages: {
      signIn: "/auth",
      signOut: "/auth/signout",
    },
  }
);
