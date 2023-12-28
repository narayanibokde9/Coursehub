import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(0.1),
	textAlign: "center",
	color: theme.palette.text.secondary,
	height: "81%",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between", // Align items in the card vertically
	width: "87%", // Make each card wider
	margin: theme.spacing(5), // Add margin on left and right
}));

function FormRow() {
	const [isLoading, setIsLoading] = useState(true);
	const [course, setCourse] = useState([]);
	const [likes, setLikes] = useState();
	const [searchTerm, setSearchTerm] = useState("");

	const { user } = useAuthContext();
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`/courses`)
			.then((res) => res.json())
			.then((jsonRes) => {
				setCourse(jsonRes);
				setIsLoading(false);
			});
	}, []);

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	const filteredCourses = course.filter((course) => {
		const searchLowerCase = searchTerm.toLowerCase();
		return (
			course.title.toLowerCase().includes(searchLowerCase) ||
			course.offered_by.toLowerCase().includes(searchLowerCase)
		);
	});

	const handleClick = (event, course, likes_count) => {
		event.preventDefault();

		if (!user) {
			navigate("/login");
			return;
		}
		const { _id } = course;
		setLikes(likes_count + 1);
		fetch(`/courses/${_id}/likes`, {
			method: "PUT",
			body: JSON.stringify(course),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`,
			},
		}).then(() => {
			console.log(_id + "liked");
		});
	};

	if (isLoading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
					marginLeft: "45%",
				}}
			>
				<Typography variant="h4">Loading...</Typography>
			</Box>
		);
	}

	return (
		<React.Fragment>
			<TextField
				label="Search"
				variant="outlined"
				margin="normal"
				fullWidth
				onChange={handleSearch}
				sx={{
					backgroundColor: "#fff", // Set background color to white
					width: "60%", // Set the width as needed
					margin: "auto", // Center the search box horizontally
					marginBottom: "0px",
					marginTop: "40px",
					"& input": {
						// Add padding to the input area
						paddingLeft: "15px",
					},
				}}
			/>
			{filteredCourses.map((course) => {
				const url = `/showpage/${course._id}`;
				return (
					<Grid item xs={12} sm={6} key={course._id}>
						<Link to={url} style={{ textDecoration: "none" }}>
							<Item>
								<Card sx={{ maxWidth: "100%" }}>
									<CardMedia
										sx={{ height: 200 }} // size of image on card
										image={course.images}
										title="green iguana"
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="div">
											{course.title}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											{course.offered_by}
										</Typography>
									</CardContent>
									<CardActions>
										<Button size="medium">Explore</Button>
										<Button
											onClick={(event) =>
												handleClick(event, course, course.likes_count)
											}
											size="medium"
										>
											Likes {course.likes_count}
										</Button>
									</CardActions>
								</Card>
							</Item>
						</Link>
					</Grid>
				);
			})}
		</React.Fragment>
	);
}

export default function Courses() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={1}>
				<Grid container item spacing={1}>
					<FormRow />
				</Grid>
			</Grid>
		</Box>
	);
}
