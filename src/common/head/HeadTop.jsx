import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const HeadTop = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	const handleLogout = () => {
		dispatch(logout());
		window.location.href = "/";
	};
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center space-x-2">
				{isAuthenticated ? (
					<>
						<h4 className="text-xs text-[#ff5c00] tracking-wider">
							<b className="text-white">Welcome to TenCowry!</b>
							<span onClick={handleLogout} style={{ cursor: "pointer" }}>
								Logout
							</span>
						</h4>
					</>
				) : (
					<h4 className="text-xs text-[#ff5c00] tracking-wider">
						<b className="text-white">Welcome to TenCowry!</b>{" "}
						<Link to="/login">Login</Link> or{" "}
						<Link to="/register">Register</Link>
					</h4>
				)}
			</div>
			<div className="flex items-center space-x-6 text-xs md:text-sm cursor-pointer">
				<p className="hidden lg:inline-block bg-[#ff5c00] rounded-[3px] px-[15px] py-1 font-semibold">
					BECOME A SELLER
				</p>
				<p className="">&#8358; Naira</p>
				<p className="hidden lg:inline-flex">English</p>
			</div>
		</div>
	);
};

export default HeadTop;
