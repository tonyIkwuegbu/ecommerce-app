import { FaHeadset } from "react-icons/fa";
import { GrLocation, GrMail } from "react-icons/gr";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import logo from "../../assets/images/logo_1_footer.jpeg";

const Footer = () => {
	return (
		<footer className="bg-white">
			<div className="px-10 py-2 mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 leading-8">
				<div>
					<img
						loading="lazy"
						src={logo}
						alt=""
						className="w-36 py-6 transition-all hover:scale-110 duration-500 ease-in-out"
					/>
					<p className="flex items-center gap-x-3">
						<span>
							<GrLocation />
						</span>
						Plot 307, Premier Layout Goshen, Enugu.
					</p>
					<p className="flex items-center gap-x-3">
						<span>
							<FaHeadset />
						</span>
						(+234)-818-630-4114
					</p>
					<p className="flex items-center gap-x-3">
						<span>
							<GrMail />
						</span>
						info@tencowry.com
					</p>
					<p className="flex items-center gap-x-3">
						<span>
							<MdOutlineAccessTimeFilled />
						</span>
						Open Time: 9:00am - 6:00pm
					</p>
				</div>

				<div>
					<h1 className="py-6 font-ubuntu font-semibold tracking-wider">
						INFORMATION
					</h1>
					<ul>
						<li>About Us</li>
						<li>FAQ</li>
						<li>Support 24/7</li>
						<li>Warranty and Services</li>
					</ul>
				</div>
				<div>
					<h1 className="py-6 font-ubuntu font-semibold tracking-wider">
						MY ACCOUNT
					</h1>
					<ul>
						<li>Brands</li>
						<li>Specials</li>
						<li>Affiliates</li>
						<li>Custom Link</li>
					</ul>
				</div>
				<div>
					<h1 className="py-6 font-ubuntu font-semibold tracking-wider">
						SERVICES
					</h1>
					<ul>
						<li>Contact Us</li>
						<li>Customer Service</li>
						<li>Site Map</li>
						<li>Returns</li>
					</ul>
				</div>
			</div>
			<div className="text-center bg-[#232f3e] text-white py-2 text-sm tracking-wider">
				<p>© TenCowry {new Date().getFullYear()}. All Rights Reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
