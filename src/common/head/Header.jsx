import HeadMiddle from "./HeadMiddle";
import HeadTop from "./HeadTop";
import NavBar from "./NavBar";

const Header = () => {
	return (
		<div className="bg-[#232f3e]  px-4 lg:px-10 text-white py-2">
			<div>
				{/* headTop */}
				<HeadTop />
			</div>
			<div>
				<HeadMiddle />
			</div>
			<div>
				<NavBar />
			</div>
		</div>
	);
};

export default Header;
