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
		title: "clothing",
		id: 2,
		icon: GiClothes,
		tabNum: 2,
	},
	{
		title: "shoes",
		id: 3,
		icon: GiChelseaBoot,
		tabNum: 3,
	},
	{
		title: "sportswear",
		id: 4,
		icon: FcSportsMode,
		tabNum: 4,
	},
	{
		title: "accessories",
		id: 5,
		icon: MdWatch,
		tabNum: 5,
	},
	{
		title: "bags",
		id: 6,
		icon: FaSuitcase,
		tabNum: 6,
	},
];
