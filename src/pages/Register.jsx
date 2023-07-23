import { useEffect, useState } from "react";
import { Form, Input, Button, Divider } from "antd";

const Register = () => {
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		phone: "",
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
		const { first_name, last_name, phone, email, password } = formData;
		return first_name && last_name && phone && email && password;
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
				REGISTER ACCOUNT
			</h3>
			<Divider />

			<Form layout="vertical" onFinish={handleSubmit}>
				<Form.Item
					label="First Name"
					name="first_name"
					rules={[{ required: true, message: "Please enter your first name" }]}
				>
					<Input
						name="first_name"
						value={formData.first_name}
						onChange={handleInputChange}
					/>
				</Form.Item>

				<Form.Item
					label="Last Name"
					name="last_name"
					rules={[{ required: true, message: "Please enter your last name" }]}
				>
					<Input
						name="last_name"
						value={formData.last_name}
						onChange={handleInputChange}
					/>
				</Form.Item>

				<Form.Item
					label="Phone"
					name="phone"
					rules={[
						{
							required: true,
							pattern: /^(\d{11})$/,
							message: "Please enter a valid 11-digit phone number",
						},
					]}
				>
					<Input
						name="phone"
						value={formData.phone}
						onChange={handleInputChange}
					/>
				</Form.Item>

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
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Register;
