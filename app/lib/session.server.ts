import { createCookieSessionStorage } from "@remix-run/node";

// This is a temporary secret for development.
// In a production environment, you should use a strong, randomly generated secret
// stored securely (e.g., in environment variables).
const sessionSecret = process.env.SESSION_SECRET || "super-secret-dev-key";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
