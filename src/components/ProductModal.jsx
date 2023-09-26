import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../utils/ModalContext";
import { Button, Divider, Image, Modal } from "antd";
import { MdOutlineArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { formatCurrency } from "../utils/CurrencyFormat";
import { useDispatch, useSelector } from "react-redux";
import { CartContext } from "../utils/CartUtils";
import { add } from "../store/cartSlice";

const ProductModal = () => {
	const { addToCartApi } = useContext(CartContext);
	const dispatch = useDispatch();
	const userIsAuthenticated = useSelector(
		(state) => state.auth.isAuthenticated,
	);
	const { isModalOpen, modalProduct, closeModal } = useContext(ModalContext);
	const [modalWidth, setModalWidth] = useState("100%");
	const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
	const [count, setCount] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setModalWidth("70%");
			} else {
				setModalWidth("100%");
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// ******************************************************************** HANDLERS
	const variants = modalProduct?.product_variants || [];

	const handleVariantSelection = (index) => {
		setSelectedVariantIndex(index);
	};

	const handleNextVariant = () => {
		if (selectedVariantIndex < variants.length - 1) {
			setSelectedVariantIndex(selectedVariantIndex + 1);
		}
	};

	const handlePreviousVariant = () => {
		if (selectedVariantIndex > 0) {
			setSelectedVariantIndex(selectedVariantIndex - 1);
		}
	};

	// ******************************************************HANDLE CART
	const handleAddToCart = async (product) => {
		//payload
		const productItem = {
			product_name: product?.product_name || "",
			idl_product_code: product?.idl_product_code || "",
			product_sku:
				product?.product_variants[selectedVariantIndex]?.product_sku || "",
			product_id:
				product?.product_variants[selectedVariantIndex]?.product_id || "",
			category: product?.category || "",
			sub_category: product?.sub_category || "",
			main_picture: product?.main_picture || "",
			supplier_id: product?.supplier_id || "",
			quantity: count.toString(),
			naira_price:
				product?.product_variants[selectedVariantIndex]?.naira_price || "",
			product_cost:
				product?.product_variants[selectedVariantIndex]?.product_cost || "",
			currency: product?.product_variants[selectedVariantIndex]?.currency || "",
			currency_adder:
				product?.product_variants[selectedVariantIndex]?.currency_adder || "",
			exchange_rate:
				product?.product_variants[selectedVariantIndex]?.exchange_rate || "",
			size: product?.product_variants[selectedVariantIndex]?.size || "",
			colour: product?.product_variants[selectedVariantIndex]?.colour || "",
			weight: product?.product_variants[selectedVariantIndex]?.weight || "",
			brand: product?.brand || "",
			description: product?.description || "",
			made_in: product?.made_in || "",
			material: product?.material || "",
		};
		if (!userIsAuthenticated) {
			// Handle non-authenticated user's cart
			dispatch(add(productItem));
			return;
		}

		try {
			setIsLoading(true);
			await addToCartApi(
				product?.product_name || "",
				product?.idl_product_code || "",
				product?.product_variants[selectedVariantIndex]?.product_sku || "",
				product?.product_variants[selectedVariantIndex]?.product_id || "",
				product?.category || "",
				product?.sub_category || "",
				product?.main_picture || "",
				product?.supplier_id || "",
				product?.product_variants[selectedVariantIndex]?.naira_price || "",
				product?.product_variants[selectedVariantIndex]?.product_cost || "",
				product?.product_variants[selectedVariantIndex]?.currency || "",
				product?.product_variants[selectedVariantIndex]?.currency_adder || "",
				product?.product_variants[selectedVariantIndex]?.exchange_rate || "",
				product?.product_variants[selectedVariantIndex]?.size || "",
				product?.product_variants[selectedVariantIndex]?.colour || "",
				product?.product_variants[selectedVariantIndex]?.weight || "",
				product?.brand || "",
				product?.description || "",
				product?.made_in || "",
				product?.material || "",
				count.toString(),
			);
		} catch (error) {
			console.log("Error adding item to cart:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal
			open={isModalOpen}
			onCancel={closeModal}
			footer={null}
			width={modalWidth}
		>
			<div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-4 justify-center tracking-wide my-10 px-4">
				<div className="flex items-center justify-center bg-white lg:mx-10 p-1">
					<Image
						loading="lazy"
						src={modalProduct?.main_picture}
						alt={modalProduct?.product_name}
						width={400}
						height={400}
						className="object-cover"
					/>
				</div>
				<div>
					<h4 className="text-gray-500 text-sm lg:text-2xl text-center lg:text-left">
						{modalProduct?.product_name}
					</h4>
					<div>
						{modalProduct?.product_variants &&
							modalProduct?.product_variants.length > 0 && (
								<>
									<p className="py-3 text-green-500 text-center lg:text-left text-sm lg:text-lg font-semibold tracking-wider">
										{formatCurrency(
											modalProduct?.product_variants[selectedVariantIndex]
												?.naira_price,
										)}
									</p>
									<Divider
										style={{ backgroundColor: "gray", opacity: "0.3" }}
									/>
									<div className="flex items-center gap-x-4 text-sm py-1">
										<h3>Product Variants</h3>
										<div>
											<button
												onClick={handlePreviousVariant}
												disabled={selectedVariantIndex === 0}
												className="bg-black text-white p-2 rounded-sm mx-2 disabled:cursor-not-allowed"
											>
												<MdArrowBackIosNew />
											</button>
											{variants.map((variant, index) => (
												<button
													key={index}
													onClick={() => handleVariantSelection(index)}
													className={`mx-2 text-lg ${
														selectedVariantIndex === index
															? "text-[#ff5c40]"
															: ""
													}`}
												>
													{index + 1}
												</button>
											))}
											<button
												onClick={handleNextVariant}
												disabled={selectedVariantIndex === variants.length - 1}
												className="bg-black text-white p-2 rounded-sm mx-2 disabled:cursor-not-allowed"
											>
												<MdOutlineArrowForwardIos />
											</button>
										</div>
									</div>{" "}
									<div className="text-black font-semibold text-sm">
										<p className="py-1">
											Colour:{" "}
											<span className="">
												{modalProduct?.product_variants[selectedVariantIndex]
													?.colour || "N/A"}
											</span>
										</p>
										<p className="py-1">
											Size:{" "}
											<span className="text-gray-600">
												{modalProduct?.product_variants[selectedVariantIndex]
													?.size || "N/A"}
											</span>
										</p>
										<p className="py-2">
											Stock Quantity:{" "}
											<span className="text-gray-600">
												{modalProduct?.product_variants[selectedVariantIndex]
													?.stock_quantity || "N/A"}
											</span>
										</p>
									</div>
								</>
							)}
					</div>

					<div className="text-black font-semibold text-sm">
						<p className="py-2">
							Brand:{" "}
							<span className="text-gray-600">
								{modalProduct?.brand || "N/A"}
							</span>
						</p>
						<p className="py-2">
							Product Code:{" "}
							<span className="text-green-600">
								{modalProduct?.idl_product_code || "N/A"}
							</span>
						</p>
					</div>
					<div className="flex items-center gap-x-4 text-sm py-3">
						<h3>Quantity</h3>
						<div>
							<button
								onClick={() => setCount((prev) => prev - 1)}
								disabled={count === 1 ? true : false}
								className="bg-[#ff5c40] text-white p-2 rounded-sm mx-2 disabled:cursor-not-allowed"
							>
								<AiOutlineMinus />
							</button>

							<button className="mx-2 text-lg">{count}</button>

							<button
								onClick={() => setCount((prev) => prev + 1)}
								className="bg-[#ff5c40] text-white p-2 rounded-sm mx-2 disabled:cursor-not-allowed"
							>
								<AiOutlinePlus />
							</button>
						</div>
					</div>
					<Divider style={{ backgroundColor: "gray", opacity: "0.3" }} />
					<div className="my-5">
						<p className="mt-4 text-xs lg:text-sm">
							Product Description:{" "}
							<span className="text-gray-700 font-semibold">
								{modalProduct?.description || "N/A"}
							</span>
						</p>
					</div>

					<div className="mt-16">
						<Button
							type="success"
							loading={isLoading}
							disabled
							onClick={() => handleAddToCart(modalProduct)}
							className="bg-green-500 text-white rounded-none hover:bg-green-400 w-[100%] lg:w-[70%] disabled:cursor-not-allowed disabled:bg-gray-400"
						>
							Add to Cart
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ProductModal;
