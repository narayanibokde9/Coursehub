import React, { useEffect, useState } from "react";
import "./CSS/Profile.css";
import { useAuthContext } from "../hooks/useAuthContext";

const Profile = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch("/wishlist", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }

        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [user]);


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
						<div class="count">
          <div class="following">
            <h3>Wishlist</h3>
            <ul>
              {wishlist.map((wish) => (
                <li key={wish.id}>{wish.title}</li>
              ))}
            </ul>
          </div>
        </div>
		</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
