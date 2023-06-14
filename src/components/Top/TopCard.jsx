import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useMemo, useState } from "react";
import Tdata from "./TopData";

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
				setSlidesToShow(4); // Desktop view
			} else if (window.innerWidth >= 768) {
				setSlidesToShow(2); // iPad view
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
		<>
			<Slider {...settings}>
				{Tdata.map((value, index) => (
					<div key={index}>
						<div className="product">
							<div className="nametop flex items-center justify-between">
								<span className="tleft">{value.para}</span>
								<span className="tright">{value.desc}</span>
							</div>
							<div className="img">
								<img src={value.cover} alt="" width="100%" />
							</div>
						</div>
					</div>
				))}
			</Slider>
		</>
	);
};

export default Dcard;
