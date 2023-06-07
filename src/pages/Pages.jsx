import Home from "../components/MainPage/Home";
import Discount from "../components/discount/Discount";
import FlashDeals from "../components/flashDeals/FlashDeals";
import NewsLetter from "../components/newsletter/NewsLetter";

// import Wrapper from "../components/wrapper/Wrapper";

const Pages = ({ productItems, addToCart, CartItem }) => {
	return (
		<>
			<Home CartItem={CartItem} />
			<FlashDeals productItems={productItems} addToCart={addToCart} />
			<Discount />
			<NewsLetter />
			{/* 
			
			
			<Wrapper /> */}
		</>
	);
};

export default Pages;
