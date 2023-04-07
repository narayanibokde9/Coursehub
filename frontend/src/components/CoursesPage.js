import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

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
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

function FormRow() {
	const [isLoading, setIsLoading] = useState(true);
	const [course, setCourse] = useState([]);
	const [likes, setLikes] = useState()

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

	// const countLikes = async (_id) => {
	// 	const res = await fetch(`/courses/${_id}/likesCount`);
	// 	const jsonRes = await res.json();
	// 	return jsonRes.likeCount;
	// };

	const handleClick = (course, likes_count) => {
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
			// navigate("/wishlist");
			console.log(_id + "liked");
		});
	};

	if (isLoading) {
		return <React.Fragment>Loading...</React.Fragment>;
	}

	return (
		<React.Fragment>
			<Grid item xs={4}>
				{course.map((course) => {
					const url = `/showpage/${course._id}`
					return (
						<Item>
							<Card sx={{ maxWidth: 345 }}>
								<CardMedia
									sx={{ height: 140 }}
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
									<Link to={url}>
										<Button size="small">Explore</Button>
									</Link>
										<Button onClick={() => handleClick(course, course.likes_count)} size="small">
											Likes 
											{/* {setLikes(countLikes(course._id))} */}{" "}
											{course.likes_count}
										</Button>
								</CardActions>
							</Card>
						</Item>
					);
				})}
			</Grid>
		</React.Fragment>
	);
}

export default function Courses() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={1}>
				<Grid container item spacing={3}>
					<FormRow />
				</Grid>
				{/* <Grid container item spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item spacing={3}>
          <FormRow />
        </Grid> */}
			</Grid>
		</Box>
	);
}
