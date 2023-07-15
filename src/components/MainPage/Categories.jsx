import Items from "../../NavData";
import { Link } from "react-router-dom";

const Categories = () => {
	return (
		<>
			<div className="category hidden lg:inline-block">
				{Items.map((value) => {
					return (
						<div className="box" key={value.key}>
							<Link to={value.path}>
								<p className="flex items-center leading-10">
									<span>
										<value.icon className="text-lg" />
									</span>
									{value.label}
								</p>
							</Link>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Categories;
