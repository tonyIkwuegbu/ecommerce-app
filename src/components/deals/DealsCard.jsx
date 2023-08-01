import { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { add } from "../../store/cartSlice";
import SlideSkeleton from "../SlideSkeleton";
import { IoIosBasket } from "react-icons/io";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Divider } from "antd";

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
const DealsCard = ({ loading, productData }) => {
	const dispatch = useDispatch();
	//const [count, setCount] = useState(Array(productData?.length).fill(0));
	const [slidesToShow, setSlidesToShow] = useState(4);

	/// ********************************* increase likes
	// const increment = (index) => {
	// 	const updatedCounts = [...count];
	// 	updatedCounts[index] += 1;
	// 	setCount(updatedCounts);
	// };

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

	// ************************************* Dispatch handler
	const addToCart = (value) => {
		dispatch(add(value));
	};

	/// ************************************ CURRENCY FORMAT
	const formattedAmount = new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
	});

	/// ******************************************** LOADING STATE
	if (loading) {
		return <SlideSkeleton />;
	}

	return (
		<>
			<Slider {...settings}>
				{productData?.length > 0 &&
					productData?.map((value) => (
						<div className="" key={value?.idl_product_code}>
							<div className="product mt-[40px]">
								<div className="h-[250px] w-[250px]">
									<img
										loading="lazy"
										src={
											value?.main_picture === "" ||
											value?.main_picture === undefined
												? "/images/home-placeholder.jpeg"
												: value?.main_picture
										}
										alt={value?.name || value?.model || value?.brand}
										className="transition-all hover:scale-110 duration-500 ease-in-out object-cover w-full h-full rounded"
									/>
									<div className="product-like">
										{/* <label>{count[index]}</label> */}

										<AiOutlineHeart
											//onClick={() => increment(index)}
											className="arrow"
										/>
										<IoIosBasket className="arrow" />
									</div>
								</div>
								<Divider />
								<div className="product-details font-semibold tracking-wider">
									<h3 className="text-sm text-gray-600 py-1">
										{value?.name || value?.model || value?.brand}
									</h3>

									<div className="py-2 text-[#232f3e] text-xs">
										<p>
											Size: <span>{value?.size || "N/A"}</span>
										</p>
									</div>
									<div className="price">
										<h4>{formattedAmount.format(value?.retail_price)}</h4>
										<button
											onClick={() => addToCart(value)}
											title="Add to cart"
										>
											<BsFillCartCheckFill className="mx-auto" />
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

export default DealsCard;
