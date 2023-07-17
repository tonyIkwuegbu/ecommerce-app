import Skeleton from "react-loading-skeleton";

const OneProductSkeleton = () => {
	return (
		<div className="max-w-[98%] grid grid-cols-1 lg:grid-cols-2 items-start gap-4 justify-center my-10 mx-auto px-4">
			<div className="">
				<Skeleton width={400} height={400} />
			</div>
			<div>
				<Skeleton height={75} />
				<Skeleton width={300} height={50} />

				<Skeleton width={150} height={25} />

				<Skeleton height={50} />

				<Skeleton height={150} />

				<Skeleton height={50} width={150} />
			</div>
		</div>
	);
};

export default OneProductSkeleton;
