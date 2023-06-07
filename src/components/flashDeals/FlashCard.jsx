import { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiFillStar, AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

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
const FlashCard = ({ productItems, addToCart }) => {
	const [count, setCount] = useState(Array(productItems.length).fill(0));
	const [slidesToShow, setSlidesToShow] = useState(4);

	const increment = (index) => {
		const updatedCounts = [...count];
		updatedCounts[index] += 1;
		setCount(updatedCounts);
	};

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

	return (
		<>
			<Slider {...settings}>
				{productItems.map((productItems, index) => (
					<div className="" key={index}>
						<div className="product mt-[40px]">
							<div className="img">
								<span className="discount">{productItems.discount}% Off</span>
								<img
									src={productItems.cover}
									alt={productItems.name}
									className="transition-all hover:scale-110 duration-500 ease-in-out"
								/>
								<div className="product-like">
									<label>{count[index]}</label> <br />
									<AiOutlineHeart
										onClick={() => increment(index)}
										className="arrow"
									/>
								</div>
							</div>
							<div className="product-details">
								<h3>{productItems.name}</h3>

								<div className="flex py-2 text-[#ffcd4e] text-[15px]">
									<AiFillStar />
									<AiFillStar />
									<AiFillStar />
									<AiFillStar />
									<AiFillStar />
								</div>
								<div className="price">
									<h4>&#8358; {productItems.price}.00 </h4>
									<button
										onClick={() => addToCart(productItems)}
										title="Add to cart"
									>
										<AiOutlinePlus className="mx-auto" />
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

export default FlashCard;
