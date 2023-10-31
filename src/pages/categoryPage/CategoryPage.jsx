import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { api } from "../../Api";
import Axios from "axios";
import { Divider, Spin } from "antd";
import Slider from "react-slick";
import AllCategoryProduct from "./AllCategoryProducts";
import AllSubcategoryProduct from "./AllSubcategoryProduct";

const CategoryPage = () => {
	const { category } = useParams();
	const decodedCategory = category.replace(/-/g, " ").replace(/ and /g, " & ");
	const [loading, setLoading] = useState(false);
	const [allSubcategories, setAllCategories] = useState([]);
	const [slidesToShow, setSlidesToShow] = useState(6);
	const [productData, setProductData] = useState([]);
	const [tabIndex, setTabIndex] = useState(1);
	const [selectedSubcategory, setSelectedSubcategory] = useState(null);

	// ***************************** TAB HANDLERS
	const handleSubcategoryClick = (value) => {
		setTabIndex(2);
		setSelectedSubcategory(value);
	};

	// ******************************************************* GET SUBCATEGORIES
	const getProduct = useCallback(async () => {
		setLoading(true);
		try {
			const fetchData = await Axios.get(
				`${api.baseURL}/api/v1/ecommerce/categories/category/${decodedCategory}`,
				{
					headers: {
						"Content-Type": "application/json",
						"x-access-token": api.token,
					},
				},
			);

			setAllCategories(fetchData.data.data.sub_category);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}, [decodedCategory]);

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
				setSlidesToShow(2); // Mobile view
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// ******************************************************* GET CATEGORY PRODUCTS
	const getAllProducts = useCallback(async () => {
		setLoading(true);
		try {
			const fetchData = await Axios.get(
				`${api.baseURL}/api/v1/ecommerce/product/category/${decodedCategory}?skip=0&limit=0`,
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
	}, [decodedCategory]);

	useEffect(() => {
		getAllProducts();
	}, [getAllProducts]);

	return (
		<div className="mt-4">
			<h4
				className={`flex  items-center gap-x-1 p-2 font-semibold text-sm cursor-pointer capitalize ${
					tabIndex === 1
						? "text-[#ff5c40] font-semibold"
						: "text-gray-700 font-semibold"
				}`}
				onClick={() => {
					setTabIndex(1);
					setSelectedSubcategory(null);
				}}
			>
				{decodedCategory}{" "}
				{selectedSubcategory && (
					<div className="flex items-center">
						<abbr className="pr-1">&gt;</abbr>
						<span className="text-[#ff5c40]">{selectedSubcategory} </span>
					</div>
				)}
			</h4>
			<div className="lg:hidden overflow-hidden py-4 px-2 font-semibold tracking-wider bg-white capitalize text-xs">
				{loading ? (
					<Spin />
				) : allSubcategories && allSubcategories.length > 0 ? (
					<Slider {...settings}>
						{allSubcategories?.map((value, index) => (
							<div
								key={`${value}-${index}`}
								className={`cursor-pointer ${
									value === selectedSubcategory
										? "text-[#ff5c40] font-semibold"
										: ""
								}`}
								onClick={() => handleSubcategoryClick(value)}
							>
								<p className="cursor-pointer">{value}</p>
							</div>
						))}
					</Slider>
				) : (
					<p>No subcategories available.</p>
				)}
			</div>

			<Divider />
			<div className="max-w-[98%] m-auto flex space-x-4 justify-between p-4">
				<div className="category hidden lg:inline-block capitalize">
					<Divider />
					{loading ? (
						<Spin />
					) : allSubcategories && allSubcategories.length > 0 ? (
						allSubcategories.map((value, index) => (
							<div
								className={`box cursor-pointer ${
									value === selectedSubcategory
										? "text-[#ff5c40] font-semibold"
										: ""
								}`}
								key={`${value}-${index}`}
								onClick={() => handleSubcategoryClick(value)}
							>
								<p className="leading-10">{value}</p>
							</div>
						))
					) : (
						<p>No subcategories available.</p>
					)}
				</div>

				<div>
					{tabIndex === 1 && (
						<AllCategoryProduct data={productData} loading={loading} />
					)}
					{tabIndex >= 2 && (
						<AllSubcategoryProduct
							selectedSubcategory={selectedSubcategory}
							categoryName={decodedCategory}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default CategoryPage;
