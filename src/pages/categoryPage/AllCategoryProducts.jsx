import { useContext } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Empty } from "antd";
import ProductSkeleton from "../../components/ProductSkeleton";
import { useNavigate } from "react-router-dom";
import { IoIosBasket } from "react-icons/io";
import { BsFillCartCheckFill } from "react-icons/bs";
import { formatCurrency } from "../../utils/CurrencyFormat";
import { ModalContext } from "../../utils/ModalContext";

const AllCategoryProduct = ({ data, loading }) => {
	const navigate = useNavigate();
	const { openModal } = useContext(ModalContext);
	//const [count, setCount] = useState([]);

	// Set initial count values when data changes
	// useEffect(() => {
	// 	if (data && data.length > 0) {
	// 		setCount(Array(data.length).fill(0));
	// 	}
	// }, [data]);

	/// ********************************* increase likes
	// const increment = (index) => {
	// 	const updatedCounts = [...count];
	// 	updatedCounts[index] += 1;
	// 	setCount(updatedCounts);
	// };

	/// ******************************************** LOADING STATE
	if (loading) {
		return <ProductSkeleton />;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-3">
			{data?.length > 0 ? (
				data?.map((productItems) => (
					<div className="" key={productItems?.idl_product_code}>
						<div className="group h-96 w-[300px] p-[20px] m-[8px] shadow-md rounded-md bg-white relative">
							<div className="h-[200px] w-[200px] mx-auto">
								<img
									loading="lazy"
									src={
										productItems.main_picture === "" ||
										productItems.main_picture === null
											? "/images/placeholder.jpeg"
											: productItems.main_picture
									}
									alt={productItems.product_name}
									onClick={() =>
										navigate(
											`/product/${productItems.idl_product_code}/${productItems.supplier_id}`,
										)
									}
									className="transition-all hover:scale-110 duration-500 ease-in-out object-cover cursor-pointer w-full h-full rounded"
								/>
								<div className="absolute top-0 right-0 cursor-pointer  m-[10px] opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out">
									<AiOutlineHeart className="mb-2" />
									<IoIosBasket className="" />
								</div>

								{/* <div className="product-like">
									<label>{count[index]}</label> <br />
									<AiOutlineHeart
										onClick={() => increment(index)}
										className="arrow"
									/>
								</div> */}
							</div>

							<div className="font-semibold tracking-wide">
								<h3 className="text-[13px] text-gray-600 py-1 text-center truncate capitalize">
									{productItems?.product_name}
								</h3>
								{productItems?.product_variants?.length > 0 && (
									<div>
										<div className="text-green-500 my-3">
											{formatCurrency(
												productItems?.product_variants[0]?.naira_price,
											)}
										</div>
										{productItems?.product_variants[0]?.product_discount !==
											"0%" && (
											<div className="flex items-center justify-between text-[12px]">
												<p className="text-white w-16 text-center p-1 bg-red-500">
													{productItems?.product_variants[0]?.product_discount}{" "}
													off
												</p>
												<p className="text-gray-400  line-through">
													{formatCurrency(
														productItems?.product_variants[0]
															?.product_rrp_naira,
													)}
												</p>
											</div>
										)}
									</div>
								)}
								<div className="price pt-3 text-right">
									<button
										type="button"
										onClick={() => {
											openModal(productItems);
										}}
									>
										<BsFillCartCheckFill className="mx-auto" />
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

export default AllCategoryProduct;
