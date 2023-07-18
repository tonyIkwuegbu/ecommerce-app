import { GiHealthIncrease, GiOilySpiral, GiPlug } from "react-icons/gi";
import { FaBaby } from "react-icons/fa";
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import { BiShoppingBag } from "react-icons/bi";

const Items = [
	{
		key: "1",
		label: "Men",
		icon: FcBusinessman,
		path: "/category/men",
	},
	{
		key: "2",
		label: "Women",
		icon: FcBusinesswoman,
		path: "/category/women",
	},
	{
		key: "3",
		label: "Children",
		icon: FaBaby,
		path: "/category/children",
	},
	{
		key: "4",
		label: "Health & Beauty",
		icon: GiHealthIncrease,
		path: "/#",
	},
	{
		key: "5",
		label: "Home & Lights",
		icon: GiOilySpiral,
		path: "/#",
	},
	{
		key: "6",
		label: "Bags",
		icon: BiShoppingBag,
		path: "/#",
	},
	{
		key: "7",
		label: "Electronics",
		icon: GiPlug,
		path: "/#",
	},
];

export default Items;
