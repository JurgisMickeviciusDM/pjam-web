import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifyToken } from "@/lib/session";

function redirectToLogin(loginPath: string, from: string, req: NextRequest) {
  const url = new URL(loginPath, req.url);
  url.searchParams.set("next", from);
  return NextResponse.redirect(url);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const user = await verifyToken(token);

  const isAdminArea = pathname.startsWith("/admin");
  const isPortalArea = pathname.startsWith("/portal");
  const isAdminLogin = pathname === "/admin/login";
  const isPortalLogin = pathname === "/portal/login";

  // Already-authenticated users skip the login screens.
  if (isAdminLogin && user?.role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  if (isPortalLogin && user) {
    return NextResponse.redirect(new URL("/portal", req.url));
  }

  // Admin area requires an ADMIN session.
  if (isAdminArea && !isAdminLogin) {
    if (!user || user.role !== "ADMIN") {
      return redirectToLogin("/admin/login", pathname, req);
    }
  }

  // Portal area requires any authenticated user.
  if (isPortalArea && !isPortalLogin) {
    if (!user) {
      return redirectToLogin("/portal/login", pathname, req);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*"],
};
