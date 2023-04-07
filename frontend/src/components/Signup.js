import React from 'react'
import './CSS/Signup.css'

import { useSignup } from "../hooks/useSignup";
import { useState } from "react";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const { signup, error, isLoading } = useSignup();

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(username, email, password);
		await signup(username, email, password);
	};
	return (
		<div>
			<div id="login-box">
				<form onSubmit={handleSubmit}>
					<div class="left">
						<h1 class="text-indigo-500 font-bold ">Sign up</h1>
						<input
							type="text"
							name="username"
							required
							id="username"
							placeholder="Username"
							onChange={(e) => setUsername(e.target.value)}
						/>
						<input
							type="text"
							name="email"
							required
							id="email"
							placeholder="E-mail"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type="password"
							name="password"
							required
							id="password"
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						{/* <input
							type="password"
							name="password2"
							placeholder="Retype password"
						/> */}
						<button
							type="submit"
							name="signup_submit"
							value="Sign me up"
							class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
						>
							Sign me up
						</button>
					</div>

					<div class="right">
						<span class="loginwith">
							Sign in with
							<br />
							social network
						</span>

						<button class="social-signin facebook">Log in with facebook</button>
						<button class="social-signin twitter">Log in with Twitter</button>
						<button class="social-signin google">Log in with Google+</button>
					</div>
					<div class="or">OR</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
