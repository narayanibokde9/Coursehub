import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Admin.css";

const Admin = () => {
	const [date, setDate] = useState("");
	const [organiser, setorganiser] = useState("");
	const [venue, setVenue] = useState("");
	const [start_time, setstarttime] = useState("");
	const [end_time, setendtime] = useState("");
	const [description, setdescription] = useState("");

	const [isPending, setIsPending] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const blog = { date, organiser, venue, start_time, end_time, description };
		setIsPending(true);

		fetch("/admin/blogs", {
			method: "Post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(blog),
		}).then(() => {
			console.log("new blog added");
			setIsPending(false);
			navigate("/blogs");
		});
	};
	return (
		<div className="create">
			<h2>Announcements</h2>
			<form onSubmit={handleSubmit}>
				<label>Event Date</label>
				<input
					type="date"
					required
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>

				<label>Event platform</label>
				<input
					type="text"
					required
					value={venue}
					onChange={(e) => setVenue(e.target.value)}
				/>

				<label>Event Duration</label>
				<input
					type="time"
					required
					value={start_time}
					onChange={(e) => setstarttime(e.target.value)}
				/>

				<label>Event Description:</label>
				<textarea
					required
					value={description}
					onChange={(e) => setdescription(e.target.value)}
				></textarea>
				<label>Event type</label>
				<select
					value={organiser}
					onChange={(e) => setorganiser(e.target.value)}
				>
					<option value="Free">Free</option>
					<option value="Paid">Paid</option>
				</select>
				{!isPending && <button className="btn-grad">Add Event</button>}
				{isPending && <button disabled>Adding Event....</button>}
			</form>
		</div>
	);
};

export default Admin;
