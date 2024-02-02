import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login");

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return null;
    }

    if (!isAuth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|logo.png|favicon.ico).*)"],
};
