import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
	name: "order",
	initialState: {
		order: [],
	},
	reducers: {
		getSummary: (state, action) => {
			state.order = action.payload;
		},
	},
});

export const { getSummary } = orderSlice.actions;
export default orderSlice.reducer;
