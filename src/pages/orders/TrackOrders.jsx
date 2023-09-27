import { Form, Button, Input, Steps, message } from "antd";
import { useEffect, useState } from "react";
import { api } from "../../Api";
import Axios from "axios";

const TrackOrders = () => {
	const [trackingData, setTrackingData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [orderNumber, setOrderNumber] = useState("");
	const [currentStep, setCurrentStep] = useState(0);

	// *******************************************HANDLE STEPS
	useEffect(() => {
		if (trackingData) {
			const status = trackingData.current_status.toLowerCase();

			switch (status) {
				case "payment confirmed":
					setCurrentStep(0);
					break;
				case "products ready to be shipped":
					setCurrentStep(1);
					break;
				case "products shipped":
					setCurrentStep(2);
					break;
				case "ordered products dispatched":
					setCurrentStep(3);
					break;
				case "ordered products delivered":
					setCurrentStep(4);
					break;
				default:
					setCurrentStep(0);
					break;
			}
		}
	}, [trackingData]);

	// ******************************************************HANDLER

	const handleTrackOrder = async () => {
		setLoading(true);
		try {
			const getData = await Axios.get(
				`${api.baseURL}/api/v1/ecommerce/product/tracking/order/${orderNumber}`,
				{
					headers: {
						"Content-Type": "application/json",
						"x-access-token": api.token,
					},
				},
			);

			setTrackingData(getData.data.data.tracking);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error("Error tracking order:", error);
			message.error("An error occurred while tracking the order.");
		}
	};
	return (
		<div className="mx-auto text-center">
			<h3 className="text-lg lg:text-2xl text-gray-500 text-center tracking-wider font-semibold">
				Delivery Tracking{" "}
			</h3>
			<Form
				layout="horizontal"
				style={{
					maxWidth: 600,
				}}
				onFinish={handleTrackOrder}
				className="my-4 p-4 lg:p-8 rounded-md mx-auto font-semibold"
			>
				<Form.Item
					label="Order ID"
					name="order_id"
					rules={[{ required: true, message: "Please enter order ID" }]}
				>
					<Input
						allowClear
						name="order_id"
						placeholder="enter order ID to track"
						value={orderNumber}
						onChange={(event) => setOrderNumber(event.target.value)}
					/>
				</Form.Item>

				<Button
					type="success"
					className="bg-[#232f3e] text-white my-4"
					htmlType="submit"
					loading={loading}
				>
					Track
				</Button>
			</Form>

			{!loading && trackingData && (
				<div>
					<Steps
						current={currentStep}
						size="small"
						labelPlacement="vertical"
						className="text-xs"
						items={[
							{
								title: "Payment Confirmed",
								description: "",
							},
							{
								title: "Products Ready to be Shipped",
								description: "",
							},
							{
								title: "Products Shipped",
								description: "",
							},
							{
								title: "Ordered Products Dispatched",
								description: "",
							},
							{
								title: "Ordered Products Delivered",
								description: "",
							},
						]}
					/>
				</div>
			)}
		</div>
	);
};

export default TrackOrders;
