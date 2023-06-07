import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiArrowDownSLine } from "react-icons/ri";

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
	return (
		<>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-x-6 px-[16px] py-2 bg-[#ff5c40] font-semibold cursor-pointer">
					<span className="">
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
								Collections
							</Link>
						</li>
						<li>
							<Link
								to="/#"
								onClick={handleClose}
								// style={{ color: location.pathname === "/skills" && "#4071f4" }}
							>
								Shop
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
								Blog
							</Link>
						</li>
						<li>
							<Link
								to="/contact"
								onClick={handleClose}
								// style={{ color: location.pathname === "/contact" && "#4071f4" }}
							>
								Marketplace
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Navbar;
