import { Input } from "antd";
import { FiInstagram, FiFacebook, FiTwitter, FiSend } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const { Search } = Input;
const NewsLetter = () => {
	return (
		<div className="bg-[#232f3e] py-[37px] px-10 text-white flex flex-col lg:flex-row items-center justify-between">
			<div className="items-center space-x-4 hidden lg:inline-flex">
				<span>
					<FiSend className="text-3xl" />
				</span>
				<div>
					<h2 className="text-[22px] font-ubuntu tracking-wider font-semibold">
						Signup For Newsletter
					</h2>
					<p className="text-xs py-2">
						We’ll never share your email address with a third-party.
					</p>
				</div>
			</div>
			<div>
				<Search
					placeholder="Your email address..."
					//onSearch={onSearch}
					enterButton="Subscribe"
					allowClear
					size="large"
					className="custom-search"
					style={{
						backgroundColor: "#ff3c20",
						borderRadius: "5px",
						width: "100%",
					}}
				/>
			</div>
			<div className="flex items-center space-x-4 text-xl cursor-pointer py-6">
				<FiFacebook className="hover:animate-pulse" />
				<FiTwitter className="hover:animate-pulse" />
				<FiInstagram className="hover:animate-pulse" />
				<FcGoogle className="hover:animate-pulse" />
			</div>
		</div>
	);
};

export default NewsLetter;
