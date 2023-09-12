// export const formattedAmount = new Intl.NumberFormat("en-NG", {
// 	style: "currency",
// 	currency: "NGN",
// });

export const formatCurrency = (amount) => {
	const formatter = new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
	});
	return formatter.format(amount);
};
