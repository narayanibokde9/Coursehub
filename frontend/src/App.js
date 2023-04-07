import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Hero from "./components/Hero";
import Admin from "./components/Admin";
import BlogDetails from "./components/BlogDetails";
import Announcements from "./components/Announcements";

import { useAuthContext } from "./hooks/useAuthContext";
import Courses from "./components/CoursesPage";
import BlogList from "./components/BlogList";

function App() {
	const { user } = useAuthContext();
	return (
		<div>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Hero />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="/blogs/:id" element={<BlogDetails />} />
					<Route path="/blogs" element={<BlogList />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="/announcements" element={<Announcements />} />
					<Route path="/courses" element={<Courses />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
