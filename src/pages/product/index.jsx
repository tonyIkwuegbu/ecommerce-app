import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../Api";
import { Button, Divider, Image } from "antd";
import { useDispatch } from "react-redux";
import { add } from "../../store/cartSlice";
import OneProductSkeleton from "./OneProductSkeleton";

const ProductPage = () => {
	const { id, supplier_id } = useParams();
	const dispatch = useDispatch();
	//const cartItems = useSelector((state) => state.cart);
	const [product, setProduct] = useState([]);

	const [loading, setLoading] = useState(false);

	// ******************************************************* GET PRODUCCT

	const getProduct = useCallback(async () => {
		setLoading(true);
		try {
			const fetchData = await Axios.get(
				`${api.baseURL}/api/v1/ecommerce/products/detail/${id}/${supplier_id}`,
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
	}, [id, supplier_id]);
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

	/// ************************************ CURRENCY FORMAT
	const formattedAmount = new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
	});

	return (
		<div className="max-w-[98%]">
			<div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-4 justify-center tracking-wide my-10 px-4">
				<div className="flex items-center justify-center">
					<Image
						src={
							product?.main_picture === "" || product?.main_picture === null
								? "/images/placeholder.jpeg"
								: product?.main_picture
						}
						alt={product?.name || product?.model}
						width={400}
						height={400}
						className="object-cover"
					/>
				</div>
				<div>
					<h4 className="text-gray-500 text-sm lg:text-2xl text-center lg:text-left">
						{product?.name || product?.model || product?.brand}
					</h4>
					<p className="py-3 text-[#ff5c00] text-center lg:text-left text-sm lg:text-lg font-semibold tracking-wider">
						{formattedAmount.format(product?.retail_price)}
					</p>
					<Divider style={{ backgroundColor: "gray", opacity: "0.3" }} />
					<div className="flex items-center space-x-6 text-xs lg:text-sm font-semibold">
						<p>
							Brand:{" "}
							<span className="text-gray-500">{product?.brand || "N/A"}</span>
						</p>
						<p>
							Sold By:{" "}
							<span className="text-[#ff5c00]">
								{product?.supplier_name || "N/A"}
							</span>
						</p>
					</div>
					<div>
						<div className="flex items-center space-x-6 text-xs lg:text-sm mt-4">
							<p>
								Size:{" "}
								<span className="text-[#ff5c00] font-semibold">
									{product?.size || "N/A"}
								</span>
							</p>
							<p>
								Color:{" "}
								<span className="text-gray-500">{product?.color || "N/A"}</span>
							</p>
						</div>
					</div>
					<p className="mt-4 text-xs lg:text-sm">
						Product Code:{" "}
						<span className="text-green-600 font-semibold">
							{product?.idl_product_code || "N/A"}
						</span>
					</p>
					<Divider style={{ backgroundColor: "gray", opacity: "0.3" }} />
					<div className="my-5">
						<p className="mt-4 text-xs lg:text-sm">
							Product Description:{" "}
							<span className="text-gray-700 font-semibold">
								{product?.description || "N/A"}
							</span>
						</p>
					</div>

					<div className="mt-16">
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
