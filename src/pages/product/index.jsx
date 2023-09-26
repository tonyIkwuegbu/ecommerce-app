import Axios from "axios";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../Api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Divider, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import OneProductSkeleton from "./OneProductSkeleton";
import { MdOutlineArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { add } from "../../store/cartSlice";
import { CartContext } from "../../utils/CartUtils";
import SlideSkeleton from "../../components/SlideSkeleton";
import { formatCurrency } from "../../utils/CurrencyFormat";

const ProductPage = () => {
	const { id, supplier_id } = useParams();
	const { addToCartApi, quantityCount, setQuantityCount } =
		useContext(CartContext);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userIsAuthenticated = useSelector(
		(state) => state.auth.isAuthenticated,
	);
	const [loading, setLoading] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [product, setProduct] = useState([]);
	const [productData, setProductData] = useState([]);
	const [loadingPopular, setLoadingPopular] = useState(false);
	const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
	const [slidesToShow, setSlidesToShow] = useState(5);
	const [count, setCount] = useState(1);

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
			if (window.innerWidth >= 1440) {
				setSlidesToShow(5); //extra-large screens
			} else if (window.innerWidth >= 1024) {
				setSlidesToShow(4); // Desktop view
			} else if (window.innerWidth >= 768) {
				setSlidesToShow(3); // iPad view
			} else {
				setSlidesToShow(1); // Mobile view
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// ******************************************************* GET POPULAR PRODUCTS
	const getPopularProduct = useCallback(async () => {
		setLoadingPopular(true);
		try {
			const fetchData = await Axios.get(
				`${api.baseURL}/api/v1/ecommerce/product/popular?skip=0&limit=0`,
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

	// ******************************************************* GET PRODUCCT DETAILS
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

	// ******************************************************HANDLE CART
	const handleAddToCart = async () => {
		//payload
		const productItem = {
			product_name: product?.product_name || "",
			idl_product_code: product?.idl_product_code || "",
			product_sku:
				product?.product_variants[selectedVariantIndex]?.product_sku || "",
			product_id:
				product?.product_variants[selectedVariantIndex]?.product_id || "",
			category: product?.category || "",
			sub_category: product?.sub_category || "",
			main_picture: product?.main_picture || "",
			supplier_id: product?.supplier_id || "",
			quantity: count.toString(),
			naira_price:
				product?.product_variants[selectedVariantIndex]?.naira_price || "",
			product_cost:
				product?.product_variants[selectedVariantIndex]?.product_cost || "",
			currency: product?.product_variants[selectedVariantIndex]?.currency || "",
			currency_adder:
				product?.product_variants[selectedVariantIndex]?.currency_adder || "",
			exchange_rate:
				product?.product_variants[selectedVariantIndex]?.exchange_rate || "",
			size: product?.product_variants[selectedVariantIndex]?.size || "",
			colour: product?.product_variants[selectedVariantIndex]?.colour || "",
			weight: product?.product_variants[selectedVariantIndex]?.weight || "",
			brand: product?.brand || "",
			description: product?.description || "",
			made_in: product?.made_in || "",
			material: product?.material || "",
		};
		if (!userIsAuthenticated) {
			// Handle non-authenticated user's cart
			dispatch(add(productItem));
			return;
		}

		try {
			setIsLoading(true);
			await addToCartApi(
				product?.product_name || "",
				product?.idl_product_code || "",
				product?.product_variants[selectedVariantIndex]?.product_sku || "",
				product?.product_variants[selectedVariantIndex]?.product_id || "",
				product?.category || "",
				product?.sub_category || "",
				product?.main_picture || "",
				product?.supplier_id || "",
				product?.product_variants[selectedVariantIndex]?.naira_price || "",
				product?.product_variants[selectedVariantIndex]?.product_cost || "",
				product?.product_variants[selectedVariantIndex]?.currency || "",
				product?.product_variants[selectedVariantIndex]?.currency_adder || "",
				product?.product_variants[selectedVariantIndex]?.exchange_rate || "",
				product?.product_variants[selectedVariantIndex]?.size || "",
				product?.product_variants[selectedVariantIndex]?.colour || "",
				product?.product_variants[selectedVariantIndex]?.weight || "",
				product?.brand || "",
				product?.description || "",
				product?.made_in || "",
				product?.material || "",
				quantityCount.toString(),
			);
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
		return <OneProductSkeleton />;
	}

	if (loadingPopular) {
		return <SlideSkeleton />;
	}

	// ******************************************************************** HANDLERS
	const variants = product?.product_variants || [];

	const handleVariantSelection = (index) => {
		setSelectedVariantIndex(index);
	};

	const handleNextVariant = () => {
		if (selectedVariantIndex < variants.length - 1) {
			setSelectedVariantIndex(selectedVariantIndex + 1);
		}
	};

	const handlePreviousVariant = () => {
		if (selectedVariantIndex > 0) {
			setSelectedVariantIndex(selectedVariantIndex - 1);
		}
	};

	const handleIncreaseQty = () => {
		if (userIsAuthenticated) {
			setQuantityCount((prev) => prev + 1);
		} else {
			setCount((prev) => prev + 1);
		}
	};
	const handleDecreaseQty = () => {
		if (userIsAuthenticated) {
			setQuantityCount((prev) => prev - 1);
		} else {
			setCount((prev) => prev - 1);
		}
	};

	return (
		<div className="max-w-[98%]">
			<div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-4 justify-center tracking-wide my-10 px-4">
				<div className="flex items-center justify-center bg-white lg:mx-10 p-1">
					<Image
						loading="lazy"
						src={product?.main_picture}
						alt={product?.product_name}
						width={400}
						height={400}
						className="object-cover"
					/>
				</div>
				<div>
					<h4 className="text-gray-500 text-sm lg:text-2xl text-center lg:text-left">
						{product?.product_name}
					</h4>
					<div>
						{product?.product_variants &&
							product?.product_variants.length > 0 && (
								<>
									<p className="py-3 text-green-500 text-center lg:text-left text-sm lg:text-lg font-semibold tracking-wider">
										{formattedAmount.format(
											product?.product_variants[selectedVariantIndex]
												?.naira_price,
										)}
									</p>
									<Divider
										style={{ backgroundColor: "gray", opacity: "0.3" }}
									/>
									<div className="flex items-center gap-x-4 text-sm py-1">
										<h3>Product Variants</h3>
										<div>
											<button
												onClick={handlePreviousVariant}
												disabled={selectedVariantIndex === 0}
												className="bg-black text-white p-2 rounded-sm mx-2 disabled:cursor-not-allowed"
											>
												<MdArrowBackIosNew />
											</button>
											{variants.map((variant, index) => (
												<button
													key={index}
													onClick={() => handleVariantSelection(index)}
													className={`mx-2 text-lg ${
														selectedVariantIndex === index
															? "text-[#ff5c40]"
															: ""
													}`}
												>
													{index + 1}
												</button>
											))}
											<button
												onClick={handleNextVariant}
												disabled={selectedVariantIndex === variants.length - 1}
												className="bg-black text-white p-2 rounded-sm mx-2 disabled:cursor-not-allowed"
											>
												<MdOutlineArrowForwardIos />
											</button>
										</div>
									</div>{" "}
									<div className="text-black font-semibold text-sm">
										<p className="py-1">
											Colour:{" "}
											<span className="">
												{product?.product_variants[selectedVariantIndex]
													?.colour || "N/A"}
											</span>
										</p>
										<p className="py-1">
											Size:{" "}
											<span className="text-gray-600">
												{product?.product_variants[selectedVariantIndex]
													?.size || "N/A"}
											</span>
										</p>
										<p className="py-2">
											Stock Quantity:{" "}
											<span className="text-gray-600">
												{product?.product_variants[selectedVariantIndex]
													?.stock_quantity || "N/A"}
											</span>
										</p>
									</div>
								</>
							)}
					</div>

					<div className="text-black font-semibold text-sm">
						<p className="py-2">
							Brand:{" "}
							<span className="text-gray-600">{product?.brand || "N/A"}</span>
						</p>
						<p className="py-2">
							Product Code:{" "}
							<span className="text-green-600">
								{product?.idl_product_code || "N/A"}
							</span>
						</p>
					</div>
					<div className="flex items-center gap-x-4 text-sm py-3">
						<h3>Quantity</h3>
						<div>
							<button
								onClick={() => handleDecreaseQty(product)}
								disabled={
									(userIsAuthenticated ? quantityCount : count) === 1
										? true
										: false
								}
								className="bg-[#ff5c40] text-white p-2 rounded-sm mx-2 disabled:cursor-not-allowed"
							>
								<AiOutlineMinus />
							</button>

							<button className="mx-2 text-lg">
								{userIsAuthenticated ? quantityCount : count}
							</button>

							<button
								onClick={() => handleIncreaseQty(product)}
								className="bg-[#ff5c40] text-white p-2 rounded-sm mx-2 disabled:cursor-not-allowed"
							>
								<AiOutlinePlus />
							</button>
						</div>
					</div>
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
							onClick={handleAddToCart}
							className="bg-green-500 rounded-none text-white hover:bg-green-400 w-[100%] lg:w-[70%] disabled:cursor-not-allowed disabled:bg-gray-400"
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
										<div className="font-semibold tracking-wide">
											<h4 className="text-[13px] text-gray-600 py-3 text-center truncate">
												{value?.product_name}
											</h4>

											<div className="price text-center">
												{value?.product_variants?.length > 0 && (
													<p className="text-green-500 font-semibold">
														{formatCurrency(
															value?.product_variants[0]?.naira_price,
														)}
													</p>
												)}
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
