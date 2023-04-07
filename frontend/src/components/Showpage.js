import React, { useEffect } from "react";
import "./CSS/Showpage.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./usefetch";
import { useAuthContext } from "../hooks/useAuthContext";
import { CardMedia } from "@mui/material";

const Showpage = () => {
	const { id } = useParams();
	const { user } = useAuthContext();

	const [course, setCourse] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [review, setreview] = useState("");

	const [isPending, setIsPending] = useState(false);
	const navigate = useNavigate();

	console.log(id);
	useEffect(() => {
		fetch(`/courses/showcourse/${id}`)
			.then((res) => res.json())
			.then((jsonRes) => {
				setCourse(jsonRes);
				setIsLoading(false);
			});
	}, []);

	console.log(course);

	const addToWishList = (course) => {
		if (!user) {
			navigate("/login");
			return;
		}
		const { _id } = course;
		fetch(`/courses/${_id}/wishlist`, {
			method: "PUT",
			body: JSON.stringify(course),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`,
			},
		}).then(() => {
			// navigate("/wishlist");
			console.log(_id + "wishlist");
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const comment = { review };
		setIsPending(true);

		fetch("http://localhost:8000/comments", {
			method: "Post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(comment),
		}).then(() => {
			console.log("new comment added");
			setIsPending(false);
			navigate("/comments");
		});
	};

	return (
		<div>
			<div class="left_wrap">
				<div className="cont">
					<h1 class="font-serif text-left">{course.title}</h1>
					<img src={course.images} />
					<div className="card1">
						<h2>{course.instructor}</h2>
						<h3 class="font-bold">{course.offered_by}</h3>
						<br />
						<p>{course.description}</p>
						<p class="">{course.courseType}</p>
						<a href={`Link1`}>Course link</a>
						<button
							onClick={() => {
								addToWishList(course);
							}}
						>
							Add To wishlist
						</button>
					</div>
				</div>
			</div>
			<div class="right_wrap">
				<div className="com1">
					<h2 class="text-left">Comments</h2>
					<form onSubmit={handleSubmit}>
						<label>Your Review:</label>
						<textarea
							required
							value={review}
							onChange={(e) => setreview(e.target.value)}
						></textarea>

						{!isPending && <button className="btn-grad1">Post</button>}
						{isPending && <button disabled>Adding Event....</button>}
					</form>
				</div>
			</div>
		</div>
	);
};

export default Showpage;
