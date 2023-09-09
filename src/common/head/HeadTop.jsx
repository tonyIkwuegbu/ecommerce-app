import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { Modal, message } from "antd";
import { useState } from "react";
import Sellers from "./Sellers";

const HeadTop = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleLogout = () => {
		dispatch(logout());
		navigate("/");
		message.info("You're logged out!");
	};
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center space-x-2">
				{isAuthenticated ? (
					<>
						<h4 className="text-[#ff5c00] tracking-wider">
							<b className="text-white text-sm lg:text-lg">
								Hello, {user.first_name} !
							</b>{" "}
							<span
								className="text-xs"
								onClick={handleLogout}
								style={{ cursor: "pointer" }}
							>
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
				<p
					onClick={showModal}
					className="hidden lg:inline-block bg-[#ff5c00] rounded-[3px] px-[15px] py-1 font-semibold"
				>
					BECOME A SELLER
				</p>
				<p className="">&#8358; Naira</p>
				<p className="hidden lg:inline-flex">English</p>
			</div>
			<Modal open={isModalVisible} onCancel={handleCancel} footer={null}>
				<Sellers setIsModalVisible={setIsModalVisible} />
			</Modal>
		</div>
	);
};

export default HeadTop;
