import React, { useState } from "react";
import { Link } from "react-router-dom";

import useToken from "../hooks/useToken";
import Auth from "../utils/auth";

export default function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useToken();

  return (
    <div className="fixed top-0 w-full" style={{ zIndex: 2000 }}>
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex justify-between items-center">
              <div>
                <Link
                  to="/"
                  className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Urban Oasis Locator
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex md:hidden">
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                  aria-label="toggle menu"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                    <path
                      fillRule="evenodd"
                      d="M4 5a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm0 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm1 6a1 1 0 100 2h14a1 1 0 100-2H5z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="md:flex hidden">

              {!!token ? (
                <>
                  <Link
                    to="/myprofile"
                    className="px-6 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-indigo-500"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/favoriteplaces"
                    className="px-6 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-indigo-500"
                  >
                    My Favorite Places
                  </Link>
                </>
              ) : null}

              {!!!token ? (
                <Link
                  to="/signin"
                  className="block px-4 py-2 mt-2 text-sm font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-400 focus:bg-indigo-400 focus:outline-none focus:shadow-outline-indigo"
                >
                  Sign In
                </Link>
              ) : (
                <button
                  className="block px-4 py-2 mt-2 text-sm font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-400 focus:bg-indigo-400 focus:outline-none focus:shadow-outline-indigo"
                  onClick={(e) => {
                    e.preventDefault();
                    Auth.logout();
                  }}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div className="md:hidden bg-white">
        {showMenu ? (
          <>
            <Link
              to="/signin"
              className="block px-4 py-2 mt-2 text-sm font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-400 focus:bg-indigo-400 focus:outline-none focus:shadow-outline-indigo"
            >
              Sign In
            </Link>

            {!!token ? (
              <>
                <Link
                  to="/myprofile"
                  className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-700 bg-transparent rounded-lg hover:bg-gray-200 focus:bg-indigo-400 focus:outline-none focus:shadow-outline-indigo"
                >
                  My Profile
                </Link>
                <Link
                  to="/favoriteplaces"
                  className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-700 bg-transparent rounded-lg hover:bg-gray-200 focus:bg-indigo-400 focus:outline-none focus:shadow-outline-indigo"
                >
                  My Favorite Places
                </Link>
              </>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}
