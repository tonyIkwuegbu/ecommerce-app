import { Form, Input, Select, Button, message } from "antd";
import { useState } from "react";
import Axios from "axios";
import { api } from "../../Api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";
import { useCart } from "../../utils/CartUtils";
import CountryCodes from "../../../countryCodes.json";
import NigeriaStates from "../../../nigeriaStates.json";

const { Option } = Select;

const NonAuthCheckout = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const { clearCartItems } = useCart();
	const orderDetails = useSelector((state) => state.order.order);
	const [loading, setLoading] = useState(false);
	const [selectedCountryCode, setSelectedCountryCode] = useState("+234");
	const [selectedState, setSelectedState] = useState("");
	const [orderData, setOrderData] = useState({
		first_name: "",
		last_name: "",
		address_1: "",
		address_2: "",
		city: "",
		countryCode: "+234",
		country: "",
		phone: "",
		email: "",
	});

	const phoneWithCountryCode = `${selectedCountryCode}${orderData.phone}`;

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

	// Function to check if all required fields are filled
	const isFormComplete = () => {
		const {
			first_name,
			last_name,
			address_1,
			city,
			state,
			country,
			phone,
			email,
		} = orderData;
		return (
			first_name &&
			last_name &&
			address_1 &&
			city &&
			state &&
			country &&
			phone &&
			email
		);
	};

	// **********************************************************CREATE ORDER
	const onFinish = async () => {
		setLoading(true);
		const params = {
			order_id: orderDetails.order_id,
			first_name: orderData.first_name,
			last_name: orderData.last_name,
			address_1: orderData.address_1,
			address_2: orderData.address_2,
			city: orderData.city,
			state: selectedState,
			country: orderData.country,
			phone: phoneWithCountryCode,
			email: orderData.email,
			products: orderDetails.products.map((item) => {
				return {
					idl_product_code: item.idl_product_code,
					supplier_id: item.supplier_id,
					amount: item.amount,
					weight: item.weight,
					main_picture: item.main_picture,
					colour: item.colour,
					size: item.size,
					product_name: item.product_name,
					quantity: item.quantity,
				};
			}),
			total_amount: orderDetails.total_amount,
			callback_url: "https://tencowry.com/paymentstatus",
		};

		await Axios(`${api.baseURL}/api/v1/ecommerce/order/create`, {
			method: "POST",
			data: JSON.stringify(params),
			headers: {
				"content-type": "application/json",
				"x-access-token": api.token,
			},
		})
			.then((res) => {
				if (res.data.status === true) {
					dispatch(clearCart());
					clearCartItems();
					message.success(`${res.data.message}`);
					setTimeout(() => {
						window.location.href = res.data.link;
					}, 3000);
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
		<>
			<Form
				form={form}
				onFinish={onFinish}
				layout="vertical"
				className="px-10 mx-auto"
				initialValues={{
					...orderData,
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

				<Form.Item
					label="Shipping Country"
					name="country"
					rules={[
						{
							required: true,
							message: "Please select your Shipping Country",
						},
					]}
				>
					<Select onChange={(value) => handleInputChange("country", value)}>
						<Option value={orderData.country}>Nigeria</Option>
					</Select>
				</Form.Item>

				<Form.Item style={{ textAlign: "center" }}>
					<Button
						type="success"
						htmlType="submit"
						loading={loading}
						disabled={!isFormComplete()}
						className="bg-[#ff5c40] text-white disabled:cursor-not-allowed disabled:bg-gray-400"
					>
						Submit Order
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default NonAuthCheckout;
