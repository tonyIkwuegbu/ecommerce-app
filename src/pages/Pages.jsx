import Home from "../components/MainPage/Home";
import Discount from "../components/discount/Discount";
import FlashDeals from "../components/flashDeals/FlashDeals";
import NewsLetter from "../components/newsletter/NewsLetter";

// import Wrapper from "../components/wrapper/Wrapper";

const Pages = ({ productItems }) => {
	return (
		<>
			<Home />
			<FlashDeals productItems={productItems} />
			<Discount />
			<NewsLetter />
			{/* 
			
			
			<Wrapper /> */}
		</>
	);
};

export default Pages;
