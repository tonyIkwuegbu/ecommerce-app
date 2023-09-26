import { createContext, useState } from "react";
import Axios from "axios";
import { message } from "antd";
import { api } from "../Api";
import { useSelector } from "react-redux";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const user = useSelector((state) => state.auth.user);
	const [totalCartItemCount, setTotalCartItemCount] = useState(0);
	const [quantityCount, setQuantityCount] = useState(1);

	// ********************************************* FETCH CART ITEMS
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

			setTotalCartItemCount(response.data.data.products.length);
			return response.data.data.products;
		} catch (error) {
			console.log("Error fetching user's cart:", error);
		}
	};

	// ***************************************************************** ADD TO CART
	const addToCartApi = async (
		product_name,
		idl_product_code,
		product_sku,
		product_id,
		category,
		sub_category,
		main_picture,
		supplier_id,
		naira_price,
		product_cost,
		currency,
		currency_adder,
		exchange_rate,
		size,
		colour,
		weight,
		brand,
		description,
		made_in,
		material,
	) => {
		const params = {
			product_name,
			idl_product_code,
			product_sku,
			product_id,
			category,
			sub_category,
			main_picture,
			supplier_id,
			naira_price,
			product_cost,
			currency,
			currency_adder,
			exchange_rate,
			size,
			colour,
			weight,
			brand,
			description,
			made_in,
			material,
			quantity: quantityCount,
		};
		await Axios(`${api.baseURL}/api/v1/ecommerce/cart/record/${user?.email}`, {
			method: "POST",
			data: JSON.stringify(params),
			headers: {
				"Content-Type": "application/json",
				"x-access-token": `${api.token}`,
			},
		})
			.then((response) => {
				setTotalCartItemCount((prevCount) => prevCount + 1);
				message.success(response.data.message);
				return response.data.data;
			})
			.catch((err) => {
				console.log("Error adding to cart:", err);
				message.error(`${err.response.data.message}`);
			});
	};

	// *************************************** CLEAR CART
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
				quantityCount,
				setQuantityCount,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
