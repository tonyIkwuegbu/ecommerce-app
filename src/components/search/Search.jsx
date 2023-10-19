import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios"; // You may need to install axios
import { api } from "../../Api";
import { Spin, Empty, message, Divider } from "antd";
import { BsFillCartCheckFill } from "react-icons/bs";
import { formatCurrency } from "../../utils/CurrencyFormat";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosBasket } from "react-icons/io";
import { ModalContext } from "../../utils/ModalContext";
import { useContext } from "react";

const Search = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { openModal } = useContext(ModalContext);
	const searchQuery = new URLSearchParams(location.search).get("query");
	const [searchResults, setSearchResults] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (searchQuery) {
			const params = {
				search_term: searchQuery,
			};

			const paramsString = JSON.stringify(params);

			setLoading(true);
			Axios.post(
				`${api.baseURL}/api/v1/ecommerce/product/search?skip=0&limit=0`,
				paramsString,
				{
					headers: {
						"Content-Type": "application/json",
						"x-access-token": api.token,
					},
				},
			)
				.then((response) => {
					if (response.data.status) {
						setSearchResults(response.data.data);
					} else {
						message.error(response.data.message);
					}
					setLoading(false);
				})
				.catch((err) => {
					setSearchResults([]);
					setLoading(false);
					if (
						err.response.status === 401 ||
						err.response.status === 404 ||
						err.response.status === 405
					) {
						message.error(`${err.response.data.message}`);
					} else {
						message.error(`${err.message}`);
					}
				});
		}
	}, [searchQuery]);

	return (
		<div className="flex flex-col max-w-[98%]">
			{loading && (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100vh",
					}}
				>
					<Spin />
				</div>
			)}

			{!loading && (
				<div>
					{searchQuery ? (
						<>
							<h1 className="text-lg md:text-2xl font-semibold tracking-wider text-left px-2 text-gray-600 py-3">
								Search Results for:{" "}
								<abbr className="text-sm md:text-xl text-[#ff5c40]">
									{searchQuery}
								</abbr>
							</h1>
							<Divider />
							<div className="flex flex-wrap justify-center gap-4 my-4 ">
								{" "}
								{searchResults?.length > 0 ? (
									searchResults?.map((value) => (
										<div className="" key={value?.idl_product_code}>
											<div className="group h-96 w-[260px] p-[20px] m-[8px] shadow-md rounded-md bg-white relative">
												<div className="h-[200px] w-[150px] lg:w-[200px] mx-auto">
													<img
														loading="lazy"
														src={value?.main_picture}
														alt={value?.name}
														onError={(e) => {
															e.target.src = "/images/home-placeholder.jpeg";
														}}
														onClick={() =>
															navigate(
																`/product/${value.idl_product_code}/${value.supplier_id}`,
															)
														}
														className="transition-all hover:scale-110 duration-500 ease-in-out object-cover cursor-pointer w-full h-44 rounded-md"
													/>
													<div className="absolute top-0 right-0 cursor-pointer  m-[10px] opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out">
														<AiOutlineHeart className="mb-2" />
														<IoIosBasket />
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
																		{
																			value?.product_variants[0]
																				?.product_discount
																		}{" "}
																		off
																	</p>
																	<p className="text-gray-400  line-through">
																		{formatCurrency(
																			value?.product_variants[0]
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
																openModal(value);
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
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											minHeight: "60vh",
										}}
									>
										<Empty description="No results found" />
									</div>
								)}
							</div>
						</>
					) : (
						<Empty />
					)}
				</div>
			)}
		</div>
	);
};

export default Search;
