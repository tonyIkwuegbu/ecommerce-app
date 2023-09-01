import TopCard from "./TopCard";
import "./style.css";
import { TbCategory2 } from "react-icons/tb";

const Discount = () => {
	return (
		<>
			<section className="Discount background">
				<div className="max-w-[90%] m-auto">
					<div className="heading flex items-center justify-between border-b-2 mb-3">
						<div className="heading-left row flex items-center space-x-2 underline decoration-[2px] underline-offset-8 decoration-[#ff5c00]">
							<TbCategory2 className="text-[#ff5c00] font-semibold text-xl" />
							<h1 className="text-xl md:text-2xl font-semibold tracking-wide">
								Featured Categories
							</h1>
						</div>
					</div>
					<TopCard />
				</div>
			</section>
		</>
	);
};

export default Discount;
