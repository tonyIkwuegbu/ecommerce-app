import { useEffect, useState } from "react";
import { Spin, Button, Result } from "antd";
import Axios from "axios";
import { api } from "../Api";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(window.location.search);
	const status = queryParams.get("status");
	const transactionId = queryParams.get("id");
	const [loading, setLoading] = useState(true);
	const [isSuccess, setIsSuccess] = useState(false);
	const [orderId, setOrderId] = useState("");
	const [paymentRef, setPaymentRef] = useState("");

	//https://tencowry.onrender.com/paymentstatus?status=success&id=168811001199184

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

				setOrderId(response.data.order_id);
				setPaymentRef(response.data.payment_ref);
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
			return (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						minHeight: "70vh",
					}}
				>
					<Spin />
				</div>
			);
		} else if (isSuccess) {
			return (
				<Result
					key="success-result"
					status="success"
					title="Your payment was successful and has been confirmed."
					subTitle={`Order ID: ${orderId}, Payment reference: ${paymentRef}`}
					extra={[
						<Button
							key="go-to-home-btn"
							type="success"
							htmlType="button"
							onClick={() => navigate("/")}
							className="border-[1px] border-[#333] bg-orange-400 mx-auto text-white"
						>
							Continue Shopping
						</Button>,
					]}
				/>
			);
		} else {
			return (
				<Result
					key="failure-result"
					status="error"
					title="Payment Failed"
					subTitle="Oops! Something went wrong and transaction could not be completed."
					extra={[
						<Button
							key="go-to-home-btn"
							type="success"
							htmlType="button"
							onClick={() => navigate("/")}
							className="border-[1px] border-[#333] bg-orange-400 mx-auto text-white"
						>
							Go to Home
						</Button>,
					]}
				/>
			);
		}
	};

	return (
		<div className="max-w-[98%] my-10 mx-auto">{renderResultComponent()}</div>
	);
};

export default ConfirmationPage;
