import React, { useState, useEffect } from "react";
import "./CSS/Showpage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { CircularProgress } from "@mui/material";

const Showpage = () => {
	const [course, setCourse] = useState({});
	const [review, setReview] = useState("");
	const [isPending, setIsPending] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [comments, setComments] = useState([]);
	const [isLoadingComments, setIsLoadingComments] = useState(true);

	const navigate = useNavigate();
	const { id } = useParams();
	const { user } = useAuthContext();

	// Fetch course details
	useEffect(() => {
		console.log(user);
		
		fetch(`/courses/showcourse/${id}`)
			.then((res) => res.json())
			.then((jsonRes) => {
				setCourse(jsonRes);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching course details:", error);
				setIsLoading(false);
			});
	}, [id]);

	// Fetch comments for the specific course
	useEffect(() => {
		fetch(`/user/courses/${id}/comments`)
			.then((res) => res.json())
			.then((jsonRes) => {
				setComments(jsonRes.comments);
				setIsLoadingComments(false);
			})
			.catch((error) => {
				console.error("Error fetching comments:", error);
				setIsLoadingComments(false);
			});
	}, [id]);

	function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}


	const addToWishlist = (course) => {
		if (!user) {
			navigate("/login");
			return;
		}

		const { _id } = course;
		const userId = user._id;

		fetch(`/user/wishlist/add`, {
			method: "POST",
			body: JSON.stringify({ userId, courseId: _id }),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`,
			},
		})
			.then((res) => res.json())
			.then(() => {
				console.log(`${_id} added to wishlist`);
			})
			.catch((error) => {
				console.error("Error adding to wishlist:", error);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const comment = { text: review, userId: user._id }; // Pass the user ID with the comment
		setIsPending(true);

		fetch(`/user/courses/${id}/comments`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`,
			},
			body: JSON.stringify(comment),
		})
			.then(() => {
				console.log("new comment added", comment);
				setReview(""); // Clear the textarea after adding a comment
				setIsPending(false);
				// Fetch comments again to update the displayed comments
				fetch(`/user/courses/${id}/comments`)
					.then((res) => res.json())
					.then((jsonRes) => {
						setComments(jsonRes.comments);
					})
					.catch((error) => {
						console.error("Error fetching comments:", error);
					});
			})
			.catch((error) => {
				console.error("Error adding comment:", error);
				setIsPending(false);
			});
	};

	return (
		<div>
			{isLoading ? (
				<div className="loading">
					<CircularProgress />
					<p>Loading course...</p>
				</div>
			) : (
				<div className="left_wrap">
					<div className="cont">
						<h1 className="font-serif text-left">{course.title}</h1>
						<img src={course.images} alt="Course Thumbnail" />
						<div className="card1">
							<h2>{course.instructor}</h2>
							<h3 className="font-bold">{course.offered_by}</h3>
							<p>{course.description}</p>
							<p className="">{course.courseType}</p>
							<a href={course.course_link}>Course link</a>
							<button
								className="btn-grad1"
								onClick={() => {
									addToWishlist(course);
								}}
							>
								Add To Wishlist
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Comments Section */}
			<div className="right_wrap">
				<div className="com1">
					<h2 className="text-left">Comments</h2>
					<form onSubmit={handleSubmit}>
						<label>Your Review:</label>
						<textarea
							required
							value={review}
							onChange={(e) => setReview(e.target.value)}
						></textarea>

						{!isPending && <button className="btn-grad1">Post</button>}
						{isPending && <button disabled>Adding Comment....</button>}
					</form>

					{/* Display previous comments */}
					{isLoadingComments ? (
						<p>Loading comments...</p>
					) : (
						<ul>
							{comments.map((comment) => (
								<li key={comment._id}>
									<div className="comment-box">
									<p>{comment.text}</p>
									<p className="timestamp">Posted at: {isValidDate(comment.postedAt) ? new Date(comment.postedAt).toLocaleString() : 'Invalid Date'}</p>

									{/* Display other details of the comment */}
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};

export default Showpage;

/**/
