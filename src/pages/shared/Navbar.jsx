import React, { useContext } from "react";
import { IoIosSearch } from "react-icons/io";

import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarLink,
} from "flowbite-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";

function AppNavbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Signout function
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
    <Navbar fluid rounded className="px-4">
      {/* Brand */}
      <NavLink to="/">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Woodmarts
        </span>
      </NavLink>

      <div className="flex-1 flex items-center justify-between">
        {/* Left Links */}
        <div className="flex space-x-4 list-none">
          <NavbarLink href="#" active>Home</NavbarLink>
          <NavbarLink href="#">About</NavbarLink>
          <NavbarLink href="#">Services</NavbarLink>
          <NavbarLink href="#">Pricing</NavbarLink>
          <NavLink to="/cart" className="">Cart</NavLink>

          {/* search */}
          <div className="relative md:flex hidden">
            <input
              className="py-1.5 dark:bg-transparent dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] pr-4 border border-text pl-10 rounded-full outline-none focus:border-[#3B9DF8]"
              placeholder="Search..." />
            <IoIosSearch
              className="absolute top-[9px] dark:text-slate-500 left-3 text-[#424242] text-[1.3rem]" />
          </div>

        </div>

        {/* Right Avatar & Dropdown */}
        <div className="flex items-center">
          <Dropdown
            arrowIcon={false} // remove arrow dots
            inline={true}     // keeps dropdown attached to avatar
            label={
              <Avatar
                alt={user?.name || "Guest"}
                img={user?.image || "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
                rounded
              />
            }
          >
            {/* User Info */}
            <DropdownHeader>
              <span className="block text-sm font-semibold">{user?.name || "Guest"}</span>
              <span className="block truncate text-sm">{user?.email || "guest@example.com"}</span>
            </DropdownHeader>

            <DropdownDivider />

            {/* Guest: Login/Register */}
            {!user && (
              <>
                <DropdownItem>
                  <NavLink to="/login" className="w-full">Login</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/register" className="w-full">Register</Link>
                </DropdownItem>
              </>
            )}

            {/* Logged-in: Dashboard/Settings/Signout */}
            {user && (
              <>
                <DropdownItem
                  onClick={() => {
                    if (user.role === "user") navigate("/dashboard/user");
                    if (user.role === "admin") navigate("/dashboard/admin");
                    if (user.role === "superadmin") navigate("/dashboard/superadmin");
                  }}
                >
                  Dashboard
                </DropdownItem>
                <DropdownItem>
                  <NavLink to="/settings" className="w-full">Settings</NavLink>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem onClick={handleSignout} className="cursor-pointer">
                  Sign out
                </DropdownItem>
              </>
            )}
          </Dropdown>
        </div>
      </div>
    </Navbar>
  );
}

export default AppNavbar;