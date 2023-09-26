import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = [];

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		add: (state, action) => {
			const productItem = action.payload;
			const productExist = state.find(
				(item) => item.idl_product_code === productItem.idl_product_code,
			);

			if (productExist) {
				// Product already exists in the cart, update the quantity
				productExist.quantity++;
			} else {
				// Product doesn't exist in the cart, add it
				state.push({ ...productItem, quantity: productItem.quantity });
				message.success("Item added to cart!");
			}
		},

		updateCart: (state, action) => {
			return action.payload;
		},
		remove(state, action) {
			return state.filter((item) => item.idl_product_code !== action.payload);
		},
		decreaseQty(state, action) {
			const productId = action.payload;
			const existingItem = state.find(
				(item) => item.idl_product_code === productId,
			);
			if (existingItem && existingItem.quantity > 1) {
				existingItem.quantity--;
			}
			return state;
		},
		clearCart: () => initialState,
		increaseQty(state, action) {
			const productId = action.payload;
			const existingItem = state.find(
				(item) => item.idl_product_code === productId,
			);
			if (existingItem) {
				existingItem.quantity++;
			}
			return state;
		},
	},
});

export const { add, updateCart, remove, decreaseQty, increaseQty, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;
