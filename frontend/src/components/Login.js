import React from "react";
import "./CSS/Login.css";

import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { login, error, isLoading } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await login(username, email, password);
	};

	return (
		<div>
			<div id="login-box">
				<form onSubmit={handleSubmit}>
					<div class="left">
						<h1 class="text-indigo-500 font-bold">Login</h1>
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
						<input
							type="submit"
							name="signup_submit"
							value="Login"
							class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
