import { Form, Input, Select, Button, message, Checkbox } from "antd";
import { useCallback, useEffect, useState } from "react";
import Axios from "axios";
import { api } from "../../Api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";
import { useCart } from "../../utils/CartUtils";

const { Option } = Select;

const CheckoutForm = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const { clearCartItems } = useCart();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const [saveDetails, setSaveDetails] = useState(false);
	const user = useSelector((state) => state.auth.user);
	const orderDetails = useSelector((state) => state.order.order);
	const [loading, setLoading] = useState(false);
	const [orderData, setOrderData] = useState({
		first_name: "",
		last_name: "",
		address_1: "",
		address_2: "",
		city: "",
		state: "",
		country: "Nigeria",
		phone: "",
		email: "",
	});

	// **************************************************RETERIVE SHIPPING ADDRESS

	const fetchAddress = useCallback(async () => {
		if (!isAuthenticated) {
			return;
		}

		Axios.get(`${api.baseURL}/api/v1/ecommerce/shipping/info/${user.email}`, {
			headers: {
				"x-access-token": api.token,
			},
		})
			.then((res) => {
				if (res.data.status === true) {
					const shippingInfoForm = res.data.data;
					setOrderData((prevData) => ({
						...prevData,
						...shippingInfoForm,
					}));
				}
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {});
	}, [isAuthenticated, user]);

	useEffect(() => {
		fetchAddress();
	}, [fetchAddress]);

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

	//****************************************************SHIPPING INFO

	const saveShippingInfo = async () => {
		if (!isAuthenticated || !user) {
			return;
		}

		const shipping_info = {
			first_name: orderData.first_name,
			last_name: orderData.last_name,
			address_1: orderData.address_1,
			address_2: orderData.address_2,
			city: orderData.city,
			state: orderData.state,
			postcode: "",
			country: orderData.country,
			phone: orderData.phone,
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
				} else {
					message.error("Failed to add/update shipping info.");
				}
			})
			.catch((err) => {
				console.error(err);

				message.error("An error occurred while adding/updating shipping info.");
			});
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
			state: orderData.state,
			country: orderData.country,
			phone: orderData.phone,
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

		//check if the "saveDetails" checkbox is checked and proceed accordingly
		if (saveDetails) {
			saveShippingInfo();
		}
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
						addonBefore="+234"
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
					label="Shipping State"
					rules={[
						{ required: true, message: "Please enter your Shipping State" },
					]}
				>
					<Input
						name="state"
						value={orderData.state}
						onChange={(e) => handleInputChange("state", e.target.value)}
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
				<Form.Item>
					{isAuthenticated && (
						<Checkbox
							checked={saveDetails}
							onChange={(e) => setSaveDetails(e.target.checked)}
						>
							Save details for future orders
						</Checkbox>
					)}
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

export default CheckoutForm;
