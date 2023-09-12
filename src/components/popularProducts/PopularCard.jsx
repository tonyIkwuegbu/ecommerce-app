import { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SlideSkeleton from "../SlideSkeleton";
import { IoIosBasket } from "react-icons/io";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Spin } from "antd";
import { useNavigate } from "react-router";
import { add } from "../../store/cartSlice";
import { useCart } from "../../utils/CartUtils";
import { formatCurrency } from "../../utils/CurrencyFormat";

const SampleNextArrow = (props) => {
	const { onClick } = props;
	return (
		<div className="control-btn" onClick={onClick}>
			<button className="next">
				<FaLongArrowAltRight className="arrow" />
			</button>
		</div>
	);
};
const SamplePrevArrow = (props) => {
	const { onClick } = props;
	return (
		<div className="control-btn" onClick={onClick}>
			<button className="prev">
				<FaLongArrowAltLeft className="arrow" />
			</button>
		</div>
	);
};
const PopularCard = ({ loading, productData }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const userIsAuthenticated = useSelector(
		(state) => state.auth.isAuthenticated,
	);
	const [slidesToShow, setSlidesToShow] = useState(4);
	const [isLoading, setIsLoading] = useState(false);
	const { addToCartApi } = useCart();

	// **************************************** Slider responsiveness
	const settings = useMemo(
		() => ({
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: slidesToShow,
			slidesToScroll: 1,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />,
		}),
		[slidesToShow],
	);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setSlidesToShow(4); // Desktop view
			} else if (window.innerWidth >= 768) {
				setSlidesToShow(3); // iPad view
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

	/// ******************************************** LOADING STATE
	if (loading) {
		return <SlideSkeleton />;
	}

	return (
		<>
			<Slider {...settings} className="flex justify-center items-center">
				{productData?.length > 0 &&
					productData?.map((value) => (
						<div className="" key={value?.idl_product_code}>
							<div className="group h-[96] lg:w-[260px] p-[20px] m-[8px] shadow-md rounded-md bg-white relative">
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
										className="transition-all hover:scale-110 duration-500 ease-in-out object-cover cursor-pointer w-full h-44 rounded-md"
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

								<div className="font-semibold tracking-wide ">
									<h3 className="text-[13px] text-gray-600 py-1 text-center truncate">
										{value?.name}
									</h3>

									<div className="price flex items-center tracking-wider justify-between py-3">
										<h4 className="text-green-500">
											{formatCurrency(value?.naira_price)}
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
						</div>
					))}
			</Slider>
		</>
	);
};

export default PopularCard;
