import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useEffect } from "react";
import { Header } from "~/components/Header";
import { getAuthSession, getUserProfile } from "~/lib/auth.server"; // Import new auth functions
import { getSession, commitSession } from "~/lib/session.server"; // Import session functions
import type { UserProfile } from "~/types/user";
import { useStore } from "~/store/store";
import type { User as AdminUser, UserRole } from "~/types/admin";
import { getBrowserEnvironment } from "~/lib/supabase"; // Import getBrowserEnvironment

import "./tailwind.css";

// Export AppUser as an alias for UserProfile for clarity in child routes
export type AppUser = UserProfile;

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  console.log("--- [Server Loader - root] ROOT LOADER CALLED ---");

  let userProfile: UserProfile | null = null;
  let sessionData: any | null = null; // Variable to hold session data
  let error: string | null = null;
  const headers = new Headers();
  const url = new URL(request.url);
  const pathname = url.pathname;

  const publicPaths = ["/login", "/signup", "/reset-password"]; // Define public paths
  const isPublicPath = publicPaths.includes(pathname);

  try {
    const session = await getAuthSession(request); // This gets the Supabase session

    if (!session) {
      // If no Supabase session, and not on a public path, redirect to login
      if (!isPublicPath) {
        console.log("[Server Loader - root] No Supabase session found and not a public path. Redirecting to /login.");
        throw redirect("/login", { headers });
      }
      console.log("[Server Loader - root] No Supabase session found. Current path is public or user is not logged in.");
    } else {
      // If session exists, try to get user profile
      const { userProfile: fetchedProfile, headers: profileHeaders } = await getUserProfile(request);
      userProfile = fetchedProfile;
      profileHeaders.forEach((value, key) => headers.append(key, value)); // Append any headers from getUserProfile

      // Extract session data to pass to client
      sessionData = {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_in: session.expires_in,
        user: session.user, // Include the user object from the session if needed
      };
      console.log("[Server Loader - root] Supabase session data extracted for client:", sessionData);


      if (!userProfile && !isPublicPath) {
        // This case should ideally not happen if session exists and is valid,
        // but as a fallback, if profile can't be fetched, redirect to login.
        console.log("[Server Loader - root] User profile not found for session and not a public path. Redirecting to /login.");
        throw redirect("/login", { headers });
      }
      if (userProfile) {
        console.log("[Server Loader - root] UserProfile fetched:", userProfile.id);
      }
    }

  } catch (err: any) {
    if (err instanceof Response && err.status === 302) {
      // This is a redirect response, re-throw it
      throw err;
    }
    console.error("[Server Loader - root] UNEXPECTED error caught during loader execution:", err);
    error = `Root loader failed: ${err.message || "An unknown error occurred"}`;
    userProfile = null;
  }

  // Commit any session changes (e.g., if session was updated by auth.server.ts)
  const session = await getSession(request.headers.get("Cookie"));
  headers.append("Set-Cookie", await commitSession(session));

  // Get browser environment variables
  const ENV = getBrowserEnvironment();

  return json({
    userProfile,
    session: sessionData, // Pass the session data to the client
    error,
    ENV, // Pass environment variables to the client
  }, { headers });
}


