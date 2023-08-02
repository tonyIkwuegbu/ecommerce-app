import { Tabs } from "antd";
import ViewOrders from "./ViewOrders";

const { TabPane } = Tabs;

const OrdersPage = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100  overflow-hidden">
			<div className="w-full lg:w-[70%] bg-white shadow-lg rounded-md px-6 h-[90vh] overflow-y-scroll">
				<h1 className="text-center text-2xl font-bold mb-6 py-3">
					Your Orders
				</h1>
				<div className="">
					{" "}
					<Tabs defaultActiveKey="profile">
						<TabPane tab="View Orders" key="profile">
							<ViewOrders />
						</TabPane>
						<TabPane tab="Track Orders" key="track">
							coming soon
						</TabPane>
						<TabPane tab="Cancelled Orders" key="cancelled">
							coming soon
						</TabPane>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default OrdersPage;
