import logo from "../../assets/images/logo.png";
import { Input } from "antd";
import { Link } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const { Search } = Input;

const HeadMiddle = () => {
	const cartItems = useSelector((state) => state.cart);
	return (
		<section className="">
			<div className="flex items justify-between py-6">
				<div className="">
					<img src={logo} alt="" />
				</div>

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
							backgroundColor: "#ff3c20",
							borderRadius: "12px",
						}}
					/>
				</div>

				<div className="flex items-center space-x-4 ">
					<IoPersonCircle className="text-2xl lg:text-3xl cursor-pointer" />
					<div className="relative">
						<Link to="/cart">
							<BsFillCartCheckFill className="text-2xl lg:text-2xl" />
							<span className="absolute top-[-10px] right-[-5px] w-5 h-5 rounded-[50%] text-center bg-[#e94560] text-white">
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
