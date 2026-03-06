import React, { useContext, useState } from "react";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import SearchInput from "../../slots/SearchInput";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  const placeholders = [
    "Search for recipes...",
    "Find your favorite movies...",
    "Discover new music...",
    "Look up travel destinations...",
    "Explore coding tutorials...",
    "Search for books...",
    "Find workout routines...",
    "Discover art inspiration...",
    "Look for investment tips...",
    "Search programming languages...",
  ];

  const handleSignout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="w-full border-b dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <img src="/favicon.svg" className="h-7" alt="Logo" />
            <span className="text-xl font-semibold dark:text-white">
              Woodmarts
            </span>
          </NavLink>

          {/* Navigation */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            <li>
              <NavLink to="/" className="hover:text-cyan-600">
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" className="hover:text-cyan-600">
                About
              </NavLink>
            </li>

            <li>
              <NavLink to="/services" className="hover:text-cyan-600">
                Services
              </NavLink>
            </li>

            <li>
              <NavLink to="/pricing" className="hover:text-cyan-600">
                Pricing
              </NavLink>
            </li>
          </ul>
        </div>

        {/* CENTER SEARCH */}
        <div className="flex w-[420px]">
          <SearchInput
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            placeholders={placeholders}
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <NavLink
            to="/cart"
            className="text-sm font-medium hover:text-cyan-600"
          >
            Cart
          </NavLink>

          {/* Avatar Dropdown */}
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt={user?.name || "Guest"}
                img={
                  user?.image ||
                  "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                }
                rounded
              />
            }
          >
            <DropdownHeader>
              <span className="block text-sm font-semibold">
                {user?.name || "Guest"}
              </span>
              <span className="block truncate text-sm">
                {user?.email || "guest@example.com"}
              </span>
            </DropdownHeader>

            <DropdownDivider />

            {!user && (
              <>
                <DropdownItem>
                  <NavLink to="/login">Login</NavLink>
                </DropdownItem>

                <DropdownItem>
                  <Link to="/register">Register</Link>
                </DropdownItem>
              </>
            )}

            {user && (
              <>
                <DropdownItem
                  onClick={() => {
                    if (user.role === "user") navigate("/dashboard/user");
                    if (user.role === "admin") navigate("/dashboard/admin");
                    if (user.role === "superadmin")
                      navigate("/dashboard/superadmin");
                  }}
                >
                  Dashboard
                </DropdownItem>

                <DropdownItem>
                  <NavLink to="/settings">Settings</NavLink>
                </DropdownItem>

                <DropdownDivider />

                <DropdownItem onClick={handleSignout}>Sign out</DropdownItem>
              </>
            )}
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
