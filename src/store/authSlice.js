import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		isAuthenticated: false,
	},
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
			state.isAuthenticated = true;
		},
		logout: (state) => {
			state.user = null;
			state.isAuthenticated = false;
		},
		// setFullUser: (state, action) => {
		// 	state.user = action.payload;
		// },
	},
});

export const { login, logout, setFullUser } = authSlice.actions;
export default authSlice.reducer;
