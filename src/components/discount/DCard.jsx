import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Ddata from "./Ddata";
import { useEffect, useMemo, useState } from "react";

const Dcard = () => {
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
				setSlidesToShow(2); // Mobile view
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
		<>
			<Slider {...settings}>
				{Ddata.map((value, index) => (
					<div key={index} className="box product">
						<div className="img">
							<img src={value.cover} alt="" width="100%" />
						</div>
						<h4>{value.name}</h4>
						<span>{value.price}</span>
					</div>
				))}
			</Slider>
		</>
	);
};

export default Dcard;
