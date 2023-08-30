import Axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../Api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Divider, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import OneProductSkeleton from "./OneProductSkeleton";
import { add } from "../../store/cartSlice";
import { useCart } from "../../utils/CartUtils";
import SlideSkeleton from "../../components/SlideSkeleton";

const ProductPage = () => {
	const { id, supplier_id } = useParams();
	const { addToCartApi } = useCart();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth.user);
	const userIsAuthenticated = useSelector(
		(state) => state.auth.isAuthenticated,
	);
	const [loading, setLoading] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [product, setProduct] = useState([]);
	const [productData, setProductData] = useState([]);
	const [loadingPopular, setLoadingPopular] = useState(false);

	const [slidesToShow, setSlidesToShow] = useState(6);

	const settings = useMemo(
		() => ({
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: slidesToShow,
			slidesToScroll: 1,
			autoplay: true,
		}),
		[slidesToShow],
	);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setSlidesToShow(4); // Desktop view
			} else if (window.innerWidth >= 768) {
				setSlidesToShow(4); // iPad view
			} else {
				setSlidesToShow(1); // Mobile view
			}
		};

		// Set initial slidesToShow based on the current screen size
		handleResize();

		// Update slidesToShow when the window is resized
		window.addEventListener("resize", handleResize);

		// Cleanup event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// ******************************************************* GET POPULAR PRODUCTS

	const getPopularProduct = useCallback(async () => {
		setLoadingPopular(true);
		try {
			const fetchData = await Axios.get(
				`${api.baseURL}/api/v1/ecommerce/product/popular`,
				{
					headers: {
						"Content-Type": "application/json",
						"x-access-token": api.token,
					},
				},
			);
			// Shuffle the data array
			const shuffledData = [...fetchData.data.data];
			for (let i = shuffledData.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
			}

			// Set the first 20 elements as the product data
			setProductData(shuffledData.slice(0, 20));
			setLoadingPopular(false);
		} catch (error) {
			console.log(error);
			setLoadingPopular(false);
		}
	}, []);
	useEffect(() => {
		getPopularProduct();
	}, [getPopularProduct]);

	// ******************************************************* GET PRODUCCT
	const getProduct = useCallback(async () => {
		setLoading(true);
		try {
			const fetchData = await Axios.get(
				`${api.baseURL}/api/v1/ecommerce/product/detail/${id}/${supplier_id}`,
				{
					headers: {
						"Content-Type": "application/json",
						"x-access-token": api.token,
					},
				},
			);

			setProduct(fetchData.data.data);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}, [id, supplier_id]);

	useEffect(() => {
		getProduct();
	}, [getProduct]);

	if (loading) {
		return <OneProductSkeleton />;
	}

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

	/// ******************************************** LOADING STATE FOR POPULAR
	if (loadingPopular) {
		return <SlideSkeleton />;
	}

	return (
		<div className="max-w-[98%]">
			<div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-4 justify-center tracking-wide my-10 px-4">
				<div className="flex items-center justify-center bg-white lg:mx-10 p-1">
					<Image
						loading="lazy"
						src={product?.main_picture}
						alt={product?.name}
						width={400}
						height={400}
						className="object-cover"
					/>
				</div>
				<div>
					<h4 className="text-gray-500 text-sm lg:text-2xl text-center lg:text-left">
						{product?.name}
					</h4>
					<p className="py-3 text-green-500 text-center lg:text-left text-sm lg:text-lg font-semibold tracking-wider">
						{formattedAmount.format(product?.naira_price)}
					</p>
					<Divider style={{ backgroundColor: "gray", opacity: "0.3" }} />
					<div className="flex items-center space-x-6 text-xs lg:text-sm font-semibold">
						<p>
							Brand:{" "}
							<span className="text-gray-500">{product?.brand || "N/A"}</span>
						</p>
					</div>
					<div>
						<div className="flex items-center space-x-6 text-xs lg:text-sm mt-4">
							<p>
								Size:{" "}
								<span className="text-[#ff5c00] font-semibold">
									{product?.size || "N/A"}
								</span>
							</p>
							<p>
								Color:{" "}
								<span className="text-gray-500 font-semibold">
									{product?.colour || "N/A"}
								</span>
							</p>
						</div>
					</div>
					<p className="mt-4 text-xs lg:text-sm">
						Product Code:{" "}
						<span className="text-green-600 font-semibold">
							{product?.idl_product_code || "N/A"}
						</span>
					</p>
					<Divider style={{ backgroundColor: "gray", opacity: "0.3" }} />
					<div className="my-5">
						<p className="mt-4 text-xs lg:text-sm">
							Product Description:{" "}
							<span className="text-gray-700 font-semibold">
								{product?.description || "N/A"}
							</span>
						</p>
					</div>

					<div className="mt-16">
						<Button
							type="success"
							loading={isLoading}
							onClick={() => handleAddToCart(product)}
							className="bg-green-500 text-white hover:bg-green-400 w-[100%] lg:w-[70%]"
						>
							Add to Cart
						</Button>
					</div>
				</div>
			</div>
			<Divider />
			<div className="px-4 my-6">
				<h3 className="text-lg lg:text-3xl font-bold tracking-wider py-3">
					CUSTOMER ALSO VIEWED
				</h3>
				<div>
					<Slider {...settings}>
						{productData?.length > 0 &&
							productData?.map((value) => (
								<div className="" key={value?.idl_product_code}>
									<div className="group h-[96] w-[300px] lg:w-[280px] p-[20px] m-[8px] shadow-md rounded-md bg-white relative">
										<div className="h-[200px] w-[200px] mx-auto">
											<img
												loading="lazy"
												src={value?.main_picture}
												alt={value?.name}
												onClick={() =>
													navigate(
														`/product/${value.idl_product_code}/${value.supplier_id}`,
													)
												}
												onError={(e) => {
													e.target.src = "/images/home-placeholder.jpeg"; // Replace with your fallback image URL
												}}
												className="transition-all hover:scale-110 duration-500 ease-in-out object-cover cursor-pointer w-full h-full rounded"
											/>
										</div>
										<Divider />
										<div className="font-semibold tracking-wide ">
											<h3 className="text-[13px] text-gray-600 py-1 text-center truncate">
												{value?.name}
											</h3>

											<p className="py-2 text-[#232f3e] text-xs">
												Size: <span>{value?.size || "N/A"}</span>
											</p>

											<div className="price text-center">
												<h4 className="text-green-500">
													{formattedAmount.format(value?.naira_price)}
												</h4>
											</div>
										</div>
									</div>
								</div>
							))}
					</Slider>
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
