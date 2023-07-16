import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { remove, add, decreaseQty } from "../../store/cartSlice";
import { Empty } from "antd";
import { MdDeleteForever } from "react-icons/md";

const Cart = () => {
	const cartItems = useSelector((state) => state.cart);
	const dispatch = useDispatch();

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

	if (cartItems.length === 0) {
		return (
			<div className="flex items-center justify-center mx-auto h-screen">
				<Empty className="" description="No items in cart." />{" "}
			</div>
		);
	}

	return (
		<section className="flex justify-between max-w-[98%]">
			<div className="mx-4 w-full lg:w-[70%]">
				{cartItems &&
					cartItems.length > 0 &&
					cartItems?.map((cartItem) => (
						<div
							key={cartItem.idl_product_code}
							className="flex items-start space-x-16 lg:space-x-20 shadow-lg p-6 rounded-md my-16 h-[40vh] w-full"
						>
							<img
								src={
									cartItem.main_picture === "" || cartItem.main_picture === null
										? "/images/placeholder.jpeg"
										: cartItem.main_picture
								}
								alt={cartItem.name || cartItem.model}
								className=""
								style={{ width: "100px", height: "auto" }}
							/>

							<div className="flex flex-col tracking-wider font-semibold">
								<h4 className="text-gray-500 text-xs lg:text-lg">
									{cartItem.name || cartItem.model}
								</h4>
								<div className="flex items-center space-x-4">
									<p className="font-semibold text-xs lg:sm py-3">
										Sold by{" "}
										<abbr className="text-[#ff5c00]">
											{cartItem.supplier_name}
										</abbr>
									</p>
									<p className="font-semibold text-xs lg:sm py-3">
										Size:{" "}
										<abbr className="text-[#ff5c00]">
											{cartItem.size || "N/A"}
										</abbr>
									</p>
								</div>

								<div className="flex items-center space-x-12 py-1">
									<p className="text-xs lg:text-sm">
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

								<p className="text-xs lg:text-sm pt-3">
									Price:{" "}
									<span className="text-[#ff5c00]">
										{cartItem.currency} {renderPrice(cartItem)}
									</span>{" "}
								</p>

								<MdDeleteForever
									title="remove from cart"
									onClick={() => removeFromCart(cartItem.idl_product_code)}
									className="text-red-500 mt-6 text-xl hover:animate-pulse cursor-pointer"
								/>
							</div>
						</div>
					))}
			</div>
			<div className="hidden shadow-lg p-4 my-6 lg:inline-block justify-around text-xs lg:text-xl tracking-wider w-[25%]">
				<h2 className="text-gray-500 pb-3 lg:pb-0">Cart Summary</h2>
				<div className="flex">
					<h4>
						Total Price :{" "}
						<span className="text-green-500 font-semibold">
							EUR {totalPrice}
						</span>{" "}
					</h4>
				</div>
			</div>
		</section>
	);
};

export default Cart;
