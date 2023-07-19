import { useCallback, useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import Axios from "axios";
import { api } from "../../Api";
import AllChildren from "./AllChildren";
import { NavChildren } from "./TabData";
import ChildrenCloth from "./ChildrenCloth";
import ChildrenShoes from "./ChildrenShoes";
import ChildrenSports from "./ChildrenSports";
import ChildrenAccessories from "./ChildrenAccessories";
import ChildrenBags from "./ChildrenBags";
// import MenCloth from "./MenCloth";
// import MenShoes from "./MenShoes";
// import SportsWear from "./Sportswear";
// import MenWatches from "./MenWatches";
// import MenBags from "./MenBags";

const Men = () => {
	const [slidesToShow, setSlidesToShow] = useState(6);
	const [tabIndex, setTabIndex] = useState(1);
	const [selected, setSelected] = useState(1);
	const [productData, setProductData] = useState([]);
	const [loading, setLoading] = useState(false);

	// ******************************************************* GET PRODUCCT

	const getProduct = useCallback(async () => {
		setLoading(true);
		try {
			const fetchData = await Axios.get(
				`${api.baseURL}/api/v1/ecommerce/products/category/kids`,
				{
					headers: {
						"Content-Type": "application/json",
						"x-access-token": api.token,
					},
				},
			);

			setProductData(fetchData.data.data);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}, []);
	useEffect(() => {
		getProduct();
	}, [getProduct]);

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
			<div className="lg:hidden overflow-hidden py-2 font-semibold tracking-wider">
				<Slider {...settings}>
					{NavChildren.map((item) => (
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
			<div className="max-w-[98%] m-auto flex space-x-4 justify-between bg-[#f6f9fc] p-4">
				<div className="category hidden lg:inline-block">
					{NavChildren.map((value) => {
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
					{tabIndex === 1 && (
						<AllChildren data={productData} loading={loading} />
					)}
					{tabIndex === 2 && <ChildrenCloth />}
					{tabIndex === 3 && <ChildrenShoes />}
					{tabIndex === 4 && <ChildrenSports />}
					{tabIndex === 5 && <ChildrenAccessories />}
					{tabIndex === 6 && <ChildrenBags />}
				</div>
			</div>
		</div>
	);
};

export default Men;
