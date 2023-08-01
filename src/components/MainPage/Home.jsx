import Categories from "./Categories";
import "./Home.css";
import SliderHome from "./Slider";

const Home = () => {
	return (
		<>
			<section className="bg-[#f6f9fc]">
				<div className="max-w-[98%] mx-auto flex justify-between">
					<Categories />
					<SliderHome />
				</div>
			</section>
		</>
	);
};

export default Home;
