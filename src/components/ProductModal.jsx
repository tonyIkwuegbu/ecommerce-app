import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../utils/ModalContext";
import { Button, Divider, Image, Modal } from "antd";
import { MdOutlineArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { formatCurrency } from "../utils/CurrencyFormat";

const ProductModal = () => {
	const { isModalOpen, modalProduct, closeModal } = useContext(ModalContext);
	const [modalWidth, setModalWidth] = useState("100%");
	const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
	const [count, setCount] = useState(1);

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
							//loading={isLoading}
							disabled
							//onClick={() => handleAddToCart(product)}
							className="bg-green-500 text-white hover:bg-green-400 w-[100%] lg:w-[70%] disabled:cursor-not-allowed disabled:bg-gray-400"
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
