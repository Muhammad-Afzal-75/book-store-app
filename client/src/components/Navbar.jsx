import React, { useState, useEffect } from "react";
import Login from "./Login";
import { useAuth } from "../contest/AuthProvider";

const Navbar = ({ theme, toggleTheme }) => {
  const { authUser, logout } = useAuth();

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = (
    <>
      <li><a href="/">Home</a></li>
      <li><a href="/course">Course</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
      {authUser?.isAdmin && <li><a href="/dashboard">Dashboard</a></li>}
    </>
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <nav
        className={`navbar container max-w-screen-2xl mx-auto px-4 md:px-20 fixed top-0 right-0 left-0 z-50
        ${sticky ? "bg-base-200 shadow-md transition-all duration-300" : ""}`}
      >
        {/* Left */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <a href="#" className="text-2xl font-bold ml-2">Book Store</a>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base space-x-2">
            {navItems}
          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center">
            <label className="input input-bordered flex items-center gap-2">
              <input type="search" className="grow" placeholder="Search" />
              <svg className="h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </g>
              </svg>
            </label>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Login/Logout */}
          {authUser ? (
            <div className="flex items-center gap-2">
              {authUser.isAdmin && (
                <span className="badge badge-primary">Admin</span>
              )}
              <button className="btn btn-primary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <a href="#" className="btn btn-primary"
            onClick={()=>document.getElementById('my_modal_3').showModal()}>Login</a>
          )}
        </div>
        <Login/>
      </nav>
    </header>
  );
};

export default Navbar;
