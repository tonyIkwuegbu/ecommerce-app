import { Form, Button, Input } from "antd";

const TrackOrders = () => {
	return (
		<div className="mx-auto text-center">
			<h3 className="text-lg lg:text-2xl text-gray-500 text-center tracking-wider font-semibold">
				Track Your Order{" "}
			</h3>
			<Form
				layout="horizontal"
				style={{
					maxWidth: 600,
				}}
				className="my-10 p-4 lg:p-8 rounded-md mx-auto font-semibold"
			>
				<Form.Item
					label="Order ID"
					name="order_id"
					rules={[{ required: true, message: "Please enter order ID" }]}
				>
					<Input name="order_id" />
				</Form.Item>

				<Button
					type="success"
					className="bg-[#232f3e] text-white my-8"
					htmlType="button"
				>
					Track
				</Button>
			</Form>
		</div>
	);
};

export default TrackOrders;
