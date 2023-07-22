import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { remove, add, decreaseQty } from "../../store/cartSlice";
import { Button, Divider, Empty, message } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { api } from "../../Api";

const Cart = () => {
	const navigate = useNavigate();
	const cartItems = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	// ************ cal total of items
	const totalPrice = cartItems.reduce(
		(price, item) => price + item.qty * item.retail_price,
		0,
	);

	// ************ cal item total price
	const renderPrice = (item) => {
		const productQty = item.retail_price * item.qty;
		return productQty;
	};

	// ************ remove handler
	const removeFromCart = (id) => {
		dispatch(remove(id));
	};

	// ************************************* Dispatch handler
	const addToCart = (productItem) => {
		dispatch(add(productItem));
	};

	// ****************************************************HANDLE EMPTY CART

	if (cartItems.length === 0) {
		return (
			<div className="flex items-center justify-center mx-auto h-screen">
				<Empty className="" description="No items in cart." />{" "}
			</div>
		);
	}

	const handleContinueShopping = () => {
		navigate("/");
	};

	//***********************************************GENERATE ORDER ID AND GO TO CHECKOUT

	const generateID = async () => {
		setLoading(true);
		try {
			const getID = await Axios.get(
				`${api.baseURL}/api/v1/ecommerce/generate/orderid`,
				{
					headers: {
						"Content-Type": "application/json",
						"x-access-token": api.token,
					},
				},
			);

			const generatedID = getID.data.data;
			sessionStorage.setItem("random", generatedID);
			setTimeout(() => {
				navigate("/checkout");
			}, 3000);

			message.success(`Order Id: ${getID.data.data} generated successfully`);
			setLoading(false);
		} catch (error) {
			console.log(error);
			message.error(`${error.message}`);
			setLoading(false);
		}
	};

	return (
		<section className="max-w-[98%]">
			<div className="flex items-center justify-between p-2">
				<h3 className="text-lg lg:text-3xl font-semibold text-gray-500">
					Shopping Cart
				</h3>
				<Button type="default" className="" onClick={handleContinueShopping}>
					Continue Shopping
				</Button>
			</div>
			<Divider />
			<div className="flex flex-col lg:flex-row justify-between  overflow-hidden">
				<div className="mx-4 w-auto lg:w-[70%]">
					{cartItems &&
						cartItems.length > 0 &&
						cartItems?.map((cartItem) => (
							<div
								key={cartItem.idl_product_code}
								className="grid grid-cols-1 lg:grid-cols-2 items-start gap-x-10 shadow-lg p-6 rounded-md my-6 h-auto"
							>
								<div className="grid grid-cols-1 lg:grid-cols-2 ">
									<img
										src={
											cartItem.main_picture === "" ||
											cartItem.main_picture === null
												? "/images/placeholder.jpeg"
												: cartItem.main_picture
										}
										alt={cartItem.name || cartItem.model}
										className="pb-8 lg:pb-0"
										style={{ width: "100px", height: "auto" }}
									/>

									<div className="flex-col">
										<h4 className="text-gray-500 text-xs lg:text-sm">
											{cartItem.name || cartItem.model || cartItem.brand}
										</h4>

										<p className="font-semibold text-xs lg:sm py-3">
											Sold by{" "}
											<abbr className="text-[#ff5c00]">
												{cartItem.supplier_name}
											</abbr>
										</p>
										<p className="font-semibold text-xs lg:sm py-1">
											Size:{" "}
											<abbr className="text-[#ff5c00]">
												{cartItem.size || "N/A"}
											</abbr>
										</p>
									</div>
								</div>

								<div className="grid grid-cols-1 items-center tracking-wider font-semibold">
									<div className="flex items-center space-x-12">
										<p className="text-xs">
											Quantity:{" "}
											<span className="text-green-600">
												<abbr className="text-xs">X</abbr> {cartItem.qty}{" "}
											</span>{" "}
										</p>
										<div className="flex space-x-3 justify-end">
											<button
												className="incCart p-1"
												onClick={() => addToCart(cartItem)}
											>
												{" "}
												<AiOutlinePlus
													className="mx-auto"
													title="increase qty"
												/>{" "}
											</button>
											<button
												className="desCart p-1"
												onClick={() =>
													dispatch(decreaseQty(cartItem.idl_product_code))
												}
											>
												{" "}
												<AiOutlineMinus
													className="mx-auto"
													title="decrease qty"
												/>{" "}
											</button>{" "}
										</div>
									</div>

									<p className="text-xs pt-2">
										Price:{" "}
										<span className="text-[#ff5c00]">
											{cartItem.currency} {renderPrice(cartItem)}
										</span>{" "}
									</p>
								</div>
								<MdDeleteForever
									title="remove from cart"
									onClick={() => removeFromCart(cartItem.idl_product_code)}
									className="text-red-500 mt-6 text-xl hover:animate-pulse cursor-pointer"
								/>
							</div>
						))}
				</div>

				<div className="shadow-lg p-4 my-6 lg:inline-block justify-around tracking-wider w-auto lg:w-[25%] h-[55vh]">
					<div className="flex items-center justify-between text-sm font-semibold">
						<p className="text-[#ff5c40]">Order Summary</p>
						<p>
							{cartItems.length} {cartItems.length > 1 ? "Items" : "Item"}
						</p>
					</div>
					<Divider />
					<div className="flex items-center justify-between text-xs">
						<p>Delivery Charges</p>
						<h4>N/A</h4>
					</div>
					<Divider />
					<div className="flex items-center justify-between text-xs">
						<p>SubTotal</p>
						<h4 className="font-semibold">EUR {totalPrice}</h4>
					</div>
					<Divider />

					<div className="flex items-center justify-between text-sm font-semibold">
						<p className="">Total</p>
						<h4 className="text-green-500">EUR {totalPrice}</h4>
					</div>
					<Divider />

					<Button
						type="success"
						htmlType="button"
						loading={loading}
						block
						className="bg-green-500 text-white hover:bg-green-400"
						onClick={generateID}
					>
						Proceed to Checkout
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Cart;
