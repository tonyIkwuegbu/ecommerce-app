import logo from "/images/logo_2_main.png";
import { Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const { Search } = Input;

const HeadMiddle = () => {
	const navigate = useNavigate();
	const cartItems = useSelector((state) => state.cart);
	return (
		<section className="">
			<div className="flex items-center justify-between py-6">
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

				<div className="flex items-center space-x-4 ">
					<IoPersonCircle className="text-2xl lg:text-3xl cursor-pointer" />
					<div className="relative">
						<Link to="/cart">
							<BsFillCartCheckFill className="text-2xl lg:text-2xl" />
							<span className="absolute top-[-8px] right-[-14px] w-6 h-6 rounded-[50%] text-center bg-[#ff5c00] text-white">
								{cartItems?.length === "" ? 0 : cartItems?.length}
							</span>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeadMiddle;
