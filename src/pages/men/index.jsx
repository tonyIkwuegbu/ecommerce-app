import { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import Axios from "axios";
import useSWR from "swr";
import { api } from "../../Api";
import { NavMen } from "./NavData";
import AllMen from "./AllMen";
import MenCloth from "./MenCloth";
//import { Alert, Spin } from "antd";

const Men = () => {
	const [slidesToShow, setSlidesToShow] = useState(6);
	const [tabIndex, setTabIndex] = useState(1);
	const [selected, setSelected] = useState(1);

	// ******************************************************* FETCHER SWR
	const fetcher = (url) =>
		Axios.get(url, {
			headers: {
				"Content-Type": "application/json",
				"x-access-token": api.token,
			},
		})
			.then((res) => {
				return res.data.data;
			})
			.catch((error) => {
				console.error("Fetch error:", error);
				throw error;
			});

	const { data, error } = useSWR(
		`${api.baseURL}/api/v1/ecommerce/products/category/men`,
		fetcher,
	);

	// ************************************************* MOBILE SLIDER
	const settings = useMemo(
		() => ({
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: slidesToShow,
			slidesToScroll: 1,
			autoplay: true,
		}),
		[slidesToShow],
	);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setSlidesToShow(6); // iPad view
			} else {
				setSlidesToShow(4); // Mobile view
			}
		};

		// Set initial slidesToShow based on the current screen size
		handleResize();

		// Update slidesToShow when the window is resized
		window.addEventListener("resize", handleResize);

		// Cleanup event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="mt-4">
			<div className="lg:hidden">
				<Slider {...settings}>
					{NavMen.map((item) => (
						<div key={item.id} onClick={() => setSelected(item.tabNum)}>
							<h5
								onClick={() => setTabIndex(item.tabNum)}
								className="cursor-pointer"
								style={selected === item.tabNum ? { color: "#ff5c00" } : null}
							>
								{item.title}
							</h5>
						</div>
					))}
				</Slider>
			</div>
			<div className="max-w-[98%] m-auto flex space-x-4 justify-between bg-[#f6f9fc] p-4">
				<div className="category hidden lg:inline-block">
					{NavMen.map((value) => {
						return (
							<div
								className="box cursor-pointer"
								key={value.id}
								onClick={() => setSelected(value.tabNum)}
							>
								<p
									className="flex items-center leading-10"
									onClick={() => setTabIndex(value.tabNum)}
									style={
										selected === value.tabNum ? { color: "#ff5c00" } : null
									}
								>
									<span>
										<value.icon className="text-lg" />
									</span>
									{value.title}
								</p>
							</div>
						);
					})}
				</div>
				<div>
					{tabIndex === 1 && <AllMen data={data} error={error} />}
					{tabIndex === 2 && <MenCloth />}
				</div>
				{/* <div className="hidden lg:inline-block">
					<img
						src="/src/assets/images/men2.png"
						alt="men-photo"
						className="h-[80vh] w-[70vw] rounded-sm"
					/>
				</div> */}
			</div>
			{/* <div>
				{tabIndex === 1 && <AllMen data={data} error={error} />}
				{tabIndex === 2 && <MenCloth />}
			</div> */}
		</div>
	);
};

export default Men;
