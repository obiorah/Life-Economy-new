import { useEffect, useState } from 'react';
import { useMatches } from '@remix-run/react';
import type { UserProfile } from '~/types/user';
import { useStore } from '~/store/store'; // Import Zustand store

// Define a type for the user object that includes accessToken and refreshToken
interface AuthenticatedUser extends UserProfile {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export function useUser(): AuthenticatedUser | null {
  const matches = useMatches();
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  useEffect(() => {
    console.log("DEBUG: useUser useEffect triggered."); // New debug log
    const rootMatch = matches.find((match) => match.id === 'root');
    if (rootMatch && rootMatch.data && typeof rootMatch.data === 'object' && 'userProfile' in rootMatch.data) {
      const userProfile = rootMatch.data.userProfile as UserProfile | null;
      const session = rootMatch.data.session as any; // Access the session data

      console.log("DEBUG: rootMatch.data:", rootMatch.data); // New debug log
      console.log("DEBUG: userProfile from rootMatch:", userProfile); // New debug log
      console.log("DEBUG: session from rootMatch:", session); // New debug log

      if (userProfile && session?.access_token && session?.refresh_token && session?.expires_in) {
        const authenticatedUser: AuthenticatedUser = {
          ...userProfile,
          accessToken: session.access_token,
          refreshToken: session.refresh_token,
          expiresIn: session.expires_in,
        };
        setUser(authenticatedUser);
        setCurrentUser(authenticatedUser); // Update Zustand store
        console.log("DEBUG: Authenticated user set:", authenticatedUser); // New debug log
      } else {
        setUser(null);
        setCurrentUser(null); // Clear user in Zustand store
        console.log("DEBUG: User profile or session data incomplete/missing. User set to null."); // New debug log
      }
    } else {
      console.log("DEBUG: rootMatch not found or data missing."); // New debug log
      setUser(null);
      setCurrentUser(null);
    }
  }, [matches, setCurrentUser]);

  return user;
}
