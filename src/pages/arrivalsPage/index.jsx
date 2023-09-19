import { useContext } from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { IoIosBasket } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import MainPageSkeleton from "../MainPageSkeleton";
import useFetch from "../../hooks/useFetch";
import { formatCurrency } from "../../utils/CurrencyFormat";
import { ModalContext } from "../../utils/ModalContext";

const ArrivalMain = () => {
	const navigate = useNavigate();
	const { openModal } = useContext(ModalContext);

	// ******************************************************* GET PRODUCTS
	const { loading, shuffledData } = useFetch(
		"/api/v1/ecommerce/product/newarrival?skip=0&limit=0",
	);

	/// ******************************************** LOADING STATE
	if (loading) {
		return <MainPageSkeleton />;
	}

	return (
		<div className="flex flex-col justify-center items-center">
			<h2 className="text-xl lg:text-2xl font-semibold mb-4 py-2 tracking-wider">
				New Arrivals
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 max-w-[98%]">
				{shuffledData?.length > 0 &&
					shuffledData?.map((value) => (
						<div className="" key={value?.idl_product_code}>
							<div className="group h-[96] lg:w-[260px] p-[20px] m-[8px] shadow-md rounded-md bg-white relative">
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

								<div className="font-semibold tracking-wide ">
									<h3 className="text-[13px] text-gray-600 py-3 text-center truncate">
										{value?.name}
									</h3>

									<div className="price flex items-center tracking-wider justify-between py-3">
										<h4 className="text-green-500">
											{formatCurrency(value?.naira_price)}
										</h4>
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

export default ArrivalMain;
