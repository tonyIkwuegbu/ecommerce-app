import { useCallback, useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import { Empty } from "antd";
import { useDispatch } from "react-redux";
import { add } from "../../store/cartSlice";
import Axios from "axios";
import { api } from "../../Api";
import ProductSkeleton from "../../components/ProductSkeleton";
import { useNavigate } from "react-router-dom";

const Fragrances = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [count, setCount] = useState([]);
	const [productData, setProductData] = useState([]);
	const [loading, setLoading] = useState(false);

	// ******************************************************* GET PRODUCCT

	const getProduct = useCallback(async () => {
		setLoading(true);
		try {
			const fetchData = await Axios.get(
				`${api.baseURL}/api/v1/ecommerce/products/category/beauty/fragrances`,
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

	// Set initial count values when data changes
	useEffect(() => {
		if (productData && productData.length > 0) {
			setCount(Array(productData.length).fill(0));
		}
	}, [productData]);

	/// ********************************* increase likes
	const increment = (index) => {
		const updatedCounts = [...count];
		updatedCounts[index] += 1;
		setCount(updatedCounts);
	};

	// ************************************* Dispatch handler
	const addToCart = (productItem) => {
		dispatch(add(productItem));
	};
	// *************************************************** LOADING STATE
	if (loading) {
		return <ProductSkeleton />;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 bg-[#f6f9fc]">
			{productData.length > 0 ? (
				productData.map((productItems, index) => (
					<div className="" key={index}>
						<div className="product mt-[40px]">
							<div className="img h-72">
								<img
									loading="lazy"
									src={
										productItems.main_picture === "" ||
										productItems.main_picture === null
											? "/images/beauty-placeholder.jpeg"
											: productItems.main_picture
									}
									alt={productItems.name}
									onClick={() =>
										navigate(
											`/product/${productItems.idl_product_code}/${productItems.supplier_id}`,
										)
									}
									className="transition-all hover:scale-110 duration-500 ease-in-out w-full h-[250px] object-cover"
								/>

								<div className="product-like">
									<label>{count[index]}</label> <br />
									<AiOutlineHeart
										onClick={() => increment(index)}
										className="arrow"
									/>
								</div>
							</div>
							<div className="product-details p-2">
								<h5 className="text-sm">
									{productItems.name || productItems.model}
								</h5>

								<div className="price">
									<h4>
										<span>{productItems.currency} </span>{" "}
										{productItems.retail_price}
									</h4>
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
				))
			) : (
				<div className="flex items-center justify-center mx-auto h-screen">
					<Empty className="" description="No Product available." />
				</div>
			)}
		</div>
	);
};

export default Fragrances;
