import { AiFillThunderbolt } from "react-icons/ai";
import FlashCard from "./FlashCard";

const FlashDeals = ({ productItems }) => {
	return (
		<>
			<section className="py-[50px] bg-[#f6f9fc] px-0">
				<div className="max-w-[90%] m-auto">
					<div className="flex items-center gap-x-2 border-b-2 mb-3 underline decoration-[2px] underline-offset-8 decoration-[#e94560]">
						<AiFillThunderbolt className="text-[#e94560]" />
						<h1 className="text-xl md:text-2xl font-semibold tracking-wide">
							Best Sellers
						</h1>
					</div>
					<FlashCard productItems={productItems} />
				</div>
			</section>
		</>
	);
};

export default FlashDeals;
