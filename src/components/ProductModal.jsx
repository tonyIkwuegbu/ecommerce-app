import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../utils/ModalContext";
import { Button, Divider, Image, Modal } from "antd";
import { formatCurrency } from "../utils/CurrencyFormat";

const ProductModal = () => {
	const { isModalOpen, modalProduct, closeModal } = useContext(ModalContext);
	const [modalWidth, setModalWidth] = useState("100%");

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
						alt={modalProduct?.name}
						width={400}
						height={400}
						className="object-cover"
					/>
				</div>
				<div>
					<h4 className="text-gray-500 text-sm lg:text-2xl text-center lg:text-left">
						{modalProduct?.name}
					</h4>
					<p className="py-3 text-green-500 text-center lg:text-left text-sm lg:text-lg font-semibold tracking-wider">
						{formatCurrency(modalProduct?.naira_price)}
					</p>
					<Divider style={{ backgroundColor: "gray", opacity: "0.3" }} />
					<div className="flex items-center space-x-6 text-xs lg:text-sm font-semibold">
						<p>
							Brand:{" "}
							<span className="text-gray-500">
								{modalProduct?.brand || "N/A"}
							</span>
						</p>
					</div>
					<div>
						<div className="flex items-center space-x-6 text-xs lg:text-sm mt-4">
							<p>
								Size:{" "}
								<span className="text-[#ff5c00] font-semibold">
									{modalProduct?.size || "N/A"}
								</span>
							</p>
							<p>
								Color:{" "}
								<span className="text-gray-500 font-semibold">
									{modalProduct?.colour || "N/A"}
								</span>
							</p>
						</div>
					</div>
					<p className="mt-4 text-xs lg:text-sm">
						Product Code:{" "}
						<span className="text-green-600 font-semibold">
							{modalProduct?.idl_product_code || "N/A"}
						</span>
					</p>
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
							//onClick={() => handleAddToCart(product)}
							className="bg-green-500 text-white hover:bg-green-400 w-[100%] lg:w-[70%]"
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
