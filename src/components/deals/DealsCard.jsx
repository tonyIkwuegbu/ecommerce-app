import { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiFillStar, AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { add, updateCart } from "../../store/cartSlice";

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
const DealsCard = ({ shopItems }) => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart);
	const [count, setCount] = useState(Array(shopItems.length).fill(0));
	const [slidesToShow, setSlidesToShow] = useState(4);

	/// ********************************* increase likes
	const increment = (index) => {
		const updatedCounts = [...count];
		updatedCounts[index] += 1;
		setCount(updatedCounts);
	};

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

	// ************************************* Dispatch handler
	const addToCart = (productItem) => {
		// Check if the product already exists in the cart
		const productExist = cartItems.find((item) => item.id === productItem.id);

		if (productExist) {
			// Product already exists in the cart, update the quantity
			const updatedCartItems = cartItems.map((item) =>
				item.id === productItem.id ? { ...item, qty: item.qty + 1 } : item,
			);

			dispatch(updateCart(updatedCartItems));
		} else {
			// Product doesn't exist in the cart, add it
			const newCartItem = { ...productItem, qty: 1 };
			dispatch(add(newCartItem));
		}
	};

	return (
		<>
			<Slider {...settings}>
				{shopItems.map((shopItems, index) => (
					<div className="" key={index}>
						<div className="product mt-[40px]">
							<div className="img">
								<span className="discount">{shopItems.discount}% Off</span>
								<img
									src={shopItems.cover}
									alt={shopItems.name}
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
								<h3>{shopItems.name}</h3>

								<div className="flex py-2 text-[#ffcd4e] text-[15px]">
									<AiFillStar />
									<AiFillStar />
									<AiFillStar />
									<AiFillStar />
									<AiFillStar />
								</div>
								<div className="price">
									<h4>&#8358;{shopItems.price}</h4>
									<button
										disabled
										onClick={() => addToCart(shopItems)}
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

export default DealsCard;
