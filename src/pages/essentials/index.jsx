import { useCallback, useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import Axios from "axios";
import { api } from "../../Api";
import AllEssentials from "./AllEssentials";
import { Essentials } from "./EssentialsData";
// import Appliances from "./Appliances";
// import Kitchen from "./Kitchen";
// import Dining from "./Dining";
// import Furnishing from "./Furnishing";
import SubCategoryEssentials from "./SubCategoryEssentials";

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
				`${api.baseURL}/api/v1/ecommerce/products/category/home_essentials`,
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
					{Essentials.map((item) => (
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
					{Essentials.map((value) => {
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
						<AllEssentials data={productData} loading={loading} />
					)}
					{tabIndex >= 2 && tabIndex <= 5 && (
						<SubCategoryEssentials
							subcategory={Essentials[tabIndex - 1].title}
						/>
					)}
					{/* {tabIndex === 2 && <Appliances />}
					{tabIndex === 3 && <Kitchen />}
					{tabIndex === 4 && <Dining />}
					{tabIndex === 5 && <Furnishing />} */}
				</div>
			</div>
		</div>
	);
};

export default Men;
