import { MdIron, MdDining, MdTakeoutDining } from "react-icons/md";
import { DiGhostSmall } from "react-icons/di";
import { FaBed } from "react-icons/fa";

export const Essentials = [
	{
		title: "All",
		id: 1,
		icon: DiGhostSmall,
		tabNum: 1,
	},
	{
		title: "Appliances",
		id: 2,
		icon: MdIron,
		tabNum: 2,
	},
	{
		title: "Kitchen",
		id: 3,
		icon: MdTakeoutDining,
		tabNum: 3,
	},
	{
		title: "Dining",
		id: 4,
		icon: MdDining,
		tabNum: 4,
	},
	{
		title: "Furnishings",
		id: 5,
		icon: FaBed,
		tabNum: 5,
	},
];
