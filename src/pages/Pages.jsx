import Home from "../components/MainPage/Home";
import FlashDeals from "../components/flashDeals/FlashDeals";
import NewsLetter from "../components/newsletter/NewsLetter";
import MainTop from "../components/Top/MainTop";
import TopDeals from "../components/deals/DealsMain";
import Offers from "../components/offers/Offers";
import Arrivals from "../components/newarrivals/Arrivals";

// import Wrapper from "../components/wrapper/Wrapper";

const Pages = () => {
	return (
		<>
			<Home />
			<Offers />
			<MainTop />
			<TopDeals />
			<Arrivals />
			<FlashDeals />

			<NewsLetter />
			{/* 
			
			
			<Wrapper /> */}
		</>
	);
};

export default Pages;
