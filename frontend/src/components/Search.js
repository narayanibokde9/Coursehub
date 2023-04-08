import { React, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import List from "./List";
import "./CSS/Courses.css";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function Search() {
	const [inputText, setInputText] = useState("");
	let inputHandler = (e) => {
		//convert input text to lower case
		var lowerCase = e.target.value.toLowerCase();
		setInputText(lowerCase);
	};

	return (
		<div className="main1">
			<h1 class="font-mono">Our Courses</h1>
			<div className="search1">
				<TextField
					id="outlined-basic"
					onChange={inputHandler}
					variant="outlined"
					fullWidth
					label="Search"
				/>
			</div>
			<List input={inputText} />
		</div>
	);
}
