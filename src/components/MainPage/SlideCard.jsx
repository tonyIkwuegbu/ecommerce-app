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
						<div className="mt-[80px] mx-auto px-8" key={value.id}>
							<div className="flex flex-col gap-4 md:flex-row justify-between">
								<div className="mx-auto lg:max-w-[70%]">
									<h2 className="font-bold font-cant text-3xl lg:text-5xl">
										{value.title}
									</h2>
									<p className="text-sm">{value.desc}</p>
									<button className="bg-[#ff5c00] py-[10px] px-[20px] font-medium rounded-[5px] text-white">
										Visit Collections
									</button>
								</div>
								<img src={value.cover} alt="" />
							</div>
						</div>
					);
				})}
			</Slider>
		</>
	);
};

export default SlideCard;
