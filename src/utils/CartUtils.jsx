import { createContext, useContext, useState } from "react";
import Axios from "axios";
import { message } from "antd";
import { api } from "../Api";
import { useSelector } from "react-redux";

const CartContext = createContext();

export const useCart = () => {
	const cartContext = useContext(CartContext);
	if (!cartContext) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return cartContext;
};

export const CartProvider = ({ children }) => {
	const user = useSelector((state) => state.auth.user);
	const [totalCartItemCount, setTotalCartItemCount] = useState(0);

	const fetchUserCart = async () => {
		try {
			const response = await Axios.get(
				`${api.baseURL}/api/v1/ecommerce/cart/record/${user?.email}`,
				{
					headers: {
						"Content-Type": "application/json",
						"x-access-token": api.token,
					},
				},
			);

			setTotalCartItemCount(response.data.data.length); // Update the total count
			return response.data.data;
		} catch (error) {
			console.log("Error fetching user's cart:", error);
		}
	};

	const addToCartApi = async (user, productId) => {
		try {
			const response = await Axios.post(
				`${api.baseURL}/api/v1/ecommerce/cart/record/${user?.email}`,
				{ idl_product_code: productId },
				{
					headers: {
						"Content-Type": "application/json",
						"x-access-token": api.token,
					},
				},
			);

			// Increment the total count when adding an item to the cart
			setTotalCartItemCount((prevCount) => prevCount + 1);
			message.success(response.data.message);
			return response.data.data;
		} catch (error) {
			console.log("Error adding to cart:", error);
			message.error(`${error.response.data.message}`);
		}
	};

	const clearCartItems = async () => {
		try {
			const response = await Axios.delete(
				`${api.baseURL}/api/v1/ecommerce/cart/deleteall/${user?.email}`,
				{
					headers: {
						"Content-Type": "application/json",
						"x-access-token": api.token,
					},
				},
			);

			// Reset the total count when clearing the cart
			setTotalCartItemCount(0);
			message.success(response.data.message);
		} catch (error) {
			console.log("Error clearing cart items:", error);
		}
	};

	return (
		<CartContext.Provider
			value={{
				fetchUserCart,
				addToCartApi,
				totalCartItemCount,
				clearCartItems,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
