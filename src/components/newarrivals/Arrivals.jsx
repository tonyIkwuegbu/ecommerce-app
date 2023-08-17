import { useCallback, useEffect, useState } from "react";
import ArrivalsCard from "./ArrivalsCard";
import { IoMdArrowDropright } from "react-icons/io";
import { api } from "../../Api";
import Axios from "axios";
import ShuffleArray from "../../utils/Shuffle";

const Arrivals = () => {
	const [productData, setProductData] = useState([]);
	const [loading, setLoading] = useState(false);

	// ***********************************************************HANDLE NONETYPE

	const handleNoneValues = useCallback((data) => {
		if (data === null || data === undefined) {
			return "N/A";
		}
		if (Array.isArray(data)) {
			return data.map((item) => handleNoneValues(item));
		}
		if (typeof data === "object") {
			const sanitizedObj = {};
			for (const key in data) {
				sanitizedObj[key] = handleNoneValues(data[key]);
			}
			return sanitizedObj;
		}
		return data;
	}, []);

	// ******************************************************* GET TOP DEALS PRODUCTS

	const getProduct = useCallback(async () => {
		setLoading(true);
		try {
			const fetchData = await Axios.get(
				`${api.baseURL}/api/v1/ecommerce/product/newarrival`,
				{
					headers: {
						"Content-Type": "application/json",
						"x-access-token": api.token,
					},
				},
			);

			//const parsedData = handleNoneValues(fetchData.data.data);
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

	useEffect(() => {
		// Function to shuffle the product data and update the state
		const shuffleProducts = () => {
			const shuffledProducts = ShuffleArray([...productData]);
			setProductData(shuffledProducts);
		};

		// Shuffle products every 1 hour (3600000 milliseconds)
		const interval = setInterval(shuffleProducts, 3600000);

		// Cleanup interval on component unmount
		return () => clearInterval(interval);
	}, [productData]);

	return (
		<>
			<section className="Discount background">
				<div className="max-w-[90%] m-auto">
					<div className="heading flex items-center justify-between border-b-2 mb-3">
						<div className="heading-left row flex items-center space-x-2  underline decoration-[2px] underline-offset-[14px] decoration-[#ff5c00]">
							<img
								src="https://img.icons8.com/glyph-neue/64/26e07f/new.png"
								alt=""
								className="w-[40px] h-[40px] mt-[5px]"
							/>
							<h1 className="text-xl md:text-2xl font-semibold tracking-wide">
								New Arrivals
							</h1>
						</div>
						<div className="cursor-pointer flex items-center">
							<span className="text-[#ff5c00] font-semibold text-sm">
								View all
							</span>
							<IoMdArrowDropright className="text-[20px]" />
						</div>
					</div>
					<ArrivalsCard loading={loading} productData={productData} />
				</div>
			</section>
		</>
	);
};

export default Arrivals;
