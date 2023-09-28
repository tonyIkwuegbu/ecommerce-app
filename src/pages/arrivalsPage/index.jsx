import { useCallback, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { api } from "../../Api";
import { Divider, Spin } from "antd";
import Axios from "axios";
import AllArrivalProductDisplay from "./AllArrivalProductDisplay";
import AllSelectedCategoryArrival from "./AllSelectedCategoryArrival";

const ArrivalMain = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [allCategories, setAllCategories] = useState([]);
	const [tabIndex, setTabIndex] = useState(1);
	const [selectedCategory, setSelectedCategory] = useState(null);

	// ******************************************************* GET TOP DEALS PRODUCTS
	const { loading, shuffledData } = useFetch(
		"/api/v1/ecommerce/product/newarrival?skip=0&limit=0",
	);

	// ***************************** TAB HANDLERS
	const handleSubcategoryClick = (value) => {
		setTabIndex(2);
		setSelectedCategory(value);
	};

	// ******************************************************* GET CATEGORIES
	const getProduct = useCallback(async () => {
		setIsLoading(true);
		try {
			const fetchData = await Axios.get(
				`${api.baseURL}/api/v1/ecommerce/categories`,
				{
					headers: {
						"Content-Type": "application/json",
						"x-access-token": api.token,
					},
				},
			);

			setAllCategories(fetchData.data.data);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		getProduct();
	}, [getProduct]);

	return (
		<div className="flex flex-col justify-center items-center">
			<h2 className="text-xl lg:text-2xl font-semibold mb-4 py-2 tracking-wider">
				New Arrivals
			</h2>
			<div className="overflow-hidden py-4 px-2 font-semibold tracking-wider capitalize text-xs">
				{isLoading ? (
					<Spin />
				) : allCategories && allCategories.length > 0 ? (
					<div className="flex items-center flex-wrap gap-x-3 ">
						{allCategories.map((value, index) => (
							<div
								key={`${value}-${index}`}
								className={`cursor-pointer ${
									value === selectedCategory
										? "text-[#ff5c40] font-semibold"
										: ""
								}`}
								onClick={() => handleSubcategoryClick(value)}
							>
								<p className="cursor-pointer bg-white rounded-full p-3 hover:bg-[#ff5c40] hover:text-white">
									{value.category}
								</p>
							</div>
						))}
					</div>
				) : (
					<p>No categories available.</p>
				)}
			</div>
			<Divider />

			<div>
				{tabIndex === 1 && (
					<AllArrivalProductDisplay
						shuffledData={shuffledData}
						loading={loading}
					/>
				)}
				{tabIndex >= 2 && (
					<AllSelectedCategoryArrival selectedCategory={selectedCategory} />
				)}
			</div>
		</div>
	);
};

export default ArrivalMain;
