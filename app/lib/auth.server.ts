import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { createClient } from "@supabase/supabase-js";
import type { AuthSession, SignInCredentials } from "~/types/auth";
import type { UserProfile } from "~/types/user";
import { getSession, commitSession } from "~/lib/session.server";
import supabaseAdmin from "~/lib/supabase-admin.server"; // Updated import path

// Initialize Supabase client for client-side (browser) and server-side (loaders/actions)
// This client uses the anon key and is safe to be exposed.
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Helper to get the Supabase session from the request
export async function getAuthSession(request: Request): Promise<AuthSession | null> {
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("access_token");
  const refreshToken = session.get("refresh_token");

  if (!accessToken || !refreshToken) {
    return null;
  }

  // Verify the session with Supabase
  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error) {
    console.error("Error setting session from cookie:", error);
    // Clear invalid session
    const newSession = await getSession(request.headers.get("Cookie"));
    newSession.unset("access_token");
    newSession.unset("refresh_token");
    throw redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(newSession),
      },
    });
  }

  return data.session;
}

// Sign in user
export async function signIn(
  request: Request,
  { email, password }: SignInCredentials
) {
  const session = await getSession(request.headers.get("Cookie"));
  const headers = new Headers();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Sign in error:", error);
    return { data: null, error: error.message, headers };
  }

  if (data.session) {
    session.set("access_token", data.session.access_token);
    session.set("refresh_token", data.session.refresh_token);
    headers.append("Set-Cookie", await commitSession(session));
  }

  return { data, error: null, headers };
}

// Sign out user
export async function signOut(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const headers = new Headers();

  // Invalidate session on Supabase
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out from Supabase:", error);
  }

  // Clear session cookie
  session.unset("access_token");
  session.unset("refresh_token");
  headers.append("Set-Cookie", await commitSession(session));

  return redirect("/login", { headers });
}

// Get user profile from database using admin client
export async function getUserProfile(request: Request): Promise<{ userProfile: UserProfile | null, headers: Headers }> {
  const session = await getAuthSession(request);
  const headers = new Headers();

  if (!session || !session.user) {
    return { userProfile: null, headers };
  }

  try {
    // Use the admin client to fetch the user's profile
    const { data: userProfile, error } = await supabaseAdmin
      .from("user_profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (error) {
      console.error("Error fetching user profile with admin client:", error);
      // If profile not found or error, consider signing out or redirecting
      if (error.code === "PGRST116") { // No rows found
        console.warn(`User profile not found for ID: ${session.user.id}. Signing out.`);
        // Optionally sign out if profile is missing
        // await signOut(request); // This would cause a redirect loop if called here
        // Instead, let the root loader handle the redirect if userProfile is null
      }
      return { userProfile: null, headers };
    }

    return { userProfile, headers };
  } catch (e) {
    console.error("Exception fetching user profile with admin client:", e);
    return { userProfile: null, headers };
  }
}
