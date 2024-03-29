import { message } from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import Axios from "axios";
import { api } from "../../Api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";
import { CartContext } from "../../utils/CartUtils";
import ReturningUser from "./ReturningUser";
import FirstTimeUserForm from "./FirstTimeUserForm";

const AuthCheckoutMain = () => {
	const dispatch = useDispatch();
	const { clearCartItems } = useContext(CartContext);
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
					message.success(res.data.message);
				} else {
					message.error("Failed to add/update shipping info.");
				}
			})
			.catch((err) => {
				if (
					err.response.status === 401 ||
					err.response.status === 404 ||
					err.response.status === 405
				) {
					message.error(`${err.response.data.message}`);
				} else {
					message.error(`${err.message}`);
				}
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
					naira_price: parseFloat(item.naira_price),
					weight: item.weight,
					main_picture: item.main_picture,
					colour: item.colour,
					size: item.size,
					product_name: item.product_name,
					quantity: item.quantity,
					product_sku: item.product_sku,
					brand: item.brand,
					category: item.category,
					sub_category: item.sub_category,
					description: item.description,
					exchange_rate: item.exchange_rate,
					product_cost: item.product_cost,
					currency: item.currency,
					currency_adder: item.currency_adder,
					made_in: item.made_in,
					material: item.material,
					product_id: item.product_id,
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
