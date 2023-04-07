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

	useEffect(() => {
		fetch(`/courses`)
			.then((res) => res.json())
			.then((jsonRes) => {
				setCourse(jsonRes);
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return <React.Fragment>Loading...</React.Fragment>;
	}

	return (
		<React.Fragment>
			<Grid item xs={4}>
				{course.map((course) => {
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
									<a href="/showpage">
										<Button size="small">Explore</Button>
									</a>
									<a href="#">
										<Button size="small">Like</Button>
									</a>
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
