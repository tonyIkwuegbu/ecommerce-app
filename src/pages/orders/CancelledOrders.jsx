import { Empty } from "antd";

const Cancel = () => {
	return (
		<div>
			<h1 className="text-center py-2 mb-3 lg:text-xl tracking-wider font-semibold">
				Cancelled Orders
			</h1>
			<div className="my-16">
				<Empty description="No cancelled orders yet" />
			</div>
		</div>
	);
};

export default Cancel;
