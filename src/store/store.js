import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import orderReducer from "./orderSlice";
//import { createTransform } from "redux-persist";

// Transformation to store only the first name in localStorage
// const firstNameTransform = createTransform(
// 	(inboundState, key) => {
// 		if (key === "auth") {
// 			return { user: { first_name: inboundState?.user?.first_name || "" } };
// 		}
// 		return inboundState;
// 	},
// 	(outboundState, key) => {
// 		if (key === "auth") {
// 			return {
// 				...outboundState,
// 				isAuthenticated: !!outboundState?.user?.first_name,
// 			};
// 		}
// 		return outboundState;
// 	},
// 	{ whitelist: ["auth"] },
// );

const reducers = combineReducers({
	cart: cartReducer,
	auth: authReducer,
	order: orderReducer,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth", "cart", "order"],
	//transforms: [firstNameTransform],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk],
});

export default store;
