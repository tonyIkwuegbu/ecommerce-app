import Dcard from "./DCard";
import { IoMdArrowDropright } from "react-icons/io";

// .heading img {
//   width: 40px;
//   height: 40px;
//   margin-top: 5px;
// }
// .NewArrivals h4 {
//   font-weight: 400;
// }
// .NewArrivals span {
//   color: #e94560;
//   font-size: 15px;
//   font-weight: 500;
// }
// .NewArrivals .box img {
//   width: 100%;
//   height: 100%;
// }

const Discount = () => {
	return (
		<>
			<section className="Discount background">
				<div className="max-w-[90%] m-auto">
					<div className="heading flex items-center justify-between">
						<div className="heading-left row flex items-center space-x-2">
							<img
								src="https://img.icons8.com/glyph-neue/64/26e07f/new.png"
								alt=""
								className="w-[40px] h-[40px] mt-[5px]"
							/>
							<h1 className="text-2xl font-semibold tracking-wide">
								New Arrivals
							</h1>
						</div>
						<div className="cursor-pointer flex items-center">
							<span className="text-[#e94560] font-semibold text-sm">
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
