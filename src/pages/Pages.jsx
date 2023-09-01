import Home from "../components/MainPage/Home";
import NewsLetter from "../components/newsletter/NewsLetter";
import MainTop from "../components/Top/MainTop";
import TopDeals from "../components/deals/DealsMain";
import Offers from "../components/offers/Offers";
import Arrivals from "../components/newarrivals/Arrivals";
import Popular from "../components/popularProducts/Popular";
import AdvertOne from "../components/AdvertOne";
import AdvertTwo from "../components/AdvertTwo";

// import Wrapper from "../components/wrapper/Wrapper";

const Pages = () => {
	return (
		<>
			<Home />
			<Offers />
			<MainTop />
			<TopDeals />
			<AdvertOne />
			<Arrivals />
			<Popular />
			<AdvertTwo />
			<NewsLetter />
			{/* 
			
			
			<Wrapper /> */}
		</>
	);
};

export default Pages;
