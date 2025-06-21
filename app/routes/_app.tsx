import { Outlet, useLoaderData } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { supabase } from "~/lib/supabase";
import { useStore } from "~/store/store";
import { useEffect } from "react";
import type { User } from "~/types/admin"; // Assuming your User type is here

// Loader to fetch users and pass them to the client
export async function loader({ request }: LoaderFunctionArgs) {
  const { data: users, error } = await supabase
    .from('profiles')
    .select('id, full_name, balance'); // Fetch necessary user data

  if (error) {
    console.error("Error fetching users in layout loader:", error);
    // Depending on your app's needs, you might throw an error
    // or return an empty array and handle the error client-side.
    // Returning empty array for now to avoid breaking the app.
    return json({ users: [] });
  }

  // Return users as JSON
  return json({ users });
}

// Layout component that populates the store
export default function Layout() {
  const { users } = useLoaderData<typeof loader>();
  const setUsers = useStore((state) => state.setUsers);
  const isStoreReady = useStore((state) => !!state.setUsers); // Check if setter is available

  // Populate the store with fetched users
  useEffect(() => {
    if (isStoreReady && users) {
      // Map fetched data to your store's User type if necessary
      const storeUsers: User[] = users.map(user => ({
        id: user.id,
        fullName: user.full_name || 'Unknown User', // Handle potential null full_name
        balance: user.balance || 0, // Handle potential null balance
        // Add other user properties if needed by the store/app
      }));
      setUsers(storeUsers);
    }
  }, [isStoreReady, users, setUsers]); // Depend on isStoreReady, users, and setUsers

  return (
    <div className="min-h-screen bg-background">
      {/* You can add shared layout elements here, like a header or sidebar */}
      <main className="container mx-auto py-8 px-4">
        <Outlet /> {/* This is where nested routes like /transfer will render */}
      </main>
    </div>
  );
}
