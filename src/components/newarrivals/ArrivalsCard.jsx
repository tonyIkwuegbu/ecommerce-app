import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useMemo, useState } from "react";
import SlideSkeleton from "../SlideSkeleton";
import { useNavigate } from "react-router-dom";
import { Divider } from "antd";

const ArrivalsCard = ({ loading, productData }) => {
	const navigate = useNavigate();
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
				setSlidesToShow(5); // Desktop view
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
			<Slider {...settings} className="flex justify-center items-center">
				{productData?.length > 0 &&
					productData?.map((value) => (
						<div key={value.idl_product_code}>
							<div className="group h-80 lg:w-[230px] p-[20px] m-[6px] shadow-md rounded-md bg-white relative">
								{" "}
								<div className="h-[150px] w-[150px] mx-auto">
									<img
										src={value?.main_picture}
										alt={value?.name}
										onError={(e) => {
											e.target.src = "/images/home-placeholder.jpeg";
										}}
										onClick={() =>
											navigate(
												`/product/${value.idl_product_code}/${value.supplier_id}`,
											)
										}
										className="transition-all hover:scale-110 duration-500 ease-in-out object-cover w-full h-full cursor-pointer rounded"
									/>
								</div>
								<Divider />
								<div className="py-3 tracking-wider text-center">
									<h4 className="text-[13px] py-3 font-semibold text-gray-600 truncate">
										{value?.name}
									</h4>
									<p className="text-green-500 font-semibold">
										{formattedAmount.format(value?.naira_price)}
									</p>
								</div>
							</div>
						</div>
					))}
			</Slider>
		</>
	);
};

export default ArrivalsCard;
