import Skeleton from "react-loading-skeleton";

const MainPageSkeleton = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-4 my-4 items-center justify-center mx-auto gap-x-4">
			<div className="">
				<Skeleton width={250} height={300} />
			</div>
			<div className="">
				<Skeleton width={250} height={300} />
			</div>
			<div className="">
				<Skeleton width={250} height={300} />
			</div>
			<div className="">
				<Skeleton width={250} height={300} />
			</div>
			<div className="">
				<Skeleton width={250} height={300} />
			</div>
			<div className="">
				<Skeleton width={250} height={300} />
			</div>
			<div className="">
				<Skeleton width={250} height={300} />
			</div>
			<div className="">
				<Skeleton width={250} height={300} />
			</div>
		</div>
	);
};

export default MainPageSkeleton;
