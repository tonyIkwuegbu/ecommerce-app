import HeadMiddle from "./HeadMiddle";
import HeadTop from "./HeadTop";
import NavBar from "./NavBar";

const Header = ({ CartItem }) => {
	return (
		<header className="bg-[#232f3e] sticky top-0 z-50 px-4 lg:px-10 text-white py-2">
			{/* headTop */}
			<HeadTop />
			<HeadMiddle CartItem={CartItem} />
			<NavBar />
		</header>
	);
};

export default Header;
