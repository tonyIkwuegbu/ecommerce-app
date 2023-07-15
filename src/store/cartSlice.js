import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		add: (state, action) => {
			return [...state, action.payload];
		},
		updateCart: (state, action) => {
			return action.payload;
		},
		remove(state, action) {
			return state.filter((item) => item.idl_product_code !== action.payload);
		},
		decreaseQty(state, action) {
			const productId = action.payload;
			const existingItem = state.find((item) => item.id === productId);
			if (existingItem && existingItem.qty > 1) {
				existingItem.qty--;
			}
			return state;
		},
	},
});

export const { add, updateCart, remove, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;
