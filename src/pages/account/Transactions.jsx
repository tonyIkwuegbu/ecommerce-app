import { Empty } from "antd";

const Password = () => {
	return (
		<div>
			<h1 className="text-center py-2 mb-3 lg:text-xl tracking-wider font-semibold">
				My Transactions
			</h1>
			<div className="my-16">
				<Empty description="No Transactions yet" />
			</div>
		</div>
	);
};

export default Password;
