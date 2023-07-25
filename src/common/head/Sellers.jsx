import { Form, Input, Button, Divider, message } from "antd";
import { useState } from "react";
import { api } from "../../Api";
import Axios from "axios";

const Sellers = ({ setIsModalVisible }) => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		full_name: "",
		address_1: "",
		city: "",
		state: "",
		country: "",
		phone: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	/// ************************************************************ FORM VALIDATION
	const isFormComplete = () => {
		const { full_name, address_1, phone, city, state, country } = formData;
		return full_name && address_1 && phone && city && state, country;
	};

	// ************************************FORM SUBMIT
	const handleSubmit = async () => {
		setLoading(true);
		const params = {
			full_name: formData.full_name,
			address_1: formData.address_1,
			phone: formData.phone,
			city: formData.city,
			state: formData.state,
			country: formData.country,
		};

		await Axios(`${api.baseURL}/api/v1/ecommerce/seller/prospective`, {
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
					setIsModalVisible(false);
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
		<div>
			<div className="text-center">
				<h4 className="text-lg lg:text-2xl text-gray-700 tracking-wider py-2">
					Become a Seller
				</h4>
				<p>
					Please fill the form below. We will reach out to you in no distant
					time.
				</p>
			</div>
			<Divider />
			<Form name="sellerForm" onFinish={handleSubmit}>
				<Form.Item
					label="Full Name"
					name="full_name"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
					rules={[{ required: true, message: "Please enter your full name" }]}
				>
					<Input
						name="full_name"
						value={formData.full_name}
						onChange={handleInputChange}
					/>
				</Form.Item>
				<Form.Item
					label="Phone Number"
					name="phone"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
					rules={[
						{ required: true, message: "Please enter your phone number" },
					]}
				>
					<Input
						name="phone"
						value={formData.phone}
						onChange={handleInputChange}
					/>
				</Form.Item>

				<Form.Item
					label="Address 1"
					name="address_1"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
					rules={[{ required: true, message: "Please enter your address" }]}
				>
					<Input
						name="address_1"
						value={formData.address_1}
						onChange={handleInputChange}
					/>
				</Form.Item>

				<Form.Item
					label="City"
					name="city"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
					rules={[{ required: true, message: "Please enter your city" }]}
				>
					<Input
						name="city"
						value={formData.city}
						onChange={handleInputChange}
					/>
				</Form.Item>

				<Form.Item
					label="State"
					name="state"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
					rules={[{ required: true, message: "Please enter your state" }]}
				>
					<Input
						name="state"
						value={formData.state}
						onChange={handleInputChange}
					/>
				</Form.Item>

				<Form.Item
					label="Country"
					name="country"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
					rules={[{ required: true, message: "Please enter your country" }]}
				>
					<Input
						name="country"
						value={formData.country}
						onChange={handleInputChange}
					/>
				</Form.Item>

				<div style={{ textAlign: "center" }}>
					<Button
						type="ghost"
						htmlType="submit"
						loading={loading}
						className="text-[#ff5c00]"
						disabled={!isFormComplete()}
					>
						Submit
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default Sellers;
