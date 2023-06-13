import Items from "../../NavData";

const Categories = () => {
	return (
		<>
			<div className="category hidden lg:inline-block">
				{Items.map((value) => {
					return (
						<div className="box" key={value.key}>
							<p className="flex items-center leading-10">
								<span>
									<value.icon className="text-lg" />
								</span>
								{value.label}
							</p>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Categories;
