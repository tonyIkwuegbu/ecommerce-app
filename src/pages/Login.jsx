import { useState, useEffect } from "react";
import { Form, Input, Button, Divider } from "antd";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [isFormVisible, setIsFormVisible] = useState(false);

	useEffect(() => {
		// Show the form after a short delay (e.g., 300ms) to create a delay effect
		const showFormTimeout = setTimeout(() => {
			setIsFormVisible(true);
		}, 800);

		// Cleanup the timeout on component unmount to avoid memory leaks
		return () => clearTimeout(showFormTimeout);
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const isFormComplete = () => {
		const { email, password } = formData;
		return email && password;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission here, e.g., submit the formData to the backend
		console.log("Form data:", formData);
	};

	return (
		<div
			className={`w-96 mx-auto mt-8 p-6 shadow-lg bg-white my-8 ${
				isFormVisible ? "animate-fadeIn" : "opacity-0"
			}`}
		>
			<h3 className="text-gray-700 font-mon font-semibold text-center text-lg lg:text-2xl py-6 tracking-wider">
				LOGIN
			</h3>
			<Divider />

			<Form layout="vertical" onFinish={handleSubmit}>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							type: "email",
							message: "Please enter a valid email address",
						},
					]}
				>
					<Input
						name="email"
						value={formData.email}
						onChange={handleInputChange}
					/>
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: "Please enter a password" }]}
				>
					<Input.Password
						name="password"
						value={formData.password}
						onChange={handleInputChange}
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="success"
						htmlType="submit"
						className="w-full bg-[#ff5c00] text-white disabled:cursor-not-allowed disabled:bg-gray-300"
						disabled={!isFormComplete()}
					>
						Login
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Login;
