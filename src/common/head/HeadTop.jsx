import { BsPersonFill } from "react-icons/bs";

const HeadTop = () => {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center space-x-2">
				<div className="lg:hidden">
					<BsPersonFill />
				</div>
				<h4 className="hidden lg:inline-block text-xs">
					<b>Welcome to Emarket !</b> Wrap new offers / gift every single day on
					Weekends - New Coupon code: Happy2023
				</h4>
			</div>
			<div className="flex items-center space-x-6 text-xs md:text-sm">
				<p className="hidden lg:inline-block bg-[#ff5c00] rounded-[3px] px-[15px] py-1 font-semibold cursor-pointer">
					BECOME A SELLER
				</p>
				<p className="cursor-pointer">&#8358; Naira</p>
				<p className="cursor-pointer">English</p>
			</div>
		</div>
	);
};

export default HeadTop;
