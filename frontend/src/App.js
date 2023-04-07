import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
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
import Showpage from "./components/Showpage";
import Profile from "./components/Profile";

function App() {
	const { user } = useAuthContext();
	return (
		<div>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Hero />} />
					<Route
						path="/login"
						element={!user ? <Login /> : <Navigate to="/" />}
					/>
					<Route
						path="/signup"
						element={!user ? <Signup /> : <Navigate to="/" />}
					/>
					<Route path="/admin" element={<Admin />} />
					<Route path="/showpage/:id" element={<Showpage />} />
					<Route path="/blogs/:id" element={<BlogDetails />} />
					<Route path="/blogs" element={<BlogList />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="/announcements" element={<Announcements />} />
					<Route path="/courses" element={<Courses />} />
					<Route path="/profile" element={<Profile />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
