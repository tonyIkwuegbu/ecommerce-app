import { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import { Empty, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { add, updateCart } from "../../store/cartSlice";
// import "react-loading-skeleton/dist/skeleton.css";
// import Skeleton from "react-loading-skeleton";

const AllMen = ({ data, loading }) => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart);
	const [count, setCount] = useState([]);

	// Set initial count values when data changes
	useEffect(() => {
		if (data && data.length > 0) {
			setCount(Array(data.length).fill(0));
		}
	}, [data]);

	/// ********************************* increase likes
	const increment = (index) => {
		const updatedCounts = [...count];
		updatedCounts[index] += 1;
		setCount(updatedCounts);
	};

	// ************************************* Dispatch handler
	const addToCart = (productItem) => {
		// Check if the product already exists in the cart
		const productExist = cartItems.find(
			(item) => item.idl_product_code === productItem.idl_product_code,
		);

		if (productExist) {
			// Product already exists in the cart, update the quantity
			const updatedCartItems = cartItems.map((item) =>
				item.idl_product_code === productItem.idl_product_code
					? { ...item, qty: item.qty + 1 }
					: item,
			);

			dispatch(updateCart(updatedCartItems));
		} else {
			// Product doesn't exist in the cart, add it
			const newCartItem = { ...productItem, qty: 1 };
			dispatch(add(newCartItem));
		}
	};

	return (
		<div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 bg-[#f6f9fc]">
			<>
				{data.length > 0 ? (
					data.map((productItems, index) => (
						<div className="" key={index}>
							<div className="product mt-[40px]">
								<div className="img h-96">
									<img
										loading="lazy"
										src={
											productItems.main_picture === "" ||
											productItems.main_picture === null
												? "/images/placeholder.jpeg"
												: productItems.main_picture
										}
										alt={productItems.name}
										className="transition-all hover:scale-110 duration-500 ease-in-out w-full h-[250px] object-cover"
									/>

									<div className="product-like">
										<label>{count[index]}</label> <br />
										<AiOutlineHeart
											onClick={() => increment(index)}
											className="arrow"
										/>
									</div>
								</div>
								<div className="product-details p-2">
									<h5 className="text-sm">
										{productItems.name || productItems.model}
									</h5>

									<div className="price">
										<h4>
											<span>{productItems.currency} </span>{" "}
											{productItems.retail_price}
										</h4>
										<button
											onClick={() => addToCart(productItems)}
											title="Add to cart"
										>
											<AiOutlinePlus className="mx-auto" />
										</button>
									</div>
								</div>
							</div>{" "}
						</div>
					))
				) : (
					<div className="flex items-center justify-center mx-auto h-screen">
						<Empty className="" description="No Product to display" />
					</div>
				)}
			</>

			{loading && (
				<div className="flex items-center justify-center mx-auto h-screen">
					<Spin />
				</div>
			)}
		</div>
	);
};

export default AllMen;
