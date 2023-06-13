import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	GiClothes,
	GiHamburgerMenu,
	GiPlug,
	GiSonicShoes,
	GiHealthIncrease,
	GiCrownedHeart,
	GiOilySpiral,
} from "react-icons/gi";
import { BiGift, BiShoppingBag } from "react-icons/bi";

import { RiArrowDownSLine } from "react-icons/ri";
import { Dropdown } from "antd";

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
			label: "Fashion",
			icon: <GiClothes />,
		},
		{
			key: "2",
			label: "Gifts and Toys",
			icon: <BiGift />,
		},
		{
			key: "3",
			label: "Electronics",
			icon: <GiPlug />,
		},
		{
			key: "4",
			label: "Bags",
			icon: <BiShoppingBag />,
		},
		{
			key: "5",
			label: "Shoes",
			icon: <GiSonicShoes />,
		},
		{
			key: "6",
			label: "Health & Beauty",
			icon: <GiHealthIncrease />,
		},
		{
			key: "7",
			label: "Accessories",
			icon: <GiCrownedHeart />,
		},
		{
			key: "8",
			label: "Home & Lights",
			icon: <GiOilySpiral />,
		},
	];

	return (
		<>
			<div className="flex items-center justify-between">
				<Dropdown
					className="lg:hidden"
					menu={{
						items,
					}}
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

				<div className="hidden lg:inline-flex items-center gap-x-4 px-[16px] py-2 bg-[#ff5c40] text-xs tracking-wider font-semibold cursor-pointer">
					<span>
						<GiHamburgerMenu />
					</span>
					<h4>ALL CATEGORIES</h4>
					<span>
						<RiArrowDownSLine />
					</span>
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
							<Link
								to="/"
								onClick={handleClose}
								// style={{ color: location.pathname === "/" && "#ffffff" }}
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								to="/#"
								onClick={handleClose}
								// style={{ color: location.pathname === "/about" && "#4071f4" }}
							>
								Top Deals
							</Link>
						</li>
						<li>
							<Link
								to="/#"
								onClick={handleClose}
								// style={{ color: location.pathname === "/skills" && "#4071f4" }}
							>
								Best Sellers
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
								New Arrivals
							</Link>
						</li>
						<li>
							<Link
								to="/#"
								onClick={handleClose}
								// style={{ color: location.pathname === "/contact" && "#4071f4" }}
							>
								About Us
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Navbar;
