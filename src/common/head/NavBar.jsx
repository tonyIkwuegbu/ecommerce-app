import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiArrowDownSLine } from "react-icons/ri";
import useFetch from "../../hooks/useFetch";

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

	// ******************************************************* GET TOP DEALS PRODUCTS
	const { data } = useFetch("/api/v1/ecommerce/categories");

	// ********************************************HANDLERS
	const handleToggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleCloseDropdown = () => {
		setIsOpen(false);
	};

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
					<div className="absolute top-full left-0 bg-white text-black text-sm rounded-md px-4 py-4 mt-1 shadow-md">
						{data?.length > 0 &&
							data?.map((item) => (
								<div key={item.category} className="capitalize">
									<Link
										to={`/category/${encodeURIComponent(
											item.category.replace(/ /g, "-").replace(/&/g, "and"),
										)}`}
										className={` ${
											location.pathname.startsWith(
												`/category/${encodeURIComponent(
													item.category.replace(/ /g, "-").replace(/&/g, "and"),
												)}`,
											)
												? "text-[#ff5c00] font-semibold"
												: ""
										}  leading-8 cursor-pointer  hover:font-semibold hover:text-[#ff5c00]`}
										onClick={handleCloseDropdown}
									>
										{item.category}
									</Link>
								</div>
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
							to="/top-deals"
							onClick={handleClose}
							style={{
								color: location.pathname === "/top-deals" && "#ff5c00",
							}}
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
