import { SignJWT, jwtVerify } from "jose";

/**
 * Edge-safe session helpers (no next/headers, no node crypto).
 * Used by both server code and the middleware.
 */

export const SESSION_COOKIE = "pj_session";

export type Role = "ADMIN" | "CLIENT";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    // Fallback keeps local dev working before .env is filled in.
    return new TextEncoder().encode(
      "pj-development-secret-change-me-in-production-please",
    );
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(user: SessionUser): Promise<string> {
  return new SignJWT({ email: user.email, name: user.name, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyToken(
  token: string | undefined | null,
): Promise<SessionUser | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (!payload.sub) return null;
    return {
      id: payload.sub,
      email: String(payload.email ?? ""),
      name: String(payload.name ?? ""),
      role: (payload.role as Role) ?? "CLIENT",
    };
  } catch {
    return null;
  }
}
