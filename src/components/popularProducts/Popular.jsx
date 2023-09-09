import { AiFillThunderbolt } from "react-icons/ai";
import PopularCard from "./PopularCard";
import { IoMdArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Popular = () => {
	const navigate = useNavigate();

	// ******************************************************* GET POPULAR PRODUCTS
	const { loading, shuffledData } = useFetch(
		"/api/v1/ecommerce/product/popular",
	);

	return (
		<>
			<section className="Discount background">
				<div className="max-w-[90%] m-auto">
					<div className="heading flex items-center justify-between border-b-2 mb-3">
						<div className="heading-left row flex items-center space-x-2  underline decoration-[2px] underline-offset-[8px] decoration-[#ff5c00]">
							<AiFillThunderbolt className="text-[#ff5c00]" />
							<h1 className="text-xl md:text-2xl font-semibold tracking-wide">
								Popular Products
							</h1>
						</div>
						<div className="cursor-pointer flex items-center">
							<span
								className="text-[#ff5c00] font-semibold text-sm"
								onClick={() => navigate("/popular-products")}
							>
								View all
							</span>
							<IoMdArrowDropright className="text-[20px]" />
						</div>
					</div>
					<PopularCard loading={loading} productData={shuffledData} />
				</div>
			</section>
		</>
	);
};

export default Popular;
