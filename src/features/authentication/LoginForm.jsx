import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLogin } from "./useLogin";
import { useUser } from "./useUser";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import SpinnerMini from "./../../ui/SpinnerMini";

export default function LoginForm() {
	const [email, setEmail] = useState("tgs@example.com");
	const [password, setPassword] = useState("examplePassword");
	const { login, isLoading } = useLogin();
	const { isAuthenticated } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) navigate("/dashboard");
	}, [isAuthenticated, navigate]);

	function handleSubmit(e) {
		e.preventDefault();

		if (!email || !password) return;

		login(
			{ email, password },
			{
				onSettled: () => {
					setPassword("");
				},
			}
		);
	}

	return (
		<Form onSubmit={handleSubmit}>
			<FormRowVertical label="Email address">
				<Input
					type="email"
					id="email"
					// This makes this form better for password managers
					autoComplete="use rname"
					value={email}
					disabled={isLoading}
					onChange={e => setEmail(e.target.value)}
				/>
			</FormRowVertical>
			<FormRowVertical label="Password">
				<Input
					type="password"
					id="password"
					autoComplete="current-password"
					value={password}
					disabled={isLoading}
					onChange={e => setPassword(e.target.value)}
				/>
			</FormRowVertical>
			<FormRowVertical>
				<Button size="large" disabled={isLoading}>
					{!isLoading ? "Login" : <SpinnerMini />}
				</Button>
			</FormRowVertical>
		</Form>
	);
}
