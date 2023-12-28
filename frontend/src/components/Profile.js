import React, { useEffect, useState } from "react";
import "./CSS/Profile.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";

const Profile = () => {
	const [wishlist, setWishlist] = useState([]);
	const { user } = useAuthContext();
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchWishlist = async () => {
			try {
				if (!user) {
					navigate("/login");
					return;
				}

				const response = await fetch(`/user/wishlist/${user._id}`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
				});

				if (!response.ok) {
					throw new Error("Failed to fetch wishlist");
				}

				const data = await response.json();
				setWishlist(data.courses);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching wishlist:", error);
			}
		};

		fetchWishlist();
	}, [user]);

	return (
		<div className="profile">
			<div className="card">
				<div className="card_background_img"></div>
				<div className="card_profile_img"></div>
				<div className="user_details">
					<h2 className="text-center">{user?.username}</h2>
					<p className="text-center">Student</p>
				</div>
				<div className="card_count">
					<div className="count">
						<div className="count">
							<div className="following">
								<h3>Wishlist</h3>
								{isLoading ? (
									<div className="loading">
										<CircularProgress />
										<p>Loading wishlist...</p>
									</div>
								) : (
									<ul>
										{wishlist.map((wish) => (
											<div key={wish._id}>
												<Link to={`/showpage/${wish._id}`}>
													<Button size="small">{wish.title}</Button>
												</Link>
											</div>
										))}
									</ul>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
