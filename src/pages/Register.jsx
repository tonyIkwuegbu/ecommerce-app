import { useEffect, useState } from "react";
import { Form, Input, Button, Divider, message } from "antd";
import { Link } from "react-router-dom";
import { api } from "../Api";
import Axios from "axios";
import { BsCheckCircleFill } from "react-icons/bs";

const Register = () => {
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		phone: "",
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [registrationSuccess, setRegistrationSuccess] = useState(false);

	// ********************************************************** FORM VISIBILITY ANIMATION
	useEffect(() => {
		// Show the form after a short delay (e.g., 300ms) to create a delay effect
		const showFormTimeout = setTimeout(() => {
			setIsFormVisible(true);
		}, 800);

		return () => clearTimeout(showFormTimeout);
	}, []);

	/// ************************************************************ ALL INPUTS HANDLER
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	/// ************************************************************ FORM VALIDATION
	const isFormComplete = () => {
		const { first_name, last_name, phone, email, password } = formData;
		return first_name && last_name && phone && email && password;
	};

	//*******************************************************REGISTER USER
	const handleSubmit = async () => {
		setLoading(true);
		const params = {
			first_name: formData.first_name,
			last_name: formData.last_name,
			phone: formData.phone,
			email: formData.email,
			password: formData.password,
		};

		await Axios(`${api.baseURL}/api/v1/ecommerce/signup/customer`, {
			method: "POST",
			data: JSON.stringify(params),
			headers: {
				"content-type": "application/json",
				"x-access-token": api.token,
			},
		})
			.then((res) => {
				if (res.data.status === true) {
					message.success(`${res.data.message}`);
					setRegistrationSuccess(true);
				} else {
					message.info(`${res.data.message}`);
				}

				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);

				if (
					err.response.status === 401 ||
					err.response.status === 404 ||
					err.response.status === 405
				) {
					message.error(`${err.response.data.message}`);
				} else {
					message.error("Something went wrong");
				}
			});
	};

	return (
		<div className="w-96 mx-auto mt-8 p-6 shadow-lg bg-white my-8">
			{registrationSuccess ? ( // Conditional rendering based on the registration status
				<>
					<BsCheckCircleFill className="mx-auto text-3xl text-green-500" />
					<h3 className="text-gray-700 font-mon capitalize font-semibold text-center text-lg lg:text-2xl py-6 tracking-wider">
						your account has been created!
					</h3>
					<div className="text-sm leading-6">
						<p className="text-center">
							You can now take advantage of member privileges to enhance your
							online shopping experience with us.
						</p>
						<p className="text-center">
							A confirmation has been sent to the provided e-mail address.
						</p>
						<p className="text-center">
							Please{" "}
							<Link
								to="/login"
								className="text-[#ff5c00] font-bold animate-pulse"
							>
								Login
							</Link>{" "}
							to continue.
						</p>
					</div>
				</>
			) : (
				<>
					{isFormVisible && (
						<>
							<h3 className="text-gray-700 font-mon font-semibold text-center text-lg lg:text-2xl py-6 tracking-wider">
								REGISTER ACCOUNT
							</h3>
							<p className="font-semibold text-xs text-center">
								If you already have an account with us, please{" "}
								<Link to="/login" className="text-[#ff5c00]">
									Login
								</Link>
								.
							</p>
							<Divider />

							<Form layout="vertical" onFinish={handleSubmit}>
								<Form.Item
									label="First Name"
									name="first_name"
									rules={[
										{ required: true, message: "Please enter your first name" },
									]}
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
									rules={[
										{ required: true, message: "Please enter your last name" },
									]}
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
									rules={[
										{ required: true, message: "Please enter a password" },
									]}
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
										loading={loading}
										className="w-full bg-[#ff5c00] text-white disabled:cursor-not-allowed disabled:bg-gray-300"
										disabled={!isFormComplete()}
									>
										Submit
									</Button>
								</Form.Item>
							</Form>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Register;
