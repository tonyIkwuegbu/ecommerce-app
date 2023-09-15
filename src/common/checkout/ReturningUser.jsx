import { Button, Divider } from "antd";
import { useState } from "react";
import ShippingAddressModal from "./ShippingAddressModal";

const ReturningUser = ({ orderData, orderDetails, loading, onFinish }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const showModal = () => {
		setModalVisible(true);
	};

	const hideModal = () => {
		setModalVisible(false);
	};
	return (
		<div className="bg-white py-8 px-6 shadow-md rounded-md">
			<div className="flex items-center justify-between px-5 tracking-wider py-5 font-semibold">
				<p className="text-xs lg:text-sm text-[#ff5c40]">Shipping Address</p>
				<p className="text-xs text-gray-600">
					Order ID - {orderDetails.order_id}
				</p>
			</div>
			<div className="text-right">
				<Button type="default" onClick={showModal}>
					Change Address
				</Button>
			</div>

			<Divider />

			<div className="flex flex-col md:flex-row md:items-center md:justify-between  px-10 text-sm leading-10 tracking-wider">
				<div>
					<p>
						Name:{" "}
						<span className="font-semibold">
							{orderData.first_name} {orderData.last_name}
						</span>
					</p>
					<p>
						Phone Number:{" "}
						<span className="font-semibold">{orderData.phone}</span>
					</p>
					<p>
						Address:{" "}
						<span className="font-semibold">{orderData.address_1}</span>
					</p>
				</div>
				<div>
					<p>
						City: <span className="font-semibold">{orderData.city}</span>
					</p>
					<p>
						State: <span className="font-semibold">{orderData.state}</span>
					</p>
					<p>
						Email: <span className="font-semibold">{orderData.email}</span>
					</p>
				</div>
			</div>
			<div className="text-center my-6">
				<Button
					type="success"
					htmlType="button"
					loading={loading}
					onClick={onFinish}
					className="bg-[#ff5c40] text-white"
				>
					Submit Order
				</Button>
			</div>
			<ShippingAddressModal modalVisible={modalVisible} hideModal={hideModal} />
		</div>
	);
};

export default ReturningUser;
