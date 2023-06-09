import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const store = configureStore({
	reducer: {
		cart: cartReducer,
		// other reducers...
	},
});

export default store;
