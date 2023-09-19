import { Modal, Button, message, Divider } from "antd";
import { Form, Input, Select } from "antd";
import CountryCodes from "../../../countryCodes.json";
import NigeriaStates from "../../../nigeriaStates.json";
import { api } from "../../Api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Axios from "axios";

const { Option } = Select;

const ShippingAddressModal = ({ modalVisible, hideModal }) => {
	const [form] = Form.useForm();
	const user = useSelector((state) => state.auth.user);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const [loading, setLoading] = useState(false);
	const [selectedCountryCode, setSelectedCountryCode] = useState("+234");
	const [selectedState, setSelectedState] = useState("");
	const [modalWidth, setModalWidth] = useState("100%");
	const [orderData, setOrderData] = useState({
		first_name: "",
		last_name: "",
		address_1: "",
		address_2: "",
		city: "",
		countryCode: "",
		country: "",
		phone: "",
		email: "",
	});

	const phoneWithCountryCode = `${selectedCountryCode}${orderData.phone}`;

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setModalWidth("50%");
			} else {
				setModalWidth("100%");
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// ********************************************* COUNTRYCODE & PHONE & STATE HANDLER
	const handleCountryCodeChange = (value) => {
		setSelectedCountryCode(value);
		handleInputChange("countrycode", value);
	};

	const handleStateChange = (value) => {
		setSelectedState(value);
	};

	// *****************************************************FORM INPUT HANDLER
	const handleInputChange = (name, value) => {
		setOrderData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	//****************************************************SHIPPING INFO

	const updateShippingInfo = async () => {
		if (
			!orderData.first_name ||
			!orderData.last_name ||
			!orderData.phone ||
			!orderData.email ||
			!selectedState ||
			!orderData.city ||
			!orderData.address_1
		) {
			message.error("Please fill in all required fields.");
			return; // Don't proceed with the API call if any required field is empty
		}
		if (!isAuthenticated || !user) {
			return;
		}
		setLoading(true);
		const shipping_info = {
			first_name: orderData.first_name,
			last_name: orderData.last_name,
			address_1: orderData.address_1,
			address_2: orderData.address_2,
			city: orderData.city,
			state: selectedState,
			postcode: "",
			country: orderData.country,
			phone: phoneWithCountryCode,
			email: orderData.email,
		};
		const params = JSON.stringify({
			shipping_info: shipping_info,
		});

		await Axios(`${api.baseURL}/api/v1/ecommerce/shipping/info/${user.email}`, {
			method: "POST",
			data: params,
			headers: {
				"Content-Type": "application/json",
				"x-access-token": `${api.token}`,
			},
		})
			.then((res) => {
				if (res.data.status === true) {
					message.success("Shipping info added/updated successfully!");
					hideModal();
					setTimeout(() => {
						window.location.reload();
					}, 3000);
				} else {
					message.error("Failed to add/update shipping info.");
				}
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
				message.error("An error occurred while adding/updating shipping info.");
			});
	};
	return (
		<Modal
			title="Update Shipping Address"
			open={modalVisible}
			onOk={hideModal}
			width={modalWidth}
			onCancel={hideModal}
			footer={[
				<Button key="back" onClick={hideModal}>
					Cancel
				</Button>,
			]}
		>
			<Divider />

			<Form
				form={form}
				onFinish={updateShippingInfo}
				layout="vertical"
				className="px-4 mx-auto mt-4"
				initialValues={{
					country: "Nigeria",
				}}
			>
				<Form.Item
					label="First Name"
					rules={[
						{
							required: true,
							message: "Please enter your First Name",
						},
					]}
				>
					<Input
						name="first_name"
						value={orderData.first_name}
						onChange={(e) => handleInputChange("first_name", e.target.value)}
					/>
				</Form.Item>

				<Form.Item
					label="Last Name"
					rules={[{ required: true, message: "Please enter your Last Name" }]}
				>
					<Input
						name="last_name"
						value={orderData.last_name}
						onChange={(e) => handleInputChange("last_name", e.target.value)}
					/>
				</Form.Item>
				<Form.Item
					label="Phone Number"
					rules={[
						{ required: true, message: "Please enter your Phone Number" },
					]}
				>
					<Input
						name="phone"
						value={orderData.phone}
						addonBefore={
							<Select
								defaultValue={selectedCountryCode}
								onChange={handleCountryCodeChange}
							>
								{CountryCodes.map((country) => (
									<Option key={country.dial_code} value={country.dial_code}>
										{`${country.name} (${country.dial_code})`}
									</Option>
								))}
							</Select>
						}
						onChange={(e) => handleInputChange("phone", e.target.value)}
					/>
				</Form.Item>

				<Form.Item
					label="Email Address"
					rules={[
						{ required: true, message: "Please enter your Email Address" },
						{ type: "email", message: "Invalid email format" },
					]}
				>
					<Input
						name="email"
						value={orderData.email}
						onChange={(e) => handleInputChange("email", e.target.value)}
					/>
				</Form.Item>

				<Form.Item
					label="Shipping State"
					rules={[
						{ required: true, message: "Please select your Shipping State" },
					]}
				>
					<Select value={selectedState} onChange={handleStateChange}>
						{NigeriaStates.map((state) => (
							<Option key={state} value={state}>
								{state}
							</Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item
					label="Shipping City"
					rules={[
						{ required: true, message: "Please enter your Shipping City" },
					]}
				>
					<Input
						name="city"
						value={orderData.city}
						onChange={(e) => handleInputChange("city", e.target.value)}
					/>
				</Form.Item>
				<Form.Item
					label="Shipping Address 1"
					rules={[
						{
							required: true,
							message: "Please enter your Shipping Address 1",
						},
					]}
				>
					<Input
						name="address_1"
						value={orderData.address_1}
						onChange={(e) => handleInputChange("address_1", e.target.value)}
					/>
				</Form.Item>

				<Form.Item label="Shipping Address 2" name="address_2">
					<Input
						name="address_2"
						value={orderData.address_2}
						onChange={(e) => handleInputChange("address_2", e.target.value)}
					/>
				</Form.Item>

				<Form.Item label="Shipping Country" name="country">
					<Select onChange={(value) => handleInputChange("country", value)}>
						<Option value={orderData.country}>Nigeria</Option>
					</Select>
				</Form.Item>

				<Form.Item style={{ textAlign: "center" }}>
					<Button
						type="success"
						htmlType="submit"
						loading={loading}
						className="bg-[#ff5c40] text-white disabled:cursor-not-allowed disabled:bg-gray-400"
					>
						Update Address
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default ShippingAddressModal;
