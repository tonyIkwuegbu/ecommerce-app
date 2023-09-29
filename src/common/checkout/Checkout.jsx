import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Empty } from "antd";
import { formatCurrency } from "../../utils/CurrencyFormat";
import NonAuthCheckout from "./NonAuthCheckout";
import AuthCheckoutMain from "./AuthCheckoutMain";

const Checkout = () => {
	const navigate = useNavigate();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const orderDetails = useSelector((state) => state.order.order);

	if (orderDetails?.length === 0) {
		return (
			<div className="flex items-center justify-center mx-auto h-screen">
				<Empty className="" description="No Order yet." />{" "}
			</div>
		);
	}

	const handleContinueShopping = () => {
		navigate("/cart");
	};

	/// ************************************ CURRENCY FORMAT
	const formattedAmount = new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
	});

	return (
		<section className="max-w-[98%]">
			<div className="flex items-center justify-between p-2">
				<h3 className="text-lg lg:text-3xl font-semibold text-gray-500">
					Checkout
				</h3>
				<Button type="default" className="" onClick={handleContinueShopping}>
					Modify Cart
				</Button>
			</div>
			<Divider />
			<div className="flex flex-col lg:flex-row justify-between overflow-hidden my-10">
				<div className="w-full lg:w-[65%] mx-auto h-auto mb-4 md:mb-0">
					{!isAuthenticated ? <NonAuthCheckout /> : <AuthCheckoutMain />}
				</div>

				<div className="shadow-lg p-4 lg:inline-block justify-around tracking-wider bg-white w-auto lg:w-[30%] h-[90vh]">
					<div className="flex items-center justify-between text-sm font-semibold">
						<p className="text-[#ff5c40]">Order Details</p>
						<p>
							{orderDetails?.products?.length}{" "}
							{orderDetails?.products?.length > 1 ? "Items" : "Item"}
						</p>
					</div>
					<Divider />
					<p className="px-2 text-sm tracking-wider font-semibold">
						Estimated Delivery:{" "}
						<span className="text-green-600">
							{orderDetails?.estimated_delivery}
						</span>
					</p>
					<div className="h-[35vh] overflow-y-scroll">
						{orderDetails &&
							orderDetails?.products?.length > 0 &&
							orderDetails?.products?.map((cartItem) => (
								<div
									key={cartItem.idl_product_code}
									className="grid grid-cols-2 items-start gap-x-4  p-6 my-6 h-[30vh] bg-gray-50 rounded-sm"
								>
									<img
										src={cartItem.main_picture}
										alt={cartItem.name}
										className="pb-8 lg:pb-0 cov"
										style={{ width: "100px", height: "auto" }}
									/>

									<div className="flex-col text-[11px] font-semibold">
										<h4 className="text-gray-500">{cartItem.product_name}</h4>

										<p className=" py-2">
											Size{" "}
											<abbr className="text-[#ff5c00]">{cartItem.size}</abbr>
										</p>
										<p className=" py-1">
											Unit Price:{" "}
											<span className="text-green-600">
												{formattedAmount.format(cartItem.naira_price)}
											</span>{" "}
										</p>
										<p className="py-1">
											Quantity:{" "}
											<span className="text-gray-600">
												<abbr className="">X</abbr> {cartItem.quantity}
											</span>{" "}
										</p>
									</div>
								</div>
							))}
					</div>
					<Divider />
					<div className="flex items-center justify-between text-xs">
						<p>Shipping Cost</p>
						<h4 className="font-semibold">
							{formatCurrency(orderDetails.shipping_cost)}
						</h4>
					</div>
					<Divider />
					<div className="flex items-center justify-between text-xs">
						<p>Products Amount</p>
						<h4 className="font-semibold">
							{formatCurrency(orderDetails.products_amount)}
						</h4>
					</div>
					<Divider />

					<div className="flex items-center justify-between text-sm font-semibold">
						<p className="">Total</p>
						<h4 className="text-green-500">
							{formatCurrency(orderDetails.total_amount)}
						</h4>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Checkout;
