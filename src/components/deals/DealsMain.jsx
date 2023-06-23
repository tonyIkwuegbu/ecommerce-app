import { AiFillThunderbolt } from "react-icons/ai";
import DealsCard from "./DealsCard";

const DealsMain = ({ shopItems }) => {
	return (
		<>
			<section className="py-[50px] bg-[#f6f9fc] px-0">
				<div className="max-w-[90%] m-auto">
					<div className="flex items-center gap-x-2 border-b-2 mb-3 underline decoration-[2px] underline-offset-8 decoration-[#ff5c00]">
						<AiFillThunderbolt className="text-[#ff5c00]" />
						<h1 className="text-xl md:text-2xl font-semibold tracking-wide">
							Top Deals
						</h1>
					</div>
					<DealsCard shopItems={shopItems} />
				</div>
			</section>
		</>
	);
};

export default DealsMain;
