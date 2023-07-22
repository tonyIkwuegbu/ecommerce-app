import { useEffect, useState } from "react";
import { Spin } from "antd";
import Axios from "axios";
import { api } from "../Api";

const ConfirmationPage = () => {
	const queryParams = new URLSearchParams(window.location.search);
	const status = queryParams.get("status");
	const transactionId = queryParams.get("id");
	const [loading, setLoading] = useState(true);
	const [isSuccess, setIsSuccess] = useState(false);
	const [orderId, setOrderId] = useState("");
	const [paymentRef, setPaymentRef] = useState("");

	// https://cpg.coralpay.com/paymentstatus?status=success&id=312734445411416
	useEffect(() => {
		const getOrderData = async () => {
			try {
				const response = await Axios.get(
					`${api.baseURL}/api/v1/ecommerce/payment/${transactionId}/orderid`,
					{
						headers: {
							"content-type": "application/json",
							"x-access-token": api.token,
						},
					},
				);
				console.log(response.data);
				setOrderId(response.data.order_id);
				setPaymentRef(response.data);
				setLoading(false);
				setIsSuccess(status === "success");
			} catch (error) {
				console.log(error);
				setLoading(false);
				setIsSuccess(false);
			}
		};

		getOrderData();
	}, [status, transactionId]);

	const renderResultComponent = () => {
		if (loading) {
			return <Spin tip="Processing Payment..." />;
		} else if (isSuccess) {
			return (
				<div>
					<h2>Payment Successful!</h2>
					{/* Display the retrieved order_id */}
					<p>Order ID: {orderId}</p>
					<p>Payment Reference:{paymentRef}</p>
				</div>
			);
		} else {
			return (
				<div>
					<h2>Payment Failed</h2>
					{/* You can display additional information or instructions for failure */}
				</div>
			);
		}
	};

	return <div className="max-w-[98%]">{renderResultComponent()}</div>;
};

export default ConfirmationPage;
