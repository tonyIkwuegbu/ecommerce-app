import { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideSkeleton = () => {
	const [slidesToShow, setSlidesToShow] = useState(4);

	// **************************************** Slider responsiveness
	const settings = useMemo(
		() => ({
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: slidesToShow,
			slidesToScroll: 1,
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
	return (
		<div className="items-center justify-center mx-auto gap-x-4">
			<Slider {...settings}>
				<div className="">
					<Skeleton width={250} height={300} />
				</div>
				<div className="">
					<Skeleton width={250} height={300} />
				</div>
				<div className="">
					<Skeleton width={250} height={300} />
				</div>
				<div className="">
					<Skeleton width={250} height={300} />
				</div>
				<div className="">
					<Skeleton width={250} height={300} />
				</div>
				<div className="">
					<Skeleton width={250} height={300} />
				</div>
			</Slider>
		</div>
	);
};

export default SlideSkeleton;
