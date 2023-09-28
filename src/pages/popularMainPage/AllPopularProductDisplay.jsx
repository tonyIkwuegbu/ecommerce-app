import { BsFillCartCheckFill } from "react-icons/bs";
import { IoIosBasket } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import { formatCurrency } from "../../utils/CurrencyFormat";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ModalContext } from "../../utils/ModalContext";
import MainPageSkeleton from "../MainPageSkeleton";

const AllPopularProductDisplay = ({ shuffledData, loading }) => {
	const navigate = useNavigate();
	const { openModal } = useContext(ModalContext);

	/// ******************************************** LOADING STATE
	if (loading) {
		return <MainPageSkeleton />;
	}
	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 max-w-[98%]">
				{shuffledData?.length > 0 &&
					shuffledData?.map((value) => (
						<div className="" key={value?.idl_product_code}>
							<div className="group h-96 lg:w-[260px] p-[20px] m-[8px] shadow-md rounded-md bg-white relative">
								<div className="h-[200px] w-[200px] mx-auto">
									<img
										loading="lazy"
										src={value?.main_picture}
										alt={value?.name}
										onError={(e) => {
											e.target.src = "/images/home-placeholder.jpeg"; // Replace with your fallback image URL
										}}
										onClick={() =>
											navigate(
												`/product/${value.idl_product_code}/${value.supplier_id}`,
											)
										}
										className="transition-all hover:scale-110 duration-500 ease-in-out object-cover cursor-pointer w-full h-44 rounded-md"
									/>
									<div className="absolute top-0 right-0 cursor-pointer  m-[10px] opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out">
										{/* <label>{count[index]}</label> */}

										<AiOutlineHeart
											//onClick={() => increment(index)}
											className="mb-2"
										/>
										<IoIosBasket className="" />
									</div>
								</div>

								<div className="font-semibold tracking-wide">
									<h3 className="text-[13px] text-gray-600 py-1 text-center truncate capitalize">
										{value?.product_name}
									</h3>
									{value?.product_variants?.length > 0 && (
										<div>
											<div className="text-green-500 my-4">
												{formatCurrency(
													value?.product_variants[0]?.naira_price,
												)}
											</div>
											{value?.product_variants[0]?.product_discount !==
												"0%" && (
												<div className="flex items-center justify-between text-[12px]">
													<p className="text-white w-16 text-center p-1 bg-red-500">
														{value?.product_variants[0]?.product_discount} off
													</p>
													<p className="text-gray-400  line-through">
														{formatCurrency(
															value?.product_variants[0]?.product_rrp_naira,
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
												openModal(value);
											}}
										>
											<BsFillCartCheckFill className="mx-auto" />
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default AllPopularProductDisplay;
