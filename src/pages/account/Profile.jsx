import { Form, Input, Button } from "antd";
import { useSelector } from "react-redux";

const ProfilePage = () => {
	const user = useSelector((state) => state.auth.user);

	const onFinish = (values) => {
		console.log(values);
	};

	return (
		<div>
			<h1 className="text-center py-2 mb-3 lg:text-xl tracking-wider font-semibold">
				Profile Details
			</h1>

			<Form
				onFinish={onFinish}
				className=""
				initialValues={{
					firstName: user.first_name,
					lastName: user.last_name,
					email: user.email,
					phoneNumber: user.phone,
				}}
			>
				<Form.Item
					label="First Name"
					name="firstName"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
				>
					<Input readOnly />
				</Form.Item>

				<Form.Item
					label="Last Name"
					name="lastName"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
				>
					<Input readOnly />
				</Form.Item>

				<Form.Item
					label="Email"
					name="email"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
				>
					<Input readOnly />
				</Form.Item>

				<Form.Item
					label="Phone Number"
					name="phoneNumber"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
				>
					<Input />
				</Form.Item>

				<Form.Item style={{ textAlign: "center" }}>
					<Button
						type="ghost"
						htmlType="submit"
						className="text-[#ff5c00] mx-auto"
					>
						Save Changes
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default ProfilePage;
