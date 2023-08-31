import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../Api";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Divider, Spin } from "antd";
import { IoIosBasket } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import { useCart } from "../../utils/CartUtils";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import MainPageSkeleton from "../MainPageSkeleton";

const ArrivalMain = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { addToCartApi } = useCart();
	const user = useSelector((state) => state.auth.user);
	const userIsAuthenticated = useSelector(
		(state) => state.auth.isAuthenticated,
	);
	const [productData, setProductData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// ******************************************************* GET PRODUCTS
	const getProduct = useCallback(async () => {
		setLoading(true);
		try {
			const fetchData = await Axios.get(
				`${api.baseURL}/api/v1/ecommerce/product/newarrival`,
				{
					headers: {
						"Content-Type": "application/json",
						"x-access-token": api.token,
					},
				},
			);
			setProductData(fetchData.data.data);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}, []);
	useEffect(() => {
		getProduct();
	}, [getProduct]);

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
		return <MainPageSkeleton />;
	}

	return (
		<div className="flex flex-col justify-center items-center">
			<h2 className="text-xl lg:text-2xl font-semibold mb-4 py-2 tracking-wider">
				New Arrivals
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 max-w-[98%]">
				{productData?.length > 0 &&
					productData?.map((value) => (
						<div
							key={value?.idl_product_code}
							className="group h-[96] w-[300px] lg:w-[280px] p-[20px] m-[8px] shadow-md rounded-md bg-white relative"
						>
							<div className="h-[200px] w-[200px] mx-auto">
								<img
									loading="lazy"
									src={value?.main_picture}
									alt={value?.name}
									onError={(e) => {
										e.target.src = "/images/home-placeholder.jpeg"; // Replace with your fallback image URL
									}}
									onClick={() =>
										navigate(
											`/product/${value.idl_product_code}/${value.supplier_id}`,
										)
									}
									className="transition-all hover:scale-110 duration-500 ease-in-out object-cover cursor-pointer w-full h-full rounded"
								/>
								<div className="absolute top-0 right-0 cursor-pointer  m-[10px] opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out">
									{/* <label>{count[index]}</label> */}

									<AiOutlineHeart
										//onClick={() => increment(index)}
										className="mb-2"
									/>
									<IoIosBasket className="" />
								</div>
							</div>
							<Divider />
							<div className="font-semibold tracking-wide ">
								<h3 className="text-[13px] text-gray-600 py-1 text-center truncate">
									{value?.name}
								</h3>

								<p className="py-2 text-[#232f3e] text-xs">
									Size: <span>{value?.size || "N/A"}</span>
								</p>

								<div className="price flex items-center tracking-wider justify-between">
									<h4 className="text-green-500">
										{formattedAmount.format(value?.naira_price)}
									</h4>
									<button
										type="button"
										onClick={() => handleAddToCart(value)}
										title="Add to cart"
										disabled={isLoading[value?.idl_product_code]}
									>
										{isLoading[value?.idl_product_code] ? (
											<Spin size="small" />
										) : (
											<BsFillCartCheckFill className="mx-auto" />
										)}
									</button>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default ArrivalMain;
