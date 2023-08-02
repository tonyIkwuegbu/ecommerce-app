import logo from "/images/logo_2_main.png";
import { Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useState } from "react";

const { Search } = Input;

const Items = [
	{
		label: <Link to="/my-account">My Account</Link>,
		key: "1",
	},
	{
		label: <Link to="/my-orders">Orders</Link>,
		key: "2",
	},
	{
		label: <Link to="/#">Help</Link>,
		key: "3",
	},
];

const HeadMiddle = () => {
	const navigate = useNavigate();
	const cartItems = useSelector((state) => state.cart);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleDropdownToggle = () => {
		setIsDropdownOpen((prevState) => !prevState);
	};

	const handleDropdownClose = () => {
		setIsDropdownOpen(false);
	};
	return (
		<section className="flex items-center justify-between py-3">
			<img
				loading="lazy"
				src={logo}
				alt=""
				className="h-14 w-36 cursor-pointer"
				onClick={() => navigate("/")}
			/>

			<div className="hidden lg:inline-block">
				<Search
					placeholder="search"
					//onSearch={onSearch}
					enterButton
					allowClear
					size="large"
					className="custom-search"
					style={{
						width: 600,
						backgroundColor: "#ff5c00",
						borderRadius: "12px",
					}}
				/>
			</div>

			<div className="flex items-center space-x-4 relative">
				{isAuthenticated && (
					<>
						<IoPersonCircle
							className="text-2xl lg:text-3xl cursor-pointer"
							onClick={handleDropdownToggle}
						/>

						{isDropdownOpen && (
							<div
								className="absolute top-8 right-0 mt-2 w-36 text-black text-sm bg-white border rounded-md shadow-lg z-10"
								onClick={handleDropdownClose}
							>
								<ul className="py-2">
									{Items.map((item) => (
										<li className="px-4 py-2 hover:bg-gray-100" key={item.key}>
											{item.label}
										</li>
									))}
								</ul>
							</div>
						)}
					</>
				)}

				<div className="relative">
					<Link to="/cart">
						<BsFillCartCheckFill className="text-2xl lg:text-2xl" />
						<span className="absolute top-[-8px] right-[-14px] w-6 h-6 rounded-[50%] text-center bg-[#ff5c00] text-white">
							{cartItems?.length === "" ? 0 : cartItems?.length}
						</span>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default HeadMiddle;
