import { Form, Input, Button } from "antd";

const Password = () => {
	const onFinish = (values) => {
		console.log(values);
	};

	return (
		<div>
			<h1 className="text-center py-2 mb-3 lg:text-xl tracking-wider font-semibold">
				Update Password
			</h1>

			<Form onFinish={onFinish} className="py-10">
				<Form.Item
					label="Old Password"
					name="oldPassword"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
					rules={[
						{
							required: true,
							message: "Please enter your old password",
						},
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					label="New Password"
					name="newPassword"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
					rules={[
						{
							required: true,
							message: "Please enter your new password",
						},
					]}
				>
					<Input.Password />
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

export default Password;
