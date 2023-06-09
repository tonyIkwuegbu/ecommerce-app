import NavData from "../../NavData";

const Categories = () => {
	return (
		<>
			<div className="category hidden lg:inline-block">
				{NavData.map((value, index) => {
					return (
						<div className="box flex text-[15px]" key={index}>
							<img src={value.cateImg} alt="" />
							<span>{value.cateName}</span>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Categories;
