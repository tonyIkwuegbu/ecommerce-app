import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	GiHamburgerMenu,
	GiPlug,
	GiHealthIncrease,
	GiOilySpiral,
} from "react-icons/gi";
import { BiShoppingBag } from "react-icons/bi";

import { RiArrowDownSLine } from "react-icons/ri";
import { Dropdown } from "antd";
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import { FaBaby } from "react-icons/fa";

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const [screenWidth, setScreenWidth] = useState(0);

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
			path: "/#",
		},
		{
			key: "3",
			label: "Children",
			icon: <FaBaby />,
			path: "/#",
		},
		{
			key: "4",
			label: "Health & Beauty",
			icon: <GiHealthIncrease />,
			path: "/#",
		},
		{
			key: "5",
			label: "Home & Lights",
			icon: <GiOilySpiral />,
			path: "/#",
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
		<>
			<div className="flex items-center justify-between">
				<Dropdown
					overlay={
						<div className="bg-white rounded-md p-2">
							{items.map((item) => (
								<Link
									to={item.path}
									key={item.key}
									className={`dropdown-item ${
										location.pathname === item.path ? "active" : ""
									} flex items-center gap-x-4 leading-8 cursor-pointer hover:bg-gray-100 hover:font-semibold hover:text-[#ff5c00]`}
									onClick={handleClose}
								>
									{item.icon}
									{item.label}
								</Link>
							))}
						</div>
					}
					placement="bottom"
				>
					<div className="flex items-center gap-x-4 px-[16px] py-2 bg-[#ff5c40] text-xs tracking-wider font-semibold cursor-pointer">
						<span>
							<GiHamburgerMenu />
						</span>
						<h4>ALL CATEGORIES</h4>
						<span>
							<RiArrowDownSLine />
						</span>
					</div>
				</Dropdown>

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
							<Link
								to="/"
								onClick={handleClose}
								style={{ color: location.pathname === "/" && "#ff5c00" }}
							>
								HOME
							</Link>
						</li>
						<li>
							<Link
								to="/#"
								onClick={handleClose}
								// style={{ color: location.pathname === "/about" && "#4071f4" }}
							>
								TOP DEALS
							</Link>
						</li>
						<li>
							<Link
								to="/#"
								onClick={handleClose}
								// style={{ color: location.pathname === "/skills" && "#4071f4" }}
							>
								BEST SELLERS
							</Link>
						</li>
						<li>
							<Link
								to="/#"
								onClick={handleClose}
								// style={{
								// 	color: location.pathname === "/projects" && "#4071f4",
								// }}
							>
								NEW ARRIVALS
							</Link>
						</li>
						<li>
							<Link
								to="/#"
								onClick={handleClose}
								// style={{ color: location.pathname === "/contact" && "#4071f4" }}
							>
								ABOUT US
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Navbar;
