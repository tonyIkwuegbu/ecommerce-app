// ModalContext.js
import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalProduct, setModalProduct] = useState(null);

	const openModal = (product) => {
		setModalProduct(product);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setModalProduct(null);
	};

	return (
		<ModalContext.Provider
			value={{ isModalOpen, modalProduct, openModal, closeModal }}
		>
			{children}
		</ModalContext.Provider>
	);
};
