import { useState, useEffect } from "react";
import { Form, Input, Button, Divider, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../Api";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice"; // Update the import path

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [isFormVisible, setIsFormVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const showFormTimeout = setTimeout(() => {
			setIsFormVisible(true);
		}, 800);

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

	//*******************************************************LOGIN USER
	const handleSubmit = async () => {
		setLoading(true);
		const params = {
			email: formData.email,
			password: formData.password,
		};

		try {
			const response = await Axios(
				`${api.baseURL}/api/v1/ecommerce/login/customer`,
				{
					method: "POST",
					data: JSON.stringify(params),
					headers: {
						"content-type": "application/json",
						"x-access-token": api.token,
					},
				},
			);

			if (response.data.status === true) {
				const user = response.data.data;

				// Check if the 'user' object exists in the response before dispatching the action
				if (user) {
					dispatch(login(user));
					message.success(`Welcome ${user.first_name}`);
					setTimeout(() => {
						navigate("/");
					}, 3000);
				} else {
					message.error("Invalid user data in the response");
				}
			} else {
				message.info(`${response.data.message}`);
			}

			setLoading(false);
		} catch (err) {
			setLoading(false);

			if (
				err.response.status === 401 ||
				err.response.status === 404 ||
				err.response.status === 405
			) {
				message.error(`${err.response.data.message}`);
			} else {
				message.error(`${err.message}`);
			}
		}
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
			<p className="font-semibold text-xs text-center">
				Don&apos;t have an account with us? please{" "}
				<Link to="/register" className="text-[#ff5c00]">
					Register
				</Link>
				.
			</p>
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
						type="password"
						value={formData.password}
						onChange={handleInputChange}
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="success"
						htmlType="submit"
						loading={loading}
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
