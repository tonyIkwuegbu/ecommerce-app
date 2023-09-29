import { api } from "../../Api";
import { useCallback, useEffect, useState } from "react";
import Axios from "axios";
import { Divider, Table } from "antd";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/CurrencyFormat";

const ViewOrders = () => {
	const user = useSelector((state) => state.auth.user);
	const [allOrders, setAllOrders] = useState([]);
	const [loading, setLoading] = useState(false);

	//*********************************************** FETCH ALL SUPPLIERS
	const getOrders = useCallback(async () => {
		setLoading(true);
		try {
			const getData = await Axios.get(
				`${api.baseURL}/api/v1/ecommerce/order/email/${user.email}`,
				{
					headers: {
						"Content-Type": "application/json",
						"x-access-token": api.token,
					},
				},
			);

			if (getData.data.status === true) {
				const sortedOrders = getData.data.data
					.map((item, idx) => ({
						key: getData.data.data.length - idx, // Reversed serial number
						id: item?.order_id,
						paid: item?.paid_amount,
						date: item?.order_create_date || "N/A",
						status: item?.payment_status,
						channel: item?.payment_channel,
						first_name: item?.customer_details?.first_name,
						last_name: item?.customer_details?.last_name,
						address: item?.customer_details?.address_1,
						email: item?.customer_details?.email,
						number: item?.customer_details?.phone,
						product: item?.products,
						image: item?.main_picture,
					}))
					.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by most recent order date

				setAllOrders(sortedOrders);
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}, [user.email]);

	useEffect(() => {
		getOrders();
	}, [getOrders]);

	//TABLE DATA
	const columns = [
		{
			title: "S/N",
			dataIndex: "key",
			key: "key",
		},
		{
			title: "Order ID",
			dataIndex: "id",
			key: "id",
			align: "center",
			render: (text) => (
				<span className="capitalize text-gray-600 tracking-wider font-semibold">
					{text}
				</span>
			),
		},

		{
			title: `Total Amount (₦)`,
			dataIndex: "paid",
			key: "paid",
			align: "center",
			render: (text) => (
				<span className="capitalize text-gray-600 font-semibold tracking-wider">
					{text}
				</span>
			),
		},

		{
			title: "Date Created",
			dataIndex: "date",
			align: "center",
			key: "date",
			render: (text) => (
				<span className="capitalize text-blue-600 font-semibold">
					{new Date(text).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</span>
			),
		},

		{
			title: "Payment Status",
			dataIndex: "status",
			align: "center",
			key: "status",
			render: (text) => (
				<span className="capitalize text-green-600 font-semibold">
					{text === "paid" ? "Successful" : text}
				</span>
			),
		},
	];

	return (
		<div>
			<Table
				columns={columns}
				scroll={{ x: true }}
				title={() => (
					<h3 className="tracking-wider font-semibold font-pop text-center">
						Your Orders List{" "}
					</h3>
				)}
				style={{ width: "100%" }}
				expandable={{
					expandedRowRender: (record) => (
						<div className="w-full mx-auto tracking-wider capitalize">
							<h3 className="text-lg lg:text-2xl text-gray-500 text-center tracking-wider font-semibold">
								Order Details
							</h3>
							<div className="flex-col lg:flex lg:flex-row lg:items-center lg:justify-between mr-10 text-[12px] font-semibold py-6 leading-6">
								<div>
									<p className="flex items-center justify-start gap-x-1">
										Customer Name:{" "}
										<span className="text-gray-600">
											{record.first_name} {record.last_name}
										</span>
									</p>
									<p className="flex items-center justify-start gap-x-1">
										Phone Number:{" "}
										<span className="text-gray-600">{record?.number}</span>
									</p>
									<p className="flex items-center justify-start gap-x-1">
										Address:{" "}
										<span className="text-green-500">{record?.address}</span>
									</p>
									<p className="flex items-center justify-start gap-x-1">
										Payment Status:{" "}
										<span className="text-green-500">
											{record.status === "paid" ? "Successful" : record?.status}
										</span>
									</p>
								</div>
								<div>
									<p className="flex items-center justify-start gap-x-1">
										Order ID:{" "}
										<span className="text-gray-600">{record?.id}</span>
									</p>
									<p className="flex items-center justify-start gap-x-1">
										Payment Channel:{" "}
										<span className="text-gray-600">{record?.channel}</span>
									</p>
									<p className="flex items-center justify-start gap-x-1">
										Customer Email:{" "}
										<span className="text-blue-500 lowercase">
											{record?.email}
										</span>
									</p>
									<p className="flex items-center justify-start gap-x-1">
										Total Amount:{" "}
										<span className="text-blue-500 lowercase">
											{formatCurrency(record?.paid)}
										</span>
									</p>
								</div>
							</div>
							<Divider />
							<div>
								<table className="border-collapse w-full my-4">
									<thead>
										<tr>
											<th className="border-b-2 border-black px-4 py-2 bg-gray-200"></th>
											<th className="border-b-2 border-black px-4 py-2 bg-gray-200">
												Product Code
											</th>
											<th className="border-b-2 border-black px-4 py-2 bg-gray-200">
												Product Amount
											</th>
											<th className="border-b-2 border-black px-4 py-2 bg-gray-200">
												{" "}
												Quantity
											</th>
											<th className="border-b-2 border-black px-4 py-2 bg-gray-200">
												{" "}
												Weight (Kg)
											</th>
										</tr>
									</thead>
									<tbody>
										{record?.product?.map((el) => (
											<tr
												key={el.idl_product_code}
												align="center"
												className="leading-10"
											>
												<td className="border-black px-4 py-2">
													<img
														src={
															el?.main_picture === "" ||
															el?.main_picture === undefined
																? "/images/home-placeholder.jpeg"
																: el?.main_picture
														}
														alt={el?.product_name}
														className="h-24 w-24 object-cover rounded-sm"
													/>
												</td>
												<td className="border-r-[1px] border-black px-4 py-2">
													{el.idl_product_code}
												</td>
												<td className="border-r-[1px] border-black px-4 py-2">
													{formatCurrency(el.naira_price)}
												</td>
												<td className="border-r-[1px] border-black px-4 py-2">
													{el.quantity}
												</td>
												<td>{el.weight}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					),
				}}
				dataSource={allOrders}
				loading={loading}
			/>
		</div>
	);
};

export default ViewOrders;
