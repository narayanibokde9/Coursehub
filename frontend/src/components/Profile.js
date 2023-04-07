import React from "react";
// import profilePic from "./Images/profile-pic.jpeg";
import "./CSS/Profile.css";

import { useAuthContext } from "../hooks/useAuthContext";

const Profile = () => {
	const { user } = useAuthContext();
	return (
		<div className="profile">
			<div class="card">
				<div class="card_background_img"></div>
				<div class="card_profile_img"></div>
				<div class="user_details">
					<h2 class="text-center">{user.username}</h2>
					<p class="text-center">Student</p>
				</div>
				<div class="card_count">
					<div class="count">
						<div class="fans">
							<h3>Courses Subscribed</h3>
							<br />
							<p>3</p>
							<ul>
								<li>DSA</li>
								<li>DBMS</li>
								<li>OS</li>
							</ul>
						</div>
						<div class="following">
							<h3>Wishlist</h3>
							<br />
							<p>2</p>
							<ul>
								<li>CP</li>
								<li>DMA</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
