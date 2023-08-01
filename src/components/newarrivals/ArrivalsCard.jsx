import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useMemo, useState } from "react";
import SlideSkeleton from "../SlideSkeleton";

const ArrivalsCard = ({ loading, productData }) => {
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
				setSlidesToShow(6); // Desktop view
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
			<Slider {...settings}>
				{productData?.length > 0 &&
					productData?.map((value) => (
						<div key={value.idl_product_code}>
							<div className="box product">
								<div className="h-[150px] w-[150px]">
									<img
										src={
											value?.main_picture === "" ||
											value?.main_picture === undefined
												? "/images/home-placeholder.jpeg"
												: value?.main_picture
										}
										alt={value?.name || value?.model || value?.brand}
										className="transition-all hover:scale-110 duration-500 ease-in-out object-cover w-full h-full rounded"
									/>
								</div>
								<div className="text-center py-3 tracking-wider">
									<h4 className="text-sm font-semibold text-gray-600">
										{value?.name || value?.model || value?.brand}
									</h4>
									<p className="text-[#ff5c00] font-semibold">
										{formattedAmount.format(value?.retail_price)}
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
