import { Tabs } from "antd";
import ProfilePage from "./Profile";
import Password from "./Password";
//import Transactions from "./Transactions";

const { TabPane } = Tabs;

const MyAccountPage = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full lg:w-[70%] bg-white shadow-lg rounded-md px-6">
				<h1 className="text-center text-2xl font-bold mb-6 py-3">My Account</h1>
				<div className="">
					{" "}
					<Tabs defaultActiveKey="profile">
						<TabPane tab="Profile" key="profile">
							<ProfilePage />
						</TabPane>
						<TabPane tab="Update Password" key="password">
							<Password />
						</TabPane>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default MyAccountPage;
