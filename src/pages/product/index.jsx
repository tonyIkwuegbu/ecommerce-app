import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../Api";
import { Button, Divider, Image } from "antd";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { add } from "../../store/cartSlice";
import OneProductSkeleton from "./OneProductSkeleton";

const ProductPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [product, setProduct] = useState([]);
	const [count, setCount] = useState(1);
	const [loading, setLoading] = useState(false);

	// ******************************************************* GET PRODUCCT

	const getProduct = useCallback(async () => {
		setLoading(true);
		try {
			const fetchData = await Axios.get(
				`${api.baseURL}/api/v1/ecommerce/products/detail/${id}`,
				{
					headers: {
						"Content-Type": "application/json",
						"x-access-token": api.token,
					},
				},
			);

			setProduct(fetchData.data.data);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}, [id]);
	useEffect(() => {
		getProduct();
	}, [getProduct]);

	if (loading) {
		return <OneProductSkeleton />;
	}

	// ************************************* Dispatch handler
	const addToCart = (productItem) => {
		dispatch(add(productItem));
	};

	return (
		<div className="max-w-[98%]">
			<div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-4 justify-center tracking-wide my-10 px-4">
				<div className="flex items-center justify-center">
					<Image
						src={
							product.main_picture === "" || product.main_picture === null
								? "/images/placeholder.jpeg"
								: product.main_picture
						}
						alt={product.name}
						width={400}
						height={400}
						className="object-cover"
					/>
				</div>
				<div>
					<h4 className="text-gray-500 text-sm lg:text-2xl text-center lg:text-left">
						{product.name || product.model}
					</h4>
					<p className="py-3 text-[#ff5c00] text-center lg:text-left text-sm lg:text-lg font-semibold">
						<span>{product.currency}</span> {product.retail_price}
					</p>
					<Divider />
					<div className="flex items-center space-x-6 text-xs lg:text-sm">
						<p>
							Brand:{" "}
							<span className="text-gray-500">{product.brand || "N/A"}</span>
						</p>
						<p>
							Sold By:{" "}
							<span className="text-[#ff5c00] font-semibold">
								{product.supplier_name || "N/A"}
							</span>
						</p>
					</div>
					<div>
						<div className="flex items-center space-x-6 text-xs lg:text-sm mt-4">
							<p>
								Size:{" "}
								<span className="text-[#ff5c00] font-semibold">
									{product.size || "N/A"}
								</span>
							</p>
							<p>
								Color:{" "}
								<span className="text-gray-500">{product.color || "N/A"}</span>
							</p>
						</div>
					</div>
					<p className="mt-4 text-xs lg:text-sm">
						Product Code:{" "}
						<span className="text-green-600 font-semibold">
							{product.idl_product_code || "N/A"}
						</span>
					</p>
					<Divider />

					<div className="flex items-center space-x-12">
						<p className="text-xs lg:text-sm">
							Quantity:{" "}
							<span className="text-green-600">
								<abbr className="text-sm font-semibold">X</abbr> {count}{" "}
							</span>{" "}
						</p>
						<div className="flex space-x-3 justify-end">
							<button
								className="incCart p-1"
								onClick={() => setCount(count + 1)}
							>
								{" "}
								<AiOutlinePlus className="mx-auto" />{" "}
							</button>
							<button
								className="desCart p-1"
								disabled={count === 1 ? true : false}
								onClick={() => setCount(count - 1)}
							>
								{" "}
								<AiOutlineMinus className="mx-auto" />{" "}
							</button>{" "}
						</div>
					</div>
					<div className="mt-10">
						<Button
							type="success"
							onClick={() => addToCart(product)}
							className="bg-green-500 text-white hover:bg-green-400 w-[100%] lg:w-[70%]"
						>
							Add to Cart
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
