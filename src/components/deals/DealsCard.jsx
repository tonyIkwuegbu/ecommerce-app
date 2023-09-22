import { useEffect, useMemo, useState, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import SlideSkeleton from "../SlideSkeleton";
import { IoIosBasket } from "react-icons/io";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router";
import { dummy } from "./DealsDummy";
import { formatCurrency } from "../../utils/CurrencyFormat";
import { ModalContext } from "../../utils/ModalContext";

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
	const navigate = useNavigate();
	const { openModal } = useContext(ModalContext);
	const [slidesToShow, setSlidesToShow] = useState(4);

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

		// Cleanup event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	/// ******************************************** LOADING STATE
	if (loading) {
		return <SlideSkeleton />;
	}

	// *************************************************** Dummy Data
	if (productData?.length === 0 || productData === null) {
		return (
			<Slider {...settings} className="flex justify-center items-center">
				{dummy.map((item, index) => (
					<div className="" key={index}>
						<div className="group h-[96] w-[280px] p-[20px] m-[8px] shadow-md rounded-md bg-white relative">
							<div className="h-[200px] w-[200px] mx-auto">
								<img
									loading="lazy"
									src={item.cover}
									alt={item.title}
									onError={(e) => {
										e.target.src = "/images/home-placeholder.jpeg"; // Replace with your fallback image URL
									}}
									className="transition-all hover:scale-110 duration-500 ease-in-out object-cover cursor-pointer w-full h-full rounded"
								/>
							</div>
							<h3 className="text-sm text-gray-600 text-center py-1 font-semibold tracking-wider">
								{item?.title}
							</h3>
						</div>
					</div>
				))}
			</Slider>
		);
	}

	return (
		<>
			<Slider {...settings} className="flex justify-center items-center">
				{productData?.length > 0 &&
					productData?.map((value) => (
						<div className="" key={value?.idl_product_code}>
							<div className="group h-[390px] w-[300px] lg:w-[280px] p-[20px] m-[8px] shadow-md rounded-md bg-white relative">
								<div className="h-[200px] w-[200px] mx-auto">
									<img
										loading="lazy"
										src={value?.main_picture}
										alt={value?.product_name}
										onError={(e) => {
											e.target.src = "/images/home-placeholder.jpeg";
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
											className="mb-2"
											//onClick={() => increment(index)}
										/>
										<IoIosBasket />
									</div>
								</div>

								<div className="font-semibold tracking-wide">
									<h3 className="text-[13px] text-gray-600 py-3 text-center truncate capitalize">
										{value?.product_name}
									</h3>
									{value?.product_variants?.length > 0 && (
										<div>
											<div className="text-green-500 my-3">
												{formatCurrency(
													value?.product_variants[0]?.naira_price,
												)}
											</div>
											{value?.product_variants[0]?.product_discount !==
												"0%" && (
												<div className="flex items-center justify-between text-[12px]">
													<p className="text-white w-16 text-center p-1 bg-red-500">
														{value?.product_variants[0]?.product_discount} off
													</p>
													<p className="text-gray-400  line-through">
														{formatCurrency(
															value?.product_variants[0]?.product_rrp_naira,
														)}
													</p>
												</div>
											)}
										</div>
									)}
									<div className="price pt-3 text-right">
										<button
											type="button"
											onClick={() => {
												openModal(value);
											}}
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
