import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Empty } from "antd";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
	const navigate = useNavigate();

	const orderDetails = useSelector((state) => state.order.order);
	const cartItems = useSelector((state) => state.cart);

	// ************ cal item total price
	const renderPrice = (item) => {
		const productQty = item.retail_price * item.qty;
		return productQty;
	};

	if (cartItems.length === 0) {
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
				<div className="w-full lg:w-[65%] bg-white lg:mx-6 shadow-lg rounded-md">
					<div className="flex items-center justify-between px-5 tracking-wider py-5 font-semibold">
						<p className=" text-xs lg:text-sm text-[#ff5c40]">
							Shipping Address
						</p>
						<p className="text-xs text-gray-600">
							Order ID - {orderDetails.order_id}
						</p>
					</div>

					<Divider />
					<CheckoutForm cartItems={cartItems} />
				</div>

				<div className="shadow-lg p-4 my-6 lg:inline-block justify-around tracking-wider bg-white w-auto lg:w-[30%] h-[85vh]">
					<div className="flex items-center justify-between text-sm font-semibold">
						<p className="text-[#ff5c40]">Order Details</p>
						<p>
							{cartItems.length} {cartItems.length > 1 ? "Items" : "Item"}
						</p>
					</div>
					<Divider />
					<div className="h-[35vh] overflow-y-scroll">
						{cartItems &&
							cartItems.length > 0 &&
							cartItems?.map((cartItem) => (
								<div
									key={cartItem.idl_product_code}
									className="grid grid-cols-2 items-start gap-x-4  p-6 my-6 h-[30vh] bg-gray-50 rounded-sm"
								>
									<img
										src={
											cartItem.main_picture === "" ||
											cartItem.main_picture === null
												? "/images/placeholder.jpeg"
												: cartItem.main_picture
										}
										alt={cartItem.name || cartItem.model || cartItem.brand}
										className="pb-8 lg:pb-0 cov"
										style={{ width: "100px", height: "auto" }}
									/>

									<div className="flex-col">
										<h4 className="text-gray-500 text-xs">
											{cartItem.name || cartItem.model || cartItem.brand}
										</h4>

										<p className="font-semibold text-xs lg:sm py-3">
											Sold by{" "}
											<abbr className="text-[#ff5c00]">
												{cartItem.supplier_name}
											</abbr>
										</p>
										<p className="font-semibold text-xs lg:sm py-2">
											Price:{" "}
											<span className="text-green-600]">
												{formattedAmount.format(renderPrice(cartItem))}
											</span>{" "}
										</p>
										<p className="font-semibold text-xs lg:sm py-2">
											Quantity:{" "}
											<span className="text-gray-600">
												<abbr className="">X</abbr> {cartItem.qty}{" "}
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
							&#8358; {orderDetails.shipping_cost}
						</h4>
					</div>
					<Divider />
					<div className="flex items-center justify-between text-xs">
						<p>Products Amount</p>
						<h4 className="font-semibold">
							&#8358; {orderDetails.products_amount}
						</h4>
					</div>
					<Divider />

					<div className="flex items-center justify-between text-sm font-semibold">
						<p className="">Total</p>
						<h4 className="text-green-500">
							&#8358; {orderDetails.total_amount}
						</h4>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Checkout;
