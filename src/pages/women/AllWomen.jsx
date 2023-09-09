import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Divider, Empty, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ProductSkeleton from "../../components/ProductSkeleton";
import { useNavigate } from "react-router-dom";
import { IoIosBasket } from "react-icons/io";
import { BsFillCartCheckFill } from "react-icons/bs";
import { add } from "../../store/cartSlice";
import { useCart } from "../../utils/CartUtils";

const AllWomen = ({ data, loading }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	//const [count, setCount] = useState([]);
	const user = useSelector((state) => state.auth.user);
	const userIsAuthenticated = useSelector(
		(state) => state.auth.isAuthenticated,
	);
	const [isLoading, setIsLoading] = useState(false);
	const { addToCartApi } = useCart();

	// Set initial count values when data changes
	// useEffect(() => {
	// 	if (data && data.length > 0) {
	// 		setCount(Array(data.length).fill(0));
	// 	}
	// }, [data]);

	/// ********************************* increase likes
	// const increment = (index) => {
	// 	const updatedCounts = [...count];
	// 	updatedCounts[index] += 1;
	// 	setCount(updatedCounts);
	// };

	// ******************************************************HANDLE CART
	const handleAddToCart = async (productItem) => {
		if (!userIsAuthenticated) {
			dispatch(add(productItem)); // Handle non-authenticated user's cart
			return; // Exit the function early if the user is not authenticated
		}

		try {
			setIsLoading(true);
			await addToCartApi(user, productItem.idl_product_code);
		} catch (error) {
			console.log("Error adding item to cart:", error);
		} finally {
			setIsLoading(false);
		}
	};
	/// ************************************ CURRENCY FORMAT
	const formattedAmount = new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
	});

	/// ******************************************** LOADING STATE
	if (loading) {
		return <ProductSkeleton />;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-3">
			{data?.length > 0 ? (
				data?.map((productItems) => (
					<div className="" key={productItems?.idl_product_code}>
						<div className="group h-[96] w-[300px] p-[20px] m-[8px] shadow-md rounded-md bg-white relative">
							<div className="h-[200px] w-[200px] mx-auto">
								<img
									loading="lazy"
									src={
										productItems.main_picture === "" ||
										productItems.main_picture === null
											? "/images/women-placeholder.jpeg"
											: productItems.main_picture
									}
									alt={productItems.name}
									onClick={() =>
										navigate(
											`/product/${productItems.idl_product_code}/${productItems.supplier_id}`,
										)
									}
									className="transition-all hover:scale-110 duration-500 ease-in-out object-cover cursor-pointer w-full h-full rounded"
								/>
								<div className="absolute top-0 right-0 cursor-pointer  m-[10px] opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out">
									<AiOutlineHeart className="mb-2" />
									<IoIosBasket className="" />
								</div>

								{/* <div className="product-like">
									<label>{count[index]}</label> <br />
									<AiOutlineHeart
										onClick={() => increment(index)}
										className="arrow"
									/>
								</div> */}
							</div>
							<Divider />
							<div className="font-semibold tracking-wide ">
								<h3 className="text-[13px] text-gray-600 py-1 text-center truncate">
									{productItems?.name}
								</h3>

								<p className="py-2 text-[#232f3e] text-xs">
									Size: <span>{productItems?.size || "N/A"}</span>
								</p>

								<div className="price flex items-center tracking-wider justify-between">
									<h4 className="text-green-500">
										{formattedAmount.format(productItems?.naira_price)}
									</h4>
									<button
										type="button"
										onClick={() => handleAddToCart(productItems)}
										title="Add to cart"
										disabled={isLoading[productItems?.idl_product_code]}
									>
										{isLoading[productItems?.idl_product_code] ? (
											<Spin size="small" />
										) : (
											<BsFillCartCheckFill className="mx-auto" />
										)}
									</button>
								</div>
							</div>
						</div>
					</div>
				))
			) : (
				<div className="flex items-center justify-center mx-auto h-screen">
					<Empty className="" description="No Product available." />{" "}
				</div>
			)}
		</div>
	);
};

export default AllWomen;