export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useLoaderData<typeof loader>();
  const { userProfile = null, error = null, ENV } = loaderData || {};

  const zustandSetCurrentUser = useStore((state) => state.setCurrentUser);

  useEffect(() => {
    // Set client-side environment variables
    if (ENV) {
      window.ENV = ENV;
    }

    const currentStoreUser = useStore.getState().currentUser;

    if (userProfile) {
      const profileEmail = userProfile.email || '';
      const profileFullName = userProfile.full_name || 'User';
      const profileBalance = userProfile.balance ?? 0;
      const profileRole = (userProfile.role as UserRole) || 'User';
      const profileCreatedAt = userProfile.created_at;
      const profileGroupId = userProfile.group_id;
      // userProfile.group_name will be undefined as it's not selected from DB
      const profileGroupName = userProfile.group_name; // This will be undefined
      // userProfile.avatar_url will be undefined as it's not selected from DB
      const profileAvatarUrl = userProfile.avatar_url; // This will be undefined


      const needsZustandUpdate =
        !currentStoreUser ||
        currentStoreUser.id !== userProfile.id ||
        currentStoreUser.email !== profileEmail ||
        currentStoreUser.fullName !== profileFullName ||
        currentStoreUser.balance !== profileBalance ||
        currentStoreUser.role !== profileRole ||
        (profileCreatedAt && currentStoreUser.createdAt !== (profileCreatedAt ? new Date(profileCreatedAt).toISOString().split('T')[0] : undefined)) ||
        currentStoreUser.groupId !== profileGroupId ||
        currentStoreUser.groupName !== (profileGroupName || currentStoreUser?.groupName || 'Group Placeholder') || // Ensure comparison handles undefined profileGroupName
        currentStoreUser.avatarUrl !== (profileAvatarUrl || currentStoreUser?.avatarUrl || undefined); // Ensure comparison handles undefined profileAvatarUrl


      if (needsZustandUpdate) {
        const userForStore: AdminUser = {
          id: userProfile.id,
          email: profileEmail,
          fullName: profileFullName,
          balance: profileBalance,
          role: profileRole,
          createdAt: profileCreatedAt ? new Date(profileCreatedAt).toISOString().split('T')[0] : (currentStoreUser?.createdAt || new Date().toISOString().split('T')[0]),
          status: currentStoreUser?.status || 'active',
          groupId: profileGroupId || currentStoreUser?.groupId || 'group_placeholder_id',
          // profileGroupName will be undefined, so fallback logic will apply
          groupName: profileGroupName || currentStoreUser?.groupName || 'Group Placeholder',
          // profileAvatarUrl will be undefined, so fallback logic will apply
          avatarUrl: profileAvatarUrl || currentStoreUser?.avatarUrl || undefined,
        };
        zustandSetCurrentUser(userForStore);
        console.log("[Layout Effect] Updated currentUser in Zustand:", userForStore);
      } else {
        console.log("[Layout Effect] Skipping Zustand update, data appears consistent with userProfile:", userProfile.id);
      }
    } else if (error) {
      console.warn("[Layout Effect] No user profile loaded due to error from loader:", error);
    } else {
      // If userProfile is null and no error, it means user is not logged in.
      // Clear Zustand state if there was a previous user.
      if (currentStoreUser) {
        zustandSetCurrentUser(null);
        console.log("[Layout Effect] Cleared currentUser in Zustand as no userProfile was loaded.");
      }
    }
  }, [userProfile, error, ENV, zustandSetCurrentUser]);


  if (!loaderData) {
    console.warn("[Layout Component] Warning: useLoaderData() returned undefined. Using default values.");
  }

  if (error && !userProfile) {
     console.error("[Layout Component] Error message received from loader:", error);
  }

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-gray-50 dark:bg-gray-950">
        <Header user={userProfile} /> {/* Pass userProfile to Header */}
        {children}
        <ScrollRestoration />
        <Scripts />
        {/* Inject client-side environment variables */}
        {ENV ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(ENV)};`,
            }}
          />
        ) : null}
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error("Root Error Boundary caught error:", error);

  let errorMessage = "An unexpected error occurred.";
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    if (typeof error.data === 'object' && error.data !== null && 'message' in error.data) {
       errorMessage = String(error.data.message) || error.statusText;
    } else if (typeof error.data === 'string') {
       errorMessage = error.data || error.statusText;
    } else {
       errorMessage = error.statusText;
    }
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  return (
    <html lang="en" className="h-full">
      <head>
        <title>Error</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full flex items-center justify-center bg-red-100">
        <div className="text-center p-8 bg-white shadow-md rounded">
          <h1 className="text-2xl font-bold text-red-600">Application Error</h1>
          <p className="mt-2">Status: {errorStatus}</p>
          <p className="mt-2">{errorMessage}</p>
          <a href="/" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Go Home</a>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
