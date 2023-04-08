import React from "react";
import CommentList from "./CommentList";
import useFetch from "./usefetch";

const Comments = () => {
	const {
		data: comments,
		isPending,
		error,
	} = useFetch("http://localhost:8000/comments");
	return (
		<>
			<div className="announcements">
				{/* <h1 style={color='black'}>All Events</h1> */}
				{error && <div>{error}</div>}
				{isPending && <div>Loading...</div>}
				{comments && <CommentList comments={comments} title="Comments" />}
			</div>
		</>
	);
};

export default Comments;
