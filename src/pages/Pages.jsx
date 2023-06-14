import Home from "../components/MainPage/Home";
import Discount from "../components/newarrivals/Discount";
import FlashDeals from "../components/flashDeals/FlashDeals";
import NewsLetter from "../components/newsletter/NewsLetter";
import MainTop from "../components/Top/MainTop";
import TopDeals from "../components/deals/DealsMain";

// import Wrapper from "../components/wrapper/Wrapper";

const Pages = ({ productItems, shopItems }) => {
	return (
		<>
			<Home />
			<MainTop />
			<TopDeals shopItems={shopItems} />
			<FlashDeals productItems={productItems} />
			<Discount />
			<NewsLetter />
			{/* 
			
			
			<Wrapper /> */}
		</>
	);
};

export default Pages;
