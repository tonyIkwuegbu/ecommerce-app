import { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import { NavMen } from "./NavData";
import AllMen from "./AllMen";
import SubCategoryTemplate from "./SubCategoryTemplate";
import { Divider } from "antd";
import useFetch from "../../hooks/useFetch";

const Men = () => {
	const [slidesToShow, setSlidesToShow] = useState(6);
	const [tabIndex, setTabIndex] = useState(1);
	const [selected, setSelected] = useState(1);

	// ******************************************************* GET PRODUCT

	const { loading, data } = useFetch(
		"/api/v1/ecommerce/product/category/men?skip=0&limit=0",
	);

	// ************************************************* MOBILE SLIDER
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
			if (window.innerWidth >= 768) {
				setSlidesToShow(6); // iPad view
			} else {
				setSlidesToShow(3); // Mobile view
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
		<div className="mt-4">
			<div className="lg:hidden overflow-hidden py-4 px-2 font-semibold tracking-wider bg-white">
				<Slider {...settings}>
					{NavMen.map((item) => (
						<div key={item.id} onClick={() => setSelected(item.tabNum)}>
							<p
								onClick={() => setTabIndex(item.tabNum)}
								className="cursor-pointer"
								style={selected === item.tabNum ? { color: "#ff5c00" } : null}
							>
								{item.title}
							</p>
						</div>
					))}
				</Slider>
			</div>
			<Divider />
			<div className="max-w-[98%] m-auto flex space-x-4 justify-between p-4">
				<div className="category hidden lg:inline-block">
					{NavMen.map((value) => {
						return (
							<div
								className="box cursor-pointer"
								key={value.id}
								onClick={() => setSelected(value.tabNum)}
							>
								<p
									className="flex items-center leading-10"
									onClick={() => setTabIndex(value.tabNum)}
									style={
										selected === value.tabNum ? { color: "#ff5c00" } : null
									}
								>
									<span>
										<value.icon className="text-lg" />
									</span>
									{value.title}
								</p>
							</div>
						);
					})}
				</div>
				<div>
					{tabIndex === 1 && <AllMen data={data} loading={loading} />}
					{tabIndex >= 2 && tabIndex <= 6 && (
						<SubCategoryTemplate subcategory={NavMen[tabIndex - 1].title} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Men;
