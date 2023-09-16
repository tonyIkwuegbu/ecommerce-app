import { message } from "antd";
import { useCallback, useEffect, useState } from "react";
import Axios from "axios";
import { api } from "../../Api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";
import { useCart } from "../../utils/CartUtils";
import ReturningUser from "./ReturningUser";
import FirstTimeUserForm from "./FirstTimeUserForm";

const AuthCheckoutMain = () => {
	const dispatch = useDispatch();
	const { clearCartItems } = useCart();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const [saveDetails, setSaveDetails] = useState(false);
	const user = useSelector((state) => state.auth.user);
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
					setSelectedState(res.data.data.state);
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

	//**************** */ Determine whether the user has shipping information

	// const hasShippingInfo =
	// 	orderData.first_name &&
	// 	orderData.last_name &&
	// 	orderData.address_1 &&
	// 	orderData.city &&
	// 	selectedState &&
	// 	orderData.country &&
	// 	phoneWithCountryCode &&
	// 	orderData.email;

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

		//check if the "saveDetails" checkbox is checked and proceed accordingly
		if (saveDetails) {
			saveShippingInfo();
		}
		await Axios(`${api.baseURL}/api/v1/ecommerce/order/creat`, {
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
			{orderData.first_name !== "" ? (
				<ReturningUser
					orderData={orderData}
					orderDetails={orderDetails}
					loading={loading}
					onFinish={onFinish}
				/>
			) : (
				<FirstTimeUserForm
					orderData={orderData}
					onFinish={onFinish}
					handleCountryCodeChange={handleCountryCodeChange}
					handleInputChange={handleInputChange}
					isFormComplete={isFormComplete}
					handleStateChange={handleStateChange}
					loading={loading}
					setSaveDetails={setSaveDetails}
					selectedCountryCode={selectedCountryCode}
					selectedState={selectedState}
					saveDetails={saveDetails}
					isAuthenticated={isAuthenticated}
					orderDetails={orderDetails}
				/>
			)}
		</>
	);
};

export default AuthCheckoutMain;
