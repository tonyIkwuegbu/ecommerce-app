import Sdata from "./SlideData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideCard = () => {
	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		appendDots: (dots) => {
			return <ul style={{ margin: "0px" }}>{dots}</ul>;
		},
	};
	return (
		<>
			<Slider {...settings}>
				{Sdata.map((value) => {
					return (
						<div className="pt-3 mx-auto px-4" key={value.id}>
							<img src={value.cover} alt="" className="mx-auto" />
						</div>
					);
				})}
			</Slider>
		</>
	);
};

export default SlideCard;
