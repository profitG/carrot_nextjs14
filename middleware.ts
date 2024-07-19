import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";
import { redirect } from "next/navigation";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrl: Routes = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
  "/github/start": true,
  "/github/complete": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrl[request.nextUrl.pathname];
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }
}

export const config = {
  matcher: ["/", "/profile", "/create-account"],
};
