import { Form, Input, Select, Button, Checkbox, Divider } from "antd";
import CountryCodes from "../../../countryCodes.json";
import NigeriaStates from "../../../nigeriaStates.json";

const { Option } = Select;

const FirstTimeUserForm = ({
	orderData,
	onFinish,
	isFormComplete,
	setSaveDetails,
	handleCountryCodeChange,
	handleInputChange,
	handleStateChange,
	loading,
	selectedCountryCode,
	selectedState,
	saveDetails,
	isAuthenticated,
	orderDetails,
}) => {
	const [form] = Form.useForm();
	return (
		<div className="bg-white py-8 px-6 shadow-md rounded-md">
			<div className="flex items-center justify-between px-5 tracking-wider py-5 font-semibold">
				<p className="text-xs lg:text-sm text-[#ff5c40]">Shipping Address</p>
				<p className="text-xs text-gray-600">
					Order ID - {orderDetails.order_id}
				</p>
			</div>
			<Divider />
			<Form
				form={form}
				onFinish={onFinish}
				layout="vertical"
				className="px-10 mx-auto"
				initialValues={{
					...orderData,
				}}
			>
				<Form.Item
					label="First Name"
					rules={[
						{
							required: true,
							message: "Please enter your First Name",
						},
					]}
				>
					<Input
						name="first_name"
						value={orderData.first_name}
						onChange={(e) => handleInputChange("first_name", e.target.value)}
					/>
				</Form.Item>

				<Form.Item
					label="Last Name"
					rules={[{ required: true, message: "Please enter your Last Name" }]}
				>
					<Input
						name="last_name"
						value={orderData.last_name}
						onChange={(e) => handleInputChange("last_name", e.target.value)}
					/>
				</Form.Item>
				<Form.Item
					label="Phone Number"
					rules={[
						{ required: true, message: "Please enter your Phone Number" },
					]}
				>
					<Input
						name="phone"
						value={orderData.phone}
						addonBefore={
							<Select
								defaultValue={selectedCountryCode}
								onChange={handleCountryCodeChange}
							>
								{CountryCodes.map((country) => (
									<Option key={country.dial_code} value={country.dial_code}>
										{`${country.name} (${country.dial_code})`}
									</Option>
								))}
							</Select>
						}
						onChange={(e) => handleInputChange("phone", e.target.value)}
					/>
				</Form.Item>

				<Form.Item
					label="Email Address"
					rules={[
						{ required: true, message: "Please enter your Email Address" },
						{ type: "email", message: "Invalid email format" },
					]}
				>
					<Input
						name="email"
						value={orderData.email}
						onChange={(e) => handleInputChange("email", e.target.value)}
					/>
				</Form.Item>

				<Form.Item
					label="Shipping State"
					rules={[
						{ required: true, message: "Please select your Shipping State" },
					]}
				>
					<Select value={selectedState} onChange={handleStateChange}>
						{NigeriaStates.map((state) => (
							<Option key={state} value={state}>
								{state}
							</Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item
					label="Shipping City"
					rules={[
						{ required: true, message: "Please enter your Shipping City" },
					]}
				>
					<Input
						name="city"
						value={orderData.city}
						onChange={(e) => handleInputChange("city", e.target.value)}
					/>
				</Form.Item>
				<Form.Item
					label="Shipping Address 1"
					rules={[
						{
							required: true,
							message: "Please enter your Shipping Address 1",
						},
					]}
				>
					<Input
						name="address_1"
						value={orderData.address_1}
						onChange={(e) => handleInputChange("address_1", e.target.value)}
					/>
				</Form.Item>

				<Form.Item label="Shipping Address 2" name="address_2">
					<Input
						name="address_2"
						value={orderData.address_2}
						onChange={(e) => handleInputChange("address_2", e.target.value)}
					/>
				</Form.Item>

				<Form.Item
					label="Shipping Country"
					name="country"
					rules={[
						{
							required: true,
							message: "Please select your Shipping Country",
						},
					]}
				>
					<Select onChange={(value) => handleInputChange("country", value)}>
						<Option value={orderData.country}>Nigeria</Option>
					</Select>
				</Form.Item>
				<Form.Item>
					{isAuthenticated && (
						<Checkbox
							checked={saveDetails}
							onChange={(e) => setSaveDetails(e.target.checked)}
						>
							Save details for future orders
						</Checkbox>
					)}
				</Form.Item>

				<Form.Item style={{ textAlign: "center" }}>
					<Button
						type="success"
						htmlType="submit"
						loading={loading}
						disabled={!isFormComplete()}
						className="bg-[#ff5c40] text-white disabled:cursor-not-allowed disabled:bg-gray-400"
					>
						Submit Order
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default FirstTimeUserForm;
