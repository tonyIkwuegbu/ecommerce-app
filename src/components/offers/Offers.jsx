import { FaHeadset, FaShuttleVan } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import { TbDiscount2Off } from "react-icons/tb";

const items = [
	{
		id: 1,
		title: "AFFORDABLE DELIVERY",
		icon: FaShuttleVan,
		subtitle: `From \u20A62000`,
	},
	{
		id: 2,
		title: "SUPPORT 24/7",
		icon: FaHeadset,
		subtitle: "Online 24 Hours",
	},
	{
		id: 3,
		title: "PAYMENT METHOD",
		icon: RiSecurePaymentFill,
		subtitle: "Secure Payment",
	},
	{
		id: 4,
		title: "BIG DISCOUNT",
		icon: TbDiscount2Off,
		subtitle: "Every Weekend",
	},
];

const Offers = () => {
	return (
		<section className="bg-[#f6f9fc] py-8">
			<div className="hidden lg:flex justify-evenly divide-x-2 border-2 mx-10 py-10">
				{items.map((item) => (
					<div
						key={item.id}
						className="flex items-center gap-x-6 tracking-wider px-4"
					>
						<item.icon className="text-3xl text-[#ff5c00]" />
						<div>
							<h3 className="font-bold hover:text-[#ff5c00] cursor-pointer">
								{item.title}
							</h3>
							<h5 className="text-xs text-gray-500">{item.subtitle}</h5>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Offers;
