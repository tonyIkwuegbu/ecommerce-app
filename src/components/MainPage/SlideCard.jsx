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
				{Sdata.map((value, index) => {
					return (
						<>
							<div
								className="flex flex-col gap-4 md:flex-row justify-between mt-[80px] mx-auto px-8"
								key={index}
							>
								<div className="">
									<h1 className="font-bold font-cant">{value.title}</h1>
									<p className="text-sm">{value.desc}</p>
									<button className="bg-[#e94560] py-[13px] px-[40px] font-semibold rounded-[5px] text-white">
										Visit Collections
									</button>
								</div>
								<div className="">
									<img src={value.cover} alt="" />
								</div>
							</div>
						</>
					);
				})}
			</Slider>
		</>
	);
};

export default SlideCard;
