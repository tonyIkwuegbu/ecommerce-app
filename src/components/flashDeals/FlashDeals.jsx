import { AiFillThunderbolt } from "react-icons/ai";
import FlashCard from "./FlashCard";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../Api";
import Axios from "axios";
import ShuffleArray from "../../utils/Shuffle";

const FlashDeals = () => {
	const [productData, setProductData] = useState([]);
	const [loading, setLoading] = useState(false);

	// ******************************************************* GET TOP DEALS PRODUCTS

	const getProduct = useCallback(async () => {
		setLoading(true);
		try {
			const fetchData = await Axios.get(
				`${api.baseURL}/api/v1/ecommerce/products/popular`,
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
			<section className="py-[50px] bg-[#f6f9fc] px-0">
				<div className="max-w-[90%] m-auto">
					<div className="flex items-center gap-x-2 border-b-2 mb-3 underline decoration-[2px] underline-offset-8 decoration-[#ff5c00]">
						<AiFillThunderbolt className="text-[#ff5c00]" />
						<h1 className="text-xl md:text-2xl font-semibold tracking-wide">
							Best Sellers
						</h1>
					</div>
					<FlashCard loading={loading} productData={productData} />
				</div>
			</section>
		</>
	);
};

export default FlashDeals;
