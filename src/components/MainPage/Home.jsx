import Categories from "./Categories";
import "./Home.css";
import SliderHome from "./Slider";

const Home = () => {
	return (
		<>
			<section className="">
				<div className="max-w-[98%] m-auto flex justify-between">
					<Categories />
					<SliderHome />
				</div>
			</section>
		</>
	);
};

export default Home;
