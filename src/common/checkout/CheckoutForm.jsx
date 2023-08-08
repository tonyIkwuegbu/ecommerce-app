import { Form, Input, Select, Button, message, Checkbox } from "antd";
import { useState } from "react";
import Axios from "axios";
import { api } from "../../Api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";

const { Option } = Select;

const CheckoutForm = ({ cartItems }) => {
	const dispatch = useDispatch();
	const [saveDetails, setSaveDetails] = useState(false);
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
			products: cartItems.map((item) => {
				return {
					idl_product_code: item.idl_product_code,
					supplier_id: item.supplier_id,
					amount: item.retail_price * item.qty,
					quantity: item.qty,
				};
			}),
			total_amount: orderDetails.total_amount,
			callback_url: "https://tencowry.com/paymentstatus",
		};
		// Now, check if the "saveDetails" checkbox is checked and proceed accordingly
		// if (saveDetails) {
		// 	message.success("Details saved successfully!");
		// 	// perform any other action
		// }
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
		<Form
			name="orderForm"
			onFinish={onFinish}
			layout="vertical"
			className="px-10 mx-auto"
		>
			<Form.Item
				label="First Name"
				name="first_name"
				rules={[{ required: true, message: "Please enter your First Name" }]}
			>
				<Input
					onChange={(e) => handleInputChange("first_name", e.target.value)}
				/>
			</Form.Item>

			<Form.Item
				label="Last Name"
				name="last_name"
				rules={[{ required: true, message: "Please enter your Last Name" }]}
			>
				<Input
					onChange={(e) => handleInputChange("last_name", e.target.value)}
				/>
			</Form.Item>
			<Form.Item
				label="Phone Number"
				name="phone"
				rules={[{ required: true, message: "Please enter your Phone Number" }]}
			>
				<Input
					addonBefore="+234"
					onChange={(e) => handleInputChange("phone", e.target.value)}
				/>
			</Form.Item>

			<Form.Item
				label="Email Address"
				name="email"
				rules={[
					{ required: true, message: "Please enter your Email Address" },
					{ type: "email", message: "Invalid email format" },
				]}
			>
				<Input onChange={(e) => handleInputChange("email", e.target.value)} />
			</Form.Item>

			<Form.Item
				label="Shipping Address 1"
				name="address_1"
				rules={[
					{
						required: true,
						message: "Please enter your Shipping Address 1",
					},
				]}
			>
				<Input
					onChange={(e) => handleInputChange("address_1", e.target.value)}
				/>
			</Form.Item>

			<Form.Item label="Shipping Address 2" name="address_2">
				<Input
					onChange={(e) => handleInputChange("address_2", e.target.value)}
				/>
			</Form.Item>

			<Form.Item
				label="Shipping City"
				name="city"
				rules={[{ required: true, message: "Please enter your Shipping City" }]}
			>
				<Input onChange={(e) => handleInputChange("city", e.target.value)} />
			</Form.Item>

			<Form.Item
				label="Shipping State"
				name="state"
				rules={[
					{ required: true, message: "Please enter your Shipping State" },
				]}
			>
				<Input onChange={(e) => handleInputChange("state", e.target.value)} />
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
					<Option value="Nigeria">Nigeria</Option>
				</Select>
			</Form.Item>
			<Form.Item>
				<Checkbox
					checked={saveDetails}
					onChange={(e) => setSaveDetails(e.target.checked)}
				>
					Save details for future orders
				</Checkbox>
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
	);
};

export default CheckoutForm;
