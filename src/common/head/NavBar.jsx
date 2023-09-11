import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
	GiHamburgerMenu,
	GiPlug,
	GiHealthIncrease,
	GiOilySpiral,
} from "react-icons/gi";
import { BiShoppingBag } from "react-icons/bi";
import { RiArrowDownSLine } from "react-icons/ri";
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import { FaBaby } from "react-icons/fa";

const Navbar = () => {
	const location = useLocation();
	const [open, setOpen] = useState(false);
	const [screenWidth, setScreenWidth] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	const trackScreenWidth = () => {
		const width = window.innerWidth;
		setScreenWidth(width);
		if (width > 800) {
			setOpen(true);
		}
	};

	useEffect(() => {
		trackScreenWidth();
		window.addEventListener("resize", trackScreenWidth);
		return () => window.removeEventListener("resize", trackScreenWidth);
	}, [screenWidth]);

	const handleClose = () => {
		if (screenWidth < 800) {
			setOpen(false);
		}
	};

	const handleToggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleCloseDropdown = () => {
		setIsOpen(false);
	};

	// ****** Menu data map
	const items = [
		{
			key: "1",
			label: "Men",
			icon: <FcBusinessman />,
			path: "/category/men",
		},
		{
			key: "2",
			label: "Women",
			icon: <FcBusinesswoman />,
			path: "/category/women",
		},
		{
			key: "3",
			label: "Children",
			icon: <FaBaby />,
			path: "/category/children",
		},
		{
			key: "4",
			label: "Beauty",
			icon: <GiHealthIncrease />,
			path: "/category/beauty",
		},
		{
			key: "5",
			label: "Home Essentials",
			icon: <GiOilySpiral />,
			path: "/category/home_essentials",
		},
		{
			key: "6",
			label: "Bags",
			icon: <BiShoppingBag />,
			path: "/#",
		},
		{
			key: "7",
			label: "Electronics",
			icon: <GiPlug />,
			path: "/#",
		},
	];

	return (
		<div className="flex items-center justify-between">
			<div className="relative inline-block">
				<div
					className="flex items-center gap-x-4 px-[16px] py-2 bg-[#ff5c40] text-xs tracking-wider font-semibold cursor-pointer"
					onClick={handleToggleDropdown}
				>
					<span>
						<GiHamburgerMenu />
					</span>
					<h4>ALL CATEGORIES</h4>
					<span>
						<RiArrowDownSLine />
					</span>
				</div>
				{isOpen && (
					<div className="absolute top-full left-0 bg-white text-black text-sm rounded-md px-6 py-4 mt-1 shadow-md">
						{items.map((item) => (
							<Link
								to={item.path}
								key={item.key}
								className={`dropdown-item ${
									location.pathname === item.path ? "active" : ""
								} flex items-center gap-x-4 leading-8 cursor-pointer hover:bg-gray-100 hover:font-semibold hover:text-[#ff5c00]`}
								onClick={handleCloseDropdown}
							>
								{item.icon}
								{item.label}
							</Link>
						))}
					</div>
				)}
			</div>

			<div className="list-wrapper">
				<img
					src="https://cdn.iconscout.com/icon/free/png-512/bars-collection-view-application-grid-menu-44415.png"
					alt="Menu bars"
					style={{ opacity: !open ? 1 : 0 }}
					onClick={() => {
						setOpen(!open);
					}}
				/>

				<img
					src="https://cdn3.iconfinder.com/data/icons/e-commerce-simple-ui-elements/100/TWalsh__close1-512.png"
					alt="Menu cross"
					style={{ opacity: open ? 1 : 0 }}
					onClick={() => {
						setOpen(!open);
					}}
				/>

				<ul style={{ left: open ? "0" : "-100vw" }}>
					<li>
						<NavLink
							to="/#"
							onClick={handleClose}
							//style={{ color: location.pathname === "/" && "#ff5c00" }}
						>
							Top Deals
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/popular-products"
							onClick={handleClose}
							style={{
								color: location.pathname === "/popular-products" && "#ff5c00",
							}}
						>
							Popular Products
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/new-arrivals"
							onClick={handleClose}
							style={{
								color: location.pathname === "/new-arrivals" && "#ff5c00",
							}}
						>
							New Arrivals
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/#"
							onClick={handleClose}
							// style={{ color: location.pathname === "/" && "#ff5c00" }}
						>
							Gift Card
						</NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
