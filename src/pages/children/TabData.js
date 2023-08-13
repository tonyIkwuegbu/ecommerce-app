import { GiClothes, GiChelseaBoot } from "react-icons/gi";
import { FcSportsMode } from "react-icons/fc";
import { MdWatch } from "react-icons/md";
import { FaSuitcase } from "react-icons/fa";
import { DiGhostSmall } from "react-icons/di";

export const NavChildren = [
	{
		title: "All",
		id: 1,
		icon: DiGhostSmall,
		tabNum: 1,
	},
	{
		title: "Clothing",
		id: 2,
		icon: GiClothes,
		tabNum: 2,
	},
	{
		title: "Shoes",
		id: 3,
		icon: GiChelseaBoot,
		tabNum: 3,
	},
	{
		title: "Sportswear",
		id: 4,
		icon: FcSportsMode,
		tabNum: 4,
	},
	{
		title: "Accessories",
		id: 5,
		icon: MdWatch,
		tabNum: 5,
	},
	{
		title: "Bags",
		id: 6,
		icon: FaSuitcase,
		tabNum: 6,
	},
];
