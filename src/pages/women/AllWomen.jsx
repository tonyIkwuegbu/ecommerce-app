import { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import { Empty } from "antd";
import { add } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import ProductSkeleton from "../../components/ProductSkeleton";
import { useNavigate } from "react-router-dom";

const AllWomen = ({ data, loading }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [count, setCount] = useState([]);

	// Set initial count values when data changes
	useEffect(() => {
		if (data && data.length > 0) {
			setCount(Array(data.length).fill(0));
		}
	}, [data]);

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

	/// ************************************ CURRENCY FORMAT
	const formattedAmount = new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
	});

	/// ******************************************** LOADING STATE
	if (loading) {
		return <ProductSkeleton />;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 bg-[#f6f9fc]">
			{data.length > 0 ? (
				data.map((productItems, index) => (
					<div className="" key={index}>
						<div className="product mt-[40px]">
							<div className="img h-72">
								<img
									loading="lazy"
									src={
										productItems.main_picture === "" ||
										productItems.main_picture === null
											? "/images/women-placeholder.jpeg"
											: productItems.main_picture
									}
									alt={productItems.name}
									onClick={() =>
										navigate(
											`/product/${productItems.idl_product_code}/${productItems.supplier_id}`,
										)
									}
									className="cursor-pointer transition-all hover:scale-110 duration-500 ease-in-out w-full h-[250px] object-cover"
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
									{productItems.name || productItems.brand}
								</h5>

								<div className="price">
									<h4>{formattedAmount.format(productItems?.retail_price)}</h4>
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
					<Empty className="" description="No Product available." />{" "}
				</div>
			)}
		</div>
	);
};

export default AllWomen;
