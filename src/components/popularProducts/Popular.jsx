import { AiFillThunderbolt } from "react-icons/ai";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../Api";
import Axios from "axios";
import ShuffleArray from "../../utils/Shuffle";
import PopularCard from "./PopularCard";
import { IoMdArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Popular = () => {
	const navigate = useNavigate();
	const [productData, setProductData] = useState([]);
	const [loading, setLoading] = useState(false);

	// ******************************************************* GET POPULAR PRODUCTS

	const getProduct = useCallback(async () => {
		setLoading(true);
		try {
			const fetchData = await Axios.get(
				`${api.baseURL}/api/v1/ecommerce/product/popular`,
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
			<section className="Discount background">
				<div className="max-w-[90%] m-auto">
					<div className="heading flex items-center justify-between border-b-2 mb-3">
						<div className="heading-left row flex items-center space-x-2  underline decoration-[2px] underline-offset-[8px] decoration-[#ff5c00]">
							<AiFillThunderbolt className="text-[#ff5c00]" />
							<h1 className="text-xl md:text-2xl font-semibold tracking-wide">
								Popular Products
							</h1>
						</div>
						<div className="cursor-pointer flex items-center">
							<span
								className="text-[#ff5c00] font-semibold text-sm"
								onClick={() => navigate("/popular-products")}
							>
								View all
							</span>
							<IoMdArrowDropright className="text-[20px]" />
						</div>
					</div>
					<PopularCard loading={loading} productData={productData} />
				</div>
			</section>
		</>
	);
};

export default Popular;
