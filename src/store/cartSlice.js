import { createSlice } from "@reduxjs/toolkit";

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
				productExist.qty++;
			} else {
				// Product doesn't exist in the cart, add it
				state.push({ ...productItem, qty: 1 });
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
			if (existingItem && existingItem.qty > 1) {
				existingItem.qty--;
			}
			return state;
		},
		increaseQty(state, action) {
			const productId = action.payload;
			const existingItem = state.find(
				(item) => item.idl_product_code === productId,
			);
			if (existingItem) {
				existingItem.qty++;
			}
			return state;
		},
	},
});

export const { add, updateCart, remove, decreaseQty, increaseQty } =
	cartSlice.actions;
export default cartSlice.reducer;
