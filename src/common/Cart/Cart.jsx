import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { Card, Empty } from "antd";
import { MdCancel } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { remove, add, updateCart, decreaseQty } from "../../store/cartSlice";

const Cart = () => {
	const cartItems = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	// ************ cal total of items
	const totalPrice = cartItems.reduce(
		(price, item) => price + item.qty * item.price,
		0,
	);

	// ************ cal item total price
	const renderPrice = (item) => {
		const productQty = item.price * item.qty;
		return productQty;
	};

	// ************ remove handler
	const removeFromCart = (id) => {
		dispatch(remove(id));
	};

	// ************************************* Dispatch handler to add
	const addToCart = (productItem) => {
		// Check if the product already exists in the cart
		const productExist = cartItems.find((item) => item.id === productItem.id);

		if (productExist) {
			// Product already exists in the cart, update the quantity
			const updatedCartItems = cartItems.map((item) =>
				item.id === productItem.id ? { ...item, qty: item.qty + 1 } : item,
			);

			dispatch(updateCart(updatedCartItems));
		} else {
			// Product doesn't exist in the cart, add it
			const newCartItem = { ...productItem, qty: 1 };
			dispatch(add(newCartItem));
		}
	};

	return (
		<section className="">
			<div className="shadow-lg p-4 my-6 flex flex-col items-start lg:flex-row lg:justify-around text-sm lg:text-xl tracking-wider">
				<h2 className="text-gray-500 pb-3 lg:pb-0">Cart Summary</h2>
				<div className="flex">
					<h4>
						Total Price :{" "}
						<span className="text-green-500 font-semibold">
							${totalPrice}.00
						</span>{" "}
					</h4>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  mx-auto max-w-[90%] px-10 my-24">
				{cartItems && cartItems.length > 0 ? (
					cartItems?.map((cartItem) => (
						<Card
							key={cartItem.id}
							hoverable
							title={cartItem.name}
							extra={
								<MdCancel
									className="hover:text-red-500 text-lg"
									title="remove from cart"
									onClick={() => removeFromCart(cartItem.id)}
								/>
							}
							className="w-[300px]"
							cover={<img src={cartItem.cover} alt="" />}
						>
							<div className="my-4 leading-6 tracking-wider text-gray-500 font-ubuntu font-semibold">
								<p>
									Quantity:{" "}
									<span className="text-[#e94560]">
										${cartItem.price}.00 * {cartItem.qty}
									</span>
								</p>
								<p>
									Price:{" "}
									<span className="text-green-500">
										${renderPrice(cartItem)}
									</span>
								</p>

								<div className="cartControl flex justify-end">
									<button
										className="incCart"
										onClick={() => addToCart(cartItem)}
									>
										<AiOutlinePlus className="mx-auto" title="increase qty" />
									</button>
									<button
										className="desCart"
										onClick={() => dispatch(decreaseQty(cartItem.id))}
									>
										<AiOutlineMinus className="mx-auto" title="decrease qty" />
									</button>
								</div>
							</div>
						</Card>
					))
				) : (
					<div className="min-h-[200px]">
						<Empty className="" description="No items in Cart" />
					</div>
				)}
			</div>
		</section>
	);
};

export default Cart;
