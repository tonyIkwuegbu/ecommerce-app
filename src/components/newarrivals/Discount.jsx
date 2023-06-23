import Dcard from "./DCard";
import { IoMdArrowDropright } from "react-icons/io";

const Discount = () => {
	return (
		<>
			<section className="Discount background">
				<div className="max-w-[90%] m-auto">
					<div className="heading flex items-center justify-between border-b-2 mb-3">
						<div className="heading-left row flex items-center space-x-2  underline decoration-[2px] underline-offset-[14px] decoration-[#ff5c00]">
							<img
								src="https://img.icons8.com/glyph-neue/64/26e07f/new.png"
								alt=""
								className="w-[40px] h-[40px] mt-[5px]"
							/>
							<h1 className="text-xl md:text-2xl font-semibold tracking-wide">
								New Arrivals
							</h1>
						</div>
						<div className="cursor-pointer flex items-center">
							<span className="text-[#ff5c00] font-semibold text-sm">
								View all
							</span>
							<IoMdArrowDropright className="text-[20px]" />
						</div>
					</div>
					<Dcard />
				</div>
			</section>
		</>
	);
};

export default Discount;
