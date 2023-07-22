import HeadMiddle from "./HeadMiddle";
import HeadTop from "./HeadTop";
import NavBar from "./NavBar";

const Header = ({ CartItem }) => {
	return (
		<div className="bg-[#232f3e] sticky top-0 z-50 px-4 lg:px-10 text-white py-2 h-[30vh]">
			<div>
				{/* headTop */}
				<HeadTop />
			</div>
			<div>
				<HeadMiddle CartItem={CartItem} />
			</div>
			<div>
				<NavBar />
			</div>
		</div>
	);
};

export default Header;
