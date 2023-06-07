const Categories = () => {
	const data = [
		{
			cateImg: "./images/category/cat1.png",
			cateName: "Fashion",
		},
		{
			cateImg: "./images/category/cat2.png",
			cateName: "Electronics & Accessories",
		},
		{
			cateImg: "./images/category/cat3.png",
			cateName: "Cars",
		},
		{
			cateImg: "./images/category/cat4.png",
			cateName: "Home & Lights",
		},
		{
			cateImg: "./images/category/cat5.png",
			cateName: "Gifts & Toys",
		},

		{
			cateImg: "./images/category/cat7.png",
			cateName: "Health & Beauty",
		},
		{
			cateImg: "./images/category/cat8.png",
			cateName: "Pets",
		},
		{
			cateImg: "./images/category/cat9.png",
			cateName: "Baby Toys",
		},
		{
			cateImg: "./images/category/cat10.png",
			cateName: "Groceries",
		},
		{
			cateImg: "./images/category/cat11.png",
			cateName: "Books",
		},
	];

	return (
		<>
			<div className="category hidden lg:inline-block">
				{data.map((value, index) => {
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
