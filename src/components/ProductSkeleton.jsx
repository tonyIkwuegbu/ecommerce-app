import Skeleton from "react-loading-skeleton";

const ProductSkeleton = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center mx-auto gap-6">
			<div className="">
				<Skeleton width={300} height={300} />
			</div>
			<div className="">
				<Skeleton width={300} height={300} />
			</div>
			<div className="">
				<Skeleton width={300} height={300} />
			</div>
			<div className="">
				<Skeleton width={300} height={300} />
			</div>
			<div className="">
				<Skeleton width={300} height={300} />
			</div>
		</div>
	);
};

export default ProductSkeleton;
