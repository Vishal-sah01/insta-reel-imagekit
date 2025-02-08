"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <div className="navbar bg-base-300 sticky top-0 z-40 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-gray-800 hover:text-gray-600"
            prefetch={true}
            onClick={() =>
              showNotification("Welcome to ImageKit ReelsPro", "info")
            }
          >
            <Home className="w-6 h-6" />
            ImageKit ReelsPro
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="dropdown dropdown-end relative">
            <button
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle p-2 focus:outline-none focus:ring focus:ring-gray-300"
            >
              <User className="w-6 h-6 text-gray-800" />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg py-2"
            >
              {session ? (
                <>
                  <li className="px-4 py-2 text-sm text-gray-600">
                    {session.user?.email?.split("@")[0]}
                  </li>
                  <div className="divider border-t my-2"></div>

                  <li>
                    <Link
                      href="/upload"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                      onClick={() =>
                        showNotification("Welcome to Admin Dashboard", "info")
                      }
                    >
                      Video Upload
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                    onClick={() =>
                      showNotification("Please sign in to continue", "info")
                    }
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
