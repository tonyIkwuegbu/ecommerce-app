import { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../../store/cartSlice";
import { Button, Divider, Empty, Modal, Spin, message } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { api } from "../../Api";
import { getSummary } from "../../store/orderSlice";
import { useCart } from "../../utils/CartUtils";

const Cart = () => {
	const navigate = useNavigate();
	const cartItems = useSelector((state) => state.cart);
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [loadingCart, setLoadingCart] = useState(false);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [itemToDelete, setItemToDelete] = useState(null);
	const [userCartItems, setUserCartItems] = useState([]);
	const [itemQuantities, setItemQuantities] = useState({});
	const { fetchUserCart } = useCart();

	const allItems = (isAuthenticated ? userCartItems : cartItems) || [];

	// ******************************************************* GET AUTH USER CART ITEMS
	useEffect(() => {
		if (isAuthenticated) {
			setLoadingCart(true);

			fetchUserCart(user)
				.then((cartItems) => {
					setUserCartItems(cartItems);
					setLoadingCart(false);
				})
				.catch((error) => {
					// Handle error
					console.error("Error fetching user's cart:", error);
					setLoadingCart(false);
				});
		}
	}, [isAuthenticated, user, fetchUserCart]);

	if (loadingCart) {
		return (
			<div className="flex items-center justify-center mx-auto h-screen">
				<Spin />
			</div>
		);
	}

	// *************************************************** cal total of items
	const totalPrice = allItems.reduce(
		(total, item) =>
			total + (itemQuantities[item.idl_product_code] || 1) * item.naira_price,
		0,
	);

	// ************************************************** cal item total price
	const renderPrice = (item) => {
		const productQty =
			(itemQuantities[item.idl_product_code] || 1) * item.naira_price;
		return productQty;
	};

	// **************************************************** removeItems handler
	const handleConfirmDelete = () => {
		if (itemToDelete) {
			if (isAuthenticated) {
				// For authenticated users, make an API call to delete the item
				const email = user.email;
				const idl_product_code = itemToDelete.idl_product_code;

				Axios.delete(`${api.baseURL}/api/v1/ecommerce/cart/record/${email}`, {
					data: { idl_product_code },
					headers: {
						"x-access-token": api.token,
					},
				})
					.then((response) => {
						if (response.data && response.data.status === true) {
							//Item deleted successfully from the API
							fetchUserCart(user)
								.then((cartItems) => {
									setUserCartItems(cartItems); // Update the cart items
									message.success(response.data.message);
								})
								.catch((error) => {
									console.error("Error fetching user's cart:", error);
								});
						} else {
							message.error(response.data.message || "Failed to delete item.");
						}
					})
					.catch((error) => {
						console.error("Error deleting item from API:", error);
						message.error("An error occurred while deleting item.");
					});
			} else {
				// For non-authenticated users, dispatch the remove action directly
				dispatch(remove(itemToDelete.idl_product_code));
			}

			setDeleteModalVisible(false); // Close the modal after confirming deletion
		}
	};

	const handleCancelDelete = () => {
		setItemToDelete(null);
		setDeleteModalVisible(false);
	};

	const removeFromCart = (item) => {
		setItemToDelete(item);
		setDeleteModalVisible(true);
	};

	// ****************************************************HANDLE EMPTY CART

	if (allItems.length === 0) {
		return (
			<div className="flex items-center justify-center mx-auto h-screen">
				<Empty className="" description="No items in cart." />{" "}
			</div>
		);
	}

	/// ************************************ CURRENCY FORMAT
	const formattedAmount = new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
	});

	//***********************************************GENERATE ORDER ID AND GO TO CHECKOUT
	const generateID = async () => {
		setLoading(true);
		if (!isAuthenticated) {
			// User is not logged in, show a message or redirect to login/registration
			message.error("You must be logged in before proceeding to checkout.");
			setLoading(false);
			return;
		}
		const params = {
			products: cartItems.map((item) => {
				return {
					idl_product_code: item.idl_product_code,
					supplier_id: item.supplier_id,
					amount: item.retail_price,
					weight: item.weight,
					quantity: item.qty,
					main_picture: item.main_picture,
					size: item.size,
					product_name: item.name || item.brand || item.model,
				};
			}),
		};

		await Axios(`${api.baseURL}/api/v1/ecommerce/generate/ordersummary`, {
			method: "POST",
			data: JSON.stringify(params),
			headers: {
				"content-type": "application/json",
				"x-access-token": api.token,
			},
		})
			.then((res) => {
				if (res && res.data && res.data.status === true) {
					const user = res.data;
					console.log("view", user);
					message.success("Order generated successfully");
					dispatch(getSummary(user));

					setTimeout(() => {
						navigate("/checkout");
					}, 3000);
				} else {
					message.info(`${res?.data?.message || "Something went wrong"}`);
				}

				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);

				if (
					err.response.status === 401 ||
					err.response.status === 404 ||
					err.response.status === 405
				) {
					message.error(`${err.response.data.message}`);
				} else {
					message.error("Something went wrong");
				}
			});
	};

	//**************************** */ Function to update quantity for a specific cart item
	const updateItemQuantity = (itemId, newQuantity) => {
		setItemQuantities((prevQuantities) => ({
			...prevQuantities,
			[itemId]: newQuantity,
		}));
	};

	return (
		<section className="max-w-[98%]">
			<div className="flex items-center justify-between p-2">
				<h3 className="text-lg lg:text-3xl font-semibold text-gray-500">
					Shopping Cart
				</h3>
				<Button type="default" className="" onClick={() => navigate("/")}>
					Continue Shopping
				</Button>
			</div>
			<Divider />
			<div className="flex flex-col lg:flex-row justify-between  overflow-hidden">
				<div className="mx-4 w-auto lg:w-[70%]">
					{allItems?.map((cartItem) => (
						<div
							key={cartItem.idl_product_code}
							className="grid grid-cols-1 lg:grid-cols-2 items-start gap-x-10 shadow-lg p-6 rounded-md my-6 h-auto bg-white"
						>
							<div className="grid grid-cols-1 lg:grid-cols-2 ">
								<img
									src={
										cartItem.main_picture === "" ||
										cartItem.main_picture === null
											? "/images/home-placeholder.jpeg"
											: cartItem.main_picture
									}
									alt={cartItem.name}
									className="pb-8 lg:pb-0"
									style={{ width: "100px", height: "auto" }}
								/>

								<div className="flex-col">
									<h4 className="text-gray-500 text-xs lg:text-sm">
										{cartItem.name}
									</h4>

									<p className="font-semibold text-xs lg:sm py-3">
										Color{" "}
										<abbr className="text-gray-600">{cartItem.colour}</abbr>
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
											<abbr className="text-xs">X</abbr>{" "}
											{itemQuantities[cartItem.idl_product_code] || 1}{" "}
										</span>{" "}
									</p>
									<div className="flex space-x-3 justify-end">
										<button
											className="incCart p-1"
											onClick={() => {
												const newQuantity =
													(itemQuantities[cartItem.idl_product_code] || 1) + 1;
												updateItemQuantity(
													cartItem.idl_product_code,
													newQuantity,
												);
											}}
										>
											{" "}
											<AiOutlinePlus
												className="mx-auto"
												title="increase qty"
											/>{" "}
										</button>
										<button
											className="desCart p-1"
											onClick={() => {
												const currentQuantity =
													itemQuantities[cartItem.idl_product_code] || 1;
												const newQuantity =
													currentQuantity > 1 ? currentQuantity - 1 : 1;
												updateItemQuantity(
													cartItem.idl_product_code,
													newQuantity,
												);
											}}
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
										{formattedAmount.format(renderPrice(cartItem))}
									</span>{" "}
								</p>
							</div>
							<MdDeleteForever
								title="remove from cart"
								onClick={() => removeFromCart(cartItem)}
								className="text-red-500 mt-6 text-xl hover:animate-pulse cursor-pointer"
							/>
							<Modal
								title="Confirm Delete"
								open={deleteModalVisible}
								onCancel={handleCancelDelete}
								footer={[
									<Button key="cancel" onClick={handleCancelDelete}>
										Cancel
									</Button>,
									<Button
										key="delete"
										type="danger"
										onClick={handleConfirmDelete}
										className="text-red-500 font-semibold"
									>
										Delete
									</Button>,
								]}
							>
								Are you sure you want to remove this item from the cart?
							</Modal>
						</div>
					))}
				</div>

				<div className="shadow-lg p-4 my-6 lg:inline-block justify-around tracking-wider w-auto lg:w-[25%] h-[55vh] bg-white">
					<div className="flex items-center justify-between text-sm font-semibold">
						<p className="text-[#ff5c40]">Order Summary</p>
						<p>
							{allItems.length} {allItems.length > 1 ? "Items" : "Item"}
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
						<h4 className="font-semibold">
							{formattedAmount.format(totalPrice)}
						</h4>
					</div>
					<Divider />

					<div className="flex items-center justify-between text-sm font-semibold">
						<p className="">Total</p>
						<h4 className="text-green-500">
							{formattedAmount.format(totalPrice)}
						</h4>
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
