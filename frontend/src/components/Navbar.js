import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/Navbar.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
	const { logout } = useLogout();
	const { user } = useAuthContext();
	const handleClick = () => {
		logout();
	};
	return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-logo">
			
			<div className="flex items-center">
	
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
    </svg>
	
    <span className="ml-2"><h1 className="title1">Coursehub</h1></span>
  </div>
        </div>
        <ul className="navbar-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <Link to="/blogs">Announcements</Link>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
        </ul>
        <div className="navbar-actions">
          {user ? (
            <div className="user-actions">
              <Link to="/profile">
                 <span className="username">{user.username}</span>
              </Link>
              <button className="btn-grad" onClick={handleClick}>
                Log out
              </button>
            </div>
          ) : (
            <div className="button-container">
              <Link to="/login">
                <button className="btn-grad">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn-grad">Signup</button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
