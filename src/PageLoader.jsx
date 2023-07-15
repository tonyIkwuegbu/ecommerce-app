import { RiseLoader } from "react-spinners";

const PageLoader = () => {
	return (
		<div>
			<center className="h-screen mx-auto mt-[8rem]">
				<RiseLoader color="##ff5c00" size={6} />
			</center>
		</div>
	);
};

export default PageLoader;
